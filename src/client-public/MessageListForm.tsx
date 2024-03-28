import * as React from "react";
import * as uuid from "uuid";
import { MessageForm } from "./MessageForm";
import { AssistantMessage, Message, ToolResponseMessage } from "./local-storage-util";

export interface MessageListFormProps {
    messages : readonly Message[];
    onChange : (newMessages : Message[], oldMessages : readonly Message[]) => void;
    onRegenerateAssistantMessage : (message : AssistantMessage) => void;
    isLoading : boolean;
}

export function MessageListForm (props : MessageListFormProps) {
    const {
        messages,
        onChange,
        onRegenerateAssistantMessage,
        isLoading,
    } = props;
    return <div className="ui segment divided selection massive list">
        {messages.map((m, index) => {
            return <MessageForm
                messages={messages}
                key={m.uuid}
                message={m}
                onChange={(newMessage) => {
                    onChange(messages.map(m => {
                        return m.uuid == newMessage.uuid ?
                            newMessage :
                            m;
                    }), messages);
                }}
                onRemove={() => {
                    const newMessages = [...messages];
                    newMessages.splice(index, 1);
                    onChange(newMessages, messages);
                }}
                onMoveUp={(m) => {
                    if (index == 0) {
                        return;
                    }
                    const newMessages = [...messages];
                    newMessages.splice(index, 1);
                    newMessages.splice(index-1, 0, m);
                    onChange(newMessages, messages);
                }}
                onMoveDown={(m) => {
                    if (index >= messages.length) {
                        return;
                    }
                    const newMessages = [...messages];
                    newMessages.splice(index, 1);
                    newMessages.splice(index+1, 0, m);
                    onChange(newMessages, messages);
                }}
                onAddResponse={(toolCalls) => {
                    onChange([
                        ...messages,
                        ...toolCalls.map((tc) : ToolResponseMessage => {
                            return {
                                uuid : uuid.v4(),
                                messageType : "tool_response",
                                role : "tool",
                                tool_call_id : tc.id,
                                name : tc.function.name,
                                content : "",
                            };
                        })
                    ], messages)
                }}
                onRegenerateAssistantMessage={onRegenerateAssistantMessage}
                isLoading={isLoading}
            />
        })}
    </div>;
}