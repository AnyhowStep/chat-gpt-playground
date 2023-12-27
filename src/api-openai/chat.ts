import * as rd from "route-declaration";
import * as rc from "route-client";
import * as m from "../api-openai-mapper";

/**
 * https://platform.openai.com/docs/api-reference/chat/create
 */
const completeChat = rd.route()
    .append("/v1/chat/completions")
    .setBody(m.chatCompleteRequestBody)
    .setResponse(m.chatCompleteResponseBody);

export const ChatApi = rc.toAxiosApi({
    complete: completeChat,
});

export type ChatApi = InstanceType<typeof ChatApi>;
