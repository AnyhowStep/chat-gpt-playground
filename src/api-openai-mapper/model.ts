import * as tm from "type-mapping/fluent";

/**
 * https://platform.openai.com/docs/api-reference/models/object
 */
export const model = tm.object({
    id : tm.string(),

    created : tm.finiteNumber(),

    object : tm.literal("model"),

    owned_by : tm.string(),
});

export const modelListResponseBody = tm.object({
    object : tm.literal("list"),
    data : tm.array(model),
});