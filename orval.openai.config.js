const orvalZodCustom = require("./dist/orval-zod-custom");
//https://orval.dev/guides/fetch
module.exports = {
    "openai": {
        input: "./src/openai-openapi/openapi-2025-10-21.yaml",
        output: {
            workspace : "./src/openai-openapi/orval",
            target : "./openapi.ts",
            client : "axios",
            schemas : "./schema",
            mode : "tags-split",
            indexFiles : true,
            override : {
                doNotSetDefaultValue : true,
            }
        },
    },
    "openai-zod": {
        input: "./src/openai-openapi/openapi-2025-10-21.yaml",
        output: {
            target : "./src/openai-zod/orval",
            client : (GENERATOR_CLIENT) => {
                return orvalZodCustom.default()();
            },
            mode : "tags-split",
            indexFiles : true,
            override : {
                doNotSetDefaultValue : true,
            }
        },
    },
};
