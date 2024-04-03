import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as localStorageUtil from "./local-storage-util";
import { FunctionTool, FunctionToolForm } from "./FunctionToolForm";

export function FunctionToolEditPage () {
    const history = reactRouter.useHistory();
    const routeParams = reactRouter.useParams() as { uuid : string };
    const [
        functionTool,
        setFunctionTool,
    ] = React.useState(() => localStorageUtil.loadFunctionTools().find(f => f.uuid == routeParams.uuid));

    if (functionTool == undefined) {
        return <div className="ui main container">
            Function Tool {routeParams.uuid} not found
        </div>
    }

    return <div className="ui main container">
        <div className="ui segment">
            <FunctionToolForm
                functionTool={functionTool}
                onChange={setFunctionTool}
            />
        </div>
        <button className="ui primary button" onClick={() => {
            const functionTools = localStorageUtil.loadFunctionTools();
            const newFunctionTools : FunctionTool[] = functionTools.map(f => {
                return f.uuid == routeParams.uuid ?
                    functionTool :
                    f
            });
            localStorageUtil.saveFunctionTools(newFunctionTools);
            history.push("/function-tool");
        }}>
            Save
        </button>
    </div>
}