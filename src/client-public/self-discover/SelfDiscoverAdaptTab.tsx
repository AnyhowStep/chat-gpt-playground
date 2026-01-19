import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as uuid from "uuid";
import * as classNames from "classnames";
import * as tm from "type-mapping";
import { OpenAiApi } from "../../api-openai";
import { Conversation, SelfDiscover, SelfDiscoverAdaptResult } from "../local-storage-util";
import { submitConversation } from "../ConversationEditPage";
import { useError } from "../use-error";
import { handleError } from "../error-handling";

export interface SelfDiscoverAdaptTabProps {
    openAiApi : OpenAiApi,
    active : boolean;
    selfDiscover : SelfDiscover,
    setSelfDiscover : (selfDiscover : SelfDiscover) => void,
}

export function SelfDiscoverAdaptTab (props : SelfDiscoverAdaptTabProps) {
    const {
        active,
        selfDiscover,
        setSelfDiscover,
    } = props;
    const history = reactRouter.useHistory();
    const [prompt, setPrompt] = React.useState(() => buildPrompt(selfDiscover));

    const [isLoading, setIsLoading] = React.useState(false);
    const error = useError();

    React.useEffect(
        () => {
            const timer = setTimeout(() => {
                setPrompt(buildPrompt(selfDiscover));
            }, 1000);
            return () => clearTimeout(timer);
        },
        [selfDiscover]
    );

    return <div className={classNames(
        "ui bottom attached tab segment",
        active ? "active" : undefined,
    )}>
        <div className="ui form">
            <div className="field">
                <label>Prompt</label>
                <textarea
                    value={prompt}
                    readOnly
                    style={{ minHeight : "36em", maxHeight : "84em" }}
                />
            </div>
            {
                selfDiscover.adaptResult == undefined ?
                undefined :
                <div className="field">
                    <label>Adapted Reasoning Modules</label>
                    <textarea
                        value={JSON.stringify(selfDiscover.adaptResult, null, 2)}
                        readOnly
                        style={{ minHeight : "36em", maxHeight : "84em" }}
                    />
                </div>
            }
        </div>
        <br/>
        <button
            className={classNames(
                "ui primary button",
                isLoading ? "loading" : undefined,
            )}
            onClick={async () => {
                if (isLoading) {
                    return;
                }
                const conversationA : Conversation = {
                    ...selfDiscover.adaptConversation,
                    rawChatRequestConfig : {
                        ...selfDiscover.adaptConversation.rawChatRequestConfig,
                        model : selfDiscover.model,
                        response_format : {
                            type : "text",
                        },
                        temperature : 0,
                        max_tokens : 1024,
                    },
                    messages : [
                        {
                            uuid : uuid.v4(),
                            messageType : "user",
                            role : "user",
                            content : prompt,
                        },
                    ],
                };
                setIsLoading(true);

                try {
                    const conversationB = await submitConversation(conversationA, []);
                    const conversationC : Conversation = {
                        ...conversationB,
                        rawChatRequestConfig : {
                            ...conversationB.rawChatRequestConfig,
                            response_format : {
                                type : "json_object",
                            },
                        },
                        messages : [
                            ...conversationB.messages,
                            {
                                uuid : uuid.v4(),
                                messageType : "user",
                                role : "user",
                                content : convertPrompt,
                            },
                        ]
                    };
                    const conversationD = await submitConversation(conversationC, []);

                    setIsLoading(false);

                    const lastMessage = conversationD.messages[conversationD.messages.length-1];
                    if (lastMessage.role != "assistant") {
                        error.push("negative", [`Expected assistant message, received ${lastMessage.role}`]);
                        return;
                    }
                    if (lastMessage.messageType != "assistant") {
                        error.push("negative", [`Expected assistant message, received ${lastMessage.messageType}`]);
                        return;
                    }
                    
                    let parsed = {};
                    try {
                        parsed = JSON.parse(lastMessage.content);
                    } catch (err) {
                        handleError(error, err);
                        return;
                    }

                    let validated : SelfDiscoverAdaptResult;
                    try {
                        validated = adaptResultMapper("result", parsed);
                    } catch (err) {
                        handleError(error, err);
                        return;
                    }

                    setSelfDiscover({
                        ...selfDiscover,
                        adaptConversation : conversationD,
                        adaptResult : validated,
                    });
                    error.reset();
                } catch (err) {
                    setIsLoading(false);
                    handleError(error, err);
                }
            }}
        >
            Adapt Reasoning Modules
        </button>
        <button className="ui primary button" onClick={() => {
            history.push(`/conversation/${selfDiscover.adaptConversation.uuid}/edit`)
        }}>
            View Conversation
        </button>
    </div>
}

function buildPrompt (selfDiscover : SelfDiscover) {
    const exampleTasks = selfDiscover.tasks
    .filter(t => t.useAsExample)
    .filter(t => t.problemStatement.trim() != "")
    .map((t, index) => `### Example Task ${index+1}

${t.problemStatement.trim()}`)
    .join("\n\n");

    const selectedModules = selfDiscover.selectResult?.selected_reasoning_modules
        .map(i => `+ ${i}`)
        .join("\n");

    return `Rephrase and specify each reasoning module so that it better helps with solving the task:

### Selected module descriptions

${selectedModules}

${exampleTasks}

### Instructions

Adapt each reasoning module description to better solve the tasks`;
}

const convertPrompt = `Convert your response into a JSON object with the following properties,
+ reasoning_modules : ReasoningModule[] - an array containing the rephrased and specified reasoning modules

interface ReasoningModule {
  name : string;
  description : string;
}`

const adaptResultMapper = tm.object({
    reasoning_modules : tm.array(tm.object({
        name : tm.string(),
        description : tm.string(),
    })),
});