import * as uuid from "uuid";
import { RawChatRequestConfig } from "./ChatRequestConfigUx";
import { FunctionTool } from "./FunctionToolForm";

export function localStorageSupported () {
    return (
        "localStorage" in self
    );
}

export function getItem (key : string) : string|null {
    return (
        localStorageSupported() ?
        localStorage.getItem(key) :
        null
    );
}

export function setItem (key : string, value : string) : void {
    if (localStorageSupported()) {
        localStorage.setItem(key, value);
    }
}

export function removeItem (key : string) : void {
    if (localStorageSupported()) {
        localStorage.removeItem(key);
    }
}

/**
 * https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage
 * @returns 
 */
export function kbUsed () : number {
    let _lsTotal = 0,
        _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
        console.log(_x.substring(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
    };
    const totalKb = Number((_lsTotal / 1024).toFixed(2));
    console.log("Total = " + totalKb + " KB");
    return totalKb;
}

export enum LocalStorageKey {
    OPEN_AI_API_KEY = "OPEN_AI_API_KEY",
    FUNCTION_TOOLS = "FUNCTION_TOOLS",
    CONVERSATIONS_META = "CONVERSATIONS_META",
    CONVERSATION = "CONVERSATION",
    MODELS = "MODELS",
    SELF_DISCOVERS_META = "SELF_DISCOVERS_META",
    SELF_DISCOVER = "SELF_DISCOVER",
}

export function loadFunctionTools () : FunctionTool[] {
    return JSON.parse(getItem(LocalStorageKey.FUNCTION_TOOLS) ?? "[]");
}

export function saveFunctionTools (tools : FunctionTool[]) {
    return setItem(
        LocalStorageKey.FUNCTION_TOOLS,
        JSON.stringify(tools)
    );
}

export interface ConversationMeta {
    uuid : string;
    name : string;
    description : string;
    lastMessage : string;
}

export interface SelfDiscoverMeta {
    uuid : string;
    name : string;
    description : string;
}

export interface MessageBase {
    uuid : string;
}

export interface SystemMessage extends MessageBase {
    messageType : "system",
    role : "system",
    content : string,
}

export interface UserMessage extends MessageBase {
    messageType : "user",
    role : "user",
    content : string,
}

export interface AssistantMessage extends MessageBase {
    messageType : "assistant",
    role : "assistant",
    content : string,
}

export interface ToolCall {
    id : string,
    type : "function",
    function : {
        name : string,
        arguments : string,
    },
}

export interface AssistantToolCallMessage extends MessageBase {
    messageType : "assistant_tool_call",
    role : "assistant",
    tool_calls : ToolCall[],
}

export function isAssistantToolCallMessage (m : Message) : m is AssistantToolCallMessage {
    return "tool_calls" in m;
}

export interface ToolResponseMessage extends MessageBase {
    messageType : "tool_response",
    role : "tool",
    tool_call_id : string,
    /**
     * The function name
     */
    name : string,
    /**
     * The result of the tool call
     */
    content : string,
}

export type Message =
    | SystemMessage
    | UserMessage
    | AssistantMessage
    | AssistantToolCallMessage
    | ToolResponseMessage;

export interface Conversation {
    uuid : string;
    name : string;
    description : string;
    rawChatRequestConfig : RawChatRequestConfig;
    usedFunctions : Record<string, boolean|undefined>,
    messages : Message[],
}

export interface SelfDiscoverTask {
    uuid : string;
    useAsExample : boolean;
    problemStatement : string;
    executeConversation : Conversation;
    executeResult : undefined|SelfDiscoverTaskExecuteResult;
}

export interface SelfDiscoverTaskExecuteResult {
    steps : { result : string }[];
    answer : string;
}

export interface PartialSelfDiscoverTask {
    uuid : string;
    useAsExample : boolean;
    problemStatement : string;
    executeConversation : undefined;
}

/**
 * https://arxiv.org/html/2402.03620v1
 */
export interface SelfDiscover {
    uuid : string;
    name : string;
    description : string;
    model : string;

    tasks : SelfDiscoverTask[];
    selectConversation : Conversation;
    adaptConversation : Conversation;
    implementConversation : Conversation;

    selectResult : SelfDiscoverSelectResult|undefined,
    adaptResult : SelfDiscoverAdaptResult|undefined,
    implementResult : SelfDiscoverImplementResult|undefined,
}

export interface SelfDiscoverSelectResult {
    selected_reasoning_modules : string[];
    rationale : string;
}

export interface SelfDiscoverAdaptResult {
    reasoning_modules : {
        name : string,
        description : string,
    }[];
}

export interface SelfDiscoverImplementResult {
    steps : {
        instructions : string,
    }[];
}

export interface PartialSelfDiscover {
    uuid : string;
    name : string;
    description : string;
    model : string;

    tasks : PartialSelfDiscoverTask[];
    selectConversation : undefined;
    adaptConversation : undefined;
    implementConversation : undefined;
}

export function loadConversationsMeta () : ConversationMeta[] {
    return JSON.parse(getItem(LocalStorageKey.CONVERSATIONS_META) ?? "[]");
}

export function loadSelfDiscoversMeta () : SelfDiscoverMeta[] {
    return JSON.parse(getItem(LocalStorageKey.SELF_DISCOVERS_META) ?? "[]");
}

export function saveConversationsMeta (conversationsMeta : ConversationMeta[]) {
    return setItem(
        LocalStorageKey.CONVERSATIONS_META,
        JSON.stringify(conversationsMeta)
    );
}

export function saveSelfDiscoversMeta (selfDiscoversMeta : SelfDiscoverMeta[]) {
    return setItem(
        LocalStorageKey.SELF_DISCOVERS_META,
        JSON.stringify(selfDiscoversMeta)
    );
}

export function makeConversation (customUuid : string|undefined = undefined) : {
    conversation : Conversation,
    meta : ConversationMeta,
} {
    const models = loadModels().filter(model => model.id.startsWith("gpt"));
    const meta : ConversationMeta = {
        uuid : customUuid ?? uuid.v4(),
        name : "",
        description : "",
        lastMessage : "",
    };
    const conversation : Conversation = {
        uuid : meta.uuid,
        name : meta.name,
        description : meta.description,
        rawChatRequestConfig : {
            model : models.length > 0 ?
                models[0].id :
                "",
            temperature  :1,
            max_tokens : 256,
            stop : "",
            top_p : 1,
            frequency_penalty : 0,
            presence_penalty : 0,
            response_format : {
                type : "text",
            },
        },
        messages : [],
        usedFunctions : {},
    };
    return {
        conversation,
        meta,
    };
}

export function makeSelfDiscover () : {
    selfDiscover : SelfDiscover,
    meta : SelfDiscoverMeta,
} {
    const meta : SelfDiscoverMeta = {
        uuid : uuid.v4(),
        name : "",
        description : "",
    };
    const models = loadModels().filter(model => model.id.startsWith("gpt-4"));
    const selfDiscover : SelfDiscover = {
        uuid : meta.uuid,
        name : meta.name,
        description : meta.description,
        model : models.length > 0 ?
            models[0].id :
            "",

        tasks : [],
        selectConversation : undefined as unknown as Conversation,
        adaptConversation : undefined as unknown as Conversation,
        implementConversation : undefined as unknown as Conversation,

        selectResult : undefined,
    };
    loadOrMakeSelfDiscoverConversations(selfDiscover);
    return {
        selfDiscover,
        meta,
    };
}

export function makeSelfDiscoverTask (selfDiscoverUuid : string) : SelfDiscoverTask {
    const taskUuid = uuid.v4();
    return {
        uuid : taskUuid,
        useAsExample : true,
        problemStatement : "",
        executeConversation : makeConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscoverUuid}_task_${taskUuid}_execute`).conversation,
    };
}

export function loadConversation (uuid : string) : Conversation|undefined {
    const str = getItem(`${LocalStorageKey.CONVERSATION}_${uuid}`);
    if (str == undefined) {
        return undefined;
    }
    const result = JSON.parse(str) as Conversation;
    result.messages = result.messages ?? [];
    result.usedFunctions = result.usedFunctions ?? {};
    result.rawChatRequestConfig.response_format = result.rawChatRequestConfig.response_format
        ?? {
            type : "text",
        };
    return result;
}

function loadOrMakeSelfDiscoverConversations (selfDiscover : SelfDiscover) {
    selfDiscover.selectConversation = (
        loadConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_select`) ??
        makeConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_select`).conversation
    );
    selfDiscover.adaptConversation = (
        loadConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_adapt`) ??
        makeConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_adapt`).conversation
    );
    selfDiscover.implementConversation = (
        loadConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_implement`) ??
        makeConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_implement`).conversation
    );
    for (const task of selfDiscover.tasks) {
        task.executeConversation = (
            loadConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_task_${task.uuid}_execute`) ??
            makeConversation(`${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}_task_${task.uuid}_execute`).conversation
        );
    }
}

export function loadSelfDiscover (uuid : string) : SelfDiscover|undefined {
    const str = getItem(`${LocalStorageKey.SELF_DISCOVER}_${uuid}`);
    if (str == undefined) {
        return undefined;
    }
    const result = JSON.parse(str) as SelfDiscover;
    
    loadOrMakeSelfDiscoverConversations(result);

    for (const task of result.tasks) {
        if (task.useAsExample == undefined) {
            task.useAsExample = (task as any).includeInPrompt;
        }
    }

    return result;
}

export function saveConversation (conversation : Conversation) {
    return setItem(
        `${LocalStorageKey.CONVERSATION}_${conversation.uuid}`,
        JSON.stringify(conversation)
    );
}

export function saveSelfDiscover (selfDiscover : SelfDiscover) {
    saveConversation(selfDiscover.selectConversation);
    saveConversation(selfDiscover.adaptConversation);
    saveConversation(selfDiscover.implementConversation);
    for (const task of selfDiscover.tasks) {
        saveConversation(task.executeConversation);
    }
    const minSelfDiscover : PartialSelfDiscover = {
        ...selfDiscover,
        selectConversation : undefined,
        adaptConversation : undefined,
        implementConversation : undefined,
        tasks : selfDiscover.tasks.map(t => {
            return {
                ...t,
                executeConversation : undefined,
            };
        }),
    };
    return setItem(
        `${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}`,
        JSON.stringify(minSelfDiscover)
    );
}

export function deleteConversation (conversation : Pick<Conversation, "uuid">) {
    return removeItem(
        `${LocalStorageKey.CONVERSATION}_${conversation.uuid}`
    );
}

export function deleteSelfDiscover (self_discover_id : Pick<SelfDiscover, "uuid">) {
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
    return removeItem(
        `${LocalStorageKey.SELF_DISCOVER}_${selfDiscover.uuid}`
    );
}

interface Model {
    id : string,
    object : "model",
    created : number,
    owned_by : string,
}

export function loadModels () : Model[] {
    const str = getItem(LocalStorageKey.MODELS);
    if (str == undefined) {
        return [];
    }
    const result = JSON.parse(str) as Model[];
    return result;
}

export function saveModels (models : Model[]) {
    return setItem(
        LocalStorageKey.MODELS,
        JSON.stringify(models)
    );
}