import * as rd from "route-declaration";
import * as rc from "route-client";
import * as m from "../api-openai-mapper";

const getEmbedding = rd.route()
    .append("/v1/embeddings")
    .setBody(m.getEmbeddingRequestBody)
    .setResponse(m.getEmbeddingResponseBody);

export const EmbeddingApi = rc.toAxiosApi({
    getEmbedding,
});

export type EmbeddingApi = InstanceType<typeof EmbeddingApi>;
