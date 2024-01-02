import * as React from "react";
import { AssistantToolCallMessage } from "./local-storage-util";
import { ToolCallListForm } from "./ToolCallListForm";

export interface AssistantToolCallMessageFormProps {
    message : AssistantToolCallMessage;
    onChange : (newMessage : AssistantToolCallMessage, oldMessage : AssistantToolCallMessage) => void;
}

export function AssistantToolCallMessageForm (props : AssistantToolCallMessageFormProps) {
    const {
        message,
        onChange,
    } = props;
    return <div className="ui form">
        <ToolCallListForm
            toolCalls={message.tool_calls}
            onChange={(newToolCalls) => {
                onChange({
                    ...message,
                    tool_calls : newToolCalls,
                }, message);
            }}
        />
    </div>
}