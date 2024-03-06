import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as classNames from "classnames";
import { OpenAiApi } from "../../api-openai";
import * as localStorageUtil from "../local-storage-util";
import { useError } from "../use-error";
import { ErrorMessage } from "../ErrorMessage";
import { SelfDiscoverTaskTab } from "./SelfDiscoverTaskTab";
import { SelfDiscoverSelectTab } from "./SelfDiscoverSelectTab";
import { SelfDiscoverAdaptTab } from "./SelfDiscoverAdaptTab";
import { SelfDiscoverImplementTab } from "./SelfDiscoverImplementTab";
import { SelfDiscoverExecuteTab } from "./SelfDiscoverExecuteTab";

export interface SelfDiscoverEditPageProps {
    openAiApi : OpenAiApi,
}

enum TabType {
    Tasks = "Tasks",
    Select = "Select",
    Adapt = "Adapt",
    Implement = "Implement",
    Execute = "Execute",
}

const tabTypes = Object.keys(TabType);

export function SelfDiscoverEditPage (props : SelfDiscoverEditPageProps) {
    const {
        openAiApi,
    } = props;

    const history = reactRouter.useHistory();
    const routeParams = reactRouter.useParams() as { uuid : string };
    const routeLocation = reactRouter.useLocation();
    const searchParams = new URLSearchParams(routeLocation.search);

    const [
        selfDiscover,
        setSelfDiscover,
    ] = React.useState(localStorageUtil.loadSelfDiscover(routeParams.uuid));
    const [isLoading, setIsLoading] = React.useState(false);
    const error = useError();
    const [tapType, setTabType] = React.useState(TabType.Tasks);

    React.useEffect(
        () => {
            const curTab = searchParams.get("tab") ?? TabType.Tasks;
            setTabType(
                tabTypes.includes(curTab) ?
                curTab as TabType :
                TabType.Tasks
            );
        },
        [searchParams.get("tab")]
    );

    const [
        models,
        //setModels,
    ] = React.useState(() => {
        return localStorageUtil.loadModels().filter(model => model.id.startsWith("gpt"));
    });

    React.useEffect(
        () => {
            if (selfDiscover == undefined) {
                return;
            }
            const timer = setTimeout(() => {
                localStorageUtil.saveSelfDiscover(selfDiscover);
                const meta = localStorageUtil.loadSelfDiscoversMeta().map((m) : localStorageUtil.SelfDiscoverMeta => {
                    return m.uuid == selfDiscover.uuid ?
                        {
                            uuid : selfDiscover.uuid,
                            name : selfDiscover.name,
                            description : selfDiscover.description,
                        } :
                        m
                });
                localStorageUtil.saveSelfDiscoversMeta(meta);
            }, 1000);
            return () => clearTimeout(timer);
        },
        [selfDiscover]
    );

    if (selfDiscover == undefined) {
        return <div className="ui main container">
            Self-Discover {routeParams.uuid} not found
        </div>
    }

    return <div className="ui main container">
        <div className="ui form">
            <div className="two fields">
                <div className="field">
                    <label>Title</label>
                    <input
                        placeholder="Enter a Self-Discover Title"
                        value={selfDiscover.name}
                        onChange={(evt) => {
                            setSelfDiscover({
                                ...selfDiscover,
                                name : evt.target.value,
                            });
                        }}
                    />
                </div>
                <div className="field">
                    <label>Description</label>
                    <input
                        placeholder="Enter a Self-Discover Description"
                        value={selfDiscover.description}
                        onChange={(evt) => {
                            setSelfDiscover({
                                ...selfDiscover,
                                description : evt.target.value,
                            });
                        }}
                    />
                </div>
            </div>
        </div>
        <div className="ui top attached tabular menu">
            {
                tabTypes.map(t => {
                    return <div
                        key={t}
                        className={classNames(
                            "item",
                            tapType == t ? "active" : undefined,
                        )}
                        onClick={() => {
                            history.replace(routeLocation.pathname + `?tab=${t}`)
                        }}
                    >
                        {t}
                    </div>;
                })
            }
        </div>
        <SelfDiscoverTaskTab
            active={tapType == TabType.Tasks}
            selfDiscover={selfDiscover}
            setSelfDiscover={setSelfDiscover}
        />
        <SelfDiscoverSelectTab
            openAiApi={openAiApi}
            active={tapType == TabType.Select}
            selfDiscover={selfDiscover}
            setSelfDiscover={setSelfDiscover}
        />
        <SelfDiscoverAdaptTab
            openAiApi={openAiApi}
            active={tapType == TabType.Adapt}
            selfDiscover={selfDiscover}
            setSelfDiscover={setSelfDiscover}
        />
        <SelfDiscoverImplementTab
            openAiApi={openAiApi}
            active={tapType == TabType.Implement}
            selfDiscover={selfDiscover}
            setSelfDiscover={setSelfDiscover}
        />
        <SelfDiscoverExecuteTab
            openAiApi={openAiApi}
            active={tapType == TabType.Execute}
            selfDiscover={selfDiscover}
            setSelfDiscover={setSelfDiscover}
        />
        
        <div className="ui segment">
            <ErrorMessage
                error={error}
            />
            
            <button className={classNames(
                "ui primary button",
                isLoading ? "loading" : undefined,
            )} onClick={() => {
                if (isLoading) {
                    return;
                }
                setIsLoading(true);
                
            }}>
                Submit
            </button>
        </div>
        <div className="ui segment">
            <div className="ui form">
                <div className="field">
                    <label>Model</label>
                    <select
                        value={selfDiscover.model}
                        onChange={(evt) => {
                            setSelfDiscover({
                                ...selfDiscover,
                                model : evt.target.value,
                            });
                        }}
                    >
                        <option key={"none"} value={""} disabled>
                            Select a Model
                        </option>
                        {models.map(model => {
                            return <option key={model.id} value={model.id}>
                                {model.id} - ({new Date(model.created * 1000).toISOString()})
                            </option>
                        })}
                    </select>
                </div>
            </div>
        </div>
    </div>
}