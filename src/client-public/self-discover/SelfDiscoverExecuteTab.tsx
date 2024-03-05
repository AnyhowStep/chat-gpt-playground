import * as React from "react";
import * as classNames from "classnames";
import * as localStorageUtil from "../local-storage-util";
import { OpenAiApi } from "../../api-openai";
import { SelfDiscover } from "../local-storage-util";
import { SelfDiscoverTaskListForm } from "./SelfDiscoverTaskListForm";
import { ErrorMessage } from "../ErrorMessage"
export interface SelfDiscoverExecuteTabProps {
    openAiApi : OpenAiApi,
    active : boolean;
    selfDiscover : SelfDiscover,
    setSelfDiscover : (selfDiscover : SelfDiscover) => void,
}

export function SelfDiscoverExecuteTab (props : SelfDiscoverExecuteTabProps) {
    const {
        openAiApi,
        active,
        selfDiscover,
        setSelfDiscover,
    } = props;

    return <div className={classNames(
        "ui bottom attached tab segment",
        active ? "active" : undefined,
    )}>
        {
            selfDiscover.implementResult == undefined ?
            <ErrorMessage
                error={{
                    type : "negative",
                    messages : [
                        "No Implement Result found",
                    ],
                }}
            /> :
            <SelfDiscoverTaskListForm
                tasks={selfDiscover.tasks}
                onChange={(newTasks) => {
                    setSelfDiscover({
                        ...selfDiscover,
                        tasks : newTasks,
                    });
                }}
                executeConfig={{
                    openAiApi,
                    implementResult : selfDiscover.implementResult,
                    model : selfDiscover.model,
                }}
            />
        }
        <button className="ui primary button" onClick={() => {
            setSelfDiscover({
                ...selfDiscover,
                tasks : [
                    ...selfDiscover.tasks,
                    localStorageUtil.makeSelfDiscoverTask(selfDiscover.uuid),
                ],
            });
        }}>
            Add Task
        </button>
    </div>
}
