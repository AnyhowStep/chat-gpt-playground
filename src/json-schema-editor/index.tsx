import * as React from "react";

export const dataTypes = [
    "string",
    "number",
    "boolean",
    "integer",
    "object",
    "array",
] as const;

export type DataType = typeof dataTypes[number];

export interface PropertyBase {
    propertyName : string;
    type : DataType;
    propertyRequired : boolean;
    description : string;
}
export interface PrimitiveProperty extends PropertyBase {
    type : Exclude<DataType, "object"|"array">;
}
export interface ObjectProperty extends PropertyBase {
    type : "object";

    required : string[],
    properties : Property[];
}
export interface ArrayProperty extends PropertyBase {
    type : "array";

    items : Property;
}

export type Property = PrimitiveProperty|ObjectProperty|ArrayProperty;

export interface PropertyEditorProps {
    property : Property;
    onChange : (newProperty : Property, oldProperty : Property) => void;
    onRemove : (property : Property) => void;
    onMoveUp : (property : Property) => void;
    onMoveDown : (property : Property) => void;

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
        hidePropertyName,
        hideRequired,
        hideControls,
        style,
    } = props;

    return <div style={style}>
        <div className="five fields" style={{
            paddingLeft : "32px"
        }}>
            {
                (hidePropertyName ?? false) ?
                undefined :
                <div className="field">
                    <label>Property Name</label>
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
            {
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
            }
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
                        className="ui icon red button"
                        onClick={() => onRemove(property)}
                    >
                        <i className="trash icon"></i>
                    </button>
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
                </div>
            }
        </div>
        {
            property.type == "object" ?
            <ObjectEditor
                object={property}
                onChange={(objectProperty, oldObjectProperty) => {
                    onChange(objectProperty, oldObjectProperty)
                }}
                style={{
                    paddingLeft : "32px",
                }}
                name={property.propertyName}
            />
            : undefined
        }
        {
            property.type == "array" ?
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
                hidePropertyName={true}
                hideRequired={true}
                hideControls={true}
                style={{
                    paddingLeft : "32px",
                }}
            />
            : undefined
        }
    </div>
}

export interface Object {
    type : "object",
    required : string[],
    properties : Property[];
}

export interface ObjectEditorProps<T extends Object> {
    object : T;
    onChange : (newObject : T, oldObject : T) => void;
    style?: React.CSSProperties;
    name? : string;
}

function deriveRequired (properties : readonly Property[]) {
    return properties
        .filter(p => p.propertyRequired)
        .map(p => p.propertyName);
}

export function ObjectEditor<T extends Object> (props : ObjectEditorProps<T>) : JSX.Element {
    const {
        object,
        onChange,
        style,
        name,
    } = props;
    return <div className="fields" style={style}>
        <div className="field">
            <label>{name} Properties</label>
            {object.properties.map((property, index) => {
                return <PropertyEditor
                    key={index}
                    property={property}
                    onRemove={() => {
                        const newProperties = [...object.properties];
                        newProperties.splice(index, 1);
                        onChange({
                            ...object,
                            required : deriveRequired(newProperties),
                            properties : newProperties,
                        }, object);
                    }}
                    onChange={(newProperty) => {
                        const newProperties = [...object.properties];
                        newProperties.splice(index, 1, newProperty);
                        onChange({
                            ...object,
                            required : deriveRequired(newProperties),
                            properties : newProperties,
                        }, object);
                    }}
                    onMoveUp={() => {
                        if (index == 0) {
                            return;
                        }
                        const newProperties = [...object.properties];
                        newProperties.splice(index, 1);
                        newProperties.splice(index-1, 0, property);
                        onChange({
                            ...object,
                            required : deriveRequired(newProperties),
                            properties : newProperties,
                        }, object);
                    }}
                    onMoveDown={() => {
                        if (index >= object.properties.length) {
                            return;
                        }
                        const newProperties = [...object.properties];
                        newProperties.splice(index, 1);
                        newProperties.splice(index+1, 0, property);
                        onChange({
                            ...object,
                            required : deriveRequired(newProperties),
                            properties : newProperties,
                        }, object);
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
                onClick={() => onChange({
                    ...object,
                    required : [
                        ...object.required,
                        `property_${object.properties.length}`,
                    ],
                    properties : [
                        ...object.properties,
                        {
                            propertyName : `property_${object.properties.length}`,
                            type : "string",
                            propertyRequired : true,
                            description : "",
                        }
                    ]
                }, object)}
            >
                <i className="plus icon"></i>
            </button>
        </div>
    </div>
}

export interface CleanedPropertyBase {
    type : DataType;
    description : string;
}
export interface CleanedPrimitiveProperty extends CleanedPropertyBase {
    type : Exclude<DataType, "object"|"array">;
}
export interface CleanedObjectProperty extends CleanedPropertyBase {
    type : "object";

    required : string[],
    properties : Record<string, CleanedProperty>;
}
export interface CleanedArrayProperty extends CleanedPropertyBase {
    type : "array";

    items : CleanedProperty;
}

export type CleanedProperty = CleanedPrimitiveProperty|CleanedObjectProperty|CleanedArrayProperty;

export interface CleanedObject {
    type : "object",
    required : string[],
    properties : Record<string, CleanedProperty>;
}

export function cleanProperty (property : Property) : CleanedProperty {
    if (property.type == "object") {
        return {
            type : property.type,
            description : property.description,
            required : deriveRequired(property.properties),
            properties : Object.fromEntries(
                property.properties.map(p => [p.propertyName, cleanProperty(p)])
            ),
        };
    } else if (property.type == "array") {
        return {
            type : property.type,
            description : property.description,
            items : cleanProperty(property.items),
        };
    } else {
        return {
            type : property.type,
            description : property.description,
        };
    }
}

export function cleanObject (object : Object) : CleanedObject {
    return {
        type : object.type,
        required : deriveRequired(object.properties),
        properties : Object.fromEntries(
            object.properties.map(p => [p.propertyName, cleanProperty(p)])
        ),
    };
}
