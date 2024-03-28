import {ArrayProperty, Object, Property} from "./data";

export interface PresentProperty {
    pathStr : string,
    path : string[],
    property : Property,
}

export function findPresentProperties (
    obj : Object,
    value : Record<string, unknown>|undefined,
    parentPathStr : string = "",
    parentPath : string[] = [],
) : PresentProperty[] {
    const result : PresentProperty[] = [];
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
            result.push({
                pathStr : curPathStr,
                path : curPath,
                property : p,
            });
            if (p.type == "object") {
                result.push(...findPresentProperties(p, value[p.propertyName] as any, curPathStr, curPath));
            } else if (p.type == "array") {
                const maybeArr = value[p.propertyName];
                if (maybeArr instanceof Array) {
                    result.push(...findPresentPropertiesInArray(p, maybeArr, curPathStr, curPath));
                } else {
                    //Wrong data type...
                }
            }
        } else {
        }
    }

    return result;
}


export function findPresentPropertiesInArray (
    p : ArrayProperty,
    arr : unknown[],
    parentPathStr : string,
    parentPath : string[],
) : PresentProperty[] {
    const result : PresentProperty[] = [];

    if (p.items.type == "object") {
        for (let i=0; i<arr.length; ++i) {
            result.push(...findPresentProperties(
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
                result.push(...findPresentPropertiesInArray(
                    p.items,
                    maybeArr,
                    `${parentPathStr}.${i}`,
                    [...parentPath, i.toString()]
                ));
            } else {
                //Wrong data type...
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