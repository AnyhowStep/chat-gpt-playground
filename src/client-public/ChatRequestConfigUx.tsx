import * as React from "react";
import * as localStorageUtil from "./local-storage-util";
import { ErrorMessage } from "./ErrorMessage";
//import * as openAiMapper from "../api-openai-mapper";

export interface RawChatRequestConfig {
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
}

export const responseFormatTypes = [
    "text",
    "json_object",
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
        models,
        //setModels,
    ] = React.useState(() => {
        return localStorageUtil.loadModels().filter(model => model.id.startsWith("gpt"));
    });

    return <div className="ui form">
        <div className="field">
            <label>Model</label>
            <select
                value={config.model}
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
    </div>
}