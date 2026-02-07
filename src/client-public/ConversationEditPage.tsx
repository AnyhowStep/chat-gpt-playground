import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as uuid from "uuid";
import * as classNames from "classnames";
import * as gptTokenizer from "gpt-tokenizer";
import * as localStorageUtil from "./local-storage-util";
import { ChatRequestConfigUx } from "./ChatRequestConfigUx";
import { FunctionToolList } from "./FunctionToolList";
import { MessageListForm } from "./MessageListForm";
import { FunctionTool } from "./FunctionToolForm";
import { tools as toolsMapper, chatMessage as chatMessageMapper, ChatCompleteRequestBody, ChatMessage } from "../api-openai-mapper";
import { cleanObject } from "../json-schema-editor";
import { useError } from "./use-error";
import { ErrorMessage } from "./ErrorMessage";
import { handleError } from "./error-handling";
import * as openai from "../openai-openapi";
import { ChatCompletionResponseMessage, CreateChatCompletionResponseChoicesItem } from "../openai-openapi";

function toMessage (m : ChatMessage|ChatCompletionResponseMessage) : localStorageUtil.Message {
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
                    reasoning_content : (m as any).reasoning_content,
                    content : m.content,
                    tool_calls : m.tool_calls as localStorageUtil.ToolCall[],
                };
            } else {
                return {
                    uuid : uuid.v4(),
                    messageType : "assistant",
                    role : m.role,
                    reasoning_content : (m as any).reasoning_content,
                    content : m.content as string,
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

function parseFunctionTools (
    conversation : localStorageUtil.Conversation,
    functionTools : FunctionTool[],
) : ChatCompleteRequestBody["tools"] {
    const result = functionTools
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
                        ...cleanObject(f.parameters),
                    },
                },
            };
        });
        
    return result.length == 0 ?
        undefined :
        toolsMapper("parseFunctionTools", result);
}

function parseMessages (messages : localStorageUtil.Message[]) {
    console.log("messages", messages)
    return messages.map((m, i) => {
        return chatMessageMapper(`parseMessages[${i}]`, m);
    });
}

export async function submitConversation (
    conversation : localStorageUtil.Conversation,
    functionTools : FunctionTool[],
) : Promise<localStorageUtil.Conversation> {
    const parsedStop = parseStop(conversation.rawChatRequestConfig.stop);
    console.log("conversation.rawChatRequestConfig", conversation.rawChatRequestConfig);
    const response = await openai.getChat().createChatCompletion(
        {
            model : conversation.rawChatRequestConfig.apiConfiguration2Model[
                conversation.rawChatRequestConfig.apiConfigurationUuid
            ]!,
            messages : parseMessages(conversation.messages),

            tools : parseFunctionTools(conversation, functionTools),
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
            response_format : conversation.rawChatRequestConfig.response_format,
            user : undefined,

            reasoning_effort : conversation.rawChatRequestConfig.reasoning_effort ?? null,
            parallel_tool_calls : conversation.rawChatRequestConfig.parallel_tool_calls,
        },
        localStorageUtil.toAxiosRequestConfig(
            localStorageUtil.loadApiConfigurations().find(i => i.uuid == conversation.rawChatRequestConfig.apiConfigurationUuid)!
        )
    );
    // const response = await openAiApi.chat.complete()
    //     .setBody({
    //         model : conversation.rawChatRequestConfig.model,
    //         messages : parseMessages(conversation.messages),

    //         tools : parseFunctionTools(conversation, functionTools),
    //         tool_choice : undefined,

    //         temperature : conversation.rawChatRequestConfig.temperature,
    //         top_p : conversation.rawChatRequestConfig.top_p,

    //         /**
    //          * How many chat completion choices to generate for each input message.
    //          * Note that you will be charged based on the number of generated tokens across all of the choices.
    //          * Keep n as 1 to minimize costs.
    //          */
    //         n : undefined,
    //         stream : false,
    //         stop : parsedStop,
    //         max_tokens : conversation.rawChatRequestConfig.max_tokens,
    //         presence_penalty : conversation.rawChatRequestConfig.presence_penalty,
    //         frequency_penalty : conversation.rawChatRequestConfig.frequency_penalty,
    //         logit_bias : undefined,
    //         response_format : conversation.rawChatRequestConfig.response_format,
    //         user : undefined,
    //     })
    //     .send();
    if (response.data.choices.length != 1) {
        console.error(response.data);
        throw new Error(`Expected 1 choice, found ${response.data.choices.length}`);
    }
    const choice = response.data.choices[0];
    return {
        ...conversation,
        messages : [
            ...conversation.messages,
            toMessage((choice as CreateChatCompletionResponseChoicesItem).message),
        ],
    };
}

export async function submitConversation2 (
    conversation : localStorageUtil.Conversation,
    functionTools : FunctionTool[],
) : Promise<localStorageUtil.Message> {
    const parsedStop = parseStop(conversation.rawChatRequestConfig.stop);
    console.log("conversation.rawChatRequestConfig", conversation.rawChatRequestConfig);
    const response = await openai.getChat().createChatCompletion(
        {
            model : conversation.rawChatRequestConfig.apiConfiguration2Model[
                conversation.rawChatRequestConfig.apiConfigurationUuid
            ]!,
            messages : parseMessages(conversation.messages),

            tools : parseFunctionTools(conversation, functionTools),
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
            response_format : conversation.rawChatRequestConfig.response_format,
            user : undefined,

            reasoning_effort : conversation.rawChatRequestConfig.reasoning_effort ?? null,
            parallel_tool_calls : conversation.rawChatRequestConfig.parallel_tool_calls,
        },
        localStorageUtil.toAxiosRequestConfig(
            localStorageUtil.loadApiConfigurations().find(i => i.uuid == conversation.rawChatRequestConfig.apiConfigurationUuid)!
        )
    );
    // const response = await openAiApi.chat.complete()
    //     .setBody({
    //         model : conversation.rawChatRequestConfig.model,
    //         messages : parseMessages(conversation.messages),

    //         tools : parseFunctionTools(conversation, functionTools),
    //         tool_choice : undefined,

    //         temperature : conversation.rawChatRequestConfig.temperature,
    //         top_p : conversation.rawChatRequestConfig.top_p,

    //         /**
    //          * How many chat completion choices to generate for each input message.
    //          * Note that you will be charged based on the number of generated tokens across all of the choices.
    //          * Keep n as 1 to minimize costs.
    //          */
    //         n : undefined,
    //         stream : false,
    //         stop : parsedStop,
    //         max_tokens : conversation.rawChatRequestConfig.max_tokens,
    //         presence_penalty : conversation.rawChatRequestConfig.presence_penalty,
    //         frequency_penalty : conversation.rawChatRequestConfig.frequency_penalty,
    //         logit_bias : undefined,
    //         response_format : conversation.rawChatRequestConfig.response_format,
    //         user : undefined,
    //     })
    //     .send();
    if (response.data.choices.length != 1) {
        console.error(response.data);
        throw new Error(`Expected 1 choice, found ${response.data.choices.length}`);
    }
    const choice = response.data.choices[0];
    return toMessage((choice as CreateChatCompletionResponseChoicesItem).message);
}

export interface ConversationEditPageProps {
}

export function ConversationEditPage (_props : ConversationEditPageProps) {
    const routeParams = reactRouter.useParams() as { uuid : string };
    const [
        conversation,
        setConversation,
    ] = React.useState(() => localStorageUtil.loadConversation(routeParams.uuid));
    const functionTools = React.useMemo(() => {
        return localStorageUtil.loadFunctionTools();
    }, []);
    const [isLoading, setIsLoading] = React.useState(false);
    const error = useError();

    React.useEffect(
        () => {
            if (conversation == undefined) {
                return;
            }
            const timer = setTimeout(() => {
                //localStorageUtil.loadConversation(conversation.uuid);
                localStorageUtil.saveConversation(conversation);
                const lastMessage = conversation.messages.length > 0 ?
                    conversation.messages[conversation.messages.length-1] :
                    undefined;
                const meta = localStorageUtil.loadConversationsMeta().map((m) : localStorageUtil.ConversationMeta => {
                    return m.uuid == conversation.uuid ?
                        {
                            uuid : conversation.uuid,
                            name : conversation.name,
                            description : conversation.description,
                            lastMessage : lastMessage == undefined ?
                                "" :
                                "content" in lastMessage ?
                                (lastMessage.content ?? "").substring(0, 100) :
                                lastMessage.messageType,
                        } :
                        m
                });
                localStorageUtil.saveConversationsMeta(meta);
            }, 1000);
            return () => clearTimeout(timer);
        },
        [conversation]
    );

    React.useEffect(
        () => {
            const timeout = setTimeout(
                () => {
                    setConversation(conversation => {
                        if (conversation == undefined) {
                            return undefined;
                        }

                        const {
                            tokenized,
                            newConversation,
                        } = countTokens(conversation);
                        if (tokenized) {
                            return newConversation;
                        }
                        return conversation;
                    });
                },
                500
            );
            return () => clearTimeout(timeout);
        },
        [conversation]
    );

    if (conversation == undefined) {
        return <div className="ui main container">
            Conversation {routeParams.uuid} not found
        </div>
    }

    return <div className="ui main container">
        <div className="ui form">
            <div className="two fields">
                <div className="field">
                    <label>Title</label>
                    <input
                        placeholder="Enter a Conversation Title"
                        value={conversation.name}
                        onChange={(evt) => {
                            if (evt.target?.value != null) {
                                const value = evt.target.value;
                                setConversation(conversation => ({
                                    ...conversation!,
                                    name : value,
                                }));
                            }
                        }}
                    />
                </div>
                <div className="field">
                    <label>Description</label>
                    <input
                        placeholder="Enter a Conversation Description"
                        value={conversation.description}
                        onChange={(evt) => {
                            setConversation(conversation => ({
                                ...conversation!,
                                description : evt.target.value,
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="ui mini label">~{conversation.messages.reduce(
                (sum, m) => {
                    return sum + (m.tokenCount ?? 0);
                },
                0
            )} tokens</div>
        </div>
        <MessageListForm
            messages={conversation.messages}
            onChange={(newMessages) => {
                setConversation(conversation => ({
                    ...conversation!,
                    messages : newMessages,
                }));
            }}
            onRegenerateAssistantMessage={(message) => {
                if (isLoading) {
                    return;
                }
                const messageIndex = conversation.messages.findIndex(m => m.uuid == message.uuid);
                const tmpConversation : localStorageUtil.Conversation = {
                    ...conversation,
                    messages : conversation.messages.slice(0, messageIndex),
                };
                setIsLoading(true);
                submitConversation(tmpConversation, functionTools)
                    .then(
                        (newConversation) => {
                            setIsLoading(false);
                            const newMessage = newConversation.messages[newConversation.messages.length-1];
                            setConversation(conversation => ({
                                ...conversation!,
                                messages : conversation!.messages.map(m => {
                                    return m.uuid == message.uuid ?
                                        {
                                            ...newMessage,
                                            uuid : message.uuid,
                                        } :
                                        m;
                                }),
                            }));
                            error.reset();
                        },
                        (err) => {
                            setIsLoading(false);
                            handleError(error, err);
                        }
                    );
            }}
            isLoading={isLoading}
        />
        <div className="ui segment">
            <ErrorMessage
                error={error}
            />
            <button className="ui primary button" onClick={() => {
                setConversation(conversation => ({
                    ...conversation!,
                    messages : [
                        ...conversation!.messages,
                        {
                            uuid : uuid.v4(),
                            messageType : "user",
                            role : "user",
                            content : "",
                        }
                    ],
                }));
            }}>
                Add Message
            </button>
            <button className={classNames(
                "ui primary button",
                isLoading ? "loading" : undefined,
            )} onClick={() => {
                if (isLoading) {
                    return;
                }
                setIsLoading(true);
                submitConversation2(conversation, functionTools)
                    .then(
                        (responseMessage) => {
                            setIsLoading(false);
                            setConversation(conversation => {
                                return {
                                    ...conversation!,
                                    messages : [
                                        ...conversation!.messages,
                                        responseMessage,
                                    ],
                                }
                            });
                            error.reset();
                        },
                        (err) => {
                            setIsLoading(false);
                            handleError(error, err);
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
                    setConversation(conversation => ({
                        ...conversation!,
                        rawChatRequestConfig,
                    }));
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
                                setConversation(conversation => ({
                                    ...conversation!,
                                    usedFunctions : {
                                        ...conversation!.usedFunctions,
                                        [f.uuid] : evt.target.checked
                                    },
                                }));
                            }}
                        />
                        <label></label>
                    </div>
                }}
            />}
        </div>
    </div>
}

export function countTokens (conversation : localStorageUtil.Conversation) : {
    newConversation : localStorageUtil.Conversation,
    tokenized : boolean,
} {
    let tokenized = false;
    const newConversation : localStorageUtil.Conversation = {
        ...conversation,
        messages : conversation.messages.map(m => {
            if (m.tokenCount != undefined) {
                return m;
            }

            if (m.messageType == "tool_response") {
                tokenized = true;
                return {
                    ...m,
                    tokenCount : gptTokenizer.encode(JSON.stringify({
                        tool_call_id : m.tool_call_id,
                        name : m.name,
                        content : m.content,
                    })).length,
                };
            }

            let tokenCount : number|undefined = undefined;

            if ("content" in m) {
                tokenized = true;
                tokenCount = (tokenCount ?? 0) + gptTokenizer.encode((m.content ?? "")).length;
            }

            if ("tool_calls" in m) {
                tokenized = true;
                tokenCount = (tokenCount ?? 0) + gptTokenizer.encode(JSON.stringify(m.tool_calls)).length;
            }
            
            if (tokenCount != undefined) {
                return {
                    ...m,
                    tokenCount,
                };
            }

            return m;
        }),
    };

    return {
        tokenized,
        newConversation,
    };
}