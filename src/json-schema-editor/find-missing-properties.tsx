import {ArrayProperty, Object, Property} from "./data";

export interface MissingProperty {
    pathStr : string,
    path : string[],
    property : Property,
}

export function findMissingProperties (
    obj : Object,
    value : Record<string, unknown>|undefined,
    parentPathStr : string = "",
    parentPath : string[] = [],
) : MissingProperty[] {
    const result : MissingProperty[] = [];
    for (const p of obj.properties) {
        const curPathStr = parentPathStr == "" ?
            p.propertyName :
            `${parentPathStr}.${p.propertyName}`;
        const curPath = [...parentPath, p.propertyName];
        const hasValue = (
            value != undefined &&
            Object.prototype.hasOwnProperty.call(value, p.propertyName) &&
            value[p.propertyName] != undefined
        );
        if (hasValue) {
            if (p.type == "object") {
                result.push(...findMissingProperties(p, value[p.propertyName] as any, curPathStr, curPath));
            } else if (p.type == "array") {
                const maybeArr = value[p.propertyName];
                if (maybeArr instanceof Array) {
                    result.push(...findMissingPropertiesInArray(p, maybeArr, curPathStr, curPath));
                } else {
                    //Wrong data type...
                    result.push(...findMissingPropertiesInArray(p, [0], curPathStr, curPath));
                }
            }
        } else {
            result.push({
                pathStr : curPathStr,
                path : curPath,
                property : p,
            });
        }
    }

    return result;
}


export function findMissingPropertiesInArray (
    p : ArrayProperty,
    arr : unknown[],
    parentPathStr : string,
    parentPath : string[],
) : MissingProperty[] {
    const result : MissingProperty[] = [];

    if (p.items.type == "object") {
        for (let i=0; i<arr.length; ++i) {
            result.push(...findMissingProperties(
                p.items,
                arr[i] as any,
                `${parentPathStr}.${i}`,
                [...parentPath, i.toString()]
            ));
        }
    } else if (p.items.type == "array") {
        for (let i=0; i<arr.length; ++i) {
            const maybeArr = arr[i];
            if (maybeArr instanceof Array) {
                result.push(...findMissingPropertiesInArray(
                    p.items,
                    maybeArr,
                    `${parentPathStr}.${i}`,
                    [...parentPath, i.toString()]
                ));
            } else {
                //Wrong data type...
                result.push(...findMissingPropertiesInArray(
                    p.items,
                    [0],
                    `${parentPathStr}.${i}`,
                    [...parentPath, i.toString()]
                ));
            }
        }
    } else {
        for (let i=0; i<arr.length; ++i) {
            if (arr[i] == undefined) {
                result.push({
                    pathStr : `${parentPathStr}.${i}`,
                    path : [...parentPath, i.toString()],
                    property : p,
                });
            }
        }
    }

    return result;
}