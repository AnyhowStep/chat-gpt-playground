import * as React from "react";
import * as classNames from "classnames";
import * as localStorageUtil from "../local-storage-util";
import { SelfDiscover } from "../local-storage-util";
import { SelfDiscoverTaskListForm } from "./SelfDiscoverTaskListForm";

export interface SelfDiscoverTaskTabProps {
    active : boolean;
    selfDiscover : SelfDiscover,
    setSelfDiscover : (selfDiscover : SelfDiscover) => void,
}

export function SelfDiscoverTaskTab (props : SelfDiscoverTaskTabProps) {
    const {
        active,
        selfDiscover,
        setSelfDiscover,
    } = props;
    return <div className={classNames(
        "ui bottom attached tab segment",
        active ? "active" : undefined,
    )}>
        <SelfDiscoverTaskListForm
            tasks={selfDiscover.tasks}
            onChange={(newTasks) => {
                setSelfDiscover({
                    ...selfDiscover,
                    tasks : newTasks,
                });
            }}
            executeConfig={undefined}
        />
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