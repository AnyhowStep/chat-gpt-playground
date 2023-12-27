import * as rd from "route-declaration";
import * as rc from "route-client";
import * as m from "../api-openai-mapper";

const tokenLength = rd.route()
    .append("/v1/tokenizer/token-length")
    .setBody(m.tokenizerTokenLengthRequestBody)
    .setResponse(m.tokenizerTokenLengthResponseBody);

export const TokenizerApi = rc.toAxiosApi({
    tokenLength,
});

export type TokenizerApi = InstanceType<typeof TokenizerApi>;
