import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as uuid from "uuid";
import * as classNames from "classnames";
import * as tm from "type-mapping";
import { OpenAiApi } from "../../api-openai";
import { Conversation, SelfDiscover, SelfDiscoverImplementResult } from "../local-storage-util";
import { submitConversation } from "../ConversationEditPage";
import { useError } from "../use-error";
import { handleError } from "../error-handling";

export interface SelfDiscoverImplementTabProps {
    openAiApi : OpenAiApi,
    active : boolean;
    selfDiscover : SelfDiscover,
    setSelfDiscover : (selfDiscover : SelfDiscover) => void,
}

export function SelfDiscoverImplementTab (props : SelfDiscoverImplementTabProps) {
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
                selfDiscover.implementResult == undefined ?
                undefined :
                <div className="field">
                    <label>Implemented Reasoning Modules</label>
                    <textarea
                        value={JSON.stringify(selfDiscover.implementResult, null, 2)}
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
                    ...selfDiscover.implementConversation,
                    rawChatRequestConfig : {
                        ...selfDiscover.implementConversation.rawChatRequestConfig,
                        model : selfDiscover.model,
                        response_format : {
                            type : "json_object",
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

                    setIsLoading(false);

                    const lastMessage = conversationB.messages[conversationB.messages.length-1];
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

                    let validated : SelfDiscoverImplementResult;
                    try {
                        validated = implementResultMapper("result", parsed);
                    } catch (err) {
                        handleError(error, err);
                        return;
                    }

                    setSelfDiscover({
                        ...selfDiscover,
                        implementConversation : conversationB,
                        implementResult : validated,
                    });
                    error.reset();
                } catch (err) {
                    setIsLoading(false);
                    handleError(error, err);
                }
            }}
        >
            Implement Reasoning Modules
        </button>
        <button className="ui primary button" onClick={() => {
            history.push(`/conversation/${selfDiscover.implementConversation.uuid}/edit`)
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

    const adaptedModules = selfDiscover.adaptResult?.reasoning_modules
        .map(i => `#### ${i.name}\n${i.description}`)
        .join("\n\n");

    return `Operationalize the reasoning modules into a step-by-step reasoning plan in JSON format:

### Adapted module description

${adaptedModules}

${exampleTasks}

### Instructions

Implement a reasoning structure for solvers to follow step-by-step and arrive at correct answers.

The JSON object should have properties,
- steps : Step[] - The steps to follow to solve the task

interface Step {
  instructions : string;
}`;
}

const implementResultMapper = tm.object({
    steps : tm.array(tm.object({
        instructions : tm.string(),
    })),
});