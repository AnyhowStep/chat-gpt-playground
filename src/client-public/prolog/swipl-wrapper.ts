export interface SwiplWrapper {
    writeFile : (path : string, data : string) => void,
    query : (queryStr : string) => SwiplQueryWrapper,

    getErrorBuffer : () => string;
    getOutputBuffer : () => string;

    clearErrorBuffer : () => void;
    clearOutputBuffer : () => void;
}

export interface SwiplErrorResult {
    type : "error";
    message : string;
}

export interface SwiplBooleanResult {
    type : "boolean";
    value : boolean;
}

export interface SwiplBindingsResult {
    type : "bindings";
    bindings : Record<string, string>;
}

export interface SwiplDoneResult {
    type : "done";
}

export interface SwiplUnknownResult {
    type : "unknown";
}

export type SwiplParsedResult =
    | SwiplErrorResult
    | SwiplBooleanResult
    | SwiplBindingsResult
    | SwiplDoneResult
    | SwiplUnknownResult;

function parseResult (result : SWIPLResult, index : number) : SwiplParsedResult {
    if ("error" in result && typeof result.message == "string") {
        return {
            type : "error",
            message : result.message,
        };
    }

    if ("value" in result && result.value.$tag == "bindings") {
        const keys = Object.keys(result.value)
            .filter(key => key != "$tag");

        if (keys.length == 0) {
            return {
                type : "boolean",
                value : true,
            };
        }

        return {
            type : "bindings",
            bindings : Object.fromEntries(
                keys.map(key => [key, result.value[key]])
            ),
        };
    }

    if (result.done) {
        if (index == 0) {
            return {
                type : "boolean",
                value : false,
            };
        } else {
            return {
                type : "done",
            };
        }
    }

    return {
        type : "unknown"
    };
}

export interface SwiplResultWrapper {
    result : SWIPLResult;
    index  : number;
    parsed : SwiplParsedResult;
    error : string|undefined;
    output : string|undefined;
}

export interface SwiplQueryWrapper {
    close : () => void;
    hasNext : () => boolean;
    next : () => SwiplResultWrapper;
    once : () => SwiplResultWrapper;
}

export function makeSwiplQuery (
    swiplWrapper : SwiplWrapper,
    query : SWIPLQuery
) : SwiplQueryWrapper {
    let closed = false;
    let index = 0;

    return {
        close : () => {
            query.close();
            closed = true;
        },
        hasNext : () => !closed,
        next : () => {
            swiplWrapper.clearErrorBuffer();
            swiplWrapper.clearOutputBuffer();
            const result = query.next() as SWIPLResult;
            const error = swiplWrapper.getErrorBuffer();
            const output = swiplWrapper.getOutputBuffer();

            closed = result.done;
            const myIndex = index++;
            return {
                index : myIndex,
                result : result,
                parsed : parseResult(result, myIndex),
                error : error == "" ? undefined : error,
                output : output == "" ? undefined : output,
            };
        },
        once : () => {
            swiplWrapper.clearErrorBuffer();
            swiplWrapper.clearOutputBuffer();
            const result = query.once() as SWIPLResult;
            const error = swiplWrapper.getErrorBuffer();
            const output = swiplWrapper.getOutputBuffer();

            closed = true;
            const myIndex = index++;
            return {
                index : myIndex,
                result : result,
                parsed : parseResult(result, myIndex),
                error : error == "" ? undefined : error,
                output : output == "" ? undefined : output,
            };
        },
    }
}

export async function makeSwipl () : Promise<SwiplWrapper> {
    let errorBuffer = "";
    let outputBuffer = "";

    const swipl = await SWIPL({
        arguments : ["-q"],
        locateFile : (path) => `${window.location.pathname}client-public/dist/swipl/${path}`,
        printErr : (err) => {
            console.error(err);
            errorBuffer += err + "\n";
        },
        print : (str) => {
            console.log(str);
            outputBuffer += str + "\n";
        },
    });

    const result : SwiplWrapper = {
        writeFile : (path : string, data : string) => {
            swipl.FS.writeFile(path, data);
        },
        query : () => {
            throw new Error(`Not implemented`);
        },

        getErrorBuffer : () => errorBuffer,
        getOutputBuffer : () => outputBuffer,

        clearErrorBuffer : () => {
            errorBuffer = "";
        },
        clearOutputBuffer : () => {
            outputBuffer = "";
        },
    };

    result.query = (queryStr) => makeSwiplQuery(
        result,
        swipl.prolog.query(queryStr) as SWIPLQuery
    );

    return result;
}