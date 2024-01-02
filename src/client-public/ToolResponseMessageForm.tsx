import * as React from "react";
import { ToolResponseMessage } from "./local-storage-util";

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
            <textarea
                value={message.content}
                placeholder="Content (The result of the tool call)"
                onChange={(evt) => {
                    onChange({
                        ...message,
                        content : evt.target.value,
                    }, message);
                }}
            />
        </div>
    </div>
}