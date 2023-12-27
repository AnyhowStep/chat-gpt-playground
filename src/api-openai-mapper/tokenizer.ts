import * as tm from "type-mapping/fluent";
import * as tm2 from "type-mapping";

export const tokenizerTokenLengthRequestBody = tm.object({
    text : tm.string(),
});

export type TokenizerTokenLengthRequestBody = tm2.ExpectedInputOf<typeof tokenizerTokenLengthRequestBody>;

export const tokenizerTokenLengthResponseBody = tm.object({
    length : tm.integer(),
});
