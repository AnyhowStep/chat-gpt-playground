import * as React from "react";
import { Message, ToolCall, isAssistantToolCallMessage } from "./local-storage-util";
import { ContentMessageForm, isContentMessage } from "./ContentMessageForm";
import { AssistantToolCallMessageForm } from "./AssistantToolCallMessageForm";
import { ToolResponseMessageForm } from "./ToolResponseMessageForm";

export interface MessageFormProps {
    messages : readonly Message[];
    message : Message;
    onChange : (newMessage : Message, oldMessage : Message) => void;
    onRemove : (message : Message) => void;
    onMoveUp : (message : Message) => void;
    onMoveDown : (message : Message) => void;
    onAddResponse : (toolCalls : ToolCall[]) => void;
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
        messages,
        message,
        onChange,
        onRemove,
        onMoveUp,
        onMoveDown,
        onAddResponse,
    } = props;
    return <div className="item">
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
                                            "",
                                        tokenCount : undefined,
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
                                            "",
                                        tokenCount : undefined,
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
                                            "",
                                        tokenCount : undefined,
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
                                            [],
                                        tokenCount : undefined,
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
                                        tokenCount : undefined,
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
                <div
                    className="field button group"
                    style={{
                        alignSelf: "flex-end",
                    }}
                >
                    <button
                        className="ui icon red button"
                        onClick={() => onRemove(message)}
                    >
                        <i className="trash icon"></i>
                    </button>
                    {
                        message.messageType == "assistant_tool_call" ?
                        <button
                            className="ui icon primary button"
                            onClick={() => onAddResponse(message.tool_calls)}
                        >
                            <i className="reply icon"></i>
                        </button> :
                        undefined
                    }
                    <button
                        className="ui icon button"
                        onClick={() => onMoveUp(message)}
                    >
                        <i className="arrow up icon"></i>
                    </button>
                    <button
                        className="ui icon button"
                        onClick={() => onMoveDown(message)}
                    >
                        <i className="arrow down icon"></i>
                    </button>
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
        {
            message.messageType == "assistant_tool_call" ?
            <AssistantToolCallMessageForm
                message={message}
                onChange={(newMessage) => {
                    onChange(newMessage, message);
                }}
                onAddResponse={(toolCall) => {
                    onAddResponse([toolCall]);
                }}
            /> :
            undefined
        }
        {
            message.messageType == "tool_response" ?
            <ToolResponseMessageForm
                message={message}
                functionArguments={(messages
                    .filter(isAssistantToolCallMessage)
                    .flatMap(m => m.tool_calls)
                    .find(tc => tc.id == message.tool_call_id)
                    ?.function
                    ?.arguments) ?? ""
                }
                onChange={(newMessage) => {
                    onChange(newMessage, message);
                }}
            /> :
            undefined
        }
        {
            message.tokenCount == undefined ?
            <div className="ui mini label">~- tokens</div> :
            <div className="ui mini label">~{message.tokenCount} tokens</div>
        }
    </div>
}