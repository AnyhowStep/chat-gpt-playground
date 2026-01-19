import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as localStorageUtil from "./local-storage-util";
import { ApiConfigurationForm } from "./ApiConfigurationForm";
import { ApiConfiguration } from "./local-storage-util";

export function ApiConfigurationEditPage () {
    const history = reactRouter.useHistory();
    const routeParams = reactRouter.useParams() as { uuid : string };
    const [
        apiConfiguration,
        setApiConfiguration,
    ] = React.useState(() => localStorageUtil.loadApiConfigurations().find(f => f.uuid == routeParams.uuid));

    if (apiConfiguration == undefined) {
        return <div className="ui main container">
            API Configuration {routeParams.uuid} not found
        </div>
    }

    return <div className="ui main container">
        <div className="ui segment">
            <ApiConfigurationForm
                apiConfiguration={apiConfiguration}
                onChange={setApiConfiguration}
            />
        </div>
        <button className="ui primary button" onClick={() => {
            const newApiConfigurations : ApiConfiguration[] = localStorageUtil.loadApiConfigurations().map(f => {
                return f.uuid == routeParams.uuid ?
                    apiConfiguration :
                    f
            });
            localStorageUtil.saveApiConfigurations(newApiConfigurations);
            history.push("/api-configuration");
        }}>
            Save
        </button>
    </div>
}