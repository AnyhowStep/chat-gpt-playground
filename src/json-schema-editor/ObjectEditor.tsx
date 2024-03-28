import * as React from "react";
import {Object, Property, deriveRequired} from "./data";
import { PropertyEditor } from "./PropertyEditor";

export interface ObjectEditorProps<T extends Object> {
    object : T;
    onChange : (newObject : T, oldObject : T) => void;
    style?: React.CSSProperties;
    name? : string;
}

export interface ObjectEditorImplProps<T extends Object> {
    object : T;
    onChange : (newObject : T, oldObject : T) => void;
    style?: React.CSSProperties;
    name? : string;

    copiedProperty : Property|undefined,
    setCopiedProperty : (property : Property) => void,
}

export function ObjectEditor<T extends Object> (props : ObjectEditorProps<T>) : JSX.Element {
    const [copiedProperty, setCopiedProperty] = React.useState<Property|undefined>(undefined);
    return <ObjectEditorImpl
        {...props}
        copiedProperty={copiedProperty}
        setCopiedProperty={setCopiedProperty}
    />
}

export function ObjectEditorImpl<T extends Object> (props : ObjectEditorImplProps<T>) : JSX.Element {
    const {
        object,
        onChange,
        style,
        name,
        copiedProperty,
        setCopiedProperty,
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
                    onPasteProperty={() => {
                        if (copiedProperty == undefined) {
                            return;
                        }
                        const newProperties = [...object.properties];
                        newProperties.splice(index+1, 0, {...copiedProperty});
                        onChange({
                            ...object,
                            required : deriveRequired(newProperties),
                            properties : newProperties,
                        }, object);
                    }}
                    copiedProperty={copiedProperty}
                    setCopiedProperty={setCopiedProperty}
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
