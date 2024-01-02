import * as React from "react";
import * as classnames from "classnames";
import {localStorageSupported, kbUsed} from "./local-storage-util";
import { ChatRequestConfigUx, RawChatRequestConfig, chatModels } from "./ChatRequestConfigUx";

const supportedLabel = (supported : boolean) => {
    return (
        <span className={classnames(
            "ui mini label",
            supported ? "green" : "red"
        )}>
            {supported ? "Supported" : "Not Supported"}
        </span>
    );
};
export interface HomePageProps {
}

export const HomePage = (_props : HomePageProps) => {
    const [config, setConfig] = React.useState<RawChatRequestConfig>({
        model : chatModels[0],
        temperature  :1,
        max_tokens : 256,
        stop : "",
        top_p : 1,
        frequency_penalty : 0,
        presence_penalty : 0,
    });
    return (
        <div className="ui main container">
            <h1 className="ui dividing header">Chat GPT Playground</h1>

            <ChatRequestConfigUx config={config} onConfigChange={(newConfig) => setConfig(newConfig)}/>

            <p>
                
            </p>

            <p>
                
            </p>

            <hr/>

            <hr/>

            Browser information.

            <table className="ui celled unstackable table">
                <thead>
                    <tr>
                        <th>
                            Browser API
                        </th>
                        <th>
                            Your Browser
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">
                                Local Storage
                            </a>
                        </td>
                        <td>
                            {supportedLabel(localStorageSupported())}
                            <br/>
                            {kbUsed()} KB used
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="https://developer.mozilla.org/en-US/docs/WebAssembly">
                                Web Assembly
                            </a>
                        </td>
                        <td>
                            {supportedLabel(typeof WebAssembly !== "undefined")}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API">
                                Web Workers
                            </a>
                        </td>
                        <td>
                            {supportedLabel(typeof Worker !== "undefined")}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt">
                                BigInt
                            </a>
                        </td>
                        <td>
                            {
                                //eslint-disable-next-line local/polyfilled-bigint
                                supportedLabel(typeof BigInt(0) == "bigint")
                            }
                            <br/>
                            (Polyfilled if not supported)
                        </td>
                    </tr>
                </tbody>
            </table>

            <hr/>

            <div style={{
                paddingTop : "30px",
            }}>
            </div>
        </div>
    );
};
