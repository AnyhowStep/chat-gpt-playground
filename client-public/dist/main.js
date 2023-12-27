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
exports.chatCompleteResponseBody = exports.chatCompleteRequestBody = exports.chatMessage = exports.contentChatMessage = exports.assistantContentChatMessage = exports.assistantToolCallChatMessage = exports.toolResponseChatMessage = exports.assistantFunctionCallChatMessage = exports.functionResponseChatMessage = void 0;
var tm = __webpack_require__(/*! type-mapping/fluent */ "./node_modules/type-mapping/fluent.js");
exports.functionResponseChatMessage = tm.object({
    role: tm.literal("function"),
    /**
     * The name of the author of this message.
     * name is required if role is function,
     * and it should be the name of the function whose response is in the content.
     * May contain a-z, A-Z, 0-9, and underscores, with a maximum length of 64 characters.
     */
    name: tm.string(),
    /**
     * The contents of the message.
     * content is required for all messages except assistant messages with function calls.
     */
    content: tm.string(),
});
/**
 * https://platform.openai.com/docs/guides/chat/introduction
 */
exports.assistantFunctionCallChatMessage = tm.object({
    role: tm.literal("assistant"),
    content: tm.null(),
    function_call: tm.object({
        name: tm.string(),
        arguments: tm.jsonObjectString(),
    }),
});
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
    content: tm.null(),
    tool_calls: tm.array(tm.object({
        id: tm.string(),
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
exports.chatMessage = tm.or(exports.contentChatMessage, exports.assistantContentChatMessage, exports.assistantFunctionCallChatMessage, exports.functionResponseChatMessage, exports.assistantToolCallChatMessage, exports.toolResponseChatMessage);
/**
 * https://platform.openai.com/docs/api-reference/chat
 */
exports.chatCompleteRequestBody = tm.object({
    model: tm.string(),
    messages: tm.array(exports.chatMessage),
    tools: tm.array(tm.object({
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
    })).optional(),
    tool_choice: tm.or(tm.literal("none", "auto"), tm.object({
        type: tm.literal("function"),
        function: tm.object({
            name: tm.string(),
        }),
    })).optional(),
    /** @deprecated use tools */
    functions: tm.array(tm.object({
        name: tm.string(),
        description: tm.string().optional(),
        /**
         * The parameters the functions accepts, described as a JSON Schema object
         * See the [guide](https://platform.openai.com/docs/guides/gpt/function-calling) for examples,
         * and the JSON Schema [reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.
         */
        parameters: tm.jsonObject(),
    })).optional(),
    /** @deprecated use tool_choice */
    /**
     * Controls how the model responds to function calls.
     * "none" means the model does not call a function, and responds to the end-user.
     * "auto" means the model can pick between an end-user or calling a function.
     * Specifying a particular function via {"name":\ "my_function"} forces the model to call that function.
     * "none" is the default when no functions are present. "auto" is the default if functions are present.
     */
    function_call: tm.or(tm.literal("none", "auto"), tm.object({
        name: tm.string(),
    })).optional(),
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
function App(_props) {
    var sidebar = use_dropdown_1.useDropdown({
        openClassName: "uncover visible",
        closeClassName: "uncover animating",
    });
    // const storyComponent = React.useRef(() => <Story openAiApi={props.openAiApi}/>);
    // const conversationComponent = React.useRef(() => <Conversation openAiApi={props.openAiApi}/>);
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement("div", { id: "main-sidebar", className: sidebar.className("ui sidebar inverted vertical massive menu left overlay") },
            React.createElement(react_router_dom_1.Link, { className: "item", to: "/" }, "Home"),
            React.createElement("div", { className: "item" },
                "Lists",
                React.createElement("div", { className: "menu" },
                    React.createElement(react_router_dom_1.Link, { className: "ui item", to: "/list" }, "All Lists"))),
            React.createElement("div", { className: "item" },
                "Search",
                React.createElement("div", { className: "menu" }))),
        React.createElement("div", { className: "", style: { height: "100%" } },
            React.createElement(DefaultMenu_1.DefaultMenu, { sidebarHook: sidebar }),
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: "/", component: HomePage_1.HomePage })))));
}
exports.App = App;


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

/***/ "./src/client-public/local-storage-util.ts":
/*!*************************************************!*\
  !*** ./src/client-public/local-storage-util.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.kbUsed = exports.setItem = exports.getItem = exports.localStorageSupported = void 0;
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


/***/ }),

/***/ "./src/client-public/main.tsx":
/*!************************************!*\
  !*** ./src/client-public/main.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var openAiApi = new api_openai_1.OpenAiApi({
    domain: window.location.protocol + "//" + window.location.host,
    root: "https://api.openai.com/v1",
    apiKey: "",
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


/***/ })

/******/ });
//# sourceMappingURL=main.js.map