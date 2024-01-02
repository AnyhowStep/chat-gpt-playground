import * as React from "react";

export function useError () {
    const [type, setType] = React.useState<"warning"|"negative">("warning");
    const [messages, setMessages] = React.useState<string[]>([]);

    return {
        messages,
        type,
        push : (newType : "warning"|"negative", newMessage : string[]) => {
            if (newType == "negative") {
                setType(newType);
            }
            setMessages(messages.concat(newMessage));
        },
        reset : () => {
            setType("warning");
            setMessages([]);
        },
    };
}

export type ErrorHook = ReturnType<typeof useError>;
