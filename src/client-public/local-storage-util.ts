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

export function loadConversationsMeta () : ConversationMeta[] {
    return JSON.parse(getItem(LocalStorageKey.CONVERSATIONS_META) ?? "[]");
}

export function saveConversationsMeta (conversationsMeta : ConversationMeta[]) {
    return setItem(
        LocalStorageKey.CONVERSATIONS_META,
        JSON.stringify(conversationsMeta)
    );
}

export function loadConversation (uuid : string) : Conversation|undefined {
    const str = getItem(`${LocalStorageKey.CONVERSATION}_${uuid}`);
    if (str == undefined) {
        return undefined;
    }
    const result = JSON.parse(str) as Conversation;
    result.messages = result.messages ?? [];
    result.usedFunctions = result.usedFunctions ?? {};
    return result;
}

export function saveConversation (conversation : Conversation) {
    return setItem(
        `${LocalStorageKey.CONVERSATION}_${conversation.uuid}`,
        JSON.stringify(conversation)
    );
}
