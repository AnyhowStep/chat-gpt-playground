import * as React from "react";
import { ToolResponseMessage } from "./local-storage-util";

export interface ToolResponseMessageFormProps {
    message : ToolResponseMessage;
    onChange : (newMessage : ToolResponseMessage, oldMessage : ToolResponseMessage) => void;
}

export function ToolResponseMessageForm (_props : ToolResponseMessageFormProps) {
    return <div className="ui form">
        TODO
    </div>
}