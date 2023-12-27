import * as rd from "route-declaration";
import * as rc from "route-client";
import * as m from "../api-openai-mapper";
import * as tm from "type-mapping";

const generate = rd.route()
    .append("/v1/engines")
    .appendParam("engine_id")
    .append("/completions")
    .setParam(tm.object({
        engine_id : tm.string(),
    }))
    .setBody(m.textGenerationRequestBody)
    .setResponse(m.textGenerationResponseBody);

export const TextGenerationApi = rc.toAxiosApi({
    generate,
});

export type TextGenerationApi = InstanceType<typeof TextGenerationApi>;
