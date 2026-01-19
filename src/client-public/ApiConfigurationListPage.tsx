import * as React from "react";
import * as uuid from "uuid";
import * as localStorageUtil from "./local-storage-util";
import { ApiConfiguration } from "./local-storage-util";
import { ApiConfigurationList } from "./ApiConfigurationList";

export function ApiConfigurationListPage () {
    const [
        apiConfigurations,
        setApiConfigurations,
    ] = React.useState(() => localStorageUtil
        .loadApiConfigurations()
    );

    return <div className="ui main container">
        <ApiConfigurationList
            ApiConfigurations={apiConfigurations}
            editOnClick={true}
            rightFloatedContent={item =>
                <>
                    <div className="ui icon red button" onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        if (confirm(`Delete ${item.name}(${item.uuid})?`)) {
                            setApiConfigurations(_ => {
                                const result = localStorageUtil.loadApiConfigurations().filter(i => i.uuid != item.uuid);
                                localStorageUtil.saveApiConfigurations(result);
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
            setApiConfigurations(_ => {
                const result : ApiConfiguration[] = [
                    ...localStorageUtil.loadApiConfigurations(),
                    {
                        uuid : uuid.v1(),
                        name : "OpenAI",
                        domain : "https://api.openai.com",
                        root : "/",
                        apiKey : "",
                    },
                ];
                localStorageUtil.saveApiConfigurations(result);
                return result;
            });
        }}>
            Create API Configuration
        </button>
    </div>
}