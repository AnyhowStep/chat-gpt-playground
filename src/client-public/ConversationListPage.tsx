import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as uuid from "uuid";
import * as localStorageUtil from "./local-storage-util";
import { chatModels } from "./ChatRequestConfigUx";
//import { Conversation } from "./ConversationForm";

export function ConversationListPage () {
    const history = reactRouter.useHistory();
    const [
        conversations,
        setConversations,
    ] = React.useState(localStorageUtil.loadConversationsMeta());

    return <div className="ui main container">
        <div className="ui segment divided selection massive list">
            {conversations.map(f => {
                return <div className="item" key={f.uuid} onClick={() => {
                    history.push(`/conversation/${f.uuid}/edit`);
                }}>
                    <div className="content">
                        <div className="header">
                            {
                                f.name.trim() == "" ?
                                `Conversation ${f.uuid}` :
                                f.name
                            }
                        </div>
                        <div className="ui mini label">{f.uuid}</div>
                        {
                            f.description.trim() == "" ?
                            <small className="description">
                                There is no description for this conversation
                            </small> :
                            <div className="description">
                                {f.description}
                            </div>
                        }
                        {
                            f.lastMessage.trim() == "" ?
                            undefined :
                            <div className="description">
                                {f.lastMessage}
                            </div>
                        }
                    </div>
                </div>
            })}
        </div>
        <button className="ui primary button" onClick={() => {
            const conversations = localStorageUtil.loadConversationsMeta();
            const meta = {
                uuid : uuid.v4(),
                name : "",
                description : "",
                lastMessage : "",
            };
            const newConversations : localStorageUtil.ConversationMeta[] = [
                ...conversations,
                meta,
            ];
            localStorageUtil.saveConversationsMeta(newConversations);
            localStorageUtil.saveConversation({
                uuid : meta.uuid,
                name : meta.name,
                description : meta.description,
                rawChatRequestConfig : {
                    model : chatModels[0],
                    temperature  :1,
                    max_tokens : 256,
                    stop : "",
                    top_p : 1,
                    frequency_penalty : 0,
                    presence_penalty : 0,
                },
                messages : [],
                usedFunctions : {},
            })
            setConversations(newConversations);
        }}>
            Create Conversation
        </button>
    </div>
}