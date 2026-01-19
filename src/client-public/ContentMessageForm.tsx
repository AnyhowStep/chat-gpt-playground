import * as React from "react";
import { AssistantMessage, Message, SystemMessage, UserMessage } from "./local-storage-util";

export type ContentMessage =
    | SystemMessage
    | UserMessage
    | AssistantMessage

const contentMessageTypes = [
    "system",
    "user",
    "assistant",
] as Message["messageType"][];

export function isContentMessage (m : Message) : m is ContentMessage {
    return contentMessageTypes.includes(m.messageType);
}

export interface ContentMessageFormProps {
    message : ContentMessage,
    onChange : (newMessage : ContentMessage, oldMessage : ContentMessage) => void;
}

export function ContentMessageForm (props : ContentMessageFormProps) {
    return <div className="ui form">
        {
            props.message.role == "assistant" ?
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
                    } as AssistantMessage, props.message);
                }}
            /> :
            undefined
        }
        <textarea
            style={{
                minHeight : "8em",
                maxHeight : "48em",
            }}
            value={props.message.content}
            onChange={(evt) => {
                props.onChange({
                    ...props.message,
                    content : evt.target.value,
                    tokenCount : undefined,
                }, props.message);
            }}
        />
    </div>
}