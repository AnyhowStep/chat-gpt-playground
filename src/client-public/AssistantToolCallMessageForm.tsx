import * as React from "react";
import { AssistantToolCallMessage } from "./local-storage-util";

export interface AssistantToolCallMessageFormProps {
    message : AssistantToolCallMessage;
    onChange : (newMessage : AssistantToolCallMessage, oldMessage : AssistantToolCallMessage) => void;
}

export function AssistantToolCallMessageForm (_props : AssistantToolCallMessageFormProps) {
    return <div className="ui form">
        TODO
    </div>
}