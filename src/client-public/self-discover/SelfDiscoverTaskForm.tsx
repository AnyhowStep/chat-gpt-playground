import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as classNames from "classnames";
import * as uuid from "uuid";
import * as tm from "type-mapping";
import { Conversation, SelfDiscoverImplementResult, SelfDiscoverTask, SelfDiscoverTaskExecuteResult } from "../local-storage-util";
import { OpenAiApi } from "../../api-openai";
import { useError } from "../use-error";
import { submitConversation } from "../ConversationEditPage";
import { handleError } from "../error-handling";

export interface SelfDiscoverTaskFormProps {
    tasks : readonly SelfDiscoverTask[];
    task : SelfDiscoverTask;
    onChange : (newSelfDiscoverTask : SelfDiscoverTask, oldSelfDiscoverTask : SelfDiscoverTask) => void;
    onRemove : (task : SelfDiscoverTask) => void;
    onMoveUp : (task : SelfDiscoverTask) => void;
    onMoveDown : (task : SelfDiscoverTask) => void;
    executeConfig : undefined|{
        openAiApi : OpenAiApi,
        implementResult : SelfDiscoverImplementResult,
        model : string,
    },
}

export function SelfDiscoverTaskForm (props : SelfDiscoverTaskFormProps) {
    const {
        task,
        onChange,
        onRemove,
        onMoveUp,
        onMoveDown,
        executeConfig,
    } = props;

    const [prompt, setPrompt] = React.useState(() => executeConfig == undefined ? "" : buildPrompt(task, executeConfig));

    const history = reactRouter.useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const error = useError();

    React.useEffect(
        () => {
            const timer = setTimeout(() => {
                if (executeConfig == undefined) {
                    setPrompt("");
                    return;
                }
                setPrompt(buildPrompt(task, executeConfig));
            }, 1000);
            return () => clearTimeout(timer);
        },
        [executeConfig]
    );

    return <div className="item">
        <div className="header">
            Task {task.uuid}
        </div>
        <div className="ui form">
            <div className="two fields">
                <div className="field">
                    {
                        executeConfig == undefined ?
                        <>
                            <label>Use as Example</label>
                            <div className="ui checkbox">
                                <input
                                    type="checkbox"
                                    checked={task.useAsExample}
                                    onChange={(evt) => {
                                        onChange({
                                            ...task,
                                            useAsExample : evt.target.checked,
                                        }, task);
                                    }}
                                />
                                <label>Use as Example</label>
                            </div>
                        </>:
                        <>
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
                                        ...task.executeConversation,
                                        rawChatRequestConfig : {
                                            ...task.executeConversation.rawChatRequestConfig,
                                            model : executeConfig.model,
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

                                        let validated : SelfDiscoverTaskExecuteResult;
                                        try {
                                            validated = executeResultMapper("result", parsed);
                                        } catch (err) {
                                            handleError(error, err);
                                            return;
                                        }

                                        onChange({
                                            ...task,
                                            executeConversation : conversationB,
                                            executeResult : validated,
                                        }, task);
                                        error.reset();
                                    } catch (err) {
                                        setIsLoading(false);
                                        handleError(error, err);
                                    }
                                }}
                            >
                                Execute
                            </button>
                            <button className="ui primary button" onClick={() => {
                                history.push(`/conversation/${task.executeConversation.uuid}/edit`)
                            }}>
                                View Conversation
                            </button>
                        </>
                    }
                </div>
                <div
                    className="field button group"
                    style={{
                        alignSelf: "flex-end",
                    }}
                >
                    <button
                        className="ui icon red button"
                        onClick={() => onRemove(task)}
                    >
                        <i className="trash icon"></i>
                    </button>
                    <button
                        className="ui icon button"
                        onClick={() => onMoveUp(task)}
                    >
                        <i className="arrow up icon"></i>
                    </button>
                    <button
                        className="ui icon button"
                        onClick={() => onMoveDown(task)}
                    >
                        <i className="arrow down icon"></i>
                    </button>
                </div>
            </div>
        </div>
        <div className="ui form">
            <textarea
                style={{
                    minHeight : "8em",
                    maxHeight : "48em",
                }}
                value={task.problemStatement}
                onChange={(evt) => {
                    props.onChange({
                        ...task,
                        problemStatement : evt.target.value,
                    }, task);
                }}
            />
            {
                executeConfig == undefined || prompt == "" ?
                undefined :
                <div className="field">
                    <label>Prompt</label>
                    <textarea
                        value={prompt}
                        readOnly
                        style={{ minHeight : "8em", maxHeight : "84em" }}
                    />
                </div>
            }
            {
                executeConfig == undefined || task.executeResult == undefined ?
                undefined :
                <div className="field">
                    <label>Execute Result</label>
                    <textarea
                        value={JSON.stringify(task.executeResult, null, 2)}
                        readOnly
                        style={{ minHeight : "36em", maxHeight : "84em" }}
                    />
                </div>
            }
        </div>
    </div>
}

function buildPrompt (task : SelfDiscoverTask, executeConfig : Exclude<SelfDiscoverTaskFormProps["executeConfig"], undefined>) {
    const reasoningPlan = executeConfig.implementResult.steps
        .map((step, index) => `${index+1}. ${step.instructions}`)
        .join("\n");

    return `Follow the step-by-step reasoning plan to arrive at correct answers.

### Reasoning Plan
${reasoningPlan}

### Task
${task.problemStatement.trim()}

### Instructions

Follow the reasoning structure to arrive at the correct answer for the task.

Output a JSON object with properties,
+ steps : Step[] - The result of following each step in the reasoning structure
+ answer : string - The answer in easy-to-understand plain language

interface Step {
  result : string;
}`;
}

const executeResultMapper = tm.object({
    steps : tm.array(tm.object({
        result : tm.string(),
    })),
    answer : tm.string(),
});