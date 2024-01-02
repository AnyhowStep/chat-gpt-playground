import * as React from "react";
import { MessageForm } from "./MessageForm";
import { Message } from "./local-storage-util";

export interface MessageListFormProps {
    messages : readonly Message[];
    onChange : (newMessages : Message[], oldMessages : readonly Message[]) => void;
}

export function MessageListForm (props : MessageListFormProps) {
    return <div className="ui segment divided selection massive list">
        {props.messages.map(m => {
            return <MessageForm
                key={m.uuid}
                message={m}
                onChange={(newMessage) => {
                    props.onChange(props.messages.map(m => {
                        return m.uuid == newMessage.uuid ?
                            newMessage :
                            m;
                    }), props.messages);
                }}
            />
        })}
    </div>;
}