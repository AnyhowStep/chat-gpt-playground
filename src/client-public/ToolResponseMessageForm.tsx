import * as React from "react";
import * as classNames from "classnames";
import * as localStorageUtil from "./local-storage-util";
import { ToolResponseMessage } from "./local-storage-util";
import { useError } from "./use-error";
import { handleError } from "./error-handling";

export interface ToolResponseMessageFormProps {
    message : ToolResponseMessage;
    functionArguments : string|undefined;
    onChange : (newMessage : ToolResponseMessage, oldMessage : ToolResponseMessage) => void;
}

export function ToolResponseMessageForm (props : ToolResponseMessageFormProps) {
    const {
        message,
        functionArguments,
        onChange,
    } = props;

    const [functionTool, setFunctionTool] = React.useState(() => {
        return localStorageUtil.loadFunctionTools()
            .find(f => f.name == message.name);
    });

    const [isLoading, setIsLoading] = React.useState(false);
    const error = useError();

    React.useEffect(
        () => {
            const timer = setTimeout(() => {
                setFunctionTool(
                    localStorageUtil.loadFunctionTools()
                        .find(f => f.name == message.name)
                );
            }, 1000);
            return () => clearTimeout(timer);
        },
        [message.name]
    );

    return <div className="ui form">
        <div className="field">
            <label>Tool Call ID</label>
            <input
                type="text"
                value={message.tool_call_id}
                placeholder="Tool Call ID"
                onChange={(evt) => {
                    onChange({
                        ...message,
                        tool_call_id : evt.target.value,
                        tokenCount : undefined,
                    }, message);
                }}
            />
        </div>
        <div className="field">
            <label>Function Name</label>
            <input
                type="text"
                value={message.name}
                placeholder="Function Name"
                onChange={(evt) => {
                    onChange({
                        ...message,
                        name : evt.target.value,
                        tokenCount : undefined,
                    }, message);
                }}
            />
        </div>
        <div className="field">
            <label>Function Arguments</label>
            <textarea
                value={functionArguments}
                placeholder="Function Arguments"
                readOnly={true}
            />
        </div>
        <div className="field">
            <label>Content</label>
            {
                functionTool == undefined ?
                undefined :
                <button
                    className={classNames(
                        "ui primary button",
                        isLoading ? "loading" : undefined,
                    )}
                    onClick={() => {
                        if (isLoading) {
                            return;
                        }
                        try {
                            const f = new Function(`return ${functionTool.javaScriptImpl}`)();
                            const args = functionArguments == undefined ?
                                {} :
                                JSON.parse(functionArguments);
                            const promise = Promise.resolve(f(args));

                            setIsLoading(true);
                            promise
                                .then(
                                    (result) : void => {
                                        setIsLoading(false);
                                        onChange({
                                            ...message,
                                            content : JSON.stringify(result, null, 2),
                                            tokenCount : undefined,
                                        }, message);
                                        error.reset();
                                    },
                                    (err) => {
                                        setIsLoading(false);
                                        handleError(error, err);
                                    },
                                );
                        } catch (err) {
                            setIsLoading(false);
                            handleError(error, err);
                        }
                    }}
                >
                    Execute JavaScript
                </button>
            }
            <textarea
                value={message.content}
                placeholder="Content (The result of the tool call)"
                onChange={(evt) => {
                    onChange({
                        ...message,
                        content : evt.target.value,
                        tokenCount : undefined,
                    }, message);
                }}
            />
        </div>
    </div>
}