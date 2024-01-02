import * as React from "react";
import { MessageForm } from "./MessageForm";
import { Message } from "./local-storage-util";

export interface MessageListFormProps {
    messages : readonly Message[];
    onChange : (newMessages : Message[], oldMessages : readonly Message[]) => void;
}

export function MessageListForm (props : MessageListFormProps) {
    const {
        messages,
        onChange,
    } = props;
    return <div className="ui segment divided selection massive list">
        {messages.map((m, index) => {
            return <MessageForm
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
            />
        })}
    </div>;
}