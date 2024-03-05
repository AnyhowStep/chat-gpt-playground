import * as rd from "route-declaration";
import * as rc from "route-client";
import * as m from "../api-openai-mapper";

/**
 * https://platform.openai.com/docs/api-reference/models/list
 */
const list = rd.route()
    .append("/v1/models")
    .setResponse(m.modelListResponseBody);

export const ModelApi = rc.toAxiosApi({
    list: list,
});

export type ModelApi = InstanceType<typeof ModelApi>;
