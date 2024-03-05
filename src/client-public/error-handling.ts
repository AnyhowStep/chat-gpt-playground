import { ErrorHook } from "./use-error";

export function handleError (error : ErrorHook,err : any) {
    console.log(Object.getOwnPropertyNames(err));
    console.log(err);

    const propertyErrors = err?.propertyErrors;
    if (propertyErrors instanceof Array) {
        for (const propertyError of propertyErrors) {
            error.push("negative", [
                `${String(propertyError)} (${propertyError.actualValue})`
            ]);
        }
        return;
    }

    const responseBody = err?.sendResult?.responseBody;
    const responseErrorMessage = responseBody?.error?.message;
    const errorMessage = err?.message;

    if (responseErrorMessage != undefined) {
        error.push("negative", [responseErrorMessage])
        return;
    }

    if (errorMessage != undefined) {
        error.push("negative", [errorMessage])
        return;
    }

    error.push("negative", ["Unknown error"])
}