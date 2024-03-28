export const dataTypes = [
    "string",
    "number",
    "boolean",
    "integer",
    "object",
    "array",
    "enum",
] as const;

export const enumDataTypes = [
    "string",
    "number",
    "boolean",
    "integer",
] as const;

export type DataType = typeof dataTypes[number];

export type EnumDataType = typeof enumDataTypes[number];

export interface PropertyBase {
    propertyName : string;
    type : DataType;
    propertyRequired : boolean;
    description : string;
}
export interface PrimitiveProperty extends PropertyBase {
    type : Exclude<DataType, "object"|"array"|"enum">;
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
export interface EnumProperty extends PropertyBase {
    type : "enum";

    values : EnumValue[];
}

export interface EnumValue {
    type : EnumDataType;

    stringValue : string;
    numberValue : string;
    booleanValue : boolean;
    integerValue : string;
}

export type Property = PrimitiveProperty|ObjectProperty|ArrayProperty|EnumProperty;

export interface Object {
    type : "object",
    required : string[],
    properties : Property[];
}

export function deriveRequired (properties : readonly Property[]) {
    return properties
        .filter(p => p.propertyRequired)
        .map(p => p.propertyName);
}


export interface CleanedPropertyBase {
    type : DataType|undefined;
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

export interface CleanedEnumProperty extends CleanedPropertyBase {
    type : undefined;

    enum : (string|number|boolean)[];
}

export type CleanedProperty = CleanedPrimitiveProperty|CleanedObjectProperty|CleanedArrayProperty|CleanedEnumProperty;

export interface CleanedObject {
    type : "object",
    required : string[],
    properties : Record<string, CleanedProperty>;
}

function cleanEnumValues (enumValues : EnumValue[]) : (string|number|boolean)[] {
    return enumValues.map(v => {
        switch (v.type) {
            case "string": return v.stringValue;
            case "number": return Number(v.numberValue);
            case "boolean": return v.booleanValue;
            case "integer": return Number(v.integerValue);
        }
    });
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
    } else if (property.type == "enum") {
        return {
            type : undefined,
            description : property.description,
            enum : cleanEnumValues(property.values),
        }
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
