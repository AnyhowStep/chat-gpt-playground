import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as uuid from "uuid";
import * as localStorageUtil from "../local-storage-util";
import { LocalStorageKey, SelfDiscover } from "../local-storage-util";
//import { SelfDiscover } from "./SelfDiscoverForm";

export function SelfDiscoverListPage () {
    const history = reactRouter.useHistory();
    const [
        selfDiscovers,
        setSelfDiscovers,
    ] = React.useState(localStorageUtil.loadSelfDiscoversMeta());

    return <div className="ui main container">
        <div className="ui segment divided selection massive list">
            {selfDiscovers.map(meta => {
                const displayName = meta.name.trim() == "" ?
                    `Self-Discover ${meta.uuid}` :
                    meta.name;
                return <div className="item" key={meta.uuid} onClick={() => {
                    history.push(`/self-discover/${meta.uuid}/edit`);
                }}>
                    <div className="extra right floated">
                        <div className="ui icon secondary button" onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Copy ${displayName}?`)) {
                                const existingSelfDiscover = localStorageUtil.loadSelfDiscover(meta.uuid);
                                if (existingSelfDiscover == undefined) {
                                    alert(`Cannot find ${displayName} / ${meta.uuid}`);
                                    return;
                                }
                                const newUuid = uuid.v4();
                                const newSelfDiscover : SelfDiscover = {
                                    ...existingSelfDiscover,
                                    uuid : newUuid,
                                    name : `Copy of ${displayName}`,
                                    
                                    selectConversation : {
                                        ...existingSelfDiscover.selectConversation,
                                        uuid : `${LocalStorageKey.SELF_DISCOVER}_${newUuid}_select`,
                                    },
                                    adaptConversation : {
                                        ...existingSelfDiscover.adaptConversation,
                                        uuid : `${LocalStorageKey.SELF_DISCOVER}_${newUuid}_adapt`,
                                    },
                                    implementConversation : {
                                        ...existingSelfDiscover.implementConversation,
                                        uuid : `${LocalStorageKey.SELF_DISCOVER}_${newUuid}_implement`,
                                    },
                                    tasks : existingSelfDiscover.tasks.map(t => {
                                        return {
                                            ...t,
                                            executeConversation : {
                                                ...t.executeConversation,
                                                uuid : `${LocalStorageKey.SELF_DISCOVER}_${newUuid}_task_${t.uuid}_execute`,
                                            },
                                        };
                                    }),
                                };
                                const newSelfDiscovers = [
                                    ...localStorageUtil.loadSelfDiscoversMeta(),
                                    {
                                        ...meta,
                                        uuid : newUuid,
                                        name : `Copy of ${displayName}`,
                                    },
                                ];
                                setSelfDiscovers(newSelfDiscovers);
                                localStorageUtil.saveSelfDiscoversMeta(newSelfDiscovers);
                                localStorageUtil.saveSelfDiscover(newSelfDiscover);
                            }
                        }}>
                            <i className="copy icon"></i>
                        </div>
                        <div className="ui icon red button" onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Delete ${displayName}?`)) {
                                const newSelfDiscovers = localStorageUtil.loadSelfDiscoversMeta()
                                    .filter(m => m.uuid != meta.uuid);
                                setSelfDiscovers(newSelfDiscovers);
                                localStorageUtil.saveSelfDiscoversMeta(newSelfDiscovers);
                                localStorageUtil.deleteSelfDiscover(meta);
                            }
                        }}>
                            <i className="trash icon"></i>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            {displayName}
                        </div>
                        <div className="ui mini label">{meta.uuid}</div>
                        {
                            meta.description.trim() == "" ?
                            <small className="description">
                                There is no description for this self-discover
                            </small> :
                            <div className="description">
                                {meta.description}
                            </div>
                        }
                    </div>
                </div>
            })}
        </div>
        <button className="ui primary button" onClick={() => {
            const selfDiscovers = localStorageUtil.loadSelfDiscoversMeta();
            const {
                meta,
                selfDiscover,
            } = localStorageUtil.makeSelfDiscover();
            const newSelfDiscovers : localStorageUtil.SelfDiscoverMeta[] = [
                ...selfDiscovers,
                meta,
            ];
            localStorageUtil.saveSelfDiscoversMeta(newSelfDiscovers);
            localStorageUtil.saveSelfDiscover(selfDiscover)
            setSelfDiscovers(newSelfDiscovers);
        }}>
            Create Self-Discover
        </button>
    </div>
}