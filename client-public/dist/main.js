/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/client-public/main.tsx","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api-openai-mapper/chat.ts":
/*!***************************************!*\
  !*** ./src/api-openai-mapper/chat.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.chatCompleteResponseBody = exports.chatCompleteRequestBody = exports.tools = exports.chatMessage = exports.contentChatMessage = exports.assistantContentChatMessage = exports.assistantToolCallChatMessage = exports.toolResponseChatMessage = void 0;
const tm = __webpack_require__(/*! type-mapping/fluent */ "./node_modules/type-mapping/fluent.js");
/**
 * https://platform.openai.com/docs/guides/function-calling
 */
exports.toolResponseChatMessage = tm.object({
    tool_call_id: tm.string(),
    role: tm.literal("tool"),
    /**
     * The function name
     */
    name: tm.string(),
    /**
     * The result of the tool call
     */
    content: tm.string(),
});
/**
 * https://platform.openai.com/docs/guides/function-calling
 */
exports.assistantToolCallChatMessage = tm.object({
    role: tm.literal("assistant"),
    //content : tm.null(),
    tool_calls: tm.array(tm.object({
        id: tm.string(),
        type: tm.literal("function"),
        function: tm.object({
            name: tm.string(),
            arguments: tm.jsonObjectString(),
        }),
    })),
});
exports.assistantContentChatMessage = tm.object({
    role: tm.literal("assistant"),
    /**
     * The contents of the message.
     * content is required for all messages except assistant messages with function calls.
     */
    content: tm.string(),
});
exports.contentChatMessage = tm.object({
    role: tm.literal("system", "user"),
    /**
     * The contents of the message.
     * content is required for all messages except assistant messages with function calls.
     */
    content: tm.string(),
});
/**
 * https://platform.openai.com/docs/guides/chat/introduction
 */
exports.chatMessage = tm.or(exports.contentChatMessage, exports.assistantContentChatMessage, exports.assistantToolCallChatMessage, exports.toolResponseChatMessage);
exports.tools = tm.array(tm.object({
    type: tm.literal("function"),
    function: tm.object({
        name: tm.string(),
        description: tm.string(),
        /**
         * The parameters the functions accepts, described as a JSON Schema object
         * See the [guide](https://platform.openai.com/docs/guides/gpt/function-calling) for examples,
         * and the JSON Schema [reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.
         */
        parameters: tm.jsonObject(),
    })
}));
/**
 * https://platform.openai.com/docs/api-reference/chat
 */
exports.chatCompleteRequestBody = tm.object({
    model: tm.string(),
    messages: tm.array(exports.chatMessage),
    tools: exports.tools.optional(),
    tool_choice: tm.or(tm.literal("none", "auto"), tm.object({
        type: tm.literal("function"),
        function: tm.object({
            name: tm.string(),
        }),
    })).optional(),
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
    temperature: tm.range({
        gtEq: 0.0,
        ltEq: 1.0,
    }).optional(),
    top_p: tm.range({
        gtEq: 0.0,
        ltEq: 1.0,
    }).optional(),
    n: tm.gtEq(1).optional(),
    stream: tm.boolean().optional(),
    stop: tm.array(tm.string()).optional(),
    max_tokens: tm.range({
        gtEq: 1,
        ltEq: 2048,
    }).optional(),
    presence_penalty: tm.range({
        gtEq: -2.0,
        ltEq: 2.0,
    }).optional(),
    frequency_penalty: tm.range({
        gtEq: -2.0,
        ltEq: 2.0,
    }).optional(),
    logit_bias: tm.jsonObject().optional(),
    response_format: tm.object({
        type: tm.literal("text", "json_object"),
    }).optional(),
    /**
     * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.
     */
    user: tm.string().optional(),
});
/**
 * https://platform.openai.com/docs/api-reference/chat/create
 */
exports.chatCompleteResponseBody = tm.object({
    id: tm.string(),
    object: tm.string(),
    created: tm.integer(),
    model: tm.string(),
    choices: tm.array(tm.object({
        index: tm.integer(),
        message: exports.chatMessage,
        finish_reason: tm.string(),
    })),
    usage: tm.object({
        prompt_tokens: tm.integer(),
        completion_tokens: tm.integer(),
        total_tokens: tm.integer(),
    }),
});


/***/ }),

/***/ "./src/api-openai-mapper/embedding.ts":
/*!********************************************!*\
  !*** ./src/api-openai-mapper/embedding.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbeddingResponseBody = exports.getEmbeddingRequestBody = void 0;
const tm = __webpack_require__(/*! type-mapping/fluent */ "./node_modules/type-mapping/fluent.js");
exports.getEmbeddingRequestBody = tm.object({
    input: tm.string(),
    model: tm.string().or(tm.literal("text-embedding-ada-002")),
});
exports.getEmbeddingResponseBody = tm.object({
    data: tm.array(tm.object({
        embedding: tm.array(tm.finiteNumber()),
        index: tm.finiteNumber(),
        object: tm.literal("embedding"),
    })),
    object: tm.string(),
    model: tm.string(),
    usage: tm.object({
        prompt_tokens: tm.integer(),
        total_tokens: tm.integer(),
    }),
});


/***/ }),

/***/ "./src/api-openai-mapper/index.ts":
/*!****************************************!*\
  !*** ./src/api-openai-mapper/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./chat */ "./src/api-openai-mapper/chat.ts"), exports);
__exportStar(__webpack_require__(/*! ./embedding */ "./src/api-openai-mapper/embedding.ts"), exports);
__exportStar(__webpack_require__(/*! ./model */ "./src/api-openai-mapper/model.ts"), exports);
__exportStar(__webpack_require__(/*! ./text-generation */ "./src/api-openai-mapper/text-generation.ts"), exports);
__exportStar(__webpack_require__(/*! ./tokenizer */ "./src/api-openai-mapper/tokenizer.ts"), exports);


/***/ }),

/***/ "./src/api-openai-mapper/model.ts":
/*!****************************************!*\
  !*** ./src/api-openai-mapper/model.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.modelListResponseBody = exports.model = void 0;
const tm = __webpack_require__(/*! type-mapping/fluent */ "./node_modules/type-mapping/fluent.js");
/**
 * https://platform.openai.com/docs/api-reference/models/object
 */
exports.model = tm.object({
    id: tm.string(),
    created: tm.finiteNumber(),
    object: tm.literal("model"),
    owned_by: tm.string(),
});
exports.modelListResponseBody = tm.object({
    object: tm.literal("list"),
    data: tm.array(exports.model),
});


/***/ }),

/***/ "./src/api-openai-mapper/text-generation.ts":
/*!**************************************************!*\
  !*** ./src/api-openai-mapper/text-generation.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.textGenerationResponseBody = exports.textGenerationRequestBody = void 0;
const tm = __webpack_require__(/*! type-mapping */ "./node_modules/type-mapping/dist/index.js");
/**
 * https://beta.openai.com/docs/api-reference/completions/create
 */
exports.textGenerationRequestBody = tm.object({
    prompt: tm.stringLength({
        min: 1,
    }),
    max_tokens: tm.range({
        gtEq: 16,
        ltEq: 64,
    }),
    temperature: tm.range({
        gtEq: 0.0,
        ltEq: 1.0,
    }),
});
/**
 * https://beta.openai.com/docs/api-reference/completions/create
 */
exports.textGenerationResponseBody = tm.object({
    id: tm.string(),
    object: tm.string(),
    created: tm.integer(),
    model: tm.string(),
    choices: tm.array(tm.object({
        text: tm.string(),
        index: tm.integer(),
        finish_reason: tm.string(),
    })),
});


/***/ }),

/***/ "./src/api-openai-mapper/tokenizer.ts":
/*!********************************************!*\
  !*** ./src/api-openai-mapper/tokenizer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizerTokenLengthResponseBody = exports.tokenizerTokenLengthRequestBody = void 0;
const tm = __webpack_require__(/*! type-mapping/fluent */ "./node_modules/type-mapping/fluent.js");
exports.tokenizerTokenLengthRequestBody = tm.object({
    text: tm.string(),
});
exports.tokenizerTokenLengthResponseBody = tm.object({
    length: tm.integer(),
});


/***/ }),

/***/ "./src/api-openai/chat.ts":
/*!********************************!*\
  !*** ./src/api-openai/chat.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatApi = void 0;
const rd = __webpack_require__(/*! route-declaration */ "./node_modules/route-declaration/dist/index.js");
const rc = __webpack_require__(/*! route-client */ "./node_modules/route-client/dist/index.js");
const m = __webpack_require__(/*! ../api-openai-mapper */ "./src/api-openai-mapper/index.ts");
/**
 * https://platform.openai.com/docs/api-reference/chat/create
 */
const completeChat = rd.route()
    .append("/v1/chat/completions")
    .setBody(m.chatCompleteRequestBody)
    .setResponse(m.chatCompleteResponseBody);
exports.ChatApi = rc.toAxiosApi({
    complete: completeChat,
});


/***/ }),

/***/ "./src/api-openai/embedding.ts":
/*!*************************************!*\
  !*** ./src/api-openai/embedding.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddingApi = void 0;
const rd = __webpack_require__(/*! route-declaration */ "./node_modules/route-declaration/dist/index.js");
const rc = __webpack_require__(/*! route-client */ "./node_modules/route-client/dist/index.js");
const m = __webpack_require__(/*! ../api-openai-mapper */ "./src/api-openai-mapper/index.ts");
const getEmbedding = rd.route()
    .append("/v1/embeddings")
    .setBody(m.getEmbeddingRequestBody)
    .setResponse(m.getEmbeddingResponseBody);
exports.EmbeddingApi = rc.toAxiosApi({
    getEmbedding,
});


/***/ }),

/***/ "./src/api-openai/index.ts":
/*!*********************************!*\
  !*** ./src/api-openai/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./openai-api */ "./src/api-openai/openai-api.ts"), exports);
__exportStar(__webpack_require__(/*! ./chat */ "./src/api-openai/chat.ts"), exports);
__exportStar(__webpack_require__(/*! ./embedding */ "./src/api-openai/embedding.ts"), exports);
__exportStar(__webpack_require__(/*! ./text-generation */ "./src/api-openai/text-generation.ts"), exports);


/***/ }),

/***/ "./src/api-openai/model.ts":
/*!*********************************!*\
  !*** ./src/api-openai/model.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelApi = void 0;
const rd = __webpack_require__(/*! route-declaration */ "./node_modules/route-declaration/dist/index.js");
const rc = __webpack_require__(/*! route-client */ "./node_modules/route-client/dist/index.js");
const m = __webpack_require__(/*! ../api-openai-mapper */ "./src/api-openai-mapper/index.ts");
/**
 * https://platform.openai.com/docs/api-reference/models/list
 */
const list = rd.route()
    .append("/v1/models")
    .setResponse(m.modelListResponseBody);
exports.ModelApi = rc.toAxiosApi({
    list: list,
});


/***/ }),

/***/ "./src/api-openai/openai-api.ts":
/*!**************************************!*\
  !*** ./src/api-openai/openai-api.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiApi = void 0;
const chat_1 = __webpack_require__(/*! ./chat */ "./src/api-openai/chat.ts");
const embedding_1 = __webpack_require__(/*! ./embedding */ "./src/api-openai/embedding.ts");
const model_1 = __webpack_require__(/*! ./model */ "./src/api-openai/model.ts");
const text_generation_1 = __webpack_require__(/*! ./text-generation */ "./src/api-openai/text-generation.ts");
const tokenizer_1 = __webpack_require__(/*! ./tokenizer */ "./src/api-openai/tokenizer.ts");
class OpenAiApi {
    constructor(args) {
        const myArgs = {
            ...args,
            onInjectHeader: () => {
                return {
                    Authorization: `Bearer ${args.apiKey}`,
                };
            }
        };
        const defaultTimeout = 240 * 1000;
        this.chat = new chat_1.ChatApi(myArgs);
        this.chat.sender.axiosInstance.defaults.timeout = defaultTimeout;
        this.embedding = new embedding_1.EmbeddingApi(myArgs);
        this.embedding.sender.axiosInstance.defaults.timeout = defaultTimeout;
        this.model = new model_1.ModelApi(myArgs);
        this.model.sender.axiosInstance.defaults.timeout = defaultTimeout;
        this.textGeneration = new text_generation_1.TextGenerationApi(myArgs);
        this.textGeneration.sender.axiosInstance.defaults.timeout = defaultTimeout;
        this.tokenizer = new tokenizer_1.TokenizerApi(myArgs);
        this.tokenizer.sender.axiosInstance.defaults.timeout = defaultTimeout;
    }
}
exports.OpenAiApi = OpenAiApi;


/***/ }),

/***/ "./src/api-openai/text-generation.ts":
/*!*******************************************!*\
  !*** ./src/api-openai/text-generation.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TextGenerationApi = void 0;
const rd = __webpack_require__(/*! route-declaration */ "./node_modules/route-declaration/dist/index.js");
const rc = __webpack_require__(/*! route-client */ "./node_modules/route-client/dist/index.js");
const m = __webpack_require__(/*! ../api-openai-mapper */ "./src/api-openai-mapper/index.ts");
const tm = __webpack_require__(/*! type-mapping */ "./node_modules/type-mapping/dist/index.js");
const generate = rd.route()
    .append("/v1/engines")
    .appendParam("engine_id")
    .append("/completions")
    .setParam(tm.object({
    engine_id: tm.string(),
}))
    .setBody(m.textGenerationRequestBody)
    .setResponse(m.textGenerationResponseBody);
exports.TextGenerationApi = rc.toAxiosApi({
    generate,
});


/***/ }),

/***/ "./src/api-openai/tokenizer.ts":
/*!*************************************!*\
  !*** ./src/api-openai/tokenizer.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenizerApi = void 0;
const rd = __webpack_require__(/*! route-declaration */ "./node_modules/route-declaration/dist/index.js");
const rc = __webpack_require__(/*! route-client */ "./node_modules/route-client/dist/index.js");
const m = __webpack_require__(/*! ../api-openai-mapper */ "./src/api-openai-mapper/index.ts");
const tokenLength = rd.route()
    .append("/v1/tokenizer/token-length")
    .setBody(m.tokenizerTokenLengthRequestBody)
    .setResponse(m.tokenizerTokenLengthResponseBody);
exports.TokenizerApi = rc.toAxiosApi({
    tokenLength,
});


/***/ }),

/***/ "./src/client-public/ApiKeyPage.tsx":
/*!******************************************!*\
  !*** ./src/client-public/ApiKeyPage.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyPage = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
function ApiKeyPage() {
    var _a;
    const [openAiApiKey, setOpenAiApikey,] = React.useState((_a = localStorageUtil.getItem(localStorageUtil.LocalStorageKey.OPEN_AI_API_KEY)) !== null && _a !== void 0 ? _a : "");
    return React.createElement("div", { className: "ui main container form" },
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Open AI API Key"),
            React.createElement("input", { type: "text", value: openAiApiKey, onChange: (evt) => {
                    setOpenAiApikey(evt.target.value);
                } })),
        React.createElement("button", { className: "ui primary button", onClick: () => {
                localStorageUtil.setItem(localStorageUtil.LocalStorageKey.OPEN_AI_API_KEY, openAiApiKey);
                alert("Saved API Key");
            } }, "Save"));
}
exports.ApiKeyPage = ApiKeyPage;


/***/ }),

/***/ "./src/client-public/App.tsx":
/*!***********************************!*\
  !*** ./src/client-public/App.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const use_dropdown_1 = __webpack_require__(/*! ./use-dropdown */ "./src/client-public/use-dropdown.ts");
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
//import {DefaultMenu} from "./DefaultMenu";
const HomePage_1 = __webpack_require__(/*! ./HomePage */ "./src/client-public/HomePage.tsx");
const DefaultMenu_1 = __webpack_require__(/*! ./DefaultMenu */ "./src/client-public/DefaultMenu.tsx");
const ApiKeyPage_1 = __webpack_require__(/*! ./ApiKeyPage */ "./src/client-public/ApiKeyPage.tsx");
const FunctionToolListPage_1 = __webpack_require__(/*! ./FunctionToolListPage */ "./src/client-public/FunctionToolListPage.tsx");
const FunctionToolEditPage_1 = __webpack_require__(/*! ./FunctionToolEditPage */ "./src/client-public/FunctionToolEditPage.tsx");
const ConversationListPage_1 = __webpack_require__(/*! ./ConversationListPage */ "./src/client-public/ConversationListPage.tsx");
const ConversationEditPage_1 = __webpack_require__(/*! ./ConversationEditPage */ "./src/client-public/ConversationEditPage.tsx");
const ModelListPage_1 = __webpack_require__(/*! ./ModelListPage */ "./src/client-public/ModelListPage.tsx");
const SelfDiscoverListPage_1 = __webpack_require__(/*! ./self-discover/SelfDiscoverListPage */ "./src/client-public/self-discover/SelfDiscoverListPage.tsx");
const SelfDiscoverEditPage_1 = __webpack_require__(/*! ./self-discover/SelfDiscoverEditPage */ "./src/client-public/self-discover/SelfDiscoverEditPage.tsx");
function App(_props) {
    const sidebar = (0, use_dropdown_1.useDropdown)({
        openClassName: "uncover visible",
        closeClassName: "uncover animating",
    });
    // const storyComponent = React.useRef(() => <Story openAiApi={props.openAiApi}/>);
    // const conversationComponent = React.useRef(() => <Conversation openAiApi={props.openAiApi}/>);
    return (React.createElement(react_router_dom_1.HashRouter, null,
        React.createElement("div", { id: "main-sidebar", className: sidebar.className("ui sidebar inverted vertical massive menu left overlay") },
            React.createElement(react_router_dom_1.Link, { className: "item", to: "/" }, "Home"),
            React.createElement("div", { className: "item" },
                "Lists",
                React.createElement("div", { className: "menu" },
                    React.createElement(react_router_dom_1.Link, { className: "ui item", to: `/list` }, "All Lists"))),
            React.createElement("div", { className: "item" },
                "Search",
                React.createElement("div", { className: "menu" })),
            React.createElement("div", { className: "item" },
                "Settings",
                React.createElement("div", { className: "menu" },
                    React.createElement(react_router_dom_1.Link, { className: "ui item", to: `/api-key` }, "API Key"),
                    React.createElement(react_router_dom_1.Link, { className: "ui item", to: `/function-tool` }, "Function Tools"),
                    React.createElement(react_router_dom_1.Link, { className: "ui item", to: `/model` }, "Models"),
                    React.createElement(react_router_dom_1.Link, { className: "ui item", to: `/conversation` }, "Conversations"),
                    React.createElement(react_router_dom_1.Link, { className: "ui item", to: `/self-discover` }, "Self-Discovers")))),
        React.createElement("div", { className: "", style: { height: "100%" } },
            React.createElement(DefaultMenu_1.DefaultMenu, { sidebarHook: sidebar }),
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: "/api-key", component: ApiKeyPage_1.ApiKeyPage }),
                React.createElement(react_router_dom_1.Route, { path: "/function-tool/:uuid/edit", component: FunctionToolEditPage_1.FunctionToolEditPage }),
                React.createElement(react_router_dom_1.Route, { path: "/function-tool", component: FunctionToolListPage_1.FunctionToolListPage }),
                React.createElement(react_router_dom_1.Route, { path: "/model", component: () => React.createElement(ModelListPage_1.ModelListPage, { openAiApi: _props.openAiApi }) }),
                React.createElement(react_router_dom_1.Route, { path: "/conversation/:uuid/edit", component: () => React.createElement(ConversationEditPage_1.ConversationEditPage, { openAiApi: _props.openAiApi }) }),
                React.createElement(react_router_dom_1.Route, { path: "/conversation", component: ConversationListPage_1.ConversationListPage }),
                React.createElement(react_router_dom_1.Route, { path: "/self-discover/:uuid/edit", component: () => React.createElement(SelfDiscoverEditPage_1.SelfDiscoverEditPage, { openAiApi: _props.openAiApi }) }),
                React.createElement(react_router_dom_1.Route, { path: "/self-discover", component: SelfDiscoverListPage_1.SelfDiscoverListPage }),
                React.createElement(react_router_dom_1.Route, { path: "/", component: HomePage_1.HomePage })))));
}
exports.App = App;


/***/ }),

/***/ "./src/client-public/AssistantToolCallMessageForm.tsx":
/*!************************************************************!*\
  !*** ./src/client-public/AssistantToolCallMessageForm.tsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantToolCallMessageForm = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ToolCallListForm_1 = __webpack_require__(/*! ./ToolCallListForm */ "./src/client-public/ToolCallListForm.tsx");
function AssistantToolCallMessageForm(props) {
    const { message, onChange, onAddResponse, } = props;
    return React.createElement("div", { className: "ui form" },
        React.createElement(ToolCallListForm_1.ToolCallListForm, { toolCalls: message.tool_calls, onChange: (newToolCalls) => {
                onChange({
                    ...message,
                    tool_calls: newToolCalls,
                    tokenCount: undefined,
                }, message);
            }, onAddResponse: (toolCall) => {
                onAddResponse(toolCall);
            } }));
}
exports.AssistantToolCallMessageForm = AssistantToolCallMessageForm;


/***/ }),

/***/ "./src/client-public/ChatRequestConfigUx.tsx":
/*!***************************************************!*\
  !*** ./src/client-public/ChatRequestConfigUx.tsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRequestConfigUx = exports.responseFormatTypes = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
const ErrorMessage_1 = __webpack_require__(/*! ./ErrorMessage */ "./src/client-public/ErrorMessage.tsx");
exports.responseFormatTypes = [
    "text",
    "json_object",
];
function ChatRequestConfigUx(props) {
    const { config, onConfigChange, } = props;
    const [models,
    //setModels,
    ] = React.useState(() => {
        return localStorageUtil.loadModels().filter(model => model.id.startsWith("gpt"));
    });
    return React.createElement("div", { className: "ui form" },
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Model"),
            React.createElement("select", { value: config.model, onChange: (evt) => {
                    onConfigChange({
                        ...config,
                        model: evt.target.value,
                    });
                } },
                React.createElement("option", { key: "none", value: "", disabled: true }, "Select a Model"),
                models.map(model => {
                    return React.createElement("option", { key: model.id, value: model.id },
                        model.id,
                        " - (",
                        new Date(model.created * 1000).toISOString(),
                        ")");
                }))),
        React.createElement("div", { className: "field" },
            React.createElement("label", { "data-tooltip": "When using JSON mode, you must also instruct the model to produce JSON yourself via a system or user message.", "data-position": "top left", "data-inverted": true },
                "Response Format ",
                React.createElement("i", { className: "question circle icon" })),
            React.createElement("select", { value: config.response_format.type, onChange: (evt) => {
                    onConfigChange({
                        ...config,
                        response_format: {
                            type: evt.target.value,
                        },
                    });
                } }, exports.responseFormatTypes.map(responeFormatType => {
                return React.createElement("option", { key: responeFormatType, value: responeFormatType }, responeFormatType);
            })),
            config.response_format.type == "json_object" ?
                React.createElement(ErrorMessage_1.ErrorMessage, { error: {
                        messages: [
                            "When using JSON mode, you must also instruct the model to produce JSON yourself via a system or user message.",
                            "Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly \"stuck\" request.",
                            "Also note that the message content may be partially cut off if finish_reason=\"length\", which indicates the generation exceeded max_tokens or the conversation exceeded the max context length.",
                        ],
                        type: "warning",
                    } }) :
                undefined),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Temperature"),
            React.createElement("small", null,
                "What sampling temperature to use, between 0 and 2.",
                React.createElement("br", null),
                "Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
                React.createElement("br", null),
                "We generally recommend altering this or top_p but not both."),
            React.createElement("input", { type: "number", min: "0", max: "2", step: "0.01", value: config.temperature, onChange: (evt) => {
                    onConfigChange({
                        ...config,
                        temperature: Number(evt.target.value),
                    });
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Max Output Tokens"),
            React.createElement("small", null, "The maximum number of tokens that can be generated in the chat completion."),
            React.createElement("input", { type: "number", min: "1", max: "4096", step: "1", value: config.max_tokens, onChange: (evt) => {
                    onConfigChange({
                        ...config,
                        max_tokens: Number(evt.target.value),
                    });
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Stop Sequences"),
            React.createElement("small", null, "Up to 4 sequences where the API will stop generating further tokens."),
            React.createElement("input", { type: "text", placeholder: `A JSON string or JSON array: "test" or ["day", "night"]`, value: config.stop, onChange: (evt) => {
                    onConfigChange({
                        ...config,
                        stop: evt.target.value,
                    });
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Top P"),
            React.createElement("small", null,
                "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.",
                React.createElement("br", null),
                "So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
                React.createElement("br", null),
                "We generally recommend altering this or temperature but not both."),
            React.createElement("input", { type: "number", min: "0", max: "1", step: "0.01", value: config.top_p, onChange: (evt) => {
                    onConfigChange({
                        ...config,
                        top_p: Number(evt.target.value),
                    });
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Frequency Penalty"),
            React.createElement("small", null, "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim."),
            React.createElement("input", { type: "number", min: "-2", max: "2", step: "0.01", value: config.frequency_penalty, onChange: (evt) => {
                    onConfigChange({
                        ...config,
                        frequency_penalty: Number(evt.target.value),
                    });
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Presence Penalty"),
            React.createElement("small", null, "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics."),
            React.createElement("input", { type: "number", min: "-2", max: "2", step: "0.01", value: config.presence_penalty, onChange: (evt) => {
                    onConfigChange({
                        ...config,
                        presence_penalty: Number(evt.target.value),
                    });
                } })));
}
exports.ChatRequestConfigUx = ChatRequestConfigUx;


/***/ }),

/***/ "./src/client-public/ContentMessageForm.tsx":
/*!**************************************************!*\
  !*** ./src/client-public/ContentMessageForm.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentMessageForm = exports.isContentMessage = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const contentMessageTypes = [
    "system",
    "user",
    "assistant",
];
function isContentMessage(m) {
    return contentMessageTypes.includes(m.messageType);
}
exports.isContentMessage = isContentMessage;
function ContentMessageForm(props) {
    return React.createElement("div", { className: "ui form" },
        React.createElement("textarea", { style: {
                minHeight: "8em",
                maxHeight: "48em",
            }, value: props.message.content, onChange: (evt) => {
                props.onChange({
                    ...props.message,
                    content: evt.target.value,
                    tokenCount: undefined,
                }, props.message);
            } }));
}
exports.ContentMessageForm = ContentMessageForm;


/***/ }),

/***/ "./src/client-public/ConversationEditPage.tsx":
/*!****************************************************!*\
  !*** ./src/client-public/ConversationEditPage.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationEditPage = exports.submitConversation = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const gptTokenizer = __webpack_require__(/*! gpt-tokenizer */ "./node_modules/gpt-tokenizer/esm/main.js");
const localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
const ChatRequestConfigUx_1 = __webpack_require__(/*! ./ChatRequestConfigUx */ "./src/client-public/ChatRequestConfigUx.tsx");
const FunctionToolList_1 = __webpack_require__(/*! ./FunctionToolList */ "./src/client-public/FunctionToolList.tsx");
const MessageListForm_1 = __webpack_require__(/*! ./MessageListForm */ "./src/client-public/MessageListForm.tsx");
const api_openai_mapper_1 = __webpack_require__(/*! ../api-openai-mapper */ "./src/api-openai-mapper/index.ts");
const json_schema_editor_1 = __webpack_require__(/*! ../json-schema-editor */ "./src/json-schema-editor/index.tsx");
const use_error_1 = __webpack_require__(/*! ./use-error */ "./src/client-public/use-error.ts");
const ErrorMessage_1 = __webpack_require__(/*! ./ErrorMessage */ "./src/client-public/ErrorMessage.tsx");
const error_handling_1 = __webpack_require__(/*! ./error-handling */ "./src/client-public/error-handling.ts");
function toMessage(m) {
    switch (m.role) {
        case "system": {
            return {
                uuid: uuid.v4(),
                messageType: "system",
                role: m.role,
                content: m.content,
            };
        }
        case "user": {
            return {
                uuid: uuid.v4(),
                messageType: "user",
                role: m.role,
                content: m.content,
            };
        }
        case "assistant": {
            if ("tool_calls" in m) {
                return {
                    uuid: uuid.v4(),
                    messageType: "assistant_tool_call",
                    role: m.role,
                    tool_calls: m.tool_calls,
                };
            }
            else {
                return {
                    uuid: uuid.v4(),
                    messageType: "assistant",
                    role: m.role,
                    content: m.content,
                };
            }
        }
        case "tool": {
            return {
                uuid: uuid.v4(),
                messageType: "tool_response",
                role: m.role,
                tool_call_id: m.tool_call_id,
                name: m.name,
                content: m.content,
            };
        }
    }
}
function parseStop(str) {
    if (str.trim() == "") {
        return undefined;
    }
    try {
        const result = JSON.parse(str);
        if (typeof result == "string") {
            return [result];
        }
        else {
            return result;
        }
    }
    catch (err) {
        console.warn(err);
        return undefined;
    }
}
function parseFunctionTools(conversation, functionTools) {
    const result = functionTools
        .filter(f => {
        var _a;
        return Object.prototype.hasOwnProperty.call(conversation.usedFunctions, f.uuid) ?
            (_a = conversation.usedFunctions[f.uuid]) !== null && _a !== void 0 ? _a : false :
            false;
    })
        .map(f => {
        return {
            type: "function",
            function: {
                name: f.name,
                description: f.description,
                parameters: {
                    ...(0, json_schema_editor_1.cleanObject)(f.parameters),
                },
            },
        };
    });
    return result.length == 0 ?
        undefined :
        (0, api_openai_mapper_1.tools)("parseFunctionTools", result);
}
function parseMessages(messages) {
    return messages.map((m, i) => {
        return (0, api_openai_mapper_1.chatMessage)(`parseMessages[${i}]`, m);
    });
}
async function submitConversation(openAiApi, conversation, functionTools) {
    const parsedStop = parseStop(conversation.rawChatRequestConfig.stop);
    const response = await openAiApi.chat.complete()
        .setBody({
        model: conversation.rawChatRequestConfig.model,
        messages: parseMessages(conversation.messages),
        tools: parseFunctionTools(conversation, functionTools),
        tool_choice: undefined,
        temperature: conversation.rawChatRequestConfig.temperature,
        top_p: conversation.rawChatRequestConfig.top_p,
        /**
         * How many chat completion choices to generate for each input message.
         * Note that you will be charged based on the number of generated tokens across all of the choices.
         * Keep n as 1 to minimize costs.
         */
        n: undefined,
        stream: false,
        stop: parsedStop,
        max_tokens: conversation.rawChatRequestConfig.max_tokens,
        presence_penalty: conversation.rawChatRequestConfig.presence_penalty,
        frequency_penalty: conversation.rawChatRequestConfig.frequency_penalty,
        logit_bias: undefined,
        response_format: conversation.rawChatRequestConfig.response_format,
        user: undefined,
    })
        .send();
    if (response.responseBody.choices.length != 1) {
        console.error(response.responseBody);
        throw new Error(`Expected 1 choice, found ${response.responseBody.choices.length}`);
    }
    const choice = response.responseBody.choices[0];
    return {
        ...conversation,
        messages: [
            ...conversation.messages,
            toMessage(choice.message),
        ],
    };
}
exports.submitConversation = submitConversation;
function ConversationEditPage(props) {
    var _a;
    const routeParams = reactRouter.useParams();
    const [conversation, setConversation,] = React.useState(localStorageUtil.loadConversation(routeParams.uuid));
    const functionTools = React.useMemo(() => {
        return localStorageUtil.loadFunctionTools();
    }, []);
    const [isLoading, setIsLoading] = React.useState(false);
    const error = (0, use_error_1.useError)();
    React.useEffect(() => {
        if (conversation == undefined) {
            return;
        }
        const timer = setTimeout(() => {
            //localStorageUtil.loadConversation(conversation.uuid);
            localStorageUtil.saveConversation(conversation);
            const lastMessage = conversation.messages.length > 0 ?
                conversation.messages[conversation.messages.length - 1] :
                undefined;
            const meta = localStorageUtil.loadConversationsMeta().map((m) => {
                return m.uuid == conversation.uuid ?
                    {
                        uuid: conversation.uuid,
                        name: conversation.name,
                        description: conversation.description,
                        lastMessage: lastMessage == undefined ?
                            "" :
                            "content" in lastMessage ?
                                lastMessage.content.substring(0, 100) :
                                lastMessage.messageType,
                    } :
                    m;
            });
            localStorageUtil.saveConversationsMeta(meta);
        }, 1000);
        return () => clearTimeout(timer);
    }, [conversation]);
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (conversation == undefined) {
                return;
            }
            let tokenized = false;
            const newConversation = {
                ...conversation,
                messages: conversation.messages.map(m => {
                    if (m.tokenCount != undefined) {
                        return m;
                    }
                    if (m.messageType == "tool_response") {
                        tokenized = true;
                        return {
                            ...m,
                            tokenCount: gptTokenizer.encode(JSON.stringify({
                                tool_call_id: m.tool_call_id,
                                name: m.name,
                                content: m.content,
                            })).length,
                        };
                    }
                    if ("content" in m) {
                        tokenized = true;
                        return {
                            ...m,
                            tokenCount: gptTokenizer.encode(m.content).length,
                        };
                    }
                    if ("tool_calls" in m) {
                        tokenized = true;
                        return {
                            ...m,
                            tokenCount: gptTokenizer.encode(JSON.stringify(m.tool_calls)).length,
                        };
                    }
                    return m;
                }),
            };
            if (tokenized) {
                setConversation(newConversation);
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [(_a = conversation === null || conversation === void 0 ? void 0 : conversation.messages.map(m => m.tokenCount).join(",")) !== null && _a !== void 0 ? _a : ""]);
    if (conversation == undefined) {
        return React.createElement("div", { className: "ui main container" },
            "Conversation ",
            routeParams.uuid,
            " not found");
    }
    return React.createElement("div", { className: "ui main container" },
        React.createElement("div", { className: "ui form" },
            React.createElement("div", { className: "two fields" },
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Title"),
                    React.createElement("input", { placeholder: "Enter a Conversation Title", value: conversation.name, onChange: (evt) => {
                            setConversation({
                                ...conversation,
                                name: evt.target.value,
                            });
                        } })),
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Description"),
                    React.createElement("input", { placeholder: "Enter a Conversation Description", value: conversation.description, onChange: (evt) => {
                            setConversation({
                                ...conversation,
                                description: evt.target.value,
                            });
                        } }))),
            React.createElement("div", { className: "ui mini label" },
                "~",
                conversation.messages.reduce((sum, m) => {
                    var _a;
                    return sum + ((_a = m.tokenCount) !== null && _a !== void 0 ? _a : 0);
                }, 0),
                " tokens")),
        React.createElement(MessageListForm_1.MessageListForm, { messages: conversation.messages, onChange: (newMessages) => {
                setConversation({
                    ...conversation,
                    messages: newMessages,
                });
            } }),
        React.createElement("div", { className: "ui segment" },
            React.createElement(ErrorMessage_1.ErrorMessage, { error: error }),
            React.createElement("button", { className: "ui primary button", onClick: () => {
                    setConversation({
                        ...conversation,
                        messages: [
                            ...conversation.messages,
                            {
                                uuid: uuid.v4(),
                                messageType: "user",
                                role: "user",
                                content: "",
                            }
                        ],
                    });
                } }, "Add Message"),
            React.createElement("button", { className: classNames("ui primary button", isLoading ? "loading" : undefined), onClick: () => {
                    if (isLoading) {
                        return;
                    }
                    setIsLoading(true);
                    submitConversation(props.openAiApi, conversation, functionTools)
                        .then((newConversation) => {
                        setIsLoading(false);
                        setConversation(newConversation);
                        error.reset();
                    }, (err) => {
                        setIsLoading(false);
                        (0, error_handling_1.handleError)(error, err);
                    });
                } }, "Submit")),
        React.createElement("div", { className: "ui segment" },
            React.createElement(ChatRequestConfigUx_1.ChatRequestConfigUx, { config: conversation.rawChatRequestConfig, onConfigChange: (rawChatRequestConfig) => {
                    setConversation({
                        ...conversation,
                        rawChatRequestConfig,
                    });
                } })),
        React.createElement("div", { className: "ui segment" }, React.createElement(FunctionToolList_1.FunctionToolList, { functionTools: functionTools, editOnClick: false, rightFloatedContent: (f) => {
                var _a;
                return React.createElement("div", { className: "ui checkbox", key: f.uuid },
                    React.createElement("input", { type: "checkbox", checked: Object.prototype.hasOwnProperty.call(conversation.usedFunctions, f.uuid) ?
                            (_a = conversation.usedFunctions[f.uuid]) !== null && _a !== void 0 ? _a : false :
                            false, onChange: (evt) => {
                            setConversation({
                                ...conversation,
                                usedFunctions: {
                                    ...conversation.usedFunctions,
                                    [f.uuid]: evt.target.checked
                                },
                            });
                        } }),
                    React.createElement("label", null));
            } })));
}
exports.ConversationEditPage = ConversationEditPage;


/***/ }),

/***/ "./src/client-public/ConversationListPage.tsx":
/*!****************************************************!*\
  !*** ./src/client-public/ConversationListPage.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationListPage = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
const localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
//import { Conversation } from "./ConversationForm";
function ConversationListPage() {
    const history = reactRouter.useHistory();
    const [conversations, setConversations,] = React.useState(localStorageUtil.loadConversationsMeta());
    return React.createElement("div", { className: "ui main container" },
        React.createElement("div", { className: "ui segment divided selection massive list" }, conversations.map(meta => {
            const displayName = meta.name.trim() == "" ?
                `Conversation ${meta.uuid}` :
                meta.name;
            return React.createElement("div", { className: "item", key: meta.uuid, onClick: () => {
                    history.push(`/conversation/${meta.uuid}/edit`);
                } },
                React.createElement("div", { className: "extra right floated" },
                    React.createElement("div", { className: "ui icon secondary button", onClick: (evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Copy ${displayName}?`)) {
                                const existingConversation = localStorageUtil.loadConversation(meta.uuid);
                                if (existingConversation == undefined) {
                                    alert(`Cannot find ${displayName} / ${meta.uuid}`);
                                    return;
                                }
                                const newUuid = uuid.v4();
                                const newConversation = {
                                    ...existingConversation,
                                    uuid: newUuid,
                                    name: `Copy of ${displayName}`,
                                };
                                const newConversations = [
                                    ...localStorageUtil.loadConversationsMeta(),
                                    {
                                        ...meta,
                                        uuid: newUuid,
                                        name: `Copy of ${displayName}`,
                                    },
                                ];
                                setConversations(newConversations);
                                localStorageUtil.saveConversationsMeta(newConversations);
                                localStorageUtil.saveConversation(newConversation);
                            }
                        } },
                        React.createElement("i", { className: "copy icon" })),
                    React.createElement("div", { className: "ui icon red button", onClick: (evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Delete ${displayName}?`)) {
                                const newConversations = localStorageUtil.loadConversationsMeta()
                                    .filter(m => m.uuid != meta.uuid);
                                setConversations(newConversations);
                                localStorageUtil.saveConversationsMeta(newConversations);
                                localStorageUtil.deleteConversation(meta);
                            }
                        } },
                        React.createElement("i", { className: "trash icon" }))),
                React.createElement("div", { className: "content" },
                    React.createElement("div", { className: "header" }, displayName),
                    React.createElement("div", { className: "ui mini label" }, meta.uuid),
                    meta.description.trim() == "" ?
                        React.createElement("small", { className: "description" }, "There is no description for this conversation") :
                        React.createElement("div", { className: "description" }, meta.description),
                    meta.lastMessage.trim() == "" ?
                        undefined :
                        React.createElement("div", { className: "description one-line-ellipsis small-description" },
                            "Last Message: ",
                            meta.lastMessage)));
        })),
        React.createElement("button", { className: "ui primary button", onClick: () => {
                const conversations = localStorageUtil.loadConversationsMeta();
                const { meta, conversation, } = localStorageUtil.makeConversation();
                const newConversations = [
                    ...conversations,
                    meta,
                ];
                localStorageUtil.saveConversationsMeta(newConversations);
                localStorageUtil.saveConversation(conversation);
                setConversations(newConversations);
            } }, "Create Conversation"));
}
exports.ConversationListPage = ConversationListPage;


/***/ }),

/***/ "./src/client-public/DefaultMenu.tsx":
/*!*******************************************!*\
  !*** ./src/client-public/DefaultMenu.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMenu = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function DefaultMenu(props) {
    const [searchInput, setSearchInput] = React.useState("");
    //const dropdownSearch = useDropdown({});
    return React.createElement(react_router_dom_1.Route, { render: ({ history }) => {
            //searchId, atVersion, rowsPerPage
            //atVersion
            //Convenience method to pick values, stringify and prepend "?" character
            /*const queryOnlyLanguageCode = {
                languageCode : query.languageCode,
            };*/
            const goToSearch = () => {
                if (/^\s*$/.test(searchInput)) {
                    return;
                }
                history.push(`/search/title/${encodeURIComponent(searchInput)}`);
            };
            return (React.createElement("div", { className: "ui fixed inverted menu" },
                React.createElement("a", { className: "ui item header home-button", onClick: props.sidebarHook.onClick, onMouseOver: props.sidebarHook.onMouseOver, ref: props.sidebarHook.ref },
                    React.createElement("span", { className: "home-button-text" },
                        React.createElement("i", { className: "bars icon" })),
                    React.createElement("span", { className: "mini-home-button-text" },
                        React.createElement("i", { className: "bars icon" }))),
                React.createElement("div", { className: "ui item", style: {
                        minWidth: "0px",
                        //maxWidth : "200px",
                        flex: 1,
                    } },
                    React.createElement("form", { className: "ui input", onSubmit: (e) => {
                            e.preventDefault();
                            goToSearch();
                        } },
                        React.createElement("input", { type: "text", placeholder: "Search...", value: searchInput, onChange: (e) => {
                                setSearchInput(e.target.value);
                            } })))));
        } });
}
exports.DefaultMenu = DefaultMenu;


/***/ }),

/***/ "./src/client-public/ErrorMessage.tsx":
/*!********************************************!*\
  !*** ./src/client-public/ErrorMessage.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function ErrorMessage(props) {
    const { error } = props;
    if (error.messages.length == 0) {
        return React.createElement("div", { className: "ui hidden message" });
    }
    else {
        return (React.createElement("div", { className: "ui icon message " + error.type, style: { display: "flex" } },
            React.createElement("i", { className: "exclamation triangle icon" }),
            React.createElement("div", { className: "content" },
                React.createElement("div", { className: "header" }, error.type == "warning" ? "Warning" : "Error"),
                React.createElement("ul", { className: "list" },
                    error.messages.map((message, i) => React.createElement("li", { key: i }, message)),
                    error.messages.some(msg => msg.startsWith("no such")) ?
                        React.createElement("li", null,
                            React.createElement(react_router_dom_1.Link, { to: "/" }, "Maybe peforming a local data update on the Home page will help")) :
                        undefined))));
    }
}
exports.ErrorMessage = ErrorMessage;


/***/ }),

/***/ "./src/client-public/FunctionToolEditPage.tsx":
/*!****************************************************!*\
  !*** ./src/client-public/FunctionToolEditPage.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionToolEditPage = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
const FunctionToolForm_1 = __webpack_require__(/*! ./FunctionToolForm */ "./src/client-public/FunctionToolForm.tsx");
function FunctionToolEditPage() {
    const history = reactRouter.useHistory();
    const routeParams = reactRouter.useParams();
    const [functionTool, setFunctionTool,] = React.useState(localStorageUtil.loadFunctionTools().find(f => f.uuid == routeParams.uuid));
    if (functionTool == undefined) {
        return React.createElement("div", { className: "ui main container" },
            "Function Tool ",
            routeParams.uuid,
            " not found");
    }
    return React.createElement("div", { className: "ui main container" },
        React.createElement("div", { className: "ui segment" },
            React.createElement(FunctionToolForm_1.FunctionToolForm, { functionTool: functionTool, onChange: setFunctionTool })),
        React.createElement("button", { className: "ui primary button", onClick: () => {
                const functionTools = localStorageUtil.loadFunctionTools();
                const newFunctionTools = functionTools.map(f => {
                    return f.uuid == routeParams.uuid ?
                        functionTool :
                        f;
                });
                localStorageUtil.saveFunctionTools(newFunctionTools);
                history.push("/function-tool");
            } }, "Save"));
}
exports.FunctionToolEditPage = FunctionToolEditPage;


/***/ }),

/***/ "./src/client-public/FunctionToolForm.tsx":
/*!************************************************!*\
  !*** ./src/client-public/FunctionToolForm.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionToolForm = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const jsonSchemaEditor = __webpack_require__(/*! ../json-schema-editor */ "./src/json-schema-editor/index.tsx");
const use_error_1 = __webpack_require__(/*! ./use-error */ "./src/client-public/use-error.ts");
const error_handling_1 = __webpack_require__(/*! ./error-handling */ "./src/client-public/error-handling.ts");
function FunctionToolForm(props) {
    const { functionTool, onChange, } = props;
    const [testArgs, setTestArgs] = React.useState("");
    const [testOutput, setTestOutput] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const error = (0, use_error_1.useError)();
    return React.createElement("div", { className: "ui form" },
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Name"),
            React.createElement("small", null, "The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64."),
            React.createElement("input", { type: "text", value: functionTool.name, onChange: (evt) => {
                    onChange({
                        ...functionTool,
                        name: evt.target.value,
                    });
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Description"),
            React.createElement("small", null, "A description of what the function does, used by the model to choose when and how to call the function."),
            React.createElement("input", { type: "text", value: functionTool.description, onChange: (evt) => {
                    onChange({
                        ...functionTool,
                        description: evt.target.value,
                    });
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Parameters"),
            React.createElement("small", null,
                "The parameters the functions accepts, described as a JSON Schema object. See the",
                React.createElement("a", { href: "https://platform.openai.com/docs/guides/text-generation/function-calling" }, "guide"),
                "for examples, and the",
                React.createElement("a", { href: "https://json-schema.org/understanding-json-schema/" }, "JSON Schema reference"),
                "for documentation about the format. Omitting parameters defines a function with an empty parameter list."),
            React.createElement(jsonSchemaEditor.ObjectEditor, { object: functionTool.parameters, onChange: (object) => {
                    onChange({
                        ...functionTool,
                        parameters: object,
                    });
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Use JavaScript Implementation"),
            React.createElement("div", { className: "ui checkbox" },
                React.createElement("input", { type: "checkbox", checked: functionTool.useJavaScriptImpl || false, onChange: (evt) => {
                        onChange({
                            ...functionTool,
                            useJavaScriptImpl: evt.target.checked,
                        });
                    } }),
                React.createElement("label", null, "Use JavaScript Implementation"))),
        functionTool.useJavaScriptImpl ?
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "JavaScript Implementation"),
                React.createElement("textarea", { value: functionTool.javaScriptImpl, placeholder: `function (args) {}`, onChange: (evt) => {
                        onChange({
                            ...functionTool,
                            javaScriptImpl: evt.target.value,
                        });
                    } })) :
            undefined,
        functionTool.useJavaScriptImpl ?
            React.createElement(React.Fragment, null,
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Test Args"),
                    React.createElement("textarea", { value: testArgs, onChange: (evt) => {
                            setTestArgs(evt.target.value);
                        } })),
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Test Output"),
                    React.createElement("textarea", { value: testOutput, readOnly: true })),
                React.createElement("button", { className: classNames("ui primary button", isLoading ? "loading" : undefined), onClick: () => {
                        if (isLoading) {
                            return;
                        }
                        try {
                            const f = new Function(`return ${functionTool.javaScriptImpl}`)();
                            const args = JSON.parse(testArgs);
                            const promise = Promise.resolve(f(args));
                            setIsLoading(true);
                            promise
                                .then((result) => {
                                setIsLoading(false);
                                setTestOutput(JSON.stringify(result, null, 2));
                                error.reset();
                            }, (err) => {
                                setIsLoading(false);
                                (0, error_handling_1.handleError)(error, err);
                            });
                        }
                        catch (err) {
                            setIsLoading(false);
                            (0, error_handling_1.handleError)(error, err);
                        }
                    } }, "Test")) :
            undefined);
}
exports.FunctionToolForm = FunctionToolForm;


/***/ }),

/***/ "./src/client-public/FunctionToolList.tsx":
/*!************************************************!*\
  !*** ./src/client-public/FunctionToolList.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionToolList = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
function FunctionToolList(props) {
    const history = reactRouter.useHistory();
    const { functionTools, editOnClick, leftFloatedContent, rightFloatedContent, } = props;
    return React.createElement("div", { className: "ui segment divided selection massive list" }, functionTools.map(f => {
        return React.createElement("div", { className: "item", key: f.uuid, onClick: () => {
                if (!editOnClick) {
                    return;
                }
                history.push(`/function-tool/${f.uuid}/edit`);
            } },
            leftFloatedContent == undefined ?
                undefined :
                React.createElement("div", { className: "left floated content" }, leftFloatedContent(f)),
            rightFloatedContent == undefined ?
                undefined :
                React.createElement("div", { className: "right floated content" }, rightFloatedContent(f)),
            React.createElement("div", { className: "content" },
                React.createElement("div", { className: "header" }, f.name.trim() == "" ?
                    `Function ${f.uuid}` :
                    f.name),
                React.createElement("div", { className: "ui mini label" }, f.uuid),
                f.parameters.properties.map(p => {
                    return React.createElement("div", { key: p.propertyName, className: classNames("ui mini label", p.propertyRequired ? "red" : "yellow") }, p.propertyName);
                }),
                f.description.trim() == "" ?
                    React.createElement("small", { className: "description" }, "There is no description for this function") :
                    React.createElement("div", { className: "description" }, f.description)));
    }));
}
exports.FunctionToolList = FunctionToolList;


/***/ }),

/***/ "./src/client-public/FunctionToolListPage.tsx":
/*!****************************************************!*\
  !*** ./src/client-public/FunctionToolListPage.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionToolListPage = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
const localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
const FunctionToolList_1 = __webpack_require__(/*! ./FunctionToolList */ "./src/client-public/FunctionToolList.tsx");
function FunctionToolListPage() {
    const [functionTools, setFunctionTools,] = React.useState(localStorageUtil.loadFunctionTools());
    return React.createElement("div", { className: "ui main container" },
        React.createElement(FunctionToolList_1.FunctionToolList, { functionTools: functionTools, editOnClick: true }),
        React.createElement("button", { className: "ui primary button", onClick: () => {
                const functionTools = localStorageUtil.loadFunctionTools();
                const newFunctionTools = [
                    ...functionTools,
                    {
                        uuid: uuid.v4(),
                        name: "",
                        description: "",
                        parameters: {
                            type: "object",
                            required: [],
                            properties: [],
                        },
                        useJavaScriptImpl: undefined,
                        javaScriptImpl: undefined,
                    },
                ];
                localStorageUtil.saveFunctionTools(newFunctionTools);
                setFunctionTools(newFunctionTools);
            } }, "Create Function Tool"));
}
exports.FunctionToolListPage = FunctionToolListPage;


/***/ }),

/***/ "./src/client-public/HomePage.tsx":
/*!****************************************!*\
  !*** ./src/client-public/HomePage.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const local_storage_util_1 = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
const supportedLabel = (supported) => {
    return (React.createElement("span", { className: classnames("ui mini label", supported ? "green" : "red") }, supported ? "Supported" : "Not Supported"));
};
const HomePage = (_props) => {
    return (React.createElement("div", { className: "ui main container" },
        React.createElement("h1", { className: "ui dividing header" }, "Chat GPT Playground"),
        React.createElement("p", null),
        React.createElement("p", null),
        React.createElement("hr", null),
        React.createElement("hr", null),
        "Browser information.",
        React.createElement("table", { className: "ui celled unstackable table" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Browser API"),
                    React.createElement("th", null, "Your Browser"))),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("a", { href: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" }, "Local Storage")),
                    React.createElement("td", null,
                        supportedLabel((0, local_storage_util_1.localStorageSupported)()),
                        React.createElement("br", null),
                        (0, local_storage_util_1.kbUsed)(),
                        " KB used")),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("a", { href: "https://developer.mozilla.org/en-US/docs/WebAssembly" }, "Web Assembly")),
                    React.createElement("td", null, supportedLabel(typeof WebAssembly !== "undefined"))),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("a", { href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API" }, "Web Workers")),
                    React.createElement("td", null, supportedLabel(typeof Worker !== "undefined"))),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("a", { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt" }, "BigInt")),
                    React.createElement("td", null,
                        //eslint-disable-next-line local/polyfilled-bigint
                        supportedLabel(typeof BigInt(0) == "bigint"),
                        React.createElement("br", null),
                        "(Polyfilled if not supported)")))),
        React.createElement("hr", null),
        React.createElement("div", { style: {
                paddingTop: "30px",
            } })));
};
exports.HomePage = HomePage;


/***/ }),

/***/ "./src/client-public/MessageForm.tsx":
/*!*******************************************!*\
  !*** ./src/client-public/MessageForm.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageForm = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const local_storage_util_1 = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
const ContentMessageForm_1 = __webpack_require__(/*! ./ContentMessageForm */ "./src/client-public/ContentMessageForm.tsx");
const AssistantToolCallMessageForm_1 = __webpack_require__(/*! ./AssistantToolCallMessageForm */ "./src/client-public/AssistantToolCallMessageForm.tsx");
const ToolResponseMessageForm_1 = __webpack_require__(/*! ./ToolResponseMessageForm */ "./src/client-public/ToolResponseMessageForm.tsx");
const messageTypes = [
    "system",
    "user",
    "assistant",
    "assistant_tool_call",
    "tool_response",
];
function MessageForm(props) {
    var _a, _b, _c;
    const { messages, message, onChange, onRemove, onMoveUp, onMoveDown, onAddResponse, } = props;
    return React.createElement("div", { className: "item" },
        React.createElement("div", { className: "ui form" },
            React.createElement("div", { className: "two fields" },
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Message Type"),
                    React.createElement("select", { value: message.messageType, onChange: (evt) => {
                            const messageType = evt.target.value;
                            switch (messageType) {
                                case "system": {
                                    onChange({
                                        ...message,
                                        messageType,
                                        role: "system",
                                        content: "content" in message ?
                                            message.content :
                                            "",
                                        tokenCount: undefined,
                                    }, message);
                                    break;
                                }
                                case "user": {
                                    onChange({
                                        ...message,
                                        messageType,
                                        role: "user",
                                        content: "content" in message ?
                                            message.content :
                                            "",
                                        tokenCount: undefined,
                                    }, message);
                                    break;
                                }
                                case "assistant": {
                                    onChange({
                                        ...message,
                                        messageType,
                                        role: "assistant",
                                        content: "content" in message ?
                                            message.content :
                                            "",
                                        tokenCount: undefined,
                                    }, message);
                                    break;
                                }
                                case "assistant_tool_call": {
                                    onChange({
                                        ...message,
                                        messageType,
                                        role: "assistant",
                                        tool_calls: "tool_calls" in message ?
                                            message.tool_calls :
                                            [],
                                        tokenCount: undefined,
                                    }, message);
                                    break;
                                }
                                case "tool_response": {
                                    onChange({
                                        ...message,
                                        messageType,
                                        role: "tool",
                                        tool_call_id: "tool_call_id" in message ?
                                            message.tool_call_id :
                                            "",
                                        name: "name" in message ?
                                            message.name :
                                            "",
                                        content: "content" in message ?
                                            message.content :
                                            "",
                                        tokenCount: undefined,
                                    }, message);
                                    break;
                                }
                            }
                        } }, messageTypes.map(s => {
                        return React.createElement("option", { key: s, value: s }, s);
                    }))),
                React.createElement("div", { className: "field button group", style: {
                        alignSelf: "flex-end",
                    } },
                    React.createElement("button", { className: "ui icon red button", onClick: () => onRemove(message) },
                        React.createElement("i", { className: "trash icon" })),
                    message.messageType == "assistant_tool_call" ?
                        React.createElement("button", { className: "ui icon primary button", onClick: () => onAddResponse(message.tool_calls) },
                            React.createElement("i", { className: "reply icon" })) :
                        undefined,
                    React.createElement("button", { className: "ui icon button", onClick: () => onMoveUp(message) },
                        React.createElement("i", { className: "arrow up icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: () => onMoveDown(message) },
                        React.createElement("i", { className: "arrow down icon" }))))),
        (0, ContentMessageForm_1.isContentMessage)(message) ?
            React.createElement(ContentMessageForm_1.ContentMessageForm, { message: message, onChange: (newMessage) => {
                    onChange(newMessage, message);
                } }) :
            undefined,
        message.messageType == "assistant_tool_call" ?
            React.createElement(AssistantToolCallMessageForm_1.AssistantToolCallMessageForm, { message: message, onChange: (newMessage) => {
                    onChange(newMessage, message);
                }, onAddResponse: (toolCall) => {
                    onAddResponse([toolCall]);
                } }) :
            undefined,
        message.messageType == "tool_response" ?
            React.createElement(ToolResponseMessageForm_1.ToolResponseMessageForm, { message: message, functionArguments: (_c = ((_b = (_a = messages
                    .filter(local_storage_util_1.isAssistantToolCallMessage)
                    .flatMap(m => m.tool_calls)
                    .find(tc => tc.id == message.tool_call_id)) === null || _a === void 0 ? void 0 : _a.function) === null || _b === void 0 ? void 0 : _b.arguments)) !== null && _c !== void 0 ? _c : "", onChange: (newMessage) => {
                    onChange(newMessage, message);
                } }) :
            undefined,
        message.tokenCount == undefined ?
            React.createElement("div", { className: "ui mini label" }, "~- tokens") :
            React.createElement("div", { className: "ui mini label" },
                "~",
                message.tokenCount,
                " tokens"));
}
exports.MessageForm = MessageForm;


/***/ }),

/***/ "./src/client-public/MessageListForm.tsx":
/*!***********************************************!*\
  !*** ./src/client-public/MessageListForm.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageListForm = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
const MessageForm_1 = __webpack_require__(/*! ./MessageForm */ "./src/client-public/MessageForm.tsx");
function MessageListForm(props) {
    const { messages, onChange, } = props;
    return React.createElement("div", { className: "ui segment divided selection massive list" }, messages.map((m, index) => {
        return React.createElement(MessageForm_1.MessageForm, { messages: messages, key: m.uuid, message: m, onChange: (newMessage) => {
                onChange(messages.map(m => {
                    return m.uuid == newMessage.uuid ?
                        newMessage :
                        m;
                }), messages);
            }, onRemove: () => {
                const newMessages = [...messages];
                newMessages.splice(index, 1);
                onChange(newMessages, messages);
            }, onMoveUp: (m) => {
                if (index == 0) {
                    return;
                }
                const newMessages = [...messages];
                newMessages.splice(index, 1);
                newMessages.splice(index - 1, 0, m);
                onChange(newMessages, messages);
            }, onMoveDown: (m) => {
                if (index >= messages.length) {
                    return;
                }
                const newMessages = [...messages];
                newMessages.splice(index, 1);
                newMessages.splice(index + 1, 0, m);
                onChange(newMessages, messages);
            }, onAddResponse: (toolCalls) => {
                onChange([
                    ...messages,
                    ...toolCalls.map((tc) => {
                        return {
                            uuid: uuid.v4(),
                            messageType: "tool_response",
                            role: "tool",
                            tool_call_id: tc.id,
                            name: tc.function.name,
                            content: "",
                        };
                    })
                ], messages);
            } });
    }));
}
exports.MessageListForm = MessageListForm;


/***/ }),

/***/ "./src/client-public/ModelListPage.tsx":
/*!*********************************************!*\
  !*** ./src/client-public/ModelListPage.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelListPage = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
const use_error_1 = __webpack_require__(/*! ./use-error */ "./src/client-public/use-error.ts");
const error_handling_1 = __webpack_require__(/*! ./error-handling */ "./src/client-public/error-handling.ts");
function ModelListPage(props) {
    const [models, setModels,] = React.useState(localStorageUtil.loadModels());
    const [isLoading, setIsLoading] = React.useState(false);
    const error = (0, use_error_1.useError)();
    return React.createElement("div", { className: "ui main container" },
        React.createElement("div", { className: "ui segment divided selection massive list" }, models.map(f => {
            return React.createElement("div", { className: "item", key: f.id },
                React.createElement("div", { className: "content" },
                    React.createElement("div", { className: "header" }, f.id),
                    React.createElement("div", { className: "ui mini label" }, f.created),
                    React.createElement("div", { className: "ui mini label" }, new Date(f.created * 1000).toISOString()),
                    React.createElement("div", { className: "ui mini label" }, f.owned_by)));
        })),
        React.createElement("button", { className: classNames("ui primary button", isLoading ? "loading" : undefined), onClick: () => {
                if (isLoading) {
                    return;
                }
                setIsLoading(true);
                props.openAiApi.model.list()
                    .send()
                    .then((res) => {
                    const arr = [...res.responseBody.data];
                    arr.sort((a, b) => {
                        return b.created - a.created;
                    });
                    setIsLoading(false);
                    setModels(arr);
                    localStorageUtil.saveModels(arr);
                    error.reset();
                }, (err) => {
                    setIsLoading(false);
                    (0, error_handling_1.handleError)(error, err);
                });
            } }, "Update"));
}
exports.ModelListPage = ModelListPage;


/***/ }),

/***/ "./src/client-public/ToolCallForm.tsx":
/*!********************************************!*\
  !*** ./src/client-public/ToolCallForm.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolCallForm = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function ToolCallForm(props) {
    const { toolCall, onChange, onRemove, onMoveUp, onMoveDown, onAddResponse, } = props;
    return React.createElement("div", { className: "item" },
        React.createElement("div", { className: "ui form" },
            React.createElement("div", { className: "two fields" },
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "ID"),
                    React.createElement("input", { type: "text", value: toolCall.id, placeholder: "ID", onChange: (evt) => {
                            onChange({
                                ...toolCall,
                                id: evt.target.value,
                            }, toolCall);
                        } })),
                React.createElement("div", { className: "field button group", style: {
                        alignSelf: "flex-end",
                    } },
                    React.createElement("button", { className: "ui icon red button", onClick: () => onRemove(toolCall) },
                        React.createElement("i", { className: "trash icon" })),
                    React.createElement("button", { className: "ui icon primary button", onClick: () => onAddResponse(toolCall) },
                        React.createElement("i", { className: "reply icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: () => onMoveUp(toolCall) },
                        React.createElement("i", { className: "arrow up icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: () => onMoveDown(toolCall) },
                        React.createElement("i", { className: "arrow down icon" })))),
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Function Name"),
                React.createElement("input", { type: "text", value: toolCall.function.name, placeholder: "Function Name", onChange: (evt) => {
                        onChange({
                            ...toolCall,
                            function: {
                                ...toolCall.function,
                                name: evt.target.value,
                            },
                        }, toolCall);
                    } })),
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Function Arguments"),
                React.createElement("textarea", { value: toolCall.function.arguments, placeholder: "Function Arguments", onChange: (evt) => {
                        onChange({
                            ...toolCall,
                            function: {
                                ...toolCall.function,
                                arguments: evt.target.value,
                            },
                        }, toolCall);
                    } }))));
}
exports.ToolCallForm = ToolCallForm;


/***/ }),

/***/ "./src/client-public/ToolCallListForm.tsx":
/*!************************************************!*\
  !*** ./src/client-public/ToolCallListForm.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolCallListForm = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ToolCallForm_1 = __webpack_require__(/*! ./ToolCallForm */ "./src/client-public/ToolCallForm.tsx");
function ToolCallListForm(props) {
    const { toolCalls, onChange, onAddResponse, } = props;
    return React.createElement("div", { className: "ui segment divided selection massive list" }, toolCalls.map((m, index) => {
        return React.createElement(ToolCallForm_1.ToolCallForm, { key: index, toolCall: m, onChange: (newToolCall) => {
                onChange(toolCalls.map((m, changedIndex) => {
                    return index == changedIndex ?
                        newToolCall :
                        m;
                }), toolCalls);
            }, onRemove: () => {
                const newToolCalls = [...toolCalls];
                newToolCalls.splice(index, 1);
                onChange(newToolCalls, toolCalls);
            }, onAddResponse: (toolCall) => {
                onAddResponse(toolCall);
            }, onMoveUp: (m) => {
                if (index == 0) {
                    return;
                }
                const newToolCalls = [...toolCalls];
                newToolCalls.splice(index, 1);
                newToolCalls.splice(index - 1, 0, m);
                onChange(newToolCalls, toolCalls);
            }, onMoveDown: (m) => {
                if (index >= toolCalls.length) {
                    return;
                }
                const newToolCalls = [...toolCalls];
                newToolCalls.splice(index, 1);
                newToolCalls.splice(index + 1, 0, m);
                onChange(newToolCalls, toolCalls);
            } });
    }));
}
exports.ToolCallListForm = ToolCallListForm;


/***/ }),

/***/ "./src/client-public/ToolResponseMessageForm.tsx":
/*!*******************************************************!*\
  !*** ./src/client-public/ToolResponseMessageForm.tsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolResponseMessageForm = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
const use_error_1 = __webpack_require__(/*! ./use-error */ "./src/client-public/use-error.ts");
const error_handling_1 = __webpack_require__(/*! ./error-handling */ "./src/client-public/error-handling.ts");
function ToolResponseMessageForm(props) {
    const { message, functionArguments, onChange, } = props;
    const [functionTool, setFunctionTool] = React.useState(() => {
        return localStorageUtil.loadFunctionTools()
            .find(f => f.name == message.name);
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const error = (0, use_error_1.useError)();
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setFunctionTool(localStorageUtil.loadFunctionTools()
                .find(f => f.name == message.name));
        }, 1000);
        return () => clearTimeout(timer);
    }, [message.name]);
    return React.createElement("div", { className: "ui form" },
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Tool Call ID"),
            React.createElement("input", { type: "text", value: message.tool_call_id, placeholder: "Tool Call ID", onChange: (evt) => {
                    onChange({
                        ...message,
                        tool_call_id: evt.target.value,
                        tokenCount: undefined,
                    }, message);
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Function Name"),
            React.createElement("input", { type: "text", value: message.name, placeholder: "Function Name", onChange: (evt) => {
                    onChange({
                        ...message,
                        name: evt.target.value,
                        tokenCount: undefined,
                    }, message);
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Function Arguments"),
            React.createElement("textarea", { value: functionArguments, placeholder: "Function Arguments", readOnly: true })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Content"),
            functionTool == undefined ?
                undefined :
                React.createElement("button", { className: classNames("ui primary button", isLoading ? "loading" : undefined), onClick: () => {
                        if (isLoading) {
                            return;
                        }
                        try {
                            const f = new Function(`return ${functionTool.javaScriptImpl}`)();
                            const args = functionArguments == undefined ?
                                {} :
                                JSON.parse(functionArguments);
                            const promise = Promise.resolve(f(args));
                            setIsLoading(true);
                            promise
                                .then((result) => {
                                setIsLoading(false);
                                onChange({
                                    ...message,
                                    content: JSON.stringify(result, null, 2),
                                    tokenCount: undefined,
                                }, message);
                                error.reset();
                            }, (err) => {
                                setIsLoading(false);
                                (0, error_handling_1.handleError)(error, err);
                            });
                        }
                        catch (err) {
                            setIsLoading(false);
                            (0, error_handling_1.handleError)(error, err);
                        }
                    } }, "Execute JavaScript"),
            React.createElement("textarea", { value: message.content, placeholder: "Content (The result of the tool call)", onChange: (evt) => {
                    onChange({
                        ...message,
                        content: evt.target.value,
                        tokenCount: undefined,
                    }, message);
                } })));
}
exports.ToolResponseMessageForm = ToolResponseMessageForm;


/***/ }),

/***/ "./src/client-public/error-handling.ts":
/*!*********************************************!*\
  !*** ./src/client-public/error-handling.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
function handleError(error, err) {
    var _a, _b;
    console.log(Object.getOwnPropertyNames(err));
    console.log(err);
    const propertyErrors = err === null || err === void 0 ? void 0 : err.propertyErrors;
    if (propertyErrors instanceof Array) {
        for (const propertyError of propertyErrors) {
            error.push("negative", [
                `${String(propertyError)} (${propertyError.actualValue})`
            ]);
        }
        return;
    }
    const responseBody = (_a = err === null || err === void 0 ? void 0 : err.sendResult) === null || _a === void 0 ? void 0 : _a.responseBody;
    const responseErrorMessage = (_b = responseBody === null || responseBody === void 0 ? void 0 : responseBody.error) === null || _b === void 0 ? void 0 : _b.message;
    const errorMessage = err === null || err === void 0 ? void 0 : err.message;
    if (responseErrorMessage != undefined) {
        error.push("negative", [responseErrorMessage]);
        return;
    }
    if (errorMessage != undefined) {
        error.push("negative", [errorMessage]);
        return;
    }
    error.push("negative", ["Unknown error"]);
}
exports.handleError = handleError;


/***/ }),

/***/ "./src/client-public/local-storage-util.ts":
/*!*************************************************!*\
  !*** ./src/client-public/local-storage-util.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.saveModels = exports.loadModels = exports.deleteSelfDiscover = exports.deleteConversation = exports.saveSelfDiscover = exports.saveConversation = exports.loadSelfDiscover = exports.loadConversation = exports.makeSelfDiscoverTask = exports.makeSelfDiscover = exports.makeConversation = exports.saveSelfDiscoversMeta = exports.saveConversationsMeta = exports.loadSelfDiscoversMeta = exports.loadConversationsMeta = exports.isAssistantToolCallMessage = exports.saveFunctionTools = exports.loadFunctionTools = exports.LocalStorageKey = exports.kbUsed = exports.removeItem = exports.setItem = exports.getItem = exports.localStorageSupported = void 0;
const uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
function localStorageSupported() {
    return ("localStorage" in self);
}
exports.localStorageSupported = localStorageSupported;
function getItem(key) {
    return (localStorageSupported() ?
        localStorage.getItem(key) :
        null);
}
exports.getItem = getItem;
function setItem(key, value) {
    if (localStorageSupported()) {
        localStorage.setItem(key, value);
    }
}
exports.setItem = setItem;
function removeItem(key) {
    if (localStorageSupported()) {
        localStorage.removeItem(key);
    }
}
exports.removeItem = removeItem;
/**
 * https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage
 * @returns
 */
function kbUsed() {
    let _lsTotal = 0, _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
        console.log(_x.substring(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
    }
    ;
    const totalKb = Number((_lsTotal / 1024).toFixed(2));
    console.log("Total = " + totalKb + " KB");
    return totalKb;
}
exports.kbUsed = kbUsed;
var LocalStorageKey;
(function (LocalStorageKey) {
    LocalStorageKey["OPEN_AI_API_KEY"] = "OPEN_AI_API_KEY";
    LocalStorageKey["FUNCTION_TOOLS"] = "FUNCTION_TOOLS";
    LocalStorageKey["CONVERSATIONS_META"] = "CONVERSATIONS_META";
    LocalStorageKey["CONVERSATION"] = "CONVERSATION";
    LocalStorageKey["MODELS"] = "MODELS";
    LocalStorageKey["SELF_DISCOVERS_META"] = "SELF_DISCOVERS_META";
    LocalStorageKey["SELF_DISCOVER"] = "SELF_DISCOVER";
})(LocalStorageKey || (exports.LocalStorageKey = LocalStorageKey = {}));
function loadFunctionTools() {
    var _a;
    return JSON.parse((_a = getItem(LocalStorageKey.FUNCTION_TOOLS)) !== null && _a !== void 0 ? _a : "[]");
}
exports.loadFunctionTools = loadFunctionTools;
function saveFunctionTools(tools) {
    return setItem(LocalStorageKey.FUNCTION_TOOLS, JSON.stringify(tools));
}
exports.saveFunctionTools = saveFunctionTools;
function isAssistantToolCallMessage(m) {
    return "tool_calls" in m;
}
exports.isAssistantToolCallMessage = isAssistantToolCallMessage;
function loadConversationsMeta() {
    var _a;
    return JSON.parse((_a = getItem(LocalStorageKey.CONVERSATIONS_META)) !== null && _a !== void 0 ? _a : "[]");
}
exports.loadConversationsMeta = loadConversationsMeta;
function loadSelfDiscoversMeta() {
    var _a;
    return JSON.parse((_a = getItem(LocalStorageKey.SELF_DISCOVERS_META)) !== null && _a !== void 0 ? _a : "[]");
}
exports.loadSelfDiscoversMeta = loadSelfDiscoversMeta;
function saveConversationsMeta(conversationsMeta) {
    return setItem(LocalStorageKey.CONVERSATIONS_META, JSON.stringify(conversationsMeta));
}
exports.saveConversationsMeta = saveConversationsMeta;
function saveSelfDiscoversMeta(selfDiscoversMeta) {
    return setItem(LocalStorageKey.SELF_DISCOVERS_META, JSON.stringify(selfDiscoversMeta));
}
exports.saveSelfDiscoversMeta = saveSelfDiscoversMeta;
function makeConversation(customUuid = undefined) {
    const models = loadModels().filter(model => model.id.startsWith("gpt"));
    const meta = {
        uuid: customUuid !== null && customUuid !== void 0 ? customUuid : uuid.v4(),
        name: "",
        description: "",
        lastMessage: "",
    };
    const conversation = {
        uuid: meta.uuid,
        name: meta.name,
        description: meta.description,
        rawChatRequestConfig: {
            model: models.length > 0 ?
                models[0].id :
                "",
            temperature: 1,
            max_tokens: 256,
            stop: "",
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            response_format: {
                type: "text",
            },
        },
        messages: [],
        usedFunctions: {},
    };
    return {
        conversation,
        meta,
    };
}
exports.makeConversation = makeConversation;
function makeSelfDiscover() {
    const meta = {
        uuid: uuid.v4(),
        name: "",
        description: "",
    };
    const models = loadModels().filter(model => model.id.startsWith("gpt-4"));
    const selfDiscover = {
        uuid: meta.uuid,
        name: meta.name,
        description: meta.description,
        model: models.length > 0 ?
            models[0].id :
            "",
        tasks: [],
        selectConversation: undefined,
        adaptConversation: undefined,
        implementConversation: undefined,
        selectResult: undefined,
        adaptResult: undefined,
        implementResult: undefined,
    };
    loadOrMakeSelfDiscoverConversations(selfDiscover);
    return {
        selfDiscover,
        meta,
    };
}
exports.makeSelfDiscover = makeSelfDiscover;
function makeSelfDiscoverTask(selfDiscoverUuid) {
    const taskUuid = uuid.v4();
    return {
        uuid: taskUuid,
        useAsExample: true,
        problemStatement: "",
        executeConversation: makeConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscoverUuid}_task_${taskUuid}_execute`).conversation,
        executeResult: undefined,
    };
}
exports.makeSelfDiscoverTask = makeSelfDiscoverTask;
function loadConversation(uuid) {
    var _a, _b, _c;
    const str = getItem(`${LocalStorageKey.CONVERSATION}_${uuid}`);
    if (str == undefined) {
        return undefined;
    }
    const result = JSON.parse(str);
    result.messages = (_a = result.messages) !== null && _a !== void 0 ? _a : [];
    result.usedFunctions = (_b = result.usedFunctions) !== null && _b !== void 0 ? _b : {};
    result.rawChatRequestConfig.response_format = (_c = result.rawChatRequestConfig.response_format) !== null && _c !== void 0 ? _c : {
        type: "text",
    };
    return result;
}
exports.loadConversation = loadConversation;
function loadOrMakeSelfDiscoverConversations(selfDiscover) {
    var _a, _b, _c, _d;
    selfDiscover.selectConversation = ((_a = loadConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_select`)) !== null && _a !== void 0 ? _a : makeConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_select`).conversation);
    selfDiscover.adaptConversation = ((_b = loadConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_adapt`)) !== null && _b !== void 0 ? _b : makeConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_adapt`).conversation);
    selfDiscover.implementConversation = ((_c = loadConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_implement`)) !== null && _c !== void 0 ? _c : makeConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_implement`).conversation);
    for (const task of selfDiscover.tasks) {
        task.executeConversation = ((_d = loadConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_task_${task.uuid}_execute`)) !== null && _d !== void 0 ? _d : makeConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_task_${task.uuid}_execute`).conversation);
    }
}
function loadSelfDiscover(uuid) {
    const str = getItem(`${LocalStorageKey.SELF_DISCOVER}_${uuid}`);
    if (str == undefined) {
        return undefined;
    }
    const result = JSON.parse(str);
    loadOrMakeSelfDiscoverConversations(result);
    for (const task of result.tasks) {
        if (task.useAsExample == undefined) {
            task.useAsExample = task.includeInPrompt;
        }
    }
    return result;
}
exports.loadSelfDiscover = loadSelfDiscover;
function saveConversation(conversation) {
    return setItem(`${LocalStorageKey.CONVERSATION}_${conversation.uuid}`, JSON.stringify(conversation));
}
exports.saveConversation = saveConversation;
function saveSelfDiscover(selfDiscover) {
    saveConversation(selfDiscover.selectConversation);
    saveConversation(selfDiscover.adaptConversation);
    saveConversation(selfDiscover.implementConversation);
    for (const task of selfDiscover.tasks) {
        saveConversation(task.executeConversation);
    }
    const minSelfDiscover = {
        ...selfDiscover,
        selectConversation: undefined,
        adaptConversation: undefined,
        implementConversation: undefined,
        tasks: selfDiscover.tasks.map(t => {
            return {
                ...t,
                executeConversation: undefined,
            };
        }),
    };
    return setItem(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}`, JSON.stringify(minSelfDiscover));
}
exports.saveSelfDiscover = saveSelfDiscover;
function deleteConversation(conversation) {
    return removeItem(`${LocalStorageKey.CONVERSATION}_${conversation.uuid}`);
}
exports.deleteConversation = deleteConversation;
function deleteSelfDiscover(self_discover_id) {
    const selfDiscover = loadSelfDiscover(self_discover_id.uuid);
    if (selfDiscover == undefined) {
        return;
    }
    deleteConversation(selfDiscover.selectConversation);
    deleteConversation(selfDiscover.adaptConversation);
    deleteConversation(selfDiscover.implementConversation);
    for (const task of selfDiscover.tasks) {
        deleteConversation(task.executeConversation);
    }
    return removeItem(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}`);
}
exports.deleteSelfDiscover = deleteSelfDiscover;
function loadModels() {
    const str = getItem(LocalStorageKey.MODELS);
    if (str == undefined) {
        return [];
    }
    const result = JSON.parse(str);
    return result;
}
exports.loadModels = loadModels;
function saveModels(models) {
    return setItem(LocalStorageKey.MODELS, JSON.stringify(models));
}
exports.saveModels = saveModels;


/***/ }),

/***/ "./src/client-public/main.tsx":
/*!************************************!*\
  !*** ./src/client-public/main.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
//Really bad BigInt polyfill
class MyBigInt {
    constructor(value) {
        this.value = String(value);
    }
    toString() {
        return this.value;
    }
    toJSON() {
        return this.value;
    }
}
//if (true) {
if (typeof BigInt === "undefined") {
    console.log("Using really bad BigInt polyfill because browser does not support it");
    window.BigInt = function (x) {
        return new MyBigInt(x);
    };
}
if (BigInt.prototype != undefined) {
    BigInt.prototype.toJSON = function () {
        if (BigInt(Number(this)).toString() === this.toString()) {
            return Number(this);
        }
        else {
            return this.toString();
        }
    };
}
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
const App_1 = __webpack_require__(/*! ./App */ "./src/client-public/App.tsx");
__webpack_require__(/*! semantic-ui-less/semantic.less */ "./node_modules/semantic-ui-less/semantic.less");
const api_openai_1 = __webpack_require__(/*! ../api-openai */ "./src/api-openai/index.ts");
const localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
const openAiApi = new api_openai_1.OpenAiApi({
    domain: "https://api.openai.com",
    root: "/",
    apiKey: (_a = localStorageUtil.getItem(localStorageUtil.LocalStorageKey.OPEN_AI_API_KEY)) !== null && _a !== void 0 ? _a : "",
});
ReactDOM.render(React.createElement(App_1.App, { openAiApi: openAiApi }), document.getElementById("app"));


/***/ }),

/***/ "./src/client-public/self-discover/SelfDiscoverAdaptTab.tsx":
/*!******************************************************************!*\
  !*** ./src/client-public/self-discover/SelfDiscoverAdaptTab.tsx ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDiscoverAdaptTab = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const tm = __webpack_require__(/*! type-mapping */ "./node_modules/type-mapping/dist/index.js");
const ConversationEditPage_1 = __webpack_require__(/*! ../ConversationEditPage */ "./src/client-public/ConversationEditPage.tsx");
const use_error_1 = __webpack_require__(/*! ../use-error */ "./src/client-public/use-error.ts");
const error_handling_1 = __webpack_require__(/*! ../error-handling */ "./src/client-public/error-handling.ts");
function SelfDiscoverAdaptTab(props) {
    const { openAiApi, active, selfDiscover, setSelfDiscover, } = props;
    const history = reactRouter.useHistory();
    const [prompt, setPrompt] = React.useState(() => buildPrompt(selfDiscover));
    const [isLoading, setIsLoading] = React.useState(false);
    const error = (0, use_error_1.useError)();
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setPrompt(buildPrompt(selfDiscover));
        }, 1000);
        return () => clearTimeout(timer);
    }, [selfDiscover]);
    return React.createElement("div", { className: classNames("ui bottom attached tab segment", active ? "active" : undefined) },
        React.createElement("div", { className: "ui form" },
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Prompt"),
                React.createElement("textarea", { value: prompt, readOnly: true, style: { minHeight: "36em", maxHeight: "84em" } })),
            selfDiscover.adaptResult == undefined ?
                undefined :
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Adapted Reasoning Modules"),
                    React.createElement("textarea", { value: JSON.stringify(selfDiscover.adaptResult, null, 2), readOnly: true, style: { minHeight: "36em", maxHeight: "84em" } }))),
        React.createElement("br", null),
        React.createElement("button", { className: classNames("ui primary button", isLoading ? "loading" : undefined), onClick: async () => {
                if (isLoading) {
                    return;
                }
                const conversationA = {
                    ...selfDiscover.adaptConversation,
                    rawChatRequestConfig: {
                        ...selfDiscover.adaptConversation.rawChatRequestConfig,
                        model: selfDiscover.model,
                        response_format: {
                            type: "text",
                        },
                        temperature: 0,
                        max_tokens: 1024,
                    },
                    messages: [
                        {
                            uuid: uuid.v4(),
                            messageType: "user",
                            role: "user",
                            content: prompt,
                        },
                    ],
                };
                setIsLoading(true);
                try {
                    const conversationB = await (0, ConversationEditPage_1.submitConversation)(openAiApi, conversationA, []);
                    const conversationC = {
                        ...conversationB,
                        rawChatRequestConfig: {
                            ...conversationB.rawChatRequestConfig,
                            response_format: {
                                type: "json_object",
                            },
                        },
                        messages: [
                            ...conversationB.messages,
                            {
                                uuid: uuid.v4(),
                                messageType: "user",
                                role: "user",
                                content: convertPrompt,
                            },
                        ]
                    };
                    const conversationD = await (0, ConversationEditPage_1.submitConversation)(openAiApi, conversationC, []);
                    setIsLoading(false);
                    const lastMessage = conversationD.messages[conversationD.messages.length - 1];
                    if (lastMessage.role != "assistant") {
                        error.push("negative", [`Expected assistant message, received ${lastMessage.role}`]);
                        return;
                    }
                    if (lastMessage.messageType != "assistant") {
                        error.push("negative", [`Expected assistant message, received ${lastMessage.messageType}`]);
                        return;
                    }
                    let parsed = {};
                    try {
                        parsed = JSON.parse(lastMessage.content);
                    }
                    catch (err) {
                        (0, error_handling_1.handleError)(error, err);
                        return;
                    }
                    let validated;
                    try {
                        validated = adaptResultMapper("result", parsed);
                    }
                    catch (err) {
                        (0, error_handling_1.handleError)(error, err);
                        return;
                    }
                    setSelfDiscover({
                        ...selfDiscover,
                        adaptConversation: conversationD,
                        adaptResult: validated,
                    });
                    error.reset();
                }
                catch (err) {
                    setIsLoading(false);
                    (0, error_handling_1.handleError)(error, err);
                }
            } }, "Adapt Reasoning Modules"),
        React.createElement("button", { className: "ui primary button", onClick: () => {
                history.push(`/conversation/${selfDiscover.adaptConversation.uuid}/edit`);
            } }, "View Conversation"));
}
exports.SelfDiscoverAdaptTab = SelfDiscoverAdaptTab;
function buildPrompt(selfDiscover) {
    var _a;
    const exampleTasks = selfDiscover.tasks
        .filter(t => t.useAsExample)
        .filter(t => t.problemStatement.trim() != "")
        .map((t, index) => `### Example Task ${index + 1}

${t.problemStatement.trim()}`)
        .join("\n\n");
    const selectedModules = (_a = selfDiscover.selectResult) === null || _a === void 0 ? void 0 : _a.selected_reasoning_modules.map(i => `+ ${i}`).join("\n");
    return `Rephrase and specify each reasoning module so that it better helps with solving the task:

### Selected module descriptions

${selectedModules}

${exampleTasks}

### Instructions

Adapt each reasoning module description to better solve the tasks`;
}
const convertPrompt = `Convert your response into a JSON object with the following properties,
+ reasoning_modules : ReasoningModule[] - an array containing the rephrased and specified reasoning modules

interface ReasoningModule {
  name : string;
  description : string;
}`;
const adaptResultMapper = tm.object({
    reasoning_modules: tm.array(tm.object({
        name: tm.string(),
        description: tm.string(),
    })),
});


/***/ }),

/***/ "./src/client-public/self-discover/SelfDiscoverEditPage.tsx":
/*!******************************************************************!*\
  !*** ./src/client-public/self-discover/SelfDiscoverEditPage.tsx ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDiscoverEditPage = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const localStorageUtil = __webpack_require__(/*! ../local-storage-util */ "./src/client-public/local-storage-util.ts");
const use_error_1 = __webpack_require__(/*! ../use-error */ "./src/client-public/use-error.ts");
const ErrorMessage_1 = __webpack_require__(/*! ../ErrorMessage */ "./src/client-public/ErrorMessage.tsx");
const SelfDiscoverTaskTab_1 = __webpack_require__(/*! ./SelfDiscoverTaskTab */ "./src/client-public/self-discover/SelfDiscoverTaskTab.tsx");
const SelfDiscoverSelectTab_1 = __webpack_require__(/*! ./SelfDiscoverSelectTab */ "./src/client-public/self-discover/SelfDiscoverSelectTab.tsx");
const SelfDiscoverAdaptTab_1 = __webpack_require__(/*! ./SelfDiscoverAdaptTab */ "./src/client-public/self-discover/SelfDiscoverAdaptTab.tsx");
const SelfDiscoverImplementTab_1 = __webpack_require__(/*! ./SelfDiscoverImplementTab */ "./src/client-public/self-discover/SelfDiscoverImplementTab.tsx");
const SelfDiscoverExecuteTab_1 = __webpack_require__(/*! ./SelfDiscoverExecuteTab */ "./src/client-public/self-discover/SelfDiscoverExecuteTab.tsx");
var TabType;
(function (TabType) {
    TabType["Tasks"] = "Tasks";
    TabType["Select"] = "Select";
    TabType["Adapt"] = "Adapt";
    TabType["Implement"] = "Implement";
    TabType["Execute"] = "Execute";
})(TabType || (TabType = {}));
function SelfDiscoverEditPage(props) {
    const { openAiApi, } = props;
    const routeParams = reactRouter.useParams();
    const [selfDiscover, setSelfDiscover,] = React.useState(localStorageUtil.loadSelfDiscover(routeParams.uuid));
    const [isLoading, setIsLoading] = React.useState(false);
    const error = (0, use_error_1.useError)();
    const [tapType, setTabType] = React.useState(TabType.Tasks);
    const [models,
    //setModels,
    ] = React.useState(() => {
        return localStorageUtil.loadModels().filter(model => model.id.startsWith("gpt"));
    });
    React.useEffect(() => {
        if (selfDiscover == undefined) {
            return;
        }
        const timer = setTimeout(() => {
            localStorageUtil.saveSelfDiscover(selfDiscover);
            const meta = localStorageUtil.loadSelfDiscoversMeta().map((m) => {
                return m.uuid == selfDiscover.uuid ?
                    {
                        uuid: selfDiscover.uuid,
                        name: selfDiscover.name,
                        description: selfDiscover.description,
                    } :
                    m;
            });
            localStorageUtil.saveSelfDiscoversMeta(meta);
        }, 1000);
        return () => clearTimeout(timer);
    }, [selfDiscover]);
    if (selfDiscover == undefined) {
        return React.createElement("div", { className: "ui main container" },
            "Self-Discover ",
            routeParams.uuid,
            " not found");
    }
    return React.createElement("div", { className: "ui main container" },
        React.createElement("div", { className: "ui form" },
            React.createElement("div", { className: "two fields" },
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Title"),
                    React.createElement("input", { placeholder: "Enter a Self-Discover Title", value: selfDiscover.name, onChange: (evt) => {
                            setSelfDiscover({
                                ...selfDiscover,
                                name: evt.target.value,
                            });
                        } })),
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Description"),
                    React.createElement("input", { placeholder: "Enter a Self-Discover Description", value: selfDiscover.description, onChange: (evt) => {
                            setSelfDiscover({
                                ...selfDiscover,
                                description: evt.target.value,
                            });
                        } })))),
        React.createElement("div", { className: "ui top attached tabular menu" }, [
            TabType.Tasks,
            TabType.Select,
            TabType.Adapt,
            TabType.Implement,
            TabType.Execute,
        ].map(t => {
            return React.createElement("div", { key: t, className: classNames("item", tapType == t ? "active" : undefined), onClick: () => setTabType(t) }, t);
        })),
        React.createElement(SelfDiscoverTaskTab_1.SelfDiscoverTaskTab, { active: tapType == TabType.Tasks, selfDiscover: selfDiscover, setSelfDiscover: setSelfDiscover }),
        React.createElement(SelfDiscoverSelectTab_1.SelfDiscoverSelectTab, { openAiApi: openAiApi, active: tapType == TabType.Select, selfDiscover: selfDiscover, setSelfDiscover: setSelfDiscover }),
        React.createElement(SelfDiscoverAdaptTab_1.SelfDiscoverAdaptTab, { openAiApi: openAiApi, active: tapType == TabType.Adapt, selfDiscover: selfDiscover, setSelfDiscover: setSelfDiscover }),
        React.createElement(SelfDiscoverImplementTab_1.SelfDiscoverImplementTab, { openAiApi: openAiApi, active: tapType == TabType.Implement, selfDiscover: selfDiscover, setSelfDiscover: setSelfDiscover }),
        React.createElement(SelfDiscoverExecuteTab_1.SelfDiscoverExecuteTab, { openAiApi: openAiApi, active: tapType == TabType.Execute, selfDiscover: selfDiscover, setSelfDiscover: setSelfDiscover }),
        React.createElement("div", { className: "ui segment" },
            React.createElement(ErrorMessage_1.ErrorMessage, { error: error }),
            React.createElement("button", { className: classNames("ui primary button", isLoading ? "loading" : undefined), onClick: () => {
                    if (isLoading) {
                        return;
                    }
                    setIsLoading(true);
                } }, "Submit")),
        React.createElement("div", { className: "ui segment" },
            React.createElement("div", { className: "ui form" },
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Model"),
                    React.createElement("select", { value: selfDiscover.model, onChange: (evt) => {
                            setSelfDiscover({
                                ...selfDiscover,
                                model: evt.target.value,
                            });
                        } },
                        React.createElement("option", { key: "none", value: "", disabled: true }, "Select a Model"),
                        models.map(model => {
                            return React.createElement("option", { key: model.id, value: model.id },
                                model.id,
                                " - (",
                                new Date(model.created * 1000).toISOString(),
                                ")");
                        }))))));
}
exports.SelfDiscoverEditPage = SelfDiscoverEditPage;


/***/ }),

/***/ "./src/client-public/self-discover/SelfDiscoverExecuteTab.tsx":
/*!********************************************************************!*\
  !*** ./src/client-public/self-discover/SelfDiscoverExecuteTab.tsx ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDiscoverExecuteTab = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const localStorageUtil = __webpack_require__(/*! ../local-storage-util */ "./src/client-public/local-storage-util.ts");
const SelfDiscoverTaskListForm_1 = __webpack_require__(/*! ./SelfDiscoverTaskListForm */ "./src/client-public/self-discover/SelfDiscoverTaskListForm.tsx");
const ErrorMessage_1 = __webpack_require__(/*! ../ErrorMessage */ "./src/client-public/ErrorMessage.tsx");
function SelfDiscoverExecuteTab(props) {
    const { openAiApi, active, selfDiscover, setSelfDiscover, } = props;
    return React.createElement("div", { className: classNames("ui bottom attached tab segment", active ? "active" : undefined) },
        selfDiscover.implementResult == undefined ?
            React.createElement(ErrorMessage_1.ErrorMessage, { error: {
                    type: "negative",
                    messages: [
                        "No Implement Result found",
                    ],
                } }) :
            React.createElement(SelfDiscoverTaskListForm_1.SelfDiscoverTaskListForm, { tasks: selfDiscover.tasks, onChange: (newTasks) => {
                    setSelfDiscover({
                        ...selfDiscover,
                        tasks: newTasks,
                    });
                }, executeConfig: {
                    openAiApi,
                    implementResult: selfDiscover.implementResult,
                    model: selfDiscover.model,
                } }),
        React.createElement("button", { className: "ui primary button", onClick: () => {
                setSelfDiscover({
                    ...selfDiscover,
                    tasks: [
                        ...selfDiscover.tasks,
                        localStorageUtil.makeSelfDiscoverTask(selfDiscover.uuid),
                    ],
                });
            } }, "Add Task"));
}
exports.SelfDiscoverExecuteTab = SelfDiscoverExecuteTab;


/***/ }),

/***/ "./src/client-public/self-discover/SelfDiscoverImplementTab.tsx":
/*!**********************************************************************!*\
  !*** ./src/client-public/self-discover/SelfDiscoverImplementTab.tsx ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDiscoverImplementTab = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const tm = __webpack_require__(/*! type-mapping */ "./node_modules/type-mapping/dist/index.js");
const ConversationEditPage_1 = __webpack_require__(/*! ../ConversationEditPage */ "./src/client-public/ConversationEditPage.tsx");
const use_error_1 = __webpack_require__(/*! ../use-error */ "./src/client-public/use-error.ts");
const error_handling_1 = __webpack_require__(/*! ../error-handling */ "./src/client-public/error-handling.ts");
function SelfDiscoverImplementTab(props) {
    const { openAiApi, active, selfDiscover, setSelfDiscover, } = props;
    const history = reactRouter.useHistory();
    const [prompt, setPrompt] = React.useState(() => buildPrompt(selfDiscover));
    const [isLoading, setIsLoading] = React.useState(false);
    const error = (0, use_error_1.useError)();
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setPrompt(buildPrompt(selfDiscover));
        }, 1000);
        return () => clearTimeout(timer);
    }, [selfDiscover]);
    return React.createElement("div", { className: classNames("ui bottom attached tab segment", active ? "active" : undefined) },
        React.createElement("div", { className: "ui form" },
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Prompt"),
                React.createElement("textarea", { value: prompt, readOnly: true, style: { minHeight: "36em", maxHeight: "84em" } })),
            selfDiscover.implementResult == undefined ?
                undefined :
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Implemented Reasoning Modules"),
                    React.createElement("textarea", { value: JSON.stringify(selfDiscover.implementResult, null, 2), readOnly: true, style: { minHeight: "36em", maxHeight: "84em" } }))),
        React.createElement("br", null),
        React.createElement("button", { className: classNames("ui primary button", isLoading ? "loading" : undefined), onClick: async () => {
                if (isLoading) {
                    return;
                }
                const conversationA = {
                    ...selfDiscover.implementConversation,
                    rawChatRequestConfig: {
                        ...selfDiscover.implementConversation.rawChatRequestConfig,
                        model: selfDiscover.model,
                        response_format: {
                            type: "json_object",
                        },
                        temperature: 0,
                        max_tokens: 1024,
                    },
                    messages: [
                        {
                            uuid: uuid.v4(),
                            messageType: "user",
                            role: "user",
                            content: prompt,
                        },
                    ],
                };
                setIsLoading(true);
                try {
                    const conversationB = await (0, ConversationEditPage_1.submitConversation)(openAiApi, conversationA, []);
                    setIsLoading(false);
                    const lastMessage = conversationB.messages[conversationB.messages.length - 1];
                    if (lastMessage.role != "assistant") {
                        error.push("negative", [`Expected assistant message, received ${lastMessage.role}`]);
                        return;
                    }
                    if (lastMessage.messageType != "assistant") {
                        error.push("negative", [`Expected assistant message, received ${lastMessage.messageType}`]);
                        return;
                    }
                    let parsed = {};
                    try {
                        parsed = JSON.parse(lastMessage.content);
                    }
                    catch (err) {
                        (0, error_handling_1.handleError)(error, err);
                        return;
                    }
                    let validated;
                    try {
                        validated = implementResultMapper("result", parsed);
                    }
                    catch (err) {
                        (0, error_handling_1.handleError)(error, err);
                        return;
                    }
                    setSelfDiscover({
                        ...selfDiscover,
                        implementConversation: conversationB,
                        implementResult: validated,
                    });
                    error.reset();
                }
                catch (err) {
                    setIsLoading(false);
                    (0, error_handling_1.handleError)(error, err);
                }
            } }, "Implement Reasoning Modules"),
        React.createElement("button", { className: "ui primary button", onClick: () => {
                history.push(`/conversation/${selfDiscover.implementConversation.uuid}/edit`);
            } }, "View Conversation"));
}
exports.SelfDiscoverImplementTab = SelfDiscoverImplementTab;
function buildPrompt(selfDiscover) {
    var _a;
    const exampleTasks = selfDiscover.tasks
        .filter(t => t.useAsExample)
        .filter(t => t.problemStatement.trim() != "")
        .map((t, index) => `### Example Task ${index + 1}

${t.problemStatement.trim()}`)
        .join("\n\n");
    const adaptedModules = (_a = selfDiscover.adaptResult) === null || _a === void 0 ? void 0 : _a.reasoning_modules.map(i => `#### ${i.name}\n${i.description}`).join("\n\n");
    return `Operationalize the reasoning modules into a step-by-step reasoning plan in JSON format:

### Adapted module description

${adaptedModules}

${exampleTasks}

### Instructions

Implement a reasoning structure for solvers to follow step-by-step and arrive at correct answers.

The JSON object should have properties,
- steps : Step[] - The steps to follow to solve the task

interface Step {
  instructions : string;
}`;
}
const implementResultMapper = tm.object({
    steps: tm.array(tm.object({
        instructions: tm.string(),
    })),
});


/***/ }),

/***/ "./src/client-public/self-discover/SelfDiscoverListPage.tsx":
/*!******************************************************************!*\
  !*** ./src/client-public/self-discover/SelfDiscoverListPage.tsx ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDiscoverListPage = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
const localStorageUtil = __webpack_require__(/*! ../local-storage-util */ "./src/client-public/local-storage-util.ts");
//import { SelfDiscover } from "./SelfDiscoverForm";
function SelfDiscoverListPage() {
    const history = reactRouter.useHistory();
    const [selfDiscovers, setSelfDiscovers,] = React.useState(localStorageUtil.loadSelfDiscoversMeta());
    return React.createElement("div", { className: "ui main container" },
        React.createElement("div", { className: "ui segment divided selection massive list" }, selfDiscovers.map(meta => {
            const displayName = meta.name.trim() == "" ?
                `Self-Discover ${meta.uuid}` :
                meta.name;
            return React.createElement("div", { className: "item", key: meta.uuid, onClick: () => {
                    history.push(`/self-discover/${meta.uuid}/edit`);
                } },
                React.createElement("div", { className: "extra right floated" },
                    React.createElement("div", { className: "ui icon secondary button", onClick: (evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Copy ${displayName}?`)) {
                                const existingSelfDiscover = localStorageUtil.loadSelfDiscover(meta.uuid);
                                if (existingSelfDiscover == undefined) {
                                    alert(`Cannot find ${displayName} / ${meta.uuid}`);
                                    return;
                                }
                                const newUuid = uuid.v4();
                                const newSelfDiscover = {
                                    ...existingSelfDiscover,
                                    uuid: newUuid,
                                    name: `Copy of ${displayName}`,
                                };
                                const newSelfDiscovers = [
                                    ...localStorageUtil.loadSelfDiscoversMeta(),
                                    {
                                        ...meta,
                                        uuid: newUuid,
                                        name: `Copy of ${displayName}`,
                                    },
                                ];
                                setSelfDiscovers(newSelfDiscovers);
                                localStorageUtil.saveSelfDiscoversMeta(newSelfDiscovers);
                                localStorageUtil.saveSelfDiscover(newSelfDiscover);
                            }
                        } },
                        React.createElement("i", { className: "copy icon" })),
                    React.createElement("div", { className: "ui icon red button", onClick: (evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Delete ${displayName}?`)) {
                                const newSelfDiscovers = localStorageUtil.loadSelfDiscoversMeta()
                                    .filter(m => m.uuid != meta.uuid);
                                setSelfDiscovers(newSelfDiscovers);
                                localStorageUtil.saveSelfDiscoversMeta(newSelfDiscovers);
                                localStorageUtil.deleteSelfDiscover(meta);
                            }
                        } },
                        React.createElement("i", { className: "trash icon" }))),
                React.createElement("div", { className: "content" },
                    React.createElement("div", { className: "header" }, displayName),
                    React.createElement("div", { className: "ui mini label" }, meta.uuid),
                    meta.description.trim() == "" ?
                        React.createElement("small", { className: "description" }, "There is no description for this self-discover") :
                        React.createElement("div", { className: "description" }, meta.description)));
        })),
        React.createElement("button", { className: "ui primary button", onClick: () => {
                const selfDiscovers = localStorageUtil.loadSelfDiscoversMeta();
                const { meta, selfDiscover, } = localStorageUtil.makeSelfDiscover();
                const newSelfDiscovers = [
                    ...selfDiscovers,
                    meta,
                ];
                localStorageUtil.saveSelfDiscoversMeta(newSelfDiscovers);
                localStorageUtil.saveSelfDiscover(selfDiscover);
                setSelfDiscovers(newSelfDiscovers);
            } }, "Create Self-Discover"));
}
exports.SelfDiscoverListPage = SelfDiscoverListPage;


/***/ }),

/***/ "./src/client-public/self-discover/SelfDiscoverSelectTab.tsx":
/*!*******************************************************************!*\
  !*** ./src/client-public/self-discover/SelfDiscoverSelectTab.tsx ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDiscoverSelectTab = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const tm = __webpack_require__(/*! type-mapping */ "./node_modules/type-mapping/dist/index.js");
const ConversationEditPage_1 = __webpack_require__(/*! ../ConversationEditPage */ "./src/client-public/ConversationEditPage.tsx");
const use_error_1 = __webpack_require__(/*! ../use-error */ "./src/client-public/use-error.ts");
const error_handling_1 = __webpack_require__(/*! ../error-handling */ "./src/client-public/error-handling.ts");
function SelfDiscoverSelectTab(props) {
    const { openAiApi, active, selfDiscover, setSelfDiscover, } = props;
    const history = reactRouter.useHistory();
    const [prompt, setPrompt] = React.useState(() => buildPrompt(selfDiscover));
    const [isLoading, setIsLoading] = React.useState(false);
    const error = (0, use_error_1.useError)();
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setPrompt(buildPrompt(selfDiscover));
        }, 1000);
        return () => clearTimeout(timer);
    }, [selfDiscover]);
    return React.createElement("div", { className: classNames("ui bottom attached tab segment", active ? "active" : undefined) },
        React.createElement("div", { className: "ui form" },
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Prompt"),
                React.createElement("textarea", { value: prompt, readOnly: true, style: { minHeight: "36em", maxHeight: "84em" } })),
            selfDiscover.selectResult == undefined ?
                undefined :
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Selected Reasoning Modules"),
                    React.createElement("textarea", { value: JSON.stringify(selfDiscover.selectResult, null, 2), readOnly: true, style: { minHeight: "36em", maxHeight: "84em" } }))),
        React.createElement("br", null),
        React.createElement("button", { className: classNames("ui primary button", isLoading ? "loading" : undefined), onClick: async () => {
                if (isLoading) {
                    return;
                }
                const conversationA = {
                    ...selfDiscover.selectConversation,
                    rawChatRequestConfig: {
                        ...selfDiscover.selectConversation.rawChatRequestConfig,
                        model: selfDiscover.model,
                        response_format: {
                            type: "text",
                        },
                        temperature: 0,
                        max_tokens: 1024,
                    },
                    messages: [
                        {
                            uuid: uuid.v4(),
                            messageType: "user",
                            role: "user",
                            content: prompt,
                        },
                    ],
                };
                setIsLoading(true);
                try {
                    const conversationB = await (0, ConversationEditPage_1.submitConversation)(openAiApi, conversationA, []);
                    const conversationC = {
                        ...conversationB,
                        rawChatRequestConfig: {
                            ...conversationB.rawChatRequestConfig,
                            response_format: {
                                type: "json_object",
                            },
                        },
                        messages: [
                            ...conversationB.messages,
                            {
                                uuid: uuid.v4(),
                                messageType: "user",
                                role: "user",
                                content: convertPrompt,
                            },
                        ]
                    };
                    const conversationD = await (0, ConversationEditPage_1.submitConversation)(openAiApi, conversationC, []);
                    setIsLoading(false);
                    const lastMessage = conversationD.messages[conversationD.messages.length - 1];
                    if (lastMessage.role != "assistant") {
                        error.push("negative", [`Expected assistant message, received ${lastMessage.role}`]);
                        return;
                    }
                    if (lastMessage.messageType != "assistant") {
                        error.push("negative", [`Expected assistant message, received ${lastMessage.messageType}`]);
                        return;
                    }
                    let parsed = {};
                    try {
                        parsed = JSON.parse(lastMessage.content);
                    }
                    catch (err) {
                        (0, error_handling_1.handleError)(error, err);
                        return;
                    }
                    let validated;
                    try {
                        validated = selectResultMapper("result", parsed);
                    }
                    catch (err) {
                        (0, error_handling_1.handleError)(error, err);
                        return;
                    }
                    setSelfDiscover({
                        ...selfDiscover,
                        selectConversation: conversationD,
                        selectResult: validated,
                    });
                    error.reset();
                }
                catch (err) {
                    setIsLoading(false);
                    (0, error_handling_1.handleError)(error, err);
                }
            } }, "Select Reasoning Modules"),
        React.createElement("button", { className: "ui primary button", onClick: () => {
                history.push(`/conversation/${selfDiscover.selectConversation.uuid}/edit`);
            } }, "View Conversation"));
}
exports.SelfDiscoverSelectTab = SelfDiscoverSelectTab;
function buildPrompt(selfDiscover) {
    const exampleTasks = selfDiscover.tasks
        .filter(t => t.useAsExample)
        .filter(t => t.problemStatement.trim() != "")
        .map((t, index) => `### Example Task ${index + 1}

${t.problemStatement.trim()}`)
        .join("\n\n");
    return `Select several reasoning modules that are crucial to utilize in order to solve the given task:

### All reasoning module descriptions

+ How could I devise an experiment to help solve that problem?
+ Make a list of ideas for solving this problem, and apply them one by one to the problem to see if any progress can be made.
+ How could I measure progress on this problem?
+ How can I simplify the problem so that it is easier to solve?
+ What are the key assumptions underlying this problem?
+ What are the potential risks and drawbacks of each solution?
+ What are the alternative perspectives or viewpoints on this problem?
+ What are the long-term implications of this problem and its solutions?
+ How can I break down this problem into smaller, more manageable parts?
+ Critical Thinking: This style involves analyzing the problem from different perspectives, questioning assumptions, and evaluating
the evidence or information available. It focuses on logical reasoning, evidence-based decision-making, and identifying
potential biases or flaws in thinking.
+ Try creative thinking, generate innovative and out-of-the-box ideas to solve the problem. Explore unconventional solutions,
thinking beyond traditional boundaries, and encouraging imagination and originality.
+ Seek input and collaboration from others to solve the problem. Emphasize teamwork, open communication, and leveraging the
diverse perspectives and expertise of a group to come up with effective solutions.
+ Use systems thinking: Consider the problem as part of a larger system and understanding the interconnectedness of various elements.
Focuses on identifying the underlying causes, feedback loops, and interdependencies that influence the problem, and developing holistic
solutions that address the system as a whole.
+ Use Risk Analysis: Evaluate potential risks, uncertainties, and tradeoffs associated with different solutions or approaches to a
problem. Emphasize assessing the potential consequences and likelihood of success or failure, and making informed decisions based
on a balanced analysis of risks and benefits.
+ Use Reflective Thinking: Step back from the problem, take the time for introspection and self-reflection. Examine personal biases,
assumptions, and mental models that may influence problem-solving, and being open to learning from past experiences to improve
future approaches.
+ What is the core issue or problem that needs to be addressed?
+ What are the underlying causes or factors contributing to the problem?
+ Are there any potential solutions or strategies that have been tried before? If yes, what were the outcomes and lessons learned?
+ What are the potential obstacles or challenges that might arise in solving this problem?
+ Are there any relevant data or information that can provide insights into the problem? If yes, what data sources are available,
and how can they be analyzed?
+ Are there any stakeholders or individuals who are directly affected by the problem? What are their perspectives and needs?
+ What resources (financial, human, technological, etc.) are needed to tackle the problem effectively?
+ How can progress or success in solving the problem be measured or evaluated?
+ What indicators or metrics can be used?
+ Is the problem a technical or practical one that requires a specific expertise or skill set? Or is it more of a conceptual or
theoretical problem?
+ Does the problem involve a physical constraint, such as limited resources, infrastructure, or space?
+ Is the problem related to human behavior, such as a social, cultural, or psychological issue?
+ Does the problem involve decision-making or planning, where choices need to be made under uncertainty or with competing
objectives?
+ Is the problem an analytical one that requires data analysis, modeling, or optimization techniques?
+ Is the problem a design challenge that requires creative solutions and innovation?
+ Does the problem require addressing systemic or structural issues rather than just individual instances?
+ Is the problem time-sensitive or urgent, requiring immediate attention and action?
+ What kinds of solution typically are produced for this kind of problem specification?
+ Given the problem specification and the current best solution, have a guess about other possible solutions.
+ Let’s imagine the current best solution is totally wrong, what other ways are there to think about the problem specification?
+ What is the best way to modify this current best solution, given what you know about these kinds of problem specification?
+ Ignoring the current best solution, create an entirely new solution to the problem.
+ Let’s think step by step.
+ Let’s make a step by step plan and implement it with good notion and explanation.

${exampleTasks}

### Instructions

Select several modules that are crucial for solving the tasks above.`;
}
const convertPrompt = `Convert your response into a JSON object with the following properties,
+ selected_reasoning_modules : string[] - an array containing the names of the selected reasoning modules
+ rationale : string - A plain language explanation for why these modules were selecteds`;
const selectResultMapper = tm.object({
    selected_reasoning_modules: tm.array(tm.string()),
    rationale: tm.string(),
});


/***/ }),

/***/ "./src/client-public/self-discover/SelfDiscoverTaskForm.tsx":
/*!******************************************************************!*\
  !*** ./src/client-public/self-discover/SelfDiscoverTaskForm.tsx ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDiscoverTaskForm = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
const tm = __webpack_require__(/*! type-mapping */ "./node_modules/type-mapping/dist/index.js");
const use_error_1 = __webpack_require__(/*! ../use-error */ "./src/client-public/use-error.ts");
const ConversationEditPage_1 = __webpack_require__(/*! ../ConversationEditPage */ "./src/client-public/ConversationEditPage.tsx");
const error_handling_1 = __webpack_require__(/*! ../error-handling */ "./src/client-public/error-handling.ts");
function SelfDiscoverTaskForm(props) {
    const { task, onChange, onRemove, onMoveUp, onMoveDown, executeConfig, } = props;
    const [prompt, setPrompt] = React.useState(() => executeConfig == undefined ? "" : buildPrompt(task, executeConfig));
    const history = reactRouter.useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const error = (0, use_error_1.useError)();
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (executeConfig == undefined) {
                setPrompt("");
                return;
            }
            setPrompt(buildPrompt(task, executeConfig));
        }, 1000);
        return () => clearTimeout(timer);
    }, [executeConfig]);
    return React.createElement("div", { className: "item" },
        React.createElement("div", { className: "header" },
            "Task ",
            task.uuid),
        React.createElement("div", { className: "ui form" },
            React.createElement("div", { className: "two fields" },
                React.createElement("div", { className: "field" }, executeConfig == undefined ?
                    React.createElement(React.Fragment, null,
                        React.createElement("label", null, "Use as Example"),
                        React.createElement("div", { className: "ui checkbox" },
                            React.createElement("input", { type: "checkbox", checked: task.useAsExample, onChange: (evt) => {
                                    onChange({
                                        ...task,
                                        useAsExample: evt.target.checked,
                                    }, task);
                                } }),
                            React.createElement("label", null, "Use as Example"))) :
                    React.createElement(React.Fragment, null,
                        React.createElement("button", { className: classNames("ui primary button", isLoading ? "loading" : undefined), onClick: async () => {
                                if (isLoading) {
                                    return;
                                }
                                const conversationA = {
                                    ...task.executeConversation,
                                    rawChatRequestConfig: {
                                        ...task.executeConversation.rawChatRequestConfig,
                                        model: executeConfig.model,
                                        response_format: {
                                            type: "json_object",
                                        },
                                        temperature: 0,
                                        max_tokens: 1024,
                                    },
                                    messages: [
                                        {
                                            uuid: uuid.v4(),
                                            messageType: "user",
                                            role: "user",
                                            content: prompt,
                                        },
                                    ],
                                };
                                setIsLoading(true);
                                try {
                                    const conversationB = await (0, ConversationEditPage_1.submitConversation)(executeConfig.openAiApi, conversationA, []);
                                    setIsLoading(false);
                                    const lastMessage = conversationB.messages[conversationB.messages.length - 1];
                                    if (lastMessage.role != "assistant") {
                                        error.push("negative", [`Expected assistant message, received ${lastMessage.role}`]);
                                        return;
                                    }
                                    if (lastMessage.messageType != "assistant") {
                                        error.push("negative", [`Expected assistant message, received ${lastMessage.messageType}`]);
                                        return;
                                    }
                                    let parsed = {};
                                    try {
                                        parsed = JSON.parse(lastMessage.content);
                                    }
                                    catch (err) {
                                        (0, error_handling_1.handleError)(error, err);
                                        return;
                                    }
                                    let validated;
                                    try {
                                        validated = executeResultMapper("result", parsed);
                                    }
                                    catch (err) {
                                        (0, error_handling_1.handleError)(error, err);
                                        return;
                                    }
                                    onChange({
                                        ...task,
                                        executeConversation: conversationB,
                                        executeResult: validated,
                                    }, task);
                                    error.reset();
                                }
                                catch (err) {
                                    setIsLoading(false);
                                    (0, error_handling_1.handleError)(error, err);
                                }
                            } }, "Execute"),
                        React.createElement("button", { className: "ui primary button", onClick: () => {
                                history.push(`/conversation/${task.executeConversation.uuid}/edit`);
                            } }, "View Conversation"))),
                React.createElement("div", { className: "field button group", style: {
                        alignSelf: "flex-end",
                    } },
                    React.createElement("button", { className: "ui icon red button", onClick: () => onRemove(task) },
                        React.createElement("i", { className: "trash icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: () => onMoveUp(task) },
                        React.createElement("i", { className: "arrow up icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: () => onMoveDown(task) },
                        React.createElement("i", { className: "arrow down icon" }))))),
        React.createElement("div", { className: "ui form" },
            React.createElement("textarea", { style: {
                    minHeight: "8em",
                    maxHeight: "48em",
                }, value: task.problemStatement, onChange: (evt) => {
                    props.onChange({
                        ...task,
                        problemStatement: evt.target.value,
                    }, task);
                } }),
            executeConfig == undefined || prompt == "" ?
                undefined :
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Prompt"),
                    React.createElement("textarea", { value: prompt, readOnly: true, style: { minHeight: "8em", maxHeight: "84em" } })),
            executeConfig == undefined || task.executeResult == undefined ?
                undefined :
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Execute Result"),
                    React.createElement("textarea", { value: JSON.stringify(task.executeResult, null, 2), readOnly: true, style: { minHeight: "36em", maxHeight: "84em" } }))));
}
exports.SelfDiscoverTaskForm = SelfDiscoverTaskForm;
function buildPrompt(task, executeConfig) {
    const reasoningPlan = executeConfig.implementResult.steps
        .map((step, index) => `${index + 1}. ${step.instructions}`)
        .join("\n");
    return `Follow the step-by-step reasoning plan to arrive at correct answers.

### Reasoning Plan
${reasoningPlan}

### Task
${task.problemStatement.trim()}

### Instructions

Follow the reasoning structure to arrive at the correct answer for the task.

Output a JSON object with properties,
+ steps : Step[] - The result of following each step in the reasoning structure
+ answer : string - The answer in easy-to-understand plain language

interface Step {
  result : string;
}`;
}
const executeResultMapper = tm.object({
    steps: tm.array(tm.object({
        result: tm.string(),
    })),
    answer: tm.string(),
});


/***/ }),

/***/ "./src/client-public/self-discover/SelfDiscoverTaskListForm.tsx":
/*!**********************************************************************!*\
  !*** ./src/client-public/self-discover/SelfDiscoverTaskListForm.tsx ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDiscoverTaskListForm = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const SelfDiscoverTaskForm_1 = __webpack_require__(/*! ./SelfDiscoverTaskForm */ "./src/client-public/self-discover/SelfDiscoverTaskForm.tsx");
function SelfDiscoverTaskListForm(props) {
    const { tasks, onChange, executeConfig, } = props;
    return React.createElement("div", { className: "ui segment divided selection massive list" }, tasks.map((t, index) => {
        return React.createElement(SelfDiscoverTaskForm_1.SelfDiscoverTaskForm, { tasks: tasks, key: t.uuid, task: t, onChange: (newSelfDiscoverTask) => {
                onChange(tasks.map(m => {
                    return m.uuid == newSelfDiscoverTask.uuid ?
                        newSelfDiscoverTask :
                        m;
                }), tasks);
            }, onRemove: () => {
                if (!confirm(`Delete task ${t.uuid}?`)) {
                    return;
                }
                const newSelfDiscoverTasks = [...tasks];
                newSelfDiscoverTasks.splice(index, 1);
                onChange(newSelfDiscoverTasks, tasks);
            }, onMoveUp: (t) => {
                if (index == 0) {
                    return;
                }
                const newSelfDiscoverTasks = [...tasks];
                newSelfDiscoverTasks.splice(index, 1);
                newSelfDiscoverTasks.splice(index - 1, 0, t);
                onChange(newSelfDiscoverTasks, tasks);
            }, onMoveDown: (t) => {
                if (index >= tasks.length) {
                    return;
                }
                const newSelfDiscoverTasks = [...tasks];
                newSelfDiscoverTasks.splice(index, 1);
                newSelfDiscoverTasks.splice(index + 1, 0, t);
                onChange(newSelfDiscoverTasks, tasks);
            }, executeConfig: executeConfig });
    }));
}
exports.SelfDiscoverTaskListForm = SelfDiscoverTaskListForm;


/***/ }),

/***/ "./src/client-public/self-discover/SelfDiscoverTaskTab.tsx":
/*!*****************************************************************!*\
  !*** ./src/client-public/self-discover/SelfDiscoverTaskTab.tsx ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDiscoverTaskTab = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const localStorageUtil = __webpack_require__(/*! ../local-storage-util */ "./src/client-public/local-storage-util.ts");
const SelfDiscoverTaskListForm_1 = __webpack_require__(/*! ./SelfDiscoverTaskListForm */ "./src/client-public/self-discover/SelfDiscoverTaskListForm.tsx");
function SelfDiscoverTaskTab(props) {
    const { active, selfDiscover, setSelfDiscover, } = props;
    return React.createElement("div", { className: classNames("ui bottom attached tab segment", active ? "active" : undefined) },
        React.createElement(SelfDiscoverTaskListForm_1.SelfDiscoverTaskListForm, { tasks: selfDiscover.tasks, onChange: (newTasks) => {
                setSelfDiscover({
                    ...selfDiscover,
                    tasks: newTasks,
                });
            }, executeConfig: undefined }),
        React.createElement("button", { className: "ui primary button", onClick: () => {
                setSelfDiscover({
                    ...selfDiscover,
                    tasks: [
                        ...selfDiscover.tasks,
                        localStorageUtil.makeSelfDiscoverTask(selfDiscover.uuid),
                    ],
                });
            } }, "Add Task"));
}
exports.SelfDiscoverTaskTab = SelfDiscoverTaskTab;


/***/ }),

/***/ "./src/client-public/use-dropdown.ts":
/*!*******************************************!*\
  !*** ./src/client-public/use-dropdown.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useDropdown = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
const onDropdownOpenListener = [];
function addOnDropdownOpenListener(d) {
    if (onDropdownOpenListener.indexOf(d) < 0) {
        onDropdownOpenListener.push(d);
    }
}
function removeOnDropdownOpenListener(d) {
    const index = onDropdownOpenListener.indexOf(d);
    if (index < 0) {
        return;
    }
    onDropdownOpenListener.splice(index, 1);
}
function invokeOnDropdownOpen(element) {
    const arr = onDropdownOpenListener.slice();
    for (const d of arr) {
        d(element);
    }
}
const onCloseAllListener = [];
function addOnCloseAllListener(d) {
    if (onCloseAllListener.indexOf(d) < 0) {
        onCloseAllListener.push(d);
    }
}
function removeOnCloseAllListener(d) {
    const index = onCloseAllListener.indexOf(d);
    if (index < 0) {
        return;
    }
    onCloseAllListener.splice(index, 1);
}
function invokeOnCloseAll() {
    const arr = onCloseAllListener.slice();
    for (const d of arr) {
        d();
    }
}
let documentClickListener = undefined;
let allowCloseAll = true;
function initDocumentClickListener() {
    if (documentClickListener != undefined) {
        return;
    }
    if (document != undefined) {
        documentClickListener = (_e) => {
            //console.log("body click", e);
            if (!allowCloseAll) {
                allowCloseAll = true;
                return;
            }
            invokeOnCloseAll();
        };
        document.addEventListener("click", documentClickListener, false);
    }
}
function useDropdown(props) {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef(null);
    React.useEffect(() => {
        initDocumentClickListener();
        const d = (element) => {
            if (element == ref.current) {
                //console.log("opening", element)
                setOpen(true);
            }
            else {
                //console.log("closing")
                setOpen(false);
            }
        };
        addOnDropdownOpenListener(d);
        const d2 = () => {
            //console.log("close all");
            setOpen(false);
        };
        addOnCloseAllListener(d2);
        return () => {
            removeOnDropdownOpenListener(d);
            removeOnCloseAllListener(d2);
        };
    }, []);
    const onMouseOver = () => {
    };
    const onClick = (e) => {
        e.stopPropagation();
        allowCloseAll = false;
        //console.log("click", ref.current, e.target);
        if (e.target == ref.current || e.target.className.indexOf("menu") < 0) {
            if (open) {
                setOpen(false);
            }
            else if (ref.current != undefined) {
                invokeOnDropdownOpen(ref.current);
            }
        }
        else {
            setOpen(false);
        }
    };
    return {
        className: (className) => {
            return classnames([
                className,
                (open ?
                    (props.openClassName == undefined ?
                        "open" :
                        props.openClassName) :
                    props.closeClassName),
            ]);
        },
        onMouseOver,
        onClick,
        ref,
    };
}
exports.useDropdown = useDropdown;


/***/ }),

/***/ "./src/client-public/use-error.ts":
/*!****************************************!*\
  !*** ./src/client-public/use-error.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useError = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function useError() {
    const [type, setType] = React.useState("warning");
    const [messages, setMessages] = React.useState([]);
    return {
        messages,
        type,
        push: (newType, newMessage) => {
            if (newType == "negative") {
                setType(newType);
            }
            setMessages(messages.concat(newMessage));
        },
        reset: () => {
            setType("warning");
            setMessages([]);
        },
    };
}
exports.useError = useError;


/***/ }),

/***/ "./src/json-schema-editor/index.tsx":
/*!******************************************!*\
  !*** ./src/json-schema-editor/index.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObject = exports.cleanProperty = exports.ObjectEditor = exports.PropertyEditor = exports.dataTypes = void 0;
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.dataTypes = [
    "string",
    "number",
    "boolean",
    "integer",
    "object",
    "array",
];
function PropertyEditor(props) {
    const { property, onChange, onRemove, onMoveUp, onMoveDown, hidePropertyName, hideRequired, hideControls, style, } = props;
    return React.createElement("div", { style: style },
        React.createElement("div", { className: "five fields", style: {
                paddingLeft: "32px"
            } },
            (hidePropertyName !== null && hidePropertyName !== void 0 ? hidePropertyName : false) ?
                undefined :
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Property Name"),
                    React.createElement("input", { type: "text", value: property.propertyName, placeholder: "Property Name", onChange: (evt) => {
                            onChange({
                                ...property,
                                propertyName: evt.target.value,
                            }, property);
                        } })),
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Data Type"),
                React.createElement("select", { value: property.type, onChange: (evt) => {
                        const type = evt.target.value;
                        if (type == "object") {
                            if ("properties" in property) {
                                onChange({
                                    ...property,
                                    type: type,
                                }, property);
                            }
                            else {
                                onChange({
                                    ...property,
                                    type: type,
                                    required: [],
                                    properties: [],
                                }, property);
                            }
                        }
                        else if (type == "array") {
                            if ("items" in property) {
                                onChange({
                                    ...property,
                                    type: type,
                                }, property);
                            }
                            else {
                                onChange({
                                    ...property,
                                    type: type,
                                    items: {
                                        type: "string",
                                        propertyName: "item",
                                        propertyRequired: true,
                                        description: "",
                                    },
                                }, property);
                            }
                        }
                        else {
                            onChange({
                                ...property,
                                type: type,
                            }, property);
                        }
                    } }, exports.dataTypes.map(s => {
                    return React.createElement("option", { key: s, value: s }, s);
                }))),
            (hideRequired !== null && hideRequired !== void 0 ? hideRequired : false) ?
                undefined :
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Required"),
                    React.createElement("div", { className: "ui checkbox" },
                        React.createElement("input", { type: "checkbox", checked: property.propertyRequired, onChange: (evt) => {
                                onChange({
                                    ...property,
                                    propertyRequired: evt.target.checked,
                                }, property);
                            } }),
                        React.createElement("label", null, "Required"))),
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Description"),
                React.createElement("input", { type: "text", value: property.description, placeholder: "Description", onChange: (evt) => {
                        onChange({
                            ...property,
                            description: evt.target.value,
                        }, property);
                    } })),
            (hideControls !== null && hideControls !== void 0 ? hideControls : false) ?
                undefined :
                React.createElement("div", { className: "field button group", style: {
                        alignSelf: "flex-end",
                    } },
                    React.createElement("button", { className: "ui icon red button", onClick: () => onRemove(property) },
                        React.createElement("i", { className: "trash icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: () => onMoveUp(property) },
                        React.createElement("i", { className: "arrow up icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: () => onMoveDown(property) },
                        React.createElement("i", { className: "arrow down icon" })))),
        property.type == "object" ?
            React.createElement(ObjectEditor, { object: property, onChange: (objectProperty, oldObjectProperty) => {
                    onChange(objectProperty, oldObjectProperty);
                }, style: {
                    paddingLeft: "32px",
                }, name: property.propertyName })
            : undefined,
        property.type == "array" ?
            React.createElement(PropertyEditor, { property: property.items, onChange: (propertyItems) => {
                    onChange({
                        ...property,
                        items: propertyItems,
                    }, property);
                }, onRemove: () => { }, onMoveUp: () => { }, onMoveDown: () => { }, hidePropertyName: true, hideRequired: true, hideControls: true, style: {
                    paddingLeft: "32px",
                } })
            : undefined);
}
exports.PropertyEditor = PropertyEditor;
function deriveRequired(properties) {
    return properties
        .filter(p => p.propertyRequired)
        .map(p => p.propertyName);
}
function ObjectEditor(props) {
    const { object, onChange, style, name, } = props;
    return React.createElement("div", { className: "fields", style: style },
        React.createElement("div", { className: "field" },
            React.createElement("label", null,
                name,
                " Properties"),
            object.properties.map((property, index) => {
                return React.createElement(PropertyEditor, { key: index, property: property, onRemove: () => {
                        const newProperties = [...object.properties];
                        newProperties.splice(index, 1);
                        onChange({
                            ...object,
                            required: deriveRequired(newProperties),
                            properties: newProperties,
                        }, object);
                    }, onChange: (newProperty) => {
                        const newProperties = [...object.properties];
                        newProperties.splice(index, 1, newProperty);
                        onChange({
                            ...object,
                            required: deriveRequired(newProperties),
                            properties: newProperties,
                        }, object);
                    }, onMoveUp: () => {
                        if (index == 0) {
                            return;
                        }
                        const newProperties = [...object.properties];
                        newProperties.splice(index, 1);
                        newProperties.splice(index - 1, 0, property);
                        onChange({
                            ...object,
                            required: deriveRequired(newProperties),
                            properties: newProperties,
                        }, object);
                    }, onMoveDown: () => {
                        if (index >= object.properties.length) {
                            return;
                        }
                        const newProperties = [...object.properties];
                        newProperties.splice(index, 1);
                        newProperties.splice(index + 1, 0, property);
                        onChange({
                            ...object,
                            required: deriveRequired(newProperties),
                            properties: newProperties,
                        }, object);
                    } });
            })),
        React.createElement("div", { className: "field button group", style: {
                alignSelf: "flex-start",
            } },
            React.createElement("button", { className: "ui icon red button", onClick: () => onChange({
                    ...object,
                    required: [
                        ...object.required,
                        `property_${object.properties.length}`,
                    ],
                    properties: [
                        ...object.properties,
                        {
                            propertyName: `property_${object.properties.length}`,
                            type: "string",
                            propertyRequired: true,
                            description: "",
                        }
                    ]
                }, object) },
                React.createElement("i", { className: "plus icon" }))));
}
exports.ObjectEditor = ObjectEditor;
function cleanProperty(property) {
    if (property.type == "object") {
        return {
            type: property.type,
            description: property.description,
            required: deriveRequired(property.properties),
            properties: Object.fromEntries(property.properties.map(p => [p.propertyName, cleanProperty(p)])),
        };
    }
    else if (property.type == "array") {
        return {
            type: property.type,
            description: property.description,
            items: cleanProperty(property.items),
        };
    }
    else {
        return {
            type: property.type,
            description: property.description,
        };
    }
}
exports.cleanProperty = cleanProperty;
function cleanObject(object) {
    return {
        type: object.type,
        required: deriveRequired(object.properties),
        properties: Object.fromEntries(object.properties.map(p => [p.propertyName, cleanProperty(p)])),
    };
}
exports.cleanObject = cleanObject;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map