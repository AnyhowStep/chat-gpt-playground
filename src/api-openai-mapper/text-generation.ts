import * as tm from "type-mapping";

/**
 * https://beta.openai.com/docs/api-reference/completions/create
 */
export const textGenerationRequestBody = tm.object({
    prompt : tm.stringLength({
        min : 1,
    }),
    max_tokens : tm.range({
        gtEq : 16,
        ltEq : 64,
    }),
    temperature : tm.range({
        gtEq : 0.0,
        ltEq : 1.0,
    }),
});

/**
 * https://beta.openai.com/docs/api-reference/completions/create
 */
export const textGenerationResponseBody = tm.object({
    id : tm.string(),
    object : tm.string(),
    created : tm.integer(),
    model : tm.string(),
    choices : tm.array(tm.object({
        text : tm.string(),
        index : tm.integer(),
        finish_reason : tm.string(),
    })),
});
