declare const SWIPL : typeof import("swipl-wasm");
type SWIPLModule = import("swipl-wasm").SWIPLModule;
type SWIPLQuery = import("swipl-wasm").Query & { close : () => void };

interface SWIPLResultBase {
    readonly done : boolean;
}

interface SWIPLBindingsResult extends SWIPLResultBase {
    value : {
        $tag : "bindings",
        [k : string] : string,
    },
}

interface SWIPLErrorResult extends SWIPLResultBase {
    error : true;
    message : string;
}

type SWIPLResult =
    | SWIPLResultBase
    | SWIPLBindingsResult
    | SWIPLErrorResult;