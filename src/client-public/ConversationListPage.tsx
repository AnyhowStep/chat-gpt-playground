import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as uuid from "uuid";
import * as localStorageUtil from "./local-storage-util";
//import { Conversation } from "./ConversationForm";

export function ConversationListPage () {
    const history = reactRouter.useHistory();
    const [
        conversations,
        setConversations,
    ] = React.useState(localStorageUtil.loadConversationsMeta());

    return <div className="ui main container">
        <div className="ui segment divided selection massive list">
            {conversations.map(meta => {
                const displayName = meta.name.trim() == "" ?
                    `Conversation ${meta.uuid}` :
                    meta.name;
                return <div className="item" key={meta.uuid} onClick={() => {
                    history.push(`/conversation/${meta.uuid}/edit`);
                }}>
                    <div className="extra right floated">
                        <div className="ui icon secondary button" onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Copy ${displayName}?`)) {
                                const existingConversation = localStorageUtil.loadConversation(meta.uuid);
                                if (existingConversation == undefined) {
                                    alert(`Cannot find ${displayName} / ${meta.uuid}`);
                                    return;
                                }
                                const newUuid = uuid.v4();
                                const newConversation = {
                                    ...existingConversation,
                                    uuid : newUuid,
                                    name : `Copy of ${displayName}`,
                                };
                                const newConversations = [
                                    ...localStorageUtil.loadConversationsMeta(),
                                    {
                                        ...meta,
                                        uuid : newUuid,
                                        name : `Copy of ${displayName}`,
                                    },
                                ];
                                setConversations(newConversations);
                                localStorageUtil.saveConversationsMeta(newConversations);
                                localStorageUtil.saveConversation(newConversation);
                            }
                        }}>
                            <i className="copy icon"></i>
                        </div>
                        <div className="ui icon red button" onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Delete ${displayName}?`)) {
                                const newConversations = localStorageUtil.loadConversationsMeta()
                                    .filter(m => m.uuid != meta.uuid);
                                setConversations(newConversations);
                                localStorageUtil.saveConversationsMeta(newConversations);
                                localStorageUtil.deleteConversation(meta);
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
                                There is no description for this conversation
                            </small> :
                            <div className="description">
                                {meta.description}
                            </div>
                        }
                        {
                            meta.lastMessage.trim() == "" ?
                            undefined :
                            <div className="description one-line-ellipsis small-description">
                                Last Message: {meta.lastMessage}
                            </div>
                        }
                    </div>
                </div>
            })}
        </div>
        <button className="ui primary button" onClick={() => {
            const models = localStorageUtil.loadModels().filter(model => model.id.startsWith("gpt"));
            const conversations = localStorageUtil.loadConversationsMeta();
            const meta = {
                uuid : uuid.v4(),
                name : "",
                description : "",
                lastMessage : "",
            };
            const newConversations : localStorageUtil.ConversationMeta[] = [
                ...conversations,
                meta,
            ];
            localStorageUtil.saveConversationsMeta(newConversations);
            localStorageUtil.saveConversation({
                uuid : meta.uuid,
                name : meta.name,
                description : meta.description,
                rawChatRequestConfig : {
                    model : models.length > 0 ?
                        models[0].id :
                        "",
                    temperature  :1,
                    max_tokens : 256,
                    stop : "",
                    top_p : 1,
                    frequency_penalty : 0,
                    presence_penalty : 0,
                    response_format : {
                        type : "text",
                    },
                },
                messages : [],
                usedFunctions : {},
            })
            setConversations(newConversations);
        }}>
            Create Conversation
        </button>
    </div>
}