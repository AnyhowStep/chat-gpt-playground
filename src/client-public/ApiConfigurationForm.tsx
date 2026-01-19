import * as React from "react";
import { ApiConfiguration } from "./local-storage-util";

export interface ApiConfigurationFormProps {
    apiConfiguration : ApiConfiguration;

    onChange : (newApiConfiguration : ApiConfiguration) => void;
}

export function ApiConfigurationForm (props : ApiConfigurationFormProps) {
    const {
        apiConfiguration,
        onChange,
    } = props;

    return <div className="ui form">
        <div className="field">
            <label>Name</label>
            <input
                type="text"
                value={apiConfiguration.name}
                onChange={(evt) => {
                    onChange({
                        ...apiConfiguration,
                        name : evt.target.value,
                    });
                }}
            />
        </div>
        <div className="field">
            <label>Domain</label>
            <input
                type="text"
                value={apiConfiguration.domain}
                onChange={(evt) => {
                    onChange({
                        ...apiConfiguration,
                        domain : evt.target.value,
                    });
                }}
            />
        </div>
        <div className="field">
            <label>Root</label>
            <input
                type="text"
                value={apiConfiguration.root}
                onChange={(evt) => {
                    onChange({
                        ...apiConfiguration,
                        root : evt.target.value,
                    });
                }}
            />
        </div>
        <div className="field">
            <label>Api Key</label>
            <input
                type="text"
                value={apiConfiguration.apiKey}
                onChange={(evt) => {
                    onChange({
                        ...apiConfiguration,
                        apiKey : evt.target.value,
                    });
                }}
            />
        </div>
    </div>
}