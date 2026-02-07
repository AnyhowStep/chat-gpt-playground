import * as React from "react";
import * as uuid from "uuid";
import * as localStorageUtil from "./local-storage-util";
import { FunctionTool } from "./FunctionToolForm";
import { FunctionToolList } from "./FunctionToolList";

export function FunctionToolListPage () {
    const [
        functionTools,
        setFunctionTools,
    ] = React.useState(localStorageUtil.loadFunctionTools());

    return <div className="ui main container">
        <FunctionToolList
            functionTools={functionTools}
            editOnClick={true}
            rightFloatedContent={item =>
                <>
                    <div className="ui icon button" onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        setFunctionTools(_ => {
                            const arr = localStorageUtil.loadFunctionTools();
                            const index = arr.findIndex(i => i.uuid == item.uuid);
                            if (index <= 0) {
                                return arr;
                            }
                            const result = [
                                ...arr.slice(0, index-1),
                                arr[index],
                                arr[index-1],
                                ...arr.slice(index+1),
                            ];
                            localStorageUtil.saveFunctionTools(result);
                            return result;
                        });
                    }}>
                        <i className="arrow up icon"></i>
                    </div>
                    <div className="ui icon red button" onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        if (confirm(`Delete ${item.name}(${item.uuid})?`)) {
                            setFunctionTools(_ => {
                                const result = localStorageUtil.loadFunctionTools().filter(i => i.uuid != item.uuid);
                                localStorageUtil.saveFunctionTools(result);
                                return result;
                            });
                        }
                    }}>
                        <i className="trash icon"></i>
                    </div>
                </>
            }
        />
        <button className="ui primary button" onClick={() => {
            const functionTools = localStorageUtil.loadFunctionTools();
            const newFunctionTools : FunctionTool[] = [
                ...functionTools,
                {
                    uuid : uuid.v4(),
                    name : "",
                    description : "",
                    parameters : {
                        type : "object",
                        required : [],
                        properties : [],
                    },
                    useJavaScriptImpl : undefined,
                    javaScriptImpl : undefined,
                },
            ];
            localStorageUtil.saveFunctionTools(newFunctionTools);
            setFunctionTools(newFunctionTools);
        }}>
            Create Function Tool
        </button>
    </div>
}