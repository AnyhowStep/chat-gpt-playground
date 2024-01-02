import * as React from "react";
import { AssistantToolCallMessage, ToolCall } from "./local-storage-util";
import { ToolCallListForm } from "./ToolCallListForm";

export interface AssistantToolCallMessageFormProps {
    message : AssistantToolCallMessage;
    onChange : (newMessage : AssistantToolCallMessage, oldMessage : AssistantToolCallMessage) => void;
    onAddResponse : (toolCall : ToolCall) => void;
}

export function AssistantToolCallMessageForm (props : AssistantToolCallMessageFormProps) {
    const {
        message,
        onChange,
        onAddResponse,
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
            onAddResponse={(toolCall) => {
                onAddResponse(toolCall);
            }}
        />
    </div>
}