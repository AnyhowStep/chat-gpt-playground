import * as React from "react";
import * as classNames from "classnames";
import * as jsonSchemaEditor from "../json-schema-editor";
import { useError } from "./use-error";
import { handleError } from "./error-handling";

export interface FunctionTool {
    uuid : string,
    name : string,
    description : string,
    parameters : jsonSchemaEditor.Object,
    useJavaScriptImpl : undefined|boolean,
    javaScriptImpl : undefined|string,
}

export interface FunctionToolFormProps {
    functionTool : FunctionTool;

    onChange : (newFunctionTool : FunctionTool) => void;
}

export function FunctionToolForm (props : FunctionToolFormProps) {
    const {
        functionTool,
        onChange,
    } = props;

    const [testArgs, setTestArgs] = React.useState("");
    const [testOutput, setTestOutput] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const error = useError();

    return <div className="ui form">
        <div className="field">
            <label>Name</label>
            <small>
                The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.
            </small>
            <input
                type="text"
                value={functionTool.name}
                onChange={(evt) => {
                    onChange({
                        ...functionTool,
                        name : evt.target.value,
                    });
                }}
            />
        </div>
        <div className="field">
            <label>Description</label>
            <small>
                A description of what the function does, used by the model to choose when and how to call the function.
            </small>
            <input
                type="text"
                value={functionTool.description}
                onChange={(evt) => {
                    onChange({
                        ...functionTool,
                        description : evt.target.value,
                    });
                }}
            />
        </div>
        <div className="field">
            <label>Parameters</label>
            <small>
                The parameters the functions accepts, described as a JSON Schema object.
                See the
                <a href="https://platform.openai.com/docs/guides/text-generation/function-calling">
                    guide
                </a>
                for examples, and the
                <a href="https://json-schema.org/understanding-json-schema/">
                    JSON Schema reference
                </a>
                for documentation about the format.

                Omitting parameters defines a function with an empty parameter list.
            </small>
            <jsonSchemaEditor.ObjectEditor
                object={functionTool.parameters}
                onChange={(object) => {
                    onChange({
                        ...functionTool,
                        parameters : object,
                    });
                }}
            />
        </div>
        <div className="field">
            <label>Use JavaScript Implementation</label>
            <div className="ui checkbox">
                <input
                    type="checkbox"
                    checked={functionTool.useJavaScriptImpl || false}
                    onChange={(evt) => {
                        onChange({
                            ...functionTool,
                            useJavaScriptImpl : evt.target.checked,
                        });
                    }}
                />
                <label>Use JavaScript Implementation</label>
            </div>
        </div>
        {
            functionTool.useJavaScriptImpl ?
            <div className="field">
                <label>JavaScript Implementation</label>
                <textarea
                    value={functionTool.javaScriptImpl}
                    placeholder={`function (args) {}`}
                    onChange={(evt) => {
                        onChange({
                            ...functionTool,
                            javaScriptImpl : evt.target.value,
                        });
                    }}
                />
            </div> :
            undefined
        }
        {
            functionTool.useJavaScriptImpl ?
            <>
                <div className="field">
                    <label>Test Args</label>
                    <textarea
                        value={testArgs}
                        onChange={(evt) => {
                            setTestArgs(evt.target.value);
                        }}
                    />
                </div>
                <div className="field">
                    <label>Test Output</label>
                    <textarea
                        value={testOutput}
                        readOnly
                    />
                </div>
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
                            const args = JSON.parse(testArgs);
                            const promise = Promise.resolve(f(args));
    
                            setIsLoading(true);
                            promise
                                .then(
                                    (result) : void => {
                                        setIsLoading(false);
                                        setTestOutput(JSON.stringify(result, null, 2));
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
                    Test
                </button>
            </> :
            undefined
        }
    </div>
}