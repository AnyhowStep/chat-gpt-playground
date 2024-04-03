import * as React from "react";
import * as classnames from "classnames";
import {localStorageSupported, kbUsed} from "./local-storage-util";

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
    return (
        <div className="ui main container">
            <h1 className="ui dividing header">Chat GPT Playground</h1>

            <p>
                Not meant for anyone to use seriously.
                <br/>This is an exploratory project made without a real purpose.
                <br/>Do not expect any of these features to be properly fleshed out.
            </p>

            <p>
                
            </p>

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
