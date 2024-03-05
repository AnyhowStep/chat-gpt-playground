import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as uuid from "uuid";
import * as classNames from "classnames";
import * as tm from "type-mapping";
import { OpenAiApi } from "../../api-openai";
import { Conversation, SelfDiscover, SelfDiscoverSelectResult } from "../local-storage-util";
import { submitConversation } from "../ConversationEditPage";
import { useError } from "../use-error";
import { handleError } from "../error-handling";

export interface SelfDiscoverSelectTabProps {
    openAiApi : OpenAiApi,
    active : boolean;
    selfDiscover : SelfDiscover,
    setSelfDiscover : (selfDiscover : SelfDiscover) => void,
}

export function SelfDiscoverSelectTab (props : SelfDiscoverSelectTabProps) {
    const {
        openAiApi,
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
                selfDiscover.selectResult == undefined ?
                undefined :
                <div className="field">
                    <label>Selected Reasoning Modules</label>
                    <textarea
                        value={JSON.stringify(selfDiscover.selectResult, null, 2)}
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
                    ...selfDiscover.selectConversation,
                    rawChatRequestConfig : {
                        ...selfDiscover.selectConversation.rawChatRequestConfig,
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
                    const conversationB = await submitConversation(openAiApi, conversationA, []);
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
                    const conversationD = await submitConversation(openAiApi, conversationC, []);

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

                    let validated : SelfDiscoverSelectResult;
                    try {
                        validated = selectResultMapper("result", parsed);
                    } catch (err) {
                        handleError(error, err);
                        return;
                    }

                    setSelfDiscover({
                        ...selfDiscover,
                        selectConversation : conversationD,
                        selectResult : validated,
                    });
                    error.reset();
                } catch (err) {
                    setIsLoading(false);
                    handleError(error, err);
                }
            }}
        >
            Select Reasoning Modules
        </button>
        <button className="ui primary button" onClick={() => {
            history.push(`/conversation/${selfDiscover.selectConversation.uuid}/edit`)
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

    return `Select several reasoning modules that are crucial to utilize in order to solve the given task:

### All reasoning module descriptions

+ How could I devise an experiment to help solve that problem?
+ Make a list of ideas for solving this problem, and apply them one by one to the problem to see if any progress can be made.
+ How could I measure progress on this problem?
+ How can I simplify the problem so that it is easier to solve?
+ What are the key assumptions underlying this problem?
+ What are the potential risks and drawbacks of each solution?
+ What are the alternative perspectives or viewpoints on this problem?
+ What are the long-term implications of this problem and its solutions?
+ How can I break down this problem into smaller, more manageable parts?
+ Critical Thinking: This style involves analyzing the problem from different perspectives, questioning assumptions, and evaluating
the evidence or information available. It focuses on logical reasoning, evidence-based decision-making, and identifying
potential biases or flaws in thinking.
+ Try creative thinking, generate innovative and out-of-the-box ideas to solve the problem. Explore unconventional solutions,
thinking beyond traditional boundaries, and encouraging imagination and originality.
+ Seek input and collaboration from others to solve the problem. Emphasize teamwork, open communication, and leveraging the
diverse perspectives and expertise of a group to come up with effective solutions.
+ Use systems thinking: Consider the problem as part of a larger system and understanding the interconnectedness of various elements.
Focuses on identifying the underlying causes, feedback loops, and interdependencies that influence the problem, and developing holistic
solutions that address the system as a whole.
+ Use Risk Analysis: Evaluate potential risks, uncertainties, and tradeoffs associated with different solutions or approaches to a
problem. Emphasize assessing the potential consequences and likelihood of success or failure, and making informed decisions based
on a balanced analysis of risks and benefits.
+ Use Reflective Thinking: Step back from the problem, take the time for introspection and self-reflection. Examine personal biases,
assumptions, and mental models that may influence problem-solving, and being open to learning from past experiences to improve
future approaches.
+ What is the core issue or problem that needs to be addressed?
+ What are the underlying causes or factors contributing to the problem?
+ Are there any potential solutions or strategies that have been tried before? If yes, what were the outcomes and lessons learned?
+ What are the potential obstacles or challenges that might arise in solving this problem?
+ Are there any relevant data or information that can provide insights into the problem? If yes, what data sources are available,
and how can they be analyzed?
+ Are there any stakeholders or individuals who are directly affected by the problem? What are their perspectives and needs?
+ What resources (financial, human, technological, etc.) are needed to tackle the problem effectively?
+ How can progress or success in solving the problem be measured or evaluated?
+ What indicators or metrics can be used?
+ Is the problem a technical or practical one that requires a specific expertise or skill set? Or is it more of a conceptual or
theoretical problem?
+ Does the problem involve a physical constraint, such as limited resources, infrastructure, or space?
+ Is the problem related to human behavior, such as a social, cultural, or psychological issue?
+ Does the problem involve decision-making or planning, where choices need to be made under uncertainty or with competing
objectives?
+ Is the problem an analytical one that requires data analysis, modeling, or optimization techniques?
+ Is the problem a design challenge that requires creative solutions and innovation?
+ Does the problem require addressing systemic or structural issues rather than just individual instances?
+ Is the problem time-sensitive or urgent, requiring immediate attention and action?
+ What kinds of solution typically are produced for this kind of problem specification?
+ Given the problem specification and the current best solution, have a guess about other possible solutions.
+ Let’s imagine the current best solution is totally wrong, what other ways are there to think about the problem specification?
+ What is the best way to modify this current best solution, given what you know about these kinds of problem specification?
+ Ignoring the current best solution, create an entirely new solution to the problem.
+ Let’s think step by step.
+ Let’s make a step by step plan and implement it with good notion and explanation.

${exampleTasks}

### Instructions

Select several modules that are crucial for solving the tasks above.`;
}

const convertPrompt = `Convert your response into a JSON object with the following properties,
+ selected_reasoning_modules : string[] - an array containing the names of the selected reasoning modules
+ rationale : string - A plain language explanation for why these modules were selecteds`

const selectResultMapper = tm.object({
    selected_reasoning_modules : tm.array(tm.string()),
    rationale : tm.string(),
});