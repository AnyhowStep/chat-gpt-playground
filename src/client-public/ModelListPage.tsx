import * as React from "react";
import * as classNames from "classnames";
import * as localStorageUtil from "./local-storage-util";
import { OpenAiApi } from "../api-openai";
import { useError } from "./use-error";
import { handleError } from "./error-handling";
//import { Model } from "./ModelForm";

export interface ModelListPageProps {
    openAiApi : OpenAiApi,
}

export function ModelListPage (props : ModelListPageProps) {
    const [
        models,
        setModels,
    ] = React.useState(localStorageUtil.loadModels());
    const [isLoading, setIsLoading] = React.useState(false);
    const error = useError();

    return <div className="ui main container">
        <div className="ui segment divided selection massive list">
            {models.map(f => {
                return <div className="item" key={f.id}>
                    <div className="content">
                        <div className="header">
                            {f.id}
                        </div>
                        <div className="ui mini label">{f.created}</div>
                        <div className="ui mini label">{new Date(f.created * 1000).toISOString()}</div>
                        <div className="ui mini label">{f.owned_by}</div>
                    </div>
                </div>
            })}
        </div>
        <button
            className={classNames(
                "ui primary button",
                isLoading ? "loading" : undefined,
            )}
            onClick={() => {
                if (isLoading) {
                    return;
                }
                setIsLoading(true);
                props.openAiApi.model.list()
                    .send()
                    .then(
                        (res) => {
                            const arr = [...res.responseBody.data];
                            arr.sort((a, b) => {
                                return b.created - a.created;
                            });
                            setIsLoading(false);
                            setModels(arr);
                            localStorageUtil.saveModels(arr);
                            error.reset();
                        },
                        (err) => {
                            setIsLoading(false);
                            handleError(error, err);
                        },
                    );
            }}
        >
            Update
        </button>
    </div>
}