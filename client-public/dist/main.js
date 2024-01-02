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
var tm = __webpack_require__(/*! type-mapping/fluent */ "./node_modules/type-mapping/fluent.js");
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
var tm = __webpack_require__(/*! type-mapping/fluent */ "./node_modules/type-mapping/fluent.js");
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
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
__exportStar(__webpack_require__(/*! ./text-generation */ "./src/api-openai-mapper/text-generation.ts"), exports);
__exportStar(__webpack_require__(/*! ./tokenizer */ "./src/api-openai-mapper/tokenizer.ts"), exports);


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
var tm = __webpack_require__(/*! type-mapping */ "./node_modules/type-mapping/dist/index.js");
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
var tm = __webpack_require__(/*! type-mapping/fluent */ "./node_modules/type-mapping/fluent.js");
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
var rd = __webpack_require__(/*! route-declaration */ "./node_modules/route-declaration/dist/index.js");
var rc = __webpack_require__(/*! route-client */ "./node_modules/route-client/dist/index.js");
var m = __webpack_require__(/*! ../api-openai-mapper */ "./src/api-openai-mapper/index.ts");
/**
 * https://platform.openai.com/docs/api-reference/chat/create
 */
var completeChat = rd.route()
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
var rd = __webpack_require__(/*! route-declaration */ "./node_modules/route-declaration/dist/index.js");
var rc = __webpack_require__(/*! route-client */ "./node_modules/route-client/dist/index.js");
var m = __webpack_require__(/*! ../api-openai-mapper */ "./src/api-openai-mapper/index.ts");
var getEmbedding = rd.route()
    .append("/v1/embeddings")
    .setBody(m.getEmbeddingRequestBody)
    .setResponse(m.getEmbeddingResponseBody);
exports.EmbeddingApi = rc.toAxiosApi({
    getEmbedding: getEmbedding,
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
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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

/***/ "./src/api-openai/openai-api.ts":
/*!**************************************!*\
  !*** ./src/api-openai/openai-api.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiApi = void 0;
var chat_1 = __webpack_require__(/*! ./chat */ "./src/api-openai/chat.ts");
var embedding_1 = __webpack_require__(/*! ./embedding */ "./src/api-openai/embedding.ts");
var text_generation_1 = __webpack_require__(/*! ./text-generation */ "./src/api-openai/text-generation.ts");
var tokenizer_1 = __webpack_require__(/*! ./tokenizer */ "./src/api-openai/tokenizer.ts");
var OpenAiApi = /** @class */ (function () {
    function OpenAiApi(args) {
        var myArgs = __assign(__assign({}, args), { onInjectHeader: function () {
                return {
                    Authorization: "Bearer " + args.apiKey,
                };
            } });
        var defaultTimeout = 240 * 1000;
        this.chat = new chat_1.ChatApi(myArgs);
        this.chat.sender.axiosInstance.defaults.timeout = defaultTimeout;
        this.embedding = new embedding_1.EmbeddingApi(myArgs);
        this.embedding.sender.axiosInstance.defaults.timeout = defaultTimeout;
        this.textGeneration = new text_generation_1.TextGenerationApi(myArgs);
        this.textGeneration.sender.axiosInstance.defaults.timeout = defaultTimeout;
        this.tokenizer = new tokenizer_1.TokenizerApi(myArgs);
        this.tokenizer.sender.axiosInstance.defaults.timeout = defaultTimeout;
    }
    return OpenAiApi;
}());
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
var rd = __webpack_require__(/*! route-declaration */ "./node_modules/route-declaration/dist/index.js");
var rc = __webpack_require__(/*! route-client */ "./node_modules/route-client/dist/index.js");
var m = __webpack_require__(/*! ../api-openai-mapper */ "./src/api-openai-mapper/index.ts");
var tm = __webpack_require__(/*! type-mapping */ "./node_modules/type-mapping/dist/index.js");
var generate = rd.route()
    .append("/v1/engines")
    .appendParam("engine_id")
    .append("/completions")
    .setParam(tm.object({
    engine_id: tm.string(),
}))
    .setBody(m.textGenerationRequestBody)
    .setResponse(m.textGenerationResponseBody);
exports.TextGenerationApi = rc.toAxiosApi({
    generate: generate,
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
var rd = __webpack_require__(/*! route-declaration */ "./node_modules/route-declaration/dist/index.js");
var rc = __webpack_require__(/*! route-client */ "./node_modules/route-client/dist/index.js");
var m = __webpack_require__(/*! ../api-openai-mapper */ "./src/api-openai-mapper/index.ts");
var tokenLength = rd.route()
    .append("/v1/tokenizer/token-length")
    .setBody(m.tokenizerTokenLengthRequestBody)
    .setResponse(m.tokenizerTokenLengthResponseBody);
exports.TokenizerApi = rc.toAxiosApi({
    tokenLength: tokenLength,
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
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
function ApiKeyPage() {
    var _a;
    var _b = React.useState((_a = localStorageUtil.getItem(localStorageUtil.LocalStorageKey.OPEN_AI_API_KEY)) !== null && _a !== void 0 ? _a : ""), openAiApiKey = _b[0], setOpenAiApikey = _b[1];
    return React.createElement("div", { className: "ui main container form" },
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Open AI API Key"),
            React.createElement("input", { type: "text", value: openAiApiKey, onChange: function (evt) {
                    setOpenAiApikey(evt.target.value);
                } })),
        React.createElement("button", { className: "ui primary button", onClick: function () {
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
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var use_dropdown_1 = __webpack_require__(/*! ./use-dropdown */ "./src/client-public/use-dropdown.ts");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
//import {DefaultMenu} from "./DefaultMenu";
var HomePage_1 = __webpack_require__(/*! ./HomePage */ "./src/client-public/HomePage.tsx");
var DefaultMenu_1 = __webpack_require__(/*! ./DefaultMenu */ "./src/client-public/DefaultMenu.tsx");
var ApiKeyPage_1 = __webpack_require__(/*! ./ApiKeyPage */ "./src/client-public/ApiKeyPage.tsx");
var FunctionToolListPage_1 = __webpack_require__(/*! ./FunctionToolListPage */ "./src/client-public/FunctionToolListPage.tsx");
var FunctionToolEditPage_1 = __webpack_require__(/*! ./FunctionToolEditPage */ "./src/client-public/FunctionToolEditPage.tsx");
var ConversationListPage_1 = __webpack_require__(/*! ./ConversationListPage */ "./src/client-public/ConversationListPage.tsx");
var ConversationEditPage_1 = __webpack_require__(/*! ./ConversationEditPage */ "./src/client-public/ConversationEditPage.tsx");
function App(_props) {
    var sidebar = use_dropdown_1.useDropdown({
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
                    React.createElement(react_router_dom_1.Link, { className: "ui item", to: "/list" }, "All Lists"))),
            React.createElement("div", { className: "item" },
                "Search",
                React.createElement("div", { className: "menu" })),
            React.createElement("div", { className: "item" },
                "Settings",
                React.createElement("div", { className: "menu" },
                    React.createElement(react_router_dom_1.Link, { className: "ui item", to: "/api-key" }, "API Key"),
                    React.createElement(react_router_dom_1.Link, { className: "ui item", to: "/function-tool" }, "Function Tools"),
                    React.createElement(react_router_dom_1.Link, { className: "ui item", to: "/conversation" }, "Conversations")))),
        React.createElement("div", { className: "", style: { height: "100%" } },
            React.createElement(DefaultMenu_1.DefaultMenu, { sidebarHook: sidebar }),
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: "/api-key", component: ApiKeyPage_1.ApiKeyPage }),
                React.createElement(react_router_dom_1.Route, { path: "/function-tool/:uuid/edit", component: FunctionToolEditPage_1.FunctionToolEditPage }),
                React.createElement(react_router_dom_1.Route, { path: "/function-tool", component: FunctionToolListPage_1.FunctionToolListPage }),
                React.createElement(react_router_dom_1.Route, { path: "/conversation/:uuid/edit", component: function () { return React.createElement(ConversationEditPage_1.ConversationEditPage, { openAiApi: _props.openAiApi }); } }),
                React.createElement(react_router_dom_1.Route, { path: "/conversation", component: ConversationListPage_1.ConversationListPage }),
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

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantToolCallMessageForm = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var ToolCallListForm_1 = __webpack_require__(/*! ./ToolCallListForm */ "./src/client-public/ToolCallListForm.tsx");
function AssistantToolCallMessageForm(props) {
    var message = props.message, onChange = props.onChange, onAddResponse = props.onAddResponse;
    return React.createElement("div", { className: "ui form" },
        React.createElement(ToolCallListForm_1.ToolCallListForm, { toolCalls: message.tool_calls, onChange: function (newToolCalls) {
                onChange(__assign(__assign({}, message), { tool_calls: newToolCalls }), message);
            }, onAddResponse: function (toolCall) {
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

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRequestConfigUx = exports.chatModels = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.chatModels = [
    "gpt-3.5-turbo-1106",
    "gpt-4-1106-preview",
    "gpt-4-1106-vision-preview",
];
function ChatRequestConfigUx(props) {
    var config = props.config, onConfigChange = props.onConfigChange;
    return React.createElement("div", { className: "ui form" },
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Model"),
            React.createElement("select", { value: config.model, onChange: function (evt) {
                    onConfigChange(__assign(__assign({}, config), { model: evt.target.value }));
                } }, exports.chatModels.map(function (chatModel) {
                return React.createElement("option", { key: chatModel, value: chatModel }, chatModel);
            }))),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Temperature"),
            React.createElement("small", null,
                "What sampling temperature to use, between 0 and 2.",
                React.createElement("br", null),
                "Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
                React.createElement("br", null),
                "We generally recommend altering this or top_p but not both."),
            React.createElement("input", { type: "number", min: "0", max: "2", step: "0.01", value: config.temperature, onChange: function (evt) {
                    onConfigChange(__assign(__assign({}, config), { temperature: Number(evt.target.value) }));
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Max Output Tokens"),
            React.createElement("small", null, "The maximum number of tokens that can be generated in the chat completion."),
            React.createElement("input", { type: "number", min: "1", max: "4096", step: "1", value: config.max_tokens, onChange: function (evt) {
                    onConfigChange(__assign(__assign({}, config), { max_tokens: Number(evt.target.value) }));
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Stop Sequences"),
            React.createElement("small", null, "Up to 4 sequences where the API will stop generating further tokens."),
            React.createElement("input", { type: "text", placeholder: "A JSON string or JSON array: \"test\" or [\"day\", \"night\"]", value: config.stop, onChange: function (evt) {
                    onConfigChange(__assign(__assign({}, config), { stop: evt.target.value }));
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Top P"),
            React.createElement("small", null,
                "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.",
                React.createElement("br", null),
                "So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
                React.createElement("br", null),
                "We generally recommend altering this or temperature but not both."),
            React.createElement("input", { type: "number", min: "0", max: "1", step: "0.01", value: config.top_p, onChange: function (evt) {
                    onConfigChange(__assign(__assign({}, config), { top_p: Number(evt.target.value) }));
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Frequency Penalty"),
            React.createElement("small", null, "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim."),
            React.createElement("input", { type: "number", min: "-2", max: "2", step: "0.01", value: config.frequency_penalty, onChange: function (evt) {
                    onConfigChange(__assign(__assign({}, config), { frequency_penalty: Number(evt.target.value) }));
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Presence Penalty"),
            React.createElement("small", null, "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics."),
            React.createElement("input", { type: "number", min: "-2", max: "2", step: "0.01", value: config.presence_penalty, onChange: function (evt) {
                    onConfigChange(__assign(__assign({}, config), { presence_penalty: Number(evt.target.value) }));
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

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentMessageForm = exports.isContentMessage = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var contentMessageTypes = [
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
        React.createElement("textarea", { value: props.message.content, onChange: function (evt) {
                props.onChange(__assign(__assign({}, props.message), { content: evt.target.value }), props.message);
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

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationEditPage = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
var localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
var ChatRequestConfigUx_1 = __webpack_require__(/*! ./ChatRequestConfigUx */ "./src/client-public/ChatRequestConfigUx.tsx");
var FunctionToolList_1 = __webpack_require__(/*! ./FunctionToolList */ "./src/client-public/FunctionToolList.tsx");
var MessageListForm_1 = __webpack_require__(/*! ./MessageListForm */ "./src/client-public/MessageListForm.tsx");
var api_openai_mapper_1 = __webpack_require__(/*! ../api-openai-mapper */ "./src/api-openai-mapper/index.ts");
var json_schema_editor_1 = __webpack_require__(/*! ../json-schema-editor */ "./src/json-schema-editor/index.tsx");
var use_error_1 = __webpack_require__(/*! ./use-error */ "./src/client-public/use-error.ts");
var ErrorMessage_1 = __webpack_require__(/*! ./ErrorMessage */ "./src/client-public/ErrorMessage.tsx");
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
        var result = JSON.parse(str);
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
    var result = functionTools
        .filter(function (f) {
        var _a;
        return Object.prototype.hasOwnProperty.call(conversation.usedFunctions, f.uuid) ?
            (_a = conversation.usedFunctions[f.uuid]) !== null && _a !== void 0 ? _a : false :
            false;
    })
        .map(function (f) {
        return {
            type: "function",
            function: {
                name: f.name,
                description: f.description,
                parameters: __assign({}, json_schema_editor_1.cleanObject(f.parameters)),
            },
        };
    });
    return result.length == 0 ?
        undefined :
        api_openai_mapper_1.tools("parseFunctionTools", result);
}
function parseMessages(messages) {
    return messages.map(function (m, i) {
        return api_openai_mapper_1.chatMessage("parseMessages[" + i + "]", m);
    });
}
function submitConversation(openAiApi, conversation, functionTools) {
    return __awaiter(this, void 0, Promise, function () {
        var parsedStop, response, choice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parsedStop = parseStop(conversation.rawChatRequestConfig.stop);
                    return [4 /*yield*/, openAiApi.chat.complete()
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
                            user: undefined,
                        })
                            .send()];
                case 1:
                    response = _a.sent();
                    if (response.responseBody.choices.length != 1) {
                        console.error(response.responseBody);
                        throw new Error("Expected 1 choice, found " + response.responseBody.choices.length);
                    }
                    choice = response.responseBody.choices[0];
                    return [2 /*return*/, __assign(__assign({}, conversation), { messages: __spreadArray(__spreadArray([], conversation.messages), [
                                toMessage(choice.message),
                            ]) })];
            }
        });
    });
}
function ConversationEditPage(props) {
    var routeParams = reactRouter.useParams();
    var _a = React.useState(localStorageUtil.loadConversation(routeParams.uuid)), conversation = _a[0], setConversation = _a[1];
    var functionTools = React.useMemo(function () {
        return localStorageUtil.loadFunctionTools();
    }, []);
    var error = use_error_1.useError();
    React.useEffect(function () {
        if (conversation == undefined) {
            return;
        }
        var timer = setTimeout(function () {
            //localStorageUtil.loadConversation(conversation.uuid);
            localStorageUtil.saveConversation(conversation);
            var meta = localStorageUtil.loadConversationsMeta().map(function (m) {
                return m.uuid == conversation.uuid ?
                    {
                        uuid: conversation.uuid,
                        name: conversation.name,
                        description: conversation.description,
                        lastMessage: "TODO",
                    } :
                    m;
            });
            localStorageUtil.saveConversationsMeta(meta);
        }, 1000);
        return function () { return clearTimeout(timer); };
    }, [conversation]);
    if (conversation == undefined) {
        return React.createElement("div", { className: "ui main container" },
            "Conversation ",
            routeParams.uuid,
            " not found");
    }
    return React.createElement("div", { className: "ui main container" },
        React.createElement(MessageListForm_1.MessageListForm, { messages: conversation.messages, onChange: function (newMessages) {
                setConversation(__assign(__assign({}, conversation), { messages: newMessages }));
            } }),
        React.createElement("div", { className: "ui segment" },
            React.createElement(ErrorMessage_1.ErrorMessage, { error: error }),
            React.createElement("button", { className: "ui primary button", onClick: function () {
                    setConversation(__assign(__assign({}, conversation), { messages: __spreadArray(__spreadArray([], conversation.messages), [
                            {
                                uuid: uuid.v4(),
                                messageType: "user",
                                role: "user",
                                content: "",
                            }
                        ]) }));
                } }, "Add Message"),
            React.createElement("button", { className: "ui primary button", onClick: function () {
                    submitConversation(props.openAiApi, conversation, functionTools)
                        .then(function (newConversation) {
                        setConversation(newConversation);
                        error.reset();
                    }, function (err) {
                        var _a, _b;
                        console.log(Object.getOwnPropertyNames(err));
                        console.log(err);
                        var responseBody = (_a = err === null || err === void 0 ? void 0 : err.sendResult) === null || _a === void 0 ? void 0 : _a.responseBody;
                        var responseErrorMessage = (_b = responseBody === null || responseBody === void 0 ? void 0 : responseBody.error) === null || _b === void 0 ? void 0 : _b.message;
                        var errorMessage = err === null || err === void 0 ? void 0 : err.message;
                        if (responseErrorMessage != undefined) {
                            error.push("negative", [responseErrorMessage]);
                            return;
                        }
                        if (errorMessage != undefined) {
                            error.push("negative", [errorMessage]);
                            return;
                        }
                        error.push("negative", ["Unknown error"]);
                    });
                } }, "Submit")),
        React.createElement("div", { className: "ui segment" },
            React.createElement(ChatRequestConfigUx_1.ChatRequestConfigUx, { config: conversation.rawChatRequestConfig, onConfigChange: function (rawChatRequestConfig) {
                    setConversation(__assign(__assign({}, conversation), { rawChatRequestConfig: rawChatRequestConfig }));
                } })),
        React.createElement("div", { className: "ui segment" }, React.createElement(FunctionToolList_1.FunctionToolList, { functionTools: functionTools, editOnClick: false, rightFloatedContent: function (f) {
                var _a;
                return React.createElement("div", { className: "ui checkbox", key: f.uuid },
                    React.createElement("input", { type: "checkbox", checked: Object.prototype.hasOwnProperty.call(conversation.usedFunctions, f.uuid) ?
                            (_a = conversation.usedFunctions[f.uuid]) !== null && _a !== void 0 ? _a : false :
                            false, onChange: function (evt) {
                            var _a;
                            setConversation(__assign(__assign({}, conversation), { usedFunctions: __assign(__assign({}, conversation.usedFunctions), (_a = {}, _a[f.uuid] = evt.target.checked, _a)) }));
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

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationListPage = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
var localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
var ChatRequestConfigUx_1 = __webpack_require__(/*! ./ChatRequestConfigUx */ "./src/client-public/ChatRequestConfigUx.tsx");
//import { Conversation } from "./ConversationForm";
function ConversationListPage() {
    var history = reactRouter.useHistory();
    var _a = React.useState(localStorageUtil.loadConversationsMeta()), conversations = _a[0], setConversations = _a[1];
    return React.createElement("div", { className: "ui main container" },
        React.createElement("div", { className: "ui segment divided selection massive list" }, conversations.map(function (f) {
            return React.createElement("div", { className: "item", key: f.uuid, onClick: function () {
                    history.push("/conversation/" + f.uuid + "/edit");
                } },
                React.createElement("div", { className: "content" },
                    React.createElement("div", { className: "header" }, f.name.trim() == "" ?
                        "Conversation " + f.uuid :
                        f.name),
                    React.createElement("div", { className: "ui mini label" }, f.uuid),
                    f.description.trim() == "" ?
                        React.createElement("small", { className: "description" }, "There is no description for this conversation") :
                        React.createElement("div", { className: "description" }, f.description),
                    f.lastMessage.trim() == "" ?
                        undefined :
                        React.createElement("div", { className: "description" }, f.lastMessage)));
        })),
        React.createElement("button", { className: "ui primary button", onClick: function () {
                var conversations = localStorageUtil.loadConversationsMeta();
                var meta = {
                    uuid: uuid.v4(),
                    name: "",
                    description: "",
                    lastMessage: "",
                };
                var newConversations = __spreadArray(__spreadArray([], conversations), [
                    meta,
                ]);
                localStorageUtil.saveConversationsMeta(newConversations);
                localStorageUtil.saveConversation({
                    uuid: meta.uuid,
                    name: meta.name,
                    description: meta.description,
                    rawChatRequestConfig: {
                        model: ChatRequestConfigUx_1.chatModels[0],
                        temperature: 1,
                        max_tokens: 256,
                        stop: "",
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                    },
                    messages: [],
                    usedFunctions: {},
                });
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
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function DefaultMenu(props) {
    var _a = React.useState(""), searchInput = _a[0], setSearchInput = _a[1];
    //const dropdownSearch = useDropdown({});
    return React.createElement(react_router_dom_1.Route, { render: function (_a) {
            //searchId, atVersion, rowsPerPage
            //atVersion
            //Convenience method to pick values, stringify and prepend "?" character
            var history = _a.history;
            /*const queryOnlyLanguageCode = {
                languageCode : query.languageCode,
            };*/
            var goToSearch = function () {
                if (/^\s*$/.test(searchInput)) {
                    return;
                }
                history.push("/search/title/" + encodeURIComponent(searchInput));
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
                    React.createElement("form", { className: "ui input", onSubmit: function (e) {
                            e.preventDefault();
                            goToSearch();
                        } },
                        React.createElement("input", { type: "text", placeholder: "Search...", value: searchInput, onChange: function (e) {
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
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function ErrorMessage(props) {
    var error = props.error;
    if (error.messages.length == 0) {
        return React.createElement("div", { className: "ui hidden message" });
    }
    else {
        return (React.createElement("div", { className: "ui icon message " + error.type },
            React.createElement("i", { className: "exclamation triangle icon" }),
            React.createElement("div", { className: "content" },
                React.createElement("div", { className: "header" }, error.type == "warning" ? "Warning" : "Error"),
                React.createElement("ul", { className: "list" },
                    error.messages.map(function (message, i) { return React.createElement("li", { key: i }, message); }),
                    error.messages.some(function (msg) { return msg.startsWith("no such"); }) ?
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
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
var FunctionToolForm_1 = __webpack_require__(/*! ./FunctionToolForm */ "./src/client-public/FunctionToolForm.tsx");
function FunctionToolEditPage() {
    var history = reactRouter.useHistory();
    var routeParams = reactRouter.useParams();
    var _a = React.useState(localStorageUtil.loadFunctionTools().find(function (f) { return f.uuid == routeParams.uuid; })), functionTool = _a[0], setFunctionTool = _a[1];
    if (functionTool == undefined) {
        return React.createElement("div", { className: "ui main container" },
            "Function Tool ",
            routeParams.uuid,
            " not found");
    }
    return React.createElement("div", { className: "ui main container" },
        React.createElement("div", { className: "ui segment" },
            React.createElement(FunctionToolForm_1.FunctionToolForm, { functionTool: functionTool, onChange: setFunctionTool })),
        React.createElement("button", { className: "ui primary button", onClick: function () {
                var functionTools = localStorageUtil.loadFunctionTools();
                var newFunctionTools = functionTools.map(function (f) {
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

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionToolForm = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var jsonSchemaEditor = __webpack_require__(/*! ../json-schema-editor */ "./src/json-schema-editor/index.tsx");
function FunctionToolForm(props) {
    var functionTool = props.functionTool, onChange = props.onChange;
    return React.createElement("div", { className: "ui form" },
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Name"),
            React.createElement("small", null, "The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64."),
            React.createElement("input", { type: "text", value: functionTool.name, onChange: function (evt) {
                    onChange(__assign(__assign({}, functionTool), { name: evt.target.value }));
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Description"),
            React.createElement("small", null, "A description of what the function does, used by the model to choose when and how to call the function."),
            React.createElement("input", { type: "text", value: functionTool.description, onChange: function (evt) {
                    onChange(__assign(__assign({}, functionTool), { description: evt.target.value }));
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Parameters"),
            React.createElement("small", null,
                "The parameters the functions accepts, described as a JSON Schema object. See the",
                React.createElement("a", { href: "https://platform.openai.com/docs/guides/text-generation/function-calling" }, "guide"),
                "for examples, and the",
                React.createElement("a", { href: "https://json-schema.org/understanding-json-schema/" }, "JSON Schema reference"),
                "for documentation about the format. Omitting parameters defines a function with an empty parameter list."),
            React.createElement(jsonSchemaEditor.ObjectEditor, { object: functionTool.parameters, onChange: function (object) {
                    onChange(__assign(__assign({}, functionTool), { parameters: object }));
                } })));
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
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var reactRouter = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var classNames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
function FunctionToolList(props) {
    var history = reactRouter.useHistory();
    var functionTools = props.functionTools, editOnClick = props.editOnClick, leftFloatedContent = props.leftFloatedContent, rightFloatedContent = props.rightFloatedContent;
    return React.createElement("div", { className: "ui segment divided selection massive list" }, functionTools.map(function (f) {
        return React.createElement("div", { className: "item", key: f.uuid, onClick: function () {
                if (!editOnClick) {
                    return;
                }
                history.push("/function-tool/" + f.uuid + "/edit");
            } },
            leftFloatedContent == undefined ?
                undefined :
                React.createElement("div", { className: "left floated content" }, leftFloatedContent(f)),
            rightFloatedContent == undefined ?
                undefined :
                React.createElement("div", { className: "right floated content" }, rightFloatedContent(f)),
            React.createElement("div", { className: "content" },
                React.createElement("div", { className: "header" }, f.name.trim() == "" ?
                    "Function " + f.uuid :
                    f.name),
                React.createElement("div", { className: "ui mini label" }, f.uuid),
                f.parameters.properties.map(function (p) {
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

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionToolListPage = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
var localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
var FunctionToolList_1 = __webpack_require__(/*! ./FunctionToolList */ "./src/client-public/FunctionToolList.tsx");
function FunctionToolListPage() {
    var _a = React.useState(localStorageUtil.loadFunctionTools()), functionTools = _a[0], setFunctionTools = _a[1];
    return React.createElement("div", { className: "ui main container" },
        React.createElement(FunctionToolList_1.FunctionToolList, { functionTools: functionTools, editOnClick: true }),
        React.createElement("button", { className: "ui primary button", onClick: function () {
                var functionTools = localStorageUtil.loadFunctionTools();
                var newFunctionTools = __spreadArray(__spreadArray([], functionTools), [
                    {
                        uuid: uuid.v4(),
                        name: "",
                        description: "",
                        parameters: {
                            type: "object",
                            required: [],
                            properties: [],
                        },
                    },
                ]);
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
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
var local_storage_util_1 = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
var supportedLabel = function (supported) {
    return (React.createElement("span", { className: classnames("ui mini label", supported ? "green" : "red") }, supported ? "Supported" : "Not Supported"));
};
var HomePage = function (_props) {
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
                        supportedLabel(local_storage_util_1.localStorageSupported()),
                        React.createElement("br", null),
                        local_storage_util_1.kbUsed(),
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

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageForm = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var local_storage_util_1 = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
var ContentMessageForm_1 = __webpack_require__(/*! ./ContentMessageForm */ "./src/client-public/ContentMessageForm.tsx");
var AssistantToolCallMessageForm_1 = __webpack_require__(/*! ./AssistantToolCallMessageForm */ "./src/client-public/AssistantToolCallMessageForm.tsx");
var ToolResponseMessageForm_1 = __webpack_require__(/*! ./ToolResponseMessageForm */ "./src/client-public/ToolResponseMessageForm.tsx");
var messageTypes = [
    "system",
    "user",
    "assistant",
    "assistant_tool_call",
    "tool_response",
];
function MessageForm(props) {
    var _a, _b, _c;
    var messages = props.messages, message = props.message, onChange = props.onChange, onRemove = props.onRemove, onMoveUp = props.onMoveUp, onMoveDown = props.onMoveDown, onAddResponse = props.onAddResponse;
    return React.createElement("div", { className: "item" },
        React.createElement("div", { className: "ui form" },
            React.createElement("div", { className: "two fields" },
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Message Type"),
                    React.createElement("select", { value: message.messageType, onChange: function (evt) {
                            var messageType = evt.target.value;
                            switch (messageType) {
                                case "system": {
                                    onChange(__assign(__assign({}, message), { messageType: messageType, role: "system", content: "content" in message ?
                                            message.content :
                                            "" }), message);
                                    break;
                                }
                                case "user": {
                                    onChange(__assign(__assign({}, message), { messageType: messageType, role: "user", content: "content" in message ?
                                            message.content :
                                            "" }), message);
                                    break;
                                }
                                case "assistant": {
                                    onChange(__assign(__assign({}, message), { messageType: messageType, role: "assistant", content: "content" in message ?
                                            message.content :
                                            "" }), message);
                                    break;
                                }
                                case "assistant_tool_call": {
                                    onChange(__assign(__assign({}, message), { messageType: messageType, role: "assistant", tool_calls: "tool_calls" in message ?
                                            message.tool_calls :
                                            [] }), message);
                                    break;
                                }
                                case "tool_response": {
                                    onChange(__assign(__assign({}, message), { messageType: messageType, role: "tool", tool_call_id: "tool_call_id" in message ?
                                            message.tool_call_id :
                                            "", name: "name" in message ?
                                            message.name :
                                            "", content: "content" in message ?
                                            message.content :
                                            "" }), message);
                                    break;
                                }
                            }
                        } }, messageTypes.map(function (s) {
                        return React.createElement("option", { key: s, value: s }, s);
                    }))),
                React.createElement("div", { className: "field button group", style: {
                        alignSelf: "flex-end",
                    } },
                    React.createElement("button", { className: "ui icon red button", onClick: function () { return onRemove(message); } },
                        React.createElement("i", { className: "trash icon" })),
                    message.messageType == "assistant_tool_call" ?
                        React.createElement("button", { className: "ui icon primary button", onClick: function () { return onAddResponse(message.tool_calls); } },
                            React.createElement("i", { className: "reply icon" })) :
                        undefined,
                    React.createElement("button", { className: "ui icon button", onClick: function () { return onMoveUp(message); } },
                        React.createElement("i", { className: "arrow up icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: function () { return onMoveDown(message); } },
                        React.createElement("i", { className: "arrow down icon" }))))),
        ContentMessageForm_1.isContentMessage(message) ?
            React.createElement(ContentMessageForm_1.ContentMessageForm, { message: message, onChange: function (newMessage) {
                    onChange(newMessage, message);
                } }) :
            undefined,
        message.messageType == "assistant_tool_call" ?
            React.createElement(AssistantToolCallMessageForm_1.AssistantToolCallMessageForm, { message: message, onChange: function (newMessage) {
                    onChange(newMessage, message);
                }, onAddResponse: function (toolCall) {
                    onAddResponse([toolCall]);
                } }) :
            undefined,
        message.messageType == "tool_response" ?
            React.createElement(ToolResponseMessageForm_1.ToolResponseMessageForm, { message: message, functionArguments: (_c = ((_b = (_a = messages
                    .filter(local_storage_util_1.isAssistantToolCallMessage)
                    .flatMap(function (m) { return m.tool_calls; })
                    .find(function (tc) { return tc.id == message.tool_call_id; })) === null || _a === void 0 ? void 0 : _a.function) === null || _b === void 0 ? void 0 : _b.arguments)) !== null && _c !== void 0 ? _c : "", onChange: function (newMessage) {
                    onChange(newMessage, message);
                } }) :
            undefined);
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

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageListForm = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var uuid = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
var MessageForm_1 = __webpack_require__(/*! ./MessageForm */ "./src/client-public/MessageForm.tsx");
function MessageListForm(props) {
    var messages = props.messages, onChange = props.onChange;
    return React.createElement("div", { className: "ui segment divided selection massive list" }, messages.map(function (m, index) {
        return React.createElement(MessageForm_1.MessageForm, { messages: messages, key: m.uuid, message: m, onChange: function (newMessage) {
                onChange(messages.map(function (m) {
                    return m.uuid == newMessage.uuid ?
                        newMessage :
                        m;
                }), messages);
            }, onRemove: function () {
                var newMessages = __spreadArray([], messages);
                newMessages.splice(index, 1);
                onChange(newMessages, messages);
            }, onMoveUp: function (m) {
                if (index == 0) {
                    return;
                }
                var newMessages = __spreadArray([], messages);
                newMessages.splice(index, 1);
                newMessages.splice(index - 1, 0, m);
                onChange(newMessages, messages);
            }, onMoveDown: function (m) {
                if (index >= messages.length) {
                    return;
                }
                var newMessages = __spreadArray([], messages);
                newMessages.splice(index, 1);
                newMessages.splice(index + 1, 0, m);
                onChange(newMessages, messages);
            }, onAddResponse: function (toolCalls) {
                onChange(__spreadArray(__spreadArray([], messages), toolCalls.map(function (tc) {
                    return {
                        uuid: uuid.v4(),
                        messageType: "tool_response",
                        role: "tool",
                        tool_call_id: tc.id,
                        name: tc.function.name,
                        content: "",
                    };
                })), messages);
            } });
    }));
}
exports.MessageListForm = MessageListForm;


/***/ }),

/***/ "./src/client-public/ToolCallForm.tsx":
/*!********************************************!*\
  !*** ./src/client-public/ToolCallForm.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolCallForm = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function ToolCallForm(props) {
    var toolCall = props.toolCall, onChange = props.onChange, onRemove = props.onRemove, onMoveUp = props.onMoveUp, onMoveDown = props.onMoveDown, onAddResponse = props.onAddResponse;
    return React.createElement("div", { className: "item" },
        React.createElement("div", { className: "ui form" },
            React.createElement("div", { className: "two fields" },
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "ID"),
                    React.createElement("input", { type: "text", value: toolCall.id, placeholder: "ID", onChange: function (evt) {
                            onChange(__assign(__assign({}, toolCall), { id: evt.target.value }), toolCall);
                        } })),
                React.createElement("div", { className: "field button group", style: {
                        alignSelf: "flex-end",
                    } },
                    React.createElement("button", { className: "ui icon red button", onClick: function () { return onRemove(toolCall); } },
                        React.createElement("i", { className: "trash icon" })),
                    React.createElement("button", { className: "ui icon primary button", onClick: function () { return onAddResponse(toolCall); } },
                        React.createElement("i", { className: "reply icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: function () { return onMoveUp(toolCall); } },
                        React.createElement("i", { className: "arrow up icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: function () { return onMoveDown(toolCall); } },
                        React.createElement("i", { className: "arrow down icon" })))),
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Function Name"),
                React.createElement("input", { type: "text", value: toolCall.function.name, placeholder: "Function Name", onChange: function (evt) {
                        onChange(__assign(__assign({}, toolCall), { function: __assign(__assign({}, toolCall.function), { name: evt.target.value }) }), toolCall);
                    } })),
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Function Arguments"),
                React.createElement("textarea", { value: toolCall.function.arguments, placeholder: "Function Arguments", onChange: function (evt) {
                        onChange(__assign(__assign({}, toolCall), { function: __assign(__assign({}, toolCall.function), { arguments: evt.target.value }) }), toolCall);
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

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolCallListForm = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var ToolCallForm_1 = __webpack_require__(/*! ./ToolCallForm */ "./src/client-public/ToolCallForm.tsx");
function ToolCallListForm(props) {
    var toolCalls = props.toolCalls, onChange = props.onChange, onAddResponse = props.onAddResponse;
    return React.createElement("div", { className: "ui segment divided selection massive list" }, toolCalls.map(function (m, index) {
        return React.createElement(ToolCallForm_1.ToolCallForm, { key: index, toolCall: m, onChange: function (newToolCall) {
                onChange(toolCalls.map(function (m, changedIndex) {
                    return index == changedIndex ?
                        newToolCall :
                        m;
                }), toolCalls);
            }, onRemove: function () {
                var newToolCalls = __spreadArray([], toolCalls);
                newToolCalls.splice(index, 1);
                onChange(newToolCalls, toolCalls);
            }, onAddResponse: function (toolCall) {
                onAddResponse(toolCall);
            }, onMoveUp: function (m) {
                if (index == 0) {
                    return;
                }
                var newToolCalls = __spreadArray([], toolCalls);
                newToolCalls.splice(index, 1);
                newToolCalls.splice(index - 1, 0, m);
                onChange(newToolCalls, toolCalls);
            }, onMoveDown: function (m) {
                if (index >= toolCalls.length) {
                    return;
                }
                var newToolCalls = __spreadArray([], toolCalls);
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

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolResponseMessageForm = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function ToolResponseMessageForm(props) {
    var message = props.message, functionArguments = props.functionArguments, onChange = props.onChange;
    return React.createElement("div", { className: "ui form" },
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Tool Call ID"),
            React.createElement("input", { type: "text", value: message.tool_call_id, placeholder: "Tool Call ID", onChange: function (evt) {
                    onChange(__assign(__assign({}, message), { tool_call_id: evt.target.value }), message);
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Function Name"),
            React.createElement("input", { type: "text", value: message.name, placeholder: "Function Name", onChange: function (evt) {
                    onChange(__assign(__assign({}, message), { name: evt.target.value }), message);
                } })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Function Arguments"),
            React.createElement("textarea", { value: functionArguments, placeholder: "Function Arguments", readOnly: true })),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Content"),
            React.createElement("textarea", { value: message.content, placeholder: "Content (The result of the tool call)", onChange: function (evt) {
                    onChange(__assign(__assign({}, message), { content: evt.target.value }), message);
                } })));
}
exports.ToolResponseMessageForm = ToolResponseMessageForm;


/***/ }),

/***/ "./src/client-public/local-storage-util.ts":
/*!*************************************************!*\
  !*** ./src/client-public/local-storage-util.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.saveConversation = exports.loadConversation = exports.saveConversationsMeta = exports.loadConversationsMeta = exports.isAssistantToolCallMessage = exports.saveFunctionTools = exports.loadFunctionTools = exports.LocalStorageKey = exports.kbUsed = exports.setItem = exports.getItem = exports.localStorageSupported = void 0;
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
/**
 * https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage
 * @returns
 */
function kbUsed() {
    var _lsTotal = 0, _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
        console.log(_x.substring(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
    }
    ;
    var totalKb = Number((_lsTotal / 1024).toFixed(2));
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
})(LocalStorageKey = exports.LocalStorageKey || (exports.LocalStorageKey = {}));
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
function saveConversationsMeta(conversationsMeta) {
    return setItem(LocalStorageKey.CONVERSATIONS_META, JSON.stringify(conversationsMeta));
}
exports.saveConversationsMeta = saveConversationsMeta;
function loadConversation(uuid) {
    var _a, _b;
    var str = getItem(LocalStorageKey.CONVERSATION + "_" + uuid);
    if (str == undefined) {
        return undefined;
    }
    var result = JSON.parse(str);
    result.messages = (_a = result.messages) !== null && _a !== void 0 ? _a : [];
    result.usedFunctions = (_b = result.usedFunctions) !== null && _b !== void 0 ? _b : {};
    return result;
}
exports.loadConversation = loadConversation;
function saveConversation(conversation) {
    return setItem(LocalStorageKey.CONVERSATION + "_" + conversation.uuid, JSON.stringify(conversation));
}
exports.saveConversation = saveConversation;


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
var MyBigInt = /** @class */ (function () {
    function MyBigInt(value) {
        this.value = String(value);
    }
    MyBigInt.prototype.toString = function () {
        return this.value;
    };
    MyBigInt.prototype.toJSON = function () {
        return this.value;
    };
    return MyBigInt;
}());
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
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
var App_1 = __webpack_require__(/*! ./App */ "./src/client-public/App.tsx");
__webpack_require__(/*! semantic-ui-less/semantic.less */ "./node_modules/semantic-ui-less/semantic.less");
var api_openai_1 = __webpack_require__(/*! ../api-openai */ "./src/api-openai/index.ts");
var localStorageUtil = __webpack_require__(/*! ./local-storage-util */ "./src/client-public/local-storage-util.ts");
var openAiApi = new api_openai_1.OpenAiApi({
    domain: "https://api.openai.com",
    root: "/",
    apiKey: (_a = localStorageUtil.getItem(localStorageUtil.LocalStorageKey.OPEN_AI_API_KEY)) !== null && _a !== void 0 ? _a : "",
});
ReactDOM.render(React.createElement(App_1.App, { openAiApi: openAiApi }), document.getElementById("app"));


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
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
var onDropdownOpenListener = [];
function addOnDropdownOpenListener(d) {
    if (onDropdownOpenListener.indexOf(d) < 0) {
        onDropdownOpenListener.push(d);
    }
}
function removeOnDropdownOpenListener(d) {
    var index = onDropdownOpenListener.indexOf(d);
    if (index < 0) {
        return;
    }
    onDropdownOpenListener.splice(index, 1);
}
function invokeOnDropdownOpen(element) {
    var arr = onDropdownOpenListener.slice();
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var d = arr_1[_i];
        d(element);
    }
}
var onCloseAllListener = [];
function addOnCloseAllListener(d) {
    if (onCloseAllListener.indexOf(d) < 0) {
        onCloseAllListener.push(d);
    }
}
function removeOnCloseAllListener(d) {
    var index = onCloseAllListener.indexOf(d);
    if (index < 0) {
        return;
    }
    onCloseAllListener.splice(index, 1);
}
function invokeOnCloseAll() {
    var arr = onCloseAllListener.slice();
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var d = arr_2[_i];
        d();
    }
}
var documentClickListener = undefined;
var allowCloseAll = true;
function initDocumentClickListener() {
    if (documentClickListener != undefined) {
        return;
    }
    if (document != undefined) {
        documentClickListener = function (_e) {
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
    var _a = React.useState(false), open = _a[0], setOpen = _a[1];
    var ref = React.useRef(null);
    React.useEffect(function () {
        initDocumentClickListener();
        var d = function (element) {
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
        var d2 = function () {
            //console.log("close all");
            setOpen(false);
        };
        addOnCloseAllListener(d2);
        return function () {
            removeOnDropdownOpenListener(d);
            removeOnCloseAllListener(d2);
        };
    }, []);
    var onMouseOver = function () {
    };
    var onClick = function (e) {
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
        className: function (className) {
            return classnames([
                className,
                (open ?
                    (props.openClassName == undefined ?
                        "open" :
                        props.openClassName) :
                    props.closeClassName),
            ]);
        },
        onMouseOver: onMouseOver,
        onClick: onClick,
        ref: ref,
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
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function useError() {
    var _a = React.useState("warning"), type = _a[0], setType = _a[1];
    var _b = React.useState([]), messages = _b[0], setMessages = _b[1];
    return {
        messages: messages,
        type: type,
        push: function (newType, newMessage) {
            if (newType == "negative") {
                setType(newType);
            }
            setMessages(messages.concat(newMessage));
        },
        reset: function () {
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

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObject = exports.cleanProperty = exports.ObjectEditor = exports.PropertyEditor = exports.dataTypes = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.dataTypes = [
    "string",
    "number",
    "boolean",
    "integer",
    "object",
    "array",
];
function PropertyEditor(props) {
    var property = props.property, onChange = props.onChange, onRemove = props.onRemove, onMoveUp = props.onMoveUp, onMoveDown = props.onMoveDown, hidePropertyName = props.hidePropertyName, hideRequired = props.hideRequired, hideControls = props.hideControls, style = props.style;
    return React.createElement("div", { style: style },
        React.createElement("div", { className: "five fields", style: {
                paddingLeft: "32px"
            } },
            (hidePropertyName !== null && hidePropertyName !== void 0 ? hidePropertyName : false) ?
                undefined :
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Property Name"),
                    React.createElement("input", { type: "text", value: property.propertyName, placeholder: "Property Name", onChange: function (evt) {
                            onChange(__assign(__assign({}, property), { propertyName: evt.target.value }), property);
                        } })),
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Data Type"),
                React.createElement("select", { value: property.type, onChange: function (evt) {
                        var type = evt.target.value;
                        if (type == "object") {
                            if ("properties" in property) {
                                onChange(__assign(__assign({}, property), { type: type }), property);
                            }
                            else {
                                onChange(__assign(__assign({}, property), { type: type, required: [], properties: [] }), property);
                            }
                        }
                        else if (type == "array") {
                            if ("items" in property) {
                                onChange(__assign(__assign({}, property), { type: type }), property);
                            }
                            else {
                                onChange(__assign(__assign({}, property), { type: type, items: {
                                        type: "string",
                                        propertyName: "item",
                                        propertyRequired: true,
                                        description: "",
                                    } }), property);
                            }
                        }
                        else {
                            onChange(__assign(__assign({}, property), { type: type }), property);
                        }
                    } }, exports.dataTypes.map(function (s) {
                    return React.createElement("option", { key: s, value: s }, s);
                }))),
            (hideRequired !== null && hideRequired !== void 0 ? hideRequired : false) ?
                undefined :
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Required"),
                    React.createElement("div", { className: "ui checkbox" },
                        React.createElement("input", { type: "checkbox", checked: property.propertyRequired, onChange: function (evt) {
                                onChange(__assign(__assign({}, property), { propertyRequired: evt.target.checked }), property);
                            } }),
                        React.createElement("label", null, "Required"))),
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Description"),
                React.createElement("input", { type: "text", value: property.description, placeholder: "Description", onChange: function (evt) {
                        onChange(__assign(__assign({}, property), { description: evt.target.value }), property);
                    } })),
            (hideControls !== null && hideControls !== void 0 ? hideControls : false) ?
                undefined :
                React.createElement("div", { className: "field button group", style: {
                        alignSelf: "flex-end",
                    } },
                    React.createElement("button", { className: "ui icon red button", onClick: function () { return onRemove(property); } },
                        React.createElement("i", { className: "trash icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: function () { return onMoveUp(property); } },
                        React.createElement("i", { className: "arrow up icon" })),
                    React.createElement("button", { className: "ui icon button", onClick: function () { return onMoveDown(property); } },
                        React.createElement("i", { className: "arrow down icon" })))),
        property.type == "object" ?
            React.createElement(ObjectEditor, { object: property, onChange: function (objectProperty, oldObjectProperty) {
                    onChange(objectProperty, oldObjectProperty);
                }, style: {
                    paddingLeft: "32px",
                }, name: property.propertyName })
            : undefined,
        property.type == "array" ?
            React.createElement(PropertyEditor, { property: property.items, onChange: function (propertyItems) {
                    onChange(__assign(__assign({}, property), { items: propertyItems }), property);
                }, onRemove: function () { }, onMoveUp: function () { }, onMoveDown: function () { }, hidePropertyName: true, hideRequired: true, hideControls: true, style: {
                    paddingLeft: "32px",
                } })
            : undefined);
}
exports.PropertyEditor = PropertyEditor;
function deriveRequired(properties) {
    return properties
        .filter(function (p) { return p.propertyRequired; })
        .map(function (p) { return p.propertyName; });
}
function ObjectEditor(props) {
    var object = props.object, onChange = props.onChange, style = props.style, name = props.name;
    return React.createElement("div", { className: "fields", style: style },
        React.createElement("div", { className: "field" },
            React.createElement("label", null,
                name,
                " Properties"),
            object.properties.map(function (property, index) {
                return React.createElement(PropertyEditor, { key: index, property: property, onRemove: function () {
                        var newProperties = __spreadArray([], object.properties);
                        newProperties.splice(index, 1);
                        onChange(__assign(__assign({}, object), { required: deriveRequired(newProperties), properties: newProperties }), object);
                    }, onChange: function (newProperty) {
                        var newProperties = __spreadArray([], object.properties);
                        newProperties.splice(index, 1, newProperty);
                        onChange(__assign(__assign({}, object), { required: deriveRequired(newProperties), properties: newProperties }), object);
                    }, onMoveUp: function () {
                        if (index == 0) {
                            return;
                        }
                        var newProperties = __spreadArray([], object.properties);
                        newProperties.splice(index, 1);
                        newProperties.splice(index - 1, 0, property);
                        onChange(__assign(__assign({}, object), { required: deriveRequired(newProperties), properties: newProperties }), object);
                    }, onMoveDown: function () {
                        if (index >= object.properties.length) {
                            return;
                        }
                        var newProperties = __spreadArray([], object.properties);
                        newProperties.splice(index, 1);
                        newProperties.splice(index + 1, 0, property);
                        onChange(__assign(__assign({}, object), { required: deriveRequired(newProperties), properties: newProperties }), object);
                    } });
            })),
        React.createElement("div", { className: "field button group", style: {
                alignSelf: "flex-start",
            } },
            React.createElement("button", { className: "ui icon red button", onClick: function () { return onChange(__assign(__assign({}, object), { required: __spreadArray(__spreadArray([], object.required), [
                        "property_" + object.properties.length,
                    ]), properties: __spreadArray(__spreadArray([], object.properties), [
                        {
                            propertyName: "property_" + object.properties.length,
                            type: "string",
                            propertyRequired: true,
                            description: "",
                        }
                    ]) }), object); } },
                React.createElement("i", { className: "plus icon" }))));
}
exports.ObjectEditor = ObjectEditor;
function cleanProperty(property) {
    if (property.type == "object") {
        return {
            type: property.type,
            description: property.description,
            required: deriveRequired(property.properties),
            properties: Object.fromEntries(property.properties.map(function (p) { return [p.propertyName, cleanProperty(p)]; })),
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
        properties: Object.fromEntries(object.properties.map(function (p) { return [p.propertyName, cleanProperty(p)]; })),
    };
}
exports.cleanObject = cleanObject;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map