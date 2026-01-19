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
        <textarea
            style={{
                minHeight : "8em",
                maxHeight : "48em",
            }}
            value={props.message.reasoning_content ?? ""}
            onChange={(evt) => {
                props.onChange({
                    ...props.message,
                    reasoning_content : evt.target.value,
                    tokenCount : undefined,
                }, props.message);
            }}
        />
        <textarea
            style={{
                minHeight : "8em",
                maxHeight : "48em",
            }}
            value={props.message.content ?? ""}
            onChange={(evt) => {
                props.onChange({
                    ...props.message,
                    content : evt.target.value,
                    tokenCount : undefined,
                }, props.message);
            }}
        />
        <ToolCallListForm
            toolCalls={message.tool_calls}
            onChange={(newToolCalls) => {
                onChange({
                    ...message,
                    tool_calls : newToolCalls,
                    tokenCount : undefined,
                }, message);
            }}
            onAddResponse={(toolCall) => {
                onAddResponse(toolCall);
            }}
        />
    </div>
}