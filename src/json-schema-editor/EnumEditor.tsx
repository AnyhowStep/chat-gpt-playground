import * as React from "react";
import { EnumValue } from "./data";
import { EnumValueEditor } from "./EnumValueEditor";

export interface EnumEditorProps {
    values : readonly EnumValue[];
    onChange : (newValues : EnumValue[], oldValues : readonly EnumValue[]) => void;
    style?: React.CSSProperties;
    name? : string;
}

export function EnumEditor (props : EnumEditorProps) : JSX.Element {
    const {
        values,
        onChange,
        style,
        name,
    } = props;
    return <div className="fields" style={style}>
        <div className="field">
            <label>{name} Values</label>
            {values.map((value, index) => {
                return <EnumValueEditor
                    key={index}
                    enumValue={value}
                    onRemove={() => {
                        const newValues = [...values];
                        newValues.splice(index, 1);
                        onChange(newValues, values);
                    }}
                    onChange={(newValue) => {
                        const newValues = [...values];
                        newValues.splice(index, 1, newValue);
                        onChange(newValues, values);
                    }}
                    onMoveUp={() => {
                        if (index == 0) {
                            return;
                        }
                        const newValues = [...values];
                        newValues.splice(index, 1);
                        newValues.splice(index-1, 0, value);
                        onChange(newValues, values);
                    }}
                    onMoveDown={() => {
                        if (index >= values.length) {
                            return;
                        }
                        const newValues = [...values];
                        newValues.splice(index, 1);
                        newValues.splice(index+1, 0, value);
                        onChange(newValues, values);
                    }}
                />
            })}
        </div>
        <div
            className="field button group"
            style={{
                alignSelf: "flex-start",
            }}
        >
            <button
                className="ui icon red button"
                onClick={() => onChange([
                    ...values,
                    {
                        type : "string",
                        stringValue : "",
                        numberValue : "0",
                        booleanValue : true,
                        integerValue : "0",
                    }
                ], values)}
            >
                <i className="plus icon"></i>
            </button>
        </div>
    </div>
}
