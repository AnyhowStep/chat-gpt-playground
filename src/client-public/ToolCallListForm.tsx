import * as React from "react";
import { ToolCallForm } from "./ToolCallForm";
import { ToolCall } from "./local-storage-util";

export interface ToolCallListFormProps {
    toolCalls : readonly ToolCall[];
    onChange : (newToolCalls : ToolCall[], oldToolCalls : readonly ToolCall[]) => void;
    onAddResponse : (toolCall : ToolCall) => void;
}

export function ToolCallListForm (props : ToolCallListFormProps) {
    const {
        toolCalls,
        onChange,
        onAddResponse,
    } = props;
    return <div className="ui segment divided selection massive list">
        {toolCalls.map((m, index) => {
            return <ToolCallForm
                key={index}
                toolCall={m}
                onChange={(newToolCall) => {
                    onChange(toolCalls.map((m, changedIndex) => {
                        return index == changedIndex ?
                            newToolCall :
                            m;
                    }), toolCalls);
                }}
                onRemove={() => {
                    const newToolCalls = [...toolCalls];
                    newToolCalls.splice(index, 1);
                    onChange(newToolCalls, toolCalls);
                }}
                onAddResponse={(toolCall) => {
                    onAddResponse(toolCall);
                }}
                onMoveUp={(m) => {
                    if (index == 0) {
                        return;
                    }
                    const newToolCalls = [...toolCalls];
                    newToolCalls.splice(index, 1);
                    newToolCalls.splice(index-1, 0, m);
                    onChange(newToolCalls, toolCalls);
                }}
                onMoveDown={(m) => {
                    if (index >= toolCalls.length) {
                        return;
                    }
                    const newToolCalls = [...toolCalls];
                    newToolCalls.splice(index, 1);
                    newToolCalls.splice(index+1, 0, m);
                    onChange(newToolCalls, toolCalls);
                }}
            />
        })}
    </div>;
}