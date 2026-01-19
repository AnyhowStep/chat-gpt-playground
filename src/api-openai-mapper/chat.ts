import * as tm from "type-mapping/fluent";
import * as tm2 from "type-mapping";

/**
 * https://platform.openai.com/docs/guides/function-calling
 */
export const toolResponseChatMessage = tm.object({
    tool_call_id : tm.string(),

    role : tm.literal("tool"),

    /**
     * The function name
     */
    name : tm.string(),

    /**
     * The result of the tool call
     */
    content : tm.string(),
});

/**
 * https://platform.openai.com/docs/guides/function-calling
 */
export const assistantToolCallChatMessage = tm.object({
    role : tm.literal("assistant"),

    reasoning_content : tm.string().orNull().orUndefined().optional(),
    content : tm.string().orNull().orUndefined(),
    tool_calls : tm.array(tm.object({
        id : tm.string(),
        type : tm.literal("function"),
        function : tm.object({
            name : tm.string(),
            arguments : tm.jsonObjectString(),
        }),
    })),
});

export const assistantContentChatMessage = tm.object({
    role : tm.literal("assistant"),

    reasoning_content : tm.string().orNull().orUndefined().optional(),
    /**
     * The contents of the message.
     * content is required for all messages except assistant messages with function calls.
     */
    content : tm.string(),
});

export const contentChatMessage = tm.object({
    role : tm.literal("system", "user"),

    /**
     * The contents of the message.
     * content is required for all messages except assistant messages with function calls.
     */
    content : tm.string(),
});



/**
 * https://platform.openai.com/docs/guides/chat/introduction
 */
export const chatMessage = tm.or(
    contentChatMessage,
    assistantContentChatMessage,
    assistantToolCallChatMessage,
    toolResponseChatMessage,
);

export type ChatMessage = tm2.ExpectedInputOf<typeof chatMessage>;

export const tools = tm.array(tm.object({
    type : tm.literal("function"),
    function : tm.object({
        name : tm.string(),
        description : tm.string(),

        /**
         * The parameters the functions accepts, described as a JSON Schema object
         * See the [guide](https://platform.openai.com/docs/guides/gpt/function-calling) for examples,
         * and the JSON Schema [reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.
         */
        parameters : tm.jsonObject(),
    })
}));

/**
 * https://platform.openai.com/docs/api-reference/chat
 */
export const chatCompleteRequestBody = tm.object({
    model : tm.string(),
    messages : tm.array(chatMessage),

    tools : tools.optional(),
    tool_choice : tm.or(
        tm.literal("none", "auto"),
        tm.object({
            type : tm.literal("function"),
            function : tm.object({
                name : tm.string(),
            }),
        })
    ).optional(),

    /** @deprecated use tools */
    // functions : tm.array(tm.object({
    //     name : tm.string(),
    //     description : tm.string().optional(),

    //     /**
    //      * The parameters the functions accepts, described as a JSON Schema object
    //      * See the [guide](https://platform.openai.com/docs/guides/gpt/function-calling) for examples,
    //      * and the JSON Schema [reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.
    //      */
    //     parameters : tm.jsonObject(),
    // })).optional(),

    /** @deprecated use tool_choice */
    /**
     * Controls how the model responds to function calls.
     * "none" means the model does not call a function, and responds to the end-user.
     * "auto" means the model can pick between an end-user or calling a function.
     * Specifying a particular function via {"name":\ "my_function"} forces the model to call that function.
     * "none" is the default when no functions are present. "auto" is the default if functions are present.
     */
    // function_call : tm.or(
    //     tm.literal("none", "auto"),
    //     tm.object({
    //         name : tm.string(),
    //     })
    // ).optional(),

    temperature : tm.range({
        gtEq : 0.0,
        ltEq : 1.0,
    }).optional(),
    top_p : tm.range({
        gtEq : 0.0,
        ltEq : 1.0,
    }).optional(),
    n : tm.gtEq(1).optional(),
    stream : tm.boolean().optional(),
    stop : tm.array(tm.string()).optional(),
    max_tokens : tm.range({
        gtEq : 1,
        ltEq : 4096,
    }).optional(),
    presence_penalty : tm.range({
        gtEq : -2.0,
        ltEq : 2.0,
    }).optional(),
    frequency_penalty : tm.range({
        gtEq : -2.0,
        ltEq : 2.0,
    }).optional(),
    logit_bias : tm.jsonObject().optional(),
    response_format : tm.object({
        type : tm.literal("text", "json_object"),
    }).optional(),
    reasoning_effort : tm.string().orNull(),

    /**
     * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.
     */
    user : tm.string().optional(),
});

export type ChatCompleteRequestBody = tm2.ExpectedInputOf<typeof chatCompleteRequestBody>;

/**
 * https://platform.openai.com/docs/api-reference/chat/create
 */
export const chatCompleteResponseBody = tm.object({
    id : tm.string(),
    object : tm.string(),
    created : tm.integer(),
    model : tm.string(),
    choices : tm.array(tm.object({
        index : tm.integer(),
        message : chatMessage,
        finish_reason : tm.string(),
    })),
    usage : tm.object({
        prompt_tokens : tm.integer(),
        completion_tokens : tm.integer(),
        total_tokens : tm.integer(),
    }),
});
