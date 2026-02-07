import * as React from "react";
import * as localStorageUtil from "./local-storage-util";
import { ErrorMessage } from "./ErrorMessage";
// import { OpenAiApi } from "../api-openai";
import { Model, toAxiosRequestConfig } from "./local-storage-util";
import * as openai from "../openai-openapi";
//import * as openAiMapper from "../api-openai-mapper";

export interface RawChatRequestConfig {
    apiConfigurationUuid : string
    apiConfiguration2Model : Record<string, string|undefined>,
    model : string,
    temperature : number,
    max_tokens : number,
    stop : string,
    top_p : number,
    frequency_penalty : number,
    presence_penalty : number,
    response_format : {
        type : typeof responseFormatTypes[number],
    },
    reasoning_effort? : openai.ReasoningEffort|undefined,
    parallel_tool_calls? : boolean|undefined,
}

export const responseFormatTypes = [
    "text",
    "json_object",
] as const;

export const reasoningEffortTypes = [
    'minimal',
    'low',
    'medium',
    'high',
    ''
] as const;

export interface ChatRequestConfigUxProps {
    config : RawChatRequestConfig;

    onConfigChange : (newConfig : RawChatRequestConfig) => void;
}

export function ChatRequestConfigUx (props : ChatRequestConfigUxProps) {
    const {
        config,
        onConfigChange,
    } = props;
    const [
        apiConfigurations,
        //setApiConfigurations,
    ] = React.useState(() => localStorageUtil.loadApiConfigurations());
    const [
        models,
        setModels,
    ] = React.useState([] as Model[]);

    React.useEffect(
        () => {
            const uuid = config.apiConfigurationUuid;
            const apiConfiguration = apiConfigurations.find(i => i.uuid == uuid);

            if (apiConfiguration == undefined) {
                onConfigChange({
                    ...config,
                    apiConfigurationUuid : apiConfigurations[0].uuid,
                });
                return;
            }

            setModels(localStorageUtil.loadApiModels(uuid));
            let cancelled = false;

            openai.getModels()
                .listModels(toAxiosRequestConfig(apiConfiguration))
                .then(response => {
                    if (cancelled) {
                        return;
                    }
                    localStorageUtil.saveApiModels(uuid, response.data.data);
                    setModels(localStorageUtil.loadApiModels(uuid));
                });

            return () => {
                cancelled = true;
            }
        },
        [config.apiConfigurationUuid]
    );

    React.useEffect(
        () => {
            if (models.length == 0) {
                console.log("Model length 0")
                return;
            }
            
            const apiConfigurationId = config.apiConfigurationUuid;
            const apiConfiguration = apiConfigurations.find(i => i.uuid == apiConfigurationId);

            if (apiConfiguration == undefined) {
                console.log("No api config")
                return;
            }

            const modelId = config.apiConfiguration2Model[apiConfigurationId];
            const model = models.find(i => i.id == modelId);
            console.log("model", model, config.apiConfiguration2Model)
            if (model == undefined) {
                console.log("Updating model")
                onConfigChange({
                    ...config,
                    apiConfiguration2Model : {
                        ...config.apiConfiguration2Model,
                        [apiConfigurationId] : models[0].id,
                    },
                });
            }
        },
        [config.apiConfigurationUuid, config.apiConfiguration2Model, models]
    );

    return <div className="ui form">
        <div className="field">
            <label>API</label>
            <select
                value={config.apiConfigurationUuid}
                onChange={(evt) => {
                    onConfigChange({
                        ...config,
                        apiConfigurationUuid : evt.target.value,
                    });
                }}
            >
                <option key={"none"} value={""} disabled>
                    Select an API
                </option>
                {apiConfigurations.map(item => {
                    return <option key={item.uuid} value={item.uuid}>
                        {item.name} - {item.domain}{item.root} - {item.uuid}
                    </option>
                })}
            </select>
        </div>
        <div className="field">
            <label>Model</label>
            <select
                value={config.apiConfiguration2Model[config.apiConfigurationUuid]}
                onChange={(evt) => {
                    onConfigChange({
                        ...config,
                        model : evt.target.value,
                    });
                }}
            >
                <option key={"none"} value={""} disabled>
                    Select a Model
                </option>
                {models.map(model => {
                    return <option key={model.id} value={model.id}>
                        {model.id} - ({new Date(model.created * 1000).toISOString()})
                    </option>
                })}
            </select>
        </div>
        <div className="field">
            <label
                data-tooltip="When using JSON mode, you must also instruct the model to produce JSON yourself via a system or user message."
                data-position="top left"
                data-inverted
            >
                Response Format <i className="question circle icon"></i>
            </label>
            <select
                value={config.response_format.type}
                onChange={(evt) => {
                    onConfigChange({
                        ...config,
                        response_format : {
                            type : evt.target.value as typeof responseFormatTypes[number],
                        },
                    });
                }}
            >
                {responseFormatTypes.map(responeFormatType => {
                    return <option key={responeFormatType} value={responeFormatType}>
                        {responeFormatType}
                    </option>
                })}
            </select>
            {
                config.response_format.type == "json_object" ?
                <ErrorMessage
                    error={{
                        messages : [
                            "When using JSON mode, you must also instruct the model to produce JSON yourself via a system or user message.",
                            "Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly \"stuck\" request.",
                            "Also note that the message content may be partially cut off if finish_reason=\"length\", which indicates the generation exceeded max_tokens or the conversation exceeded the max context length.",
                        ],
                        type : "warning",
                    }}
                /> :
                undefined
            }
        </div>
        <div className="field">
            <label>Temperature</label>
            <small>
                What sampling temperature to use, between 0 and 2.
                <br/>Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
                <br/>We generally recommend altering this or top_p but not both.
            </small>
            <input
                type="number"
                min="0"
                max="2"
                step="0.01"
                value={config.temperature}
                onChange={(evt) => {
                    onConfigChange({
                        ...config,
                        temperature : Number(evt.target.value),
                    });
                }}
            />
        </div>
        <div className="field">
            <label>Max Output Tokens</label>
            <small>
                The maximum number of tokens that can be generated in the chat completion.
            </small>
            <input
                type="number"
                min="1"
                max="4096"
                step="1"
                value={config.max_tokens}
                onChange={(evt) => {
                    onConfigChange({
                        ...config,
                        max_tokens : Number(evt.target.value),
                    });
                }}
            />
        </div>
        <div className="field">
            <label>Stop Sequences</label>
            <small>
                Up to 4 sequences where the API will stop generating further tokens.
            </small>
            <input
                type="text"
                placeholder={`A JSON string or JSON array: "test" or ["day", "night"]`}
                value={config.stop}
                onChange={(evt) => {
                    onConfigChange({
                        ...config,
                        stop : evt.target.value,
                    });
                }}
            />
        </div>
        <div className="field">
            <label>Top P</label>
            <small>
                An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.
                <br/>So 0.1 means only the tokens comprising the top 10% probability mass are considered.
                <br/>We generally recommend altering this or temperature but not both.
            </small>
            <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={config.top_p}
                onChange={(evt) => {
                    onConfigChange({
                        ...config,
                        top_p : Number(evt.target.value),
                    });
                }}
            />
        </div>
        <div className="field">
            <label>Frequency Penalty</label>
            <small>
                Number between -2.0 and 2.0.
                Positive values penalize new tokens based on their existing frequency in the text so far,
                decreasing the model's likelihood to repeat the same line verbatim.
            </small>
            <input
                type="number"
                min="-2"
                max="2"
                step="0.01"
                value={config.frequency_penalty}
                onChange={(evt) => {
                    onConfigChange({
                        ...config,
                        frequency_penalty : Number(evt.target.value),
                    });
                }}
            />
        </div>
        <div className="field">
            <label>Presence Penalty</label>
            <small>
                Number between -2.0 and 2.0.
                Positive values penalize new tokens based on whether they appear in the text so far,
                increasing the model's likelihood to talk about new topics.
            </small>
            <input
                type="number"
                min="-2"
                max="2"
                step="0.01"
                value={config.presence_penalty}
                onChange={(evt) => {
                    onConfigChange({
                        ...config,
                        presence_penalty : Number(evt.target.value),
                    });
                }}
            />
        </div>
        <div className="field">
            <label
                data-tooltip=""
                data-position="top left"
                data-inverted
            >
                Reasoning Effort <i className="question circle icon"></i>
            </label>
            <select
                value={config.reasoning_effort ?? ""}
                onChange={(evt) => {
                    onConfigChange({
                        ...config,
                        reasoning_effort : evt.target.value != "" && reasoningEffortTypes.includes(evt.target.value as any) ?
                            evt.target.value as openai.ReasoningEffort :
                            undefined,
                    });
                }}
            >
                {reasoningEffortTypes.map(str => {
                    return <option key={str} value={str}>
                        {str == "" ? "default" : str}
                    </option>
                })}
            </select>
        </div>
        <div className="field">
            <label
                data-tooltip=""
                data-position="top left"
                data-inverted
            >
                Parallel Tool Calls <i className="question circle icon"></i>
            </label>
            <select
                value={
                    config.parallel_tool_calls == undefined ?
                    "" :
                    config.parallel_tool_calls ?
                    "true" :
                    "false"
                }
                onChange={(evt) => {
                    onConfigChange({
                        ...config,
                        parallel_tool_calls : evt.target.value == "" ?
                            undefined :
                            evt.target.value == "true"
                    });
                }}
            >
                {["true", "false", ""].map(str => {
                    return <option key={str} value={str}>
                        {str == "" ? "default" : str}
                    </option>
                })}
            </select>
        </div>
    </div>
}