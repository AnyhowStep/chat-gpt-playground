import * as tm from "type-mapping/fluent";
import * as tm2 from "type-mapping";

export const getEmbeddingRequestBody = tm.object({
    input : tm.string(),
    model : tm.string().or(tm.literal("text-embedding-ada-002")),
});

export type GetEmbeddingRequestBody = tm2.ExpectedInputOf<typeof getEmbeddingRequestBody>;

export const getEmbeddingResponseBody = tm.object({
    data : tm.array(tm.object({
        embedding : tm.array(tm.finiteNumber()),
        index : tm.finiteNumber(),
        object : tm.literal("embedding"),
    })),
    object : tm.string(),
    model : tm.string(),
    usage : tm.object({
        prompt_tokens : tm.integer(),
        total_tokens : tm.integer(),
    }),
});
