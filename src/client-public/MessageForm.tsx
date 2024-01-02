import * as React from "react";
import { Message } from "./local-storage-util";
import { ContentMessageForm, isContentMessage } from "./ContentMessageForm";

export interface MessageFormProps {
    message : Message;
    onChange : (newMessage : Message, oldMessage : Message) => void;
}

const messageTypes = [
    "system",
    "user",
    "assistant",
    "assistant_tool_call",
    "tool_response",
] as const;

export function MessageForm (props : MessageFormProps) {
    const {
        message,
        onChange,
    } = props;
    return <div>
        <div className="ui form">
            <div className="two fields">
                <div className="field">
                    <label>Message Type</label>
                    <select
                        value={message.messageType}
                        onChange={(evt) => {
                            const messageType = evt.target.value as Message["messageType"];
                            switch (messageType) {
                                case "system": {
                                    onChange({
                                        ...message,
                                        messageType,
                                        role : "system",
                                        content : "content" in message ?
                                            message.content :
                                            ""
                                    }, message);
                                    break;
                                }
                                case "user": {
                                    onChange({
                                        ...message,
                                        messageType,
                                        role : "user",
                                        content : "content" in message ?
                                            message.content :
                                            ""
                                    }, message);
                                    break;
                                }
                                case "assistant": {
                                    onChange({
                                        ...message,
                                        messageType,
                                        role : "assistant",
                                        content : "content" in message ?
                                            message.content :
                                            ""
                                    }, message);
                                    break;
                                }
                                case "assistant_tool_call": {
                                    onChange({
                                        ...message,
                                        messageType,
                                        role : "assistant",
                                        tool_calls : "tool_calls" in message ?
                                            message.tool_calls :
                                            []
                                    }, message);
                                    break;
                                }
                                case "tool_response": {
                                    onChange({
                                        ...message,
                                        messageType,
                                        role : "tool",
                                        tool_call_id : "tool_call_id" in message ?
                                            message.tool_call_id :
                                            "",
                                        name : "name" in message ?
                                            message.name :
                                            "",
                                        content : "content" in message ?
                                            message.content :
                                            "",
                                    }, message);
                                    break;
                                }
                            }
                        }}
                    >
                        {messageTypes.map(s => {
                            return <option key={s} value={s}>
                                {s}
                            </option>
                        })}
                    </select>
                </div>
            </div>
        </div>
        {
            isContentMessage(message) ?
            <ContentMessageForm
                message={message}
                onChange={(newMessage) => {
                    onChange(newMessage, message);
                }}
            /> :
            undefined
        }
    </div>
}