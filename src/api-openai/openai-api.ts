import { AxiosApiArgs } from "route-client";
import { ChatApi } from "./chat";
import { EmbeddingApi } from "./embedding";
import { TextGenerationApi } from "./text-generation";
import { TokenizerApi } from "./tokenizer";

export interface OpenAiApiArgs extends AxiosApiArgs {
    apiKey : string,
}

export class OpenAiApi {
    readonly chat : ChatApi;
    readonly embedding : EmbeddingApi;
    readonly textGeneration : TextGenerationApi;
    readonly tokenizer : TokenizerApi;

    constructor (args : OpenAiApiArgs) {
        const myArgs : AxiosApiArgs = {
            ...args,
            onInjectHeader : () => {
                return {
                    Authorization : `Bearer ${args.apiKey}`,
                };
            }
        }
        const defaultTimeout = 240 * 1000;
        this.chat = new ChatApi(myArgs);
        this.chat.sender.axiosInstance.defaults.timeout = defaultTimeout;
        this.embedding = new EmbeddingApi(myArgs);
        this.embedding.sender.axiosInstance.defaults.timeout = defaultTimeout;
        this.textGeneration = new TextGenerationApi(myArgs);
        this.textGeneration.sender.axiosInstance.defaults.timeout = defaultTimeout;
        this.tokenizer = new TokenizerApi(myArgs);
        this.tokenizer.sender.axiosInstance.defaults.timeout = defaultTimeout;
    }
}
