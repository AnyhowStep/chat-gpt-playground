import * as React from "react";
import * as classNames from "classnames";
import { DataType, Property, dataTypes } from "./data";
import { EnumEditor } from "./EnumEditor";
import { ObjectEditorImpl } from "./ObjectEditor";

export interface PropertyEditorProps {
    property : Property;
    onChange : (newProperty : Property, oldProperty : Property) => void;
    onRemove : (property : Property) => void;
    onMoveUp : (property : Property) => void;
    onMoveDown : (property : Property) => void;
    onPasteProperty : (property : Property) => void,

    copiedProperty : Property|undefined,
    setCopiedProperty : (property : Property) => void,

    hidePropertyName? : boolean;
    hideRequired? : boolean;
    hideControls? : boolean;
    style?: React.CSSProperties;
}

export function PropertyEditor (props : PropertyEditorProps) : JSX.Element {
    const {
        property,
        onChange,
        onRemove,
        onMoveUp,
        onMoveDown,
        onPasteProperty,
        copiedProperty,
        setCopiedProperty,
        hidePropertyName,
        hideRequired,
        hideControls,
        style,
    } = props;

    const [showMenu, setShowMenu] = React.useState(false);
    const [collapsed, setCollapsed] = React.useState(false);

    return <div style={style}>
        <div className="four fields" style={{
            paddingLeft : "32px"
        }}>
            {
                (hidePropertyName ?? false) ?
                undefined :
                <div className="field">
                    <label>Property Name {property.propertyRequired ? "(*)" : ""}</label>
                    <input
                        type="text"
                        value={property.propertyName}
                        placeholder="Property Name"
                        onChange={(evt) => {
                            onChange({
                                ...property,
                                propertyName : evt.target.value,
                            }, property);
                        }}
                    />
                </div>
            }
            <div className="field">
                <label>Data Type</label>
                <select
                    value={property.type}
                    onChange={(evt) => {
                        const type = evt.target.value as DataType;
                        if (type == "object") {
                            if ("properties" in property) {
                                onChange({
                                    ...property,
                                    type : type,
                                }, property);
                            } else {
                                onChange({
                                    ...property,
                                    type : type,
                                    required : [],
                                    properties : [],
                                }, property);
                            }
                        } else if (type == "array") {
                            if ("items" in property) {
                                onChange({
                                    ...property,
                                    type : type,
                                }, property);
                            } else {
                                onChange({
                                    ...property,
                                    type : type,
                                    items : {
                                        type : "string",
                                        propertyName : "item",
                                        propertyRequired : true,
                                        description : "",
                                    },
                                }, property);
                            }
                        } else if (type == "enum") {
                            if ("values" in property) {
                                onChange({
                                    ...property,
                                    type : type,
                                }, property);
                            } else {
                                onChange({
                                    ...property,
                                    type : type,
                                    values : [
                                        {
                                            type : "string",
                                            stringValue : "",
                                            numberValue : "0",
                                            booleanValue : true,
                                            integerValue : "0",
                                        }
                                    ],
                                }, property);
                            }
                        } else {
                            onChange({
                                ...property,
                                type : type,
                            }, property);
                        }
                    }}
                >
                    {dataTypes.map(s => {
                        return <option key={s} value={s}>
                            {s}
                        </option>
                    })}
                </select>
            </div>
            {/* {
                (hideRequired ?? false) ?
                undefined :
                <div className="field">
                    <label>Required</label>
                    <div className="ui checkbox">
                        <input
                            type="checkbox"
                            checked={property.propertyRequired}
                            onChange={(evt) => {
                                onChange({
                                    ...property,
                                    propertyRequired : evt.target.checked,
                                }, property);
                            }}
                        />
                        <label>Required</label>
                    </div>
                </div>
            } */}
            <div className="field">
                <label>Description</label>
                <input
                    type="text"
                    value={property.description}
                    placeholder="Description"
                    onChange={(evt) => {
                        onChange({
                            ...property,
                            description : evt.target.value,
                        }, property);
                    }}
                />
            </div>
            {
                (hideControls ?? false) ?
                undefined :
                <div
                    className="field button group"
                    style={{
                        alignSelf: "flex-end",
                    }}
                >
                    <button
                        className="ui icon button"
                        onClick={() => onMoveUp(property)}
                    >
                        <i className="arrow up icon"></i>
                    </button>
                    <button
                        className="ui icon button"
                        onClick={() => onMoveDown(property)}
                    >
                        <i className="arrow down icon"></i>
                    </button>
                    <div
                        className={classNames(
                            "ui dropdown",
                            "ui icon secondary",
                            "button",
                            showMenu ? "open" : "",
                        )}
                        onClick={() => {
                            setShowMenu(!showMenu)
                        }}
                    >
                        <i
                            className="bars icon"
                        ></i>
                        <div
                            className={classNames(
                                "left menu",
                            )}
                        >
                            <div
                                className="item"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    setShowMenu(false);
                                    setCopiedProperty(property);
                                }}
                            >
                                Copy Property
                            </div>
                            <div
                                className={classNames(
                                    "item",
                                    copiedProperty == undefined ? "disabled" : "",
                                )}
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    if (copiedProperty == undefined) {
                                        return;
                                    }
                                    setShowMenu(false);
                                    onPasteProperty(property);
                                }}
                            >
                                Paste Property
                            </div>
                            <div
                                className={classNames(
                                    "item",
                                )}
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    setShowMenu(false);
                                    if (confirm(`Delete ${property.propertyName}?`)) {
                                        onRemove(property);
                                    }
                                    
                                }}
                            >
                                Delete Property
                            </div>
                            {
                                (hideRequired ?? false) ?
                                undefined :
                                <div
                                    className={classNames(
                                        "item",
                                    )}
                                    onClick={(evt) => {
                                        evt.preventDefault();
                                        evt.stopPropagation();
                                        setShowMenu(false);
                                        onChange({
                                            ...property,
                                            propertyRequired : !property.propertyRequired,
                                        }, property);
                                    }}
                                >
                                    Set {property.propertyRequired ? "Optional" : "Required"}
                                </div>
                            }
                            <div
                                className={classNames(
                                    "item",
                                )}
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    setShowMenu(false);
                                    setCollapsed(!collapsed);
                                }}
                            >
                                {collapsed ? "Expand" : "Collapse"}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
        {
            !collapsed && property.type == "object" ?
            <ObjectEditorImpl
                object={property}
                onChange={(objectProperty, oldObjectProperty) => {
                    onChange(objectProperty, oldObjectProperty)
                }}
                style={{
                    paddingLeft : "32px",
                }}
                name={property.propertyName}
                copiedProperty={copiedProperty}
                setCopiedProperty={setCopiedProperty}
            />
            : undefined
        }
        {
            !collapsed && property.type == "array" ?
            <PropertyEditor
                property={property.items}
                onChange={(propertyItems) => {
                    onChange({
                        ...property,
                        items : propertyItems,
                    }, property);
                }}
                onRemove={() => {}}
                onMoveUp={() => {}}
                onMoveDown={() => {}}
                onPasteProperty={() => {}}
                copiedProperty={copiedProperty}
                setCopiedProperty={setCopiedProperty}
                hidePropertyName={true}
                hideRequired={true}
                hideControls={true}
                style={{
                    paddingLeft : "32px",
                }}
            />
            : undefined
        }
        {
            !collapsed && property.type == "enum" ?
            <EnumEditor
                values={property.values}
                onChange={(values) => {
                    onChange({
                        ...property,
                        values : values,
                    }, property);
                }}
                style={{
                    paddingLeft : "32px",
                }}
            />
            : undefined
        }
    </div>
}