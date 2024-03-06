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