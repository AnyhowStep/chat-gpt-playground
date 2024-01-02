import * as React from "react";
import { ToolCall } from "./local-storage-util";

export interface ToolCallFormProps {
    toolCall : ToolCall;
    onChange : (newToolCall : ToolCall, oldToolCall : ToolCall) => void;
    onRemove : (toolCall : ToolCall) => void;
    onMoveUp : (toolCall : ToolCall) => void;
    onMoveDown : (toolCall : ToolCall) => void;
    onAddResponse : (toolCall : ToolCall) => void;
}

export function ToolCallForm (props : ToolCallFormProps) {
    const {
        toolCall,
        onChange,
        onRemove,
        onMoveUp,
        onMoveDown,
        onAddResponse,
    } = props;
    return <div className="item">
        <div className="ui form">
            <div className="two fields">
                <div className="field">
                    <label>ID</label>
                    <input
                        type="text"
                        value={toolCall.id}
                        placeholder="ID"
                        onChange={(evt) => {
                            onChange({
                                ...toolCall,
                                id : evt.target.value,
                            }, toolCall);
                        }}
                    />
                </div>
                <div
                    className="field button group"
                    style={{
                        alignSelf: "flex-end",
                    }}
                >
                    <button
                        className="ui icon red button"
                        onClick={() => onRemove(toolCall)}
                    >
                        <i className="trash icon"></i>
                    </button>
                    <button
                        className="ui icon primary button"
                        onClick={() => onAddResponse(toolCall)}
                    >
                        <i className="reply icon"></i>
                    </button>
                    <button
                        className="ui icon button"
                        onClick={() => onMoveUp(toolCall)}
                    >
                        <i className="arrow up icon"></i>
                    </button>
                    <button
                        className="ui icon button"
                        onClick={() => onMoveDown(toolCall)}
                    >
                        <i className="arrow down icon"></i>
                    </button>
                </div>
            </div>
            <div className="field">
                <label>Function Name</label>
                <input
                    type="text"
                    value={toolCall.function.name}
                    placeholder="Function Name"
                    onChange={(evt) => {
                        onChange({
                            ...toolCall,
                            function : {
                                ...toolCall.function,
                                name : evt.target.value,
                            },
                        }, toolCall);
                    }}
                />
            </div>
            <div className="field">
                <label>Function Arguments</label>
                <textarea
                    value={toolCall.function.arguments}
                    placeholder="Function Arguments"
                    onChange={(evt) => {
                        onChange({
                            ...toolCall,
                            function : {
                                ...toolCall.function,
                                arguments : evt.target.value,
                            },
                        }, toolCall);
                    }}
                />
            </div>
        </div>
    </div>
}