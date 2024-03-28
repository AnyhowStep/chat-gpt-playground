import * as React from "react";
import { EnumDataType, EnumValue, enumDataTypes } from "./data";

export interface EnumValueEditorProps {
    enumValue : EnumValue;
    onChange : (newEnumValue : EnumValue, oldEnumValue : EnumValue) => void;
    onRemove : (enumValue : EnumValue) => void;
    onMoveUp : (enumValue : EnumValue) => void;
    onMoveDown : (enumValue : EnumValue) => void;

    style?: React.CSSProperties;
}

export function EnumValueEditor (props : EnumValueEditorProps) : JSX.Element {
    const {
        enumValue,
        onChange,
        onRemove,
        onMoveUp,
        onMoveDown,
        style,
    } = props;

    return <div style={style}>
        <div className="three fields" style={{
            paddingLeft : "32px"
        }}>
            <div className="field">
                <label>Data Type</label>
                <select
                    value={enumValue.type}
                    onChange={(evt) => {
                        const type = evt.target.value as EnumDataType;
                        onChange({
                            ...enumValue,
                            type : type,
                        }, enumValue);
                    }}
                >
                    {enumDataTypes.map(s => {
                        return <option key={s} value={s}>
                            {s}
                        </option>
                    })}
                </select>
            </div>
            <div className="field">
                <label>Value</label>
                {
                    enumValue.type == "string" ?
                    <input
                        type="text"
                        value={enumValue.stringValue}
                        onChange={(evt) => {
                            onChange({
                                ...enumValue,
                                stringValue : evt.target.value,
                            }, enumValue);
                        }}
                    />
                    : undefined
                }
                {
                    enumValue.type == "number" ?
                    <input
                        type="number"
                        value={enumValue.numberValue}
                        onChange={(evt) => {
                            onChange({
                                ...enumValue,
                                numberValue : evt.target.value,
                            }, enumValue);
                        }}
                    />
                    : undefined
                }
                {
                    enumValue.type == "boolean" ?
                    <div className="ui checkbox">
                        <input
                            type="checkbox"
                            checked={enumValue.booleanValue || false}
                            onChange={(evt) => {
                                onChange({
                                    ...enumValue,
                                    booleanValue : evt.target.checked,
                                }, enumValue);
                            }}
                        />
                        <label></label>
                    </div>
                    : undefined
                }
                {
                    enumValue.type == "integer" ?
                    <input
                        type="number"
                        value={enumValue.integerValue}
                        onChange={(evt) => {
                            onChange({
                                ...enumValue,
                                integerValue : evt.target.value,
                            }, enumValue);
                        }}
                    />
                    : undefined
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
                    onClick={() => onRemove(enumValue)}
                >
                    <i className="trash icon"></i>
                </button>
                <button
                    className="ui icon button"
                    onClick={() => onMoveUp(enumValue)}
                >
                    <i className="arrow up icon"></i>
                </button>
                <button
                    className="ui icon button"
                    onClick={() => onMoveDown(enumValue)}
                >
                    <i className="arrow down icon"></i>
                </button>
            </div>
        </div>
    </div>
}
