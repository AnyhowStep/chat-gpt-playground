import * as React from "react";
import * as localStorageUtil from "./local-storage-util";

export function ApiKeyPage () {
    const [
        openAiApiKey,
        setOpenAiApikey,
    ] = React.useState(localStorageUtil.getItem(localStorageUtil.LocalStorageKey.OPEN_AI_API_KEY) ?? "");
    return <div className="ui main container form">
        <div className="field">
            <label>Open AI API Key</label>
            <input
                type="text"
                value={openAiApiKey}
                onChange={(evt) => {
                    setOpenAiApikey(evt.target.value);
                }}
            />
        </div>
        <button className="ui primary button" onClick={() => {
            localStorageUtil.setItem(
                localStorageUtil.LocalStorageKey.OPEN_AI_API_KEY,
                openAiApiKey
            );
            alert("Saved API Key");
        }}>
            Save
        </button>
    </div>
}