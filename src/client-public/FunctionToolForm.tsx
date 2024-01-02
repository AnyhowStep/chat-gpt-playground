import * as React from "react";
import * as jsonSchemaEditor from "../json-schema-editor";

export interface FunctionTool {
    uuid : string,
    name : string,
    description : string,
    parameters : jsonSchemaEditor.Object,
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
    </div>
}