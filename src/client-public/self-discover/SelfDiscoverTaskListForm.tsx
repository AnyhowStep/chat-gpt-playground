import * as React from "react";
import { SelfDiscoverTaskForm } from "./SelfDiscoverTaskForm";
import { SelfDiscoverImplementResult, SelfDiscoverTask } from "../local-storage-util";
import { OpenAiApi } from "../../api-openai";

export interface SelfDiscoverTaskListFormProps {
    tasks : readonly SelfDiscoverTask[];
    onChange : (newSelfDiscoverTasks : SelfDiscoverTask[], oldSelfDiscoverTasks : readonly SelfDiscoverTask[]) => void;
    executeConfig : undefined|{
        openAiApi : OpenAiApi,
        implementResult : SelfDiscoverImplementResult,
        model : string,
    },
}

export function SelfDiscoverTaskListForm (props : SelfDiscoverTaskListFormProps) {
    const {
        tasks,
        onChange,
        executeConfig,
    } = props;
    return <div className="ui segment divided selection massive list">
        {tasks.map((t, index) => {
            return <SelfDiscoverTaskForm
                tasks={tasks}
                key={t.uuid}
                task={t}
                onChange={(newSelfDiscoverTask) => {
                    onChange(tasks.map(m => {
                        return m.uuid == newSelfDiscoverTask.uuid ?
                            newSelfDiscoverTask :
                            m;
                    }), tasks);
                }}
                onRemove={() => {
                    if (!confirm(`Delete task ${t.uuid}?`)) {
                        return;
                    }
                    const newSelfDiscoverTasks = [...tasks];
                    newSelfDiscoverTasks.splice(index, 1);
                    onChange(newSelfDiscoverTasks, tasks);
                }}
                onMoveUp={(t) => {
                    if (index == 0) {
                        return;
                    }
                    const newSelfDiscoverTasks = [...tasks];
                    newSelfDiscoverTasks.splice(index, 1);
                    newSelfDiscoverTasks.splice(index-1, 0, t);
                    onChange(newSelfDiscoverTasks, tasks);
                }}
                onMoveDown={(t) => {
                    if (index >= tasks.length) {
                        return;
                    }
                    const newSelfDiscoverTasks = [...tasks];
                    newSelfDiscoverTasks.splice(index, 1);
                    newSelfDiscoverTasks.splice(index+1, 0, t);
                    onChange(newSelfDiscoverTasks, tasks);
                }}
                executeConfig={executeConfig}
            />
        })}
    </div>;
}