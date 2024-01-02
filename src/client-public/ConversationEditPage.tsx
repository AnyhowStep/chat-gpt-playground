import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as uuid from "uuid";
import { OpenAiApi } from "../api-openai";
import * as localStorageUtil from "./local-storage-util";
import { ChatRequestConfigUx } from "./ChatRequestConfigUx";
import { FunctionToolList } from "./FunctionToolList";
import { MessageListForm } from "./MessageListForm";
import { FunctionTool } from "./FunctionToolForm";
import { ChatMessage } from "../api-openai-mapper";

function toMessage (m : ChatMessage) : localStorageUtil.Message {
    switch (m.role) {
        case "system": {
            return {
                uuid : uuid.v4(),
                messageType : "system",
                role : m.role,
                content : m.content,
            };
        }
        case "user": {
            return {
                uuid : uuid.v4(),
                messageType : "user",
                role : m.role,
                content : m.content,
            };
        }
        case "assistant": {
            if ("tool_calls" in m) {
                return {
                    uuid : uuid.v4(),
                    messageType : "assistant_tool_call",
                    role : m.role,
                    tool_calls : m.tool_calls,
                };
            } else {
                return {
                    uuid : uuid.v4(),
                    messageType : "assistant",
                    role : m.role,
                    content : m.content,
                };
            }
        }
        case "tool": {
            return {
                uuid : uuid.v4(),
                messageType : "tool_response",
                role : m.role,
                tool_call_id : m.tool_call_id,
                name : m.name,
                content : m.content,
            };
        }
    }
}

function parseStop (str : string) : string[]|undefined {
    if (str.trim() == "") {
        return undefined;
    }
    try {
        const result = JSON.parse(str);
        if (typeof result == "string") {
            return [result];
        } else {
            return result as string[];
        }
    } catch (err) {
        console.warn(err);
        return undefined;
    }
}

async function submitConversation (
    openAiApi : OpenAiApi,
    conversation : localStorageUtil.Conversation,
    functionTools : FunctionTool[],
) : Promise<localStorageUtil.Conversation> {
    const parsedStop = parseStop(conversation.rawChatRequestConfig.stop);
    const response = await openAiApi.chat.complete()
        .setBody({
            model : conversation.rawChatRequestConfig.model,
            messages : conversation.messages,

            tools : functionTools
                .filter(f => {
                    return Object.prototype.hasOwnProperty.call(conversation.usedFunctions, f.uuid) ?
                        conversation.usedFunctions[f.uuid] ?? false :
                        false;
                })
                .map(f => {
                    return {
                        type : "function" as const,
                        function : {
                            name : f.name,
                            description : f.description,
                            parameters : {
                                ...f.parameters,
                            },
                        },
                    };
                }),
            tool_choice : undefined,

            temperature : conversation.rawChatRequestConfig.temperature,
            top_p : conversation.rawChatRequestConfig.top_p,

            /**
             * How many chat completion choices to generate for each input message.
             * Note that you will be charged based on the number of generated tokens across all of the choices.
             * Keep n as 1 to minimize costs.
             */
            n : undefined,
            stream : false,
            stop : parsedStop,
            max_tokens : conversation.rawChatRequestConfig.max_tokens,
            presence_penalty : conversation.rawChatRequestConfig.presence_penalty,
            frequency_penalty : conversation.rawChatRequestConfig.frequency_penalty,
            logit_bias : undefined,
            user : undefined,
        })
        .send();
    if (response.responseBody.choices.length != 1) {
        console.error(response.responseBody);
        throw new Error(`Expected 1 choice, found ${response.responseBody.choices.length}`);
    }
    const choice = response.responseBody.choices[0];
    return {
        ...conversation,
        messages : [
            ...conversation.messages,
            toMessage(choice.message),
        ],
    };
}

export interface ConversationEditPageProps {
    openAiApi : OpenAiApi,
}

export function ConversationEditPage (props : ConversationEditPageProps) {
    const routeParams = reactRouter.useParams() as { uuid : string };
    const [
        conversation,
        setConversation,
    ] = React.useState(localStorageUtil.loadConversation(routeParams.uuid));
    const functionTools = React.useMemo(() => {
        return localStorageUtil.loadFunctionTools();
    }, []);

    React.useEffect(
        () => {
            if (conversation == undefined) {
                return;
            }
            const timer = setTimeout(() => {
                //localStorageUtil.loadConversation(conversation.uuid);
                localStorageUtil.saveConversation(conversation);
                const meta = localStorageUtil.loadConversationsMeta().map((m) : localStorageUtil.ConversationMeta => {
                    return m.uuid == conversation.uuid ?
                        {
                            uuid : conversation.uuid,
                            name : conversation.name,
                            description : conversation.description,
                            lastMessage : `TODO`,
                        } :
                        m
                });
                localStorageUtil.saveConversationsMeta(meta);
            }, 1000);
            return () => clearTimeout(timer);
        },
        [conversation]
    );

    if (conversation == undefined) {
        return <div className="ui main container">
            Conversation {routeParams.uuid} not found
        </div>
    }

    return <div className="ui main container">
        <MessageListForm
            messages={conversation.messages}
            onChange={(newMessages) => {
                setConversation({
                    ...conversation,
                    messages : newMessages,
                });
            }}
        />
        <div className="ui segment">
            <button className="ui primary button" onClick={() => {
                setConversation({
                    ...conversation,
                    messages : [
                        ...conversation.messages,
                        {
                            uuid : uuid.v4(),
                            messageType : "user",
                            role : "user",
                            content : "",
                        }
                    ],
                });
            }}>
                Add Message
            </button>
            <button className="ui primary button" onClick={() => {
                submitConversation(props.openAiApi, conversation, functionTools)
                    .then(
                        (newConversation) => {
                            setConversation(newConversation);
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
            }}>
                Submit
            </button>
        </div>
        <div className="ui segment">
            <ChatRequestConfigUx
                config={conversation.rawChatRequestConfig}
                onConfigChange={(rawChatRequestConfig) => {
                    setConversation({
                        ...conversation,
                        rawChatRequestConfig,
                    });
                }}
            />
        </div>
        <div className="ui segment">
            {<FunctionToolList
                functionTools={functionTools}
                editOnClick={false}
                rightFloatedContent={(f) => {
                    return <div className="ui checkbox" key={f.uuid}>
                        <input
                            type="checkbox"
                            checked={Object.prototype.hasOwnProperty.call(conversation.usedFunctions, f.uuid) ?
                                conversation.usedFunctions[f.uuid] ?? false :
                                false
                            }
                            onChange={(evt) => {
                                setConversation({
                                    ...conversation,
                                    usedFunctions : {
                                        ...conversation.usedFunctions,
                                        [f.uuid] : evt.target.checked
                                    },
                                });
                            }}
                        />
                        <label></label>
                    </div>
                }}
            />}
        </div>
    </div>
}