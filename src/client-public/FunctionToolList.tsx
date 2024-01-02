import * as React from "react";
import * as reactRouter from "react-router-dom";
import { FunctionTool } from "./FunctionToolForm";
import classNames = require("classnames");

export interface FunctionToolListProps {
    functionTools : readonly FunctionTool[];
    editOnClick : boolean;
    leftFloatedContent? : (functionTool : FunctionTool) => JSX.Element;
    rightFloatedContent? : (functionTool : FunctionTool) => JSX.Element;
}

export function FunctionToolList (props : FunctionToolListProps) {
    const history = reactRouter.useHistory();
    const {
        functionTools,
        editOnClick,
        leftFloatedContent,
        rightFloatedContent,
    } = props;

    return <div className="ui segment divided selection massive list">
        {functionTools.map(f => {
            return <div className="item" key={f.uuid} onClick={() => {
                if (!editOnClick) {
                    return;
                }
                history.push(`/function-tool/${f.uuid}/edit`);
            }}>
                {
                    leftFloatedContent == undefined ?
                    undefined :
                    <div className="left floated content">
                        {leftFloatedContent(f)}
                    </div>
                }
                {
                    rightFloatedContent == undefined ?
                    undefined :
                    <div className="right floated content">
                        {rightFloatedContent(f)}
                    </div>
                }
                <div className="content">
                    <div className="header">
                        {
                            f.name.trim() == "" ?
                            `Function ${f.uuid}` :
                            f.name
                        }
                    </div>
                    <div className="ui mini label">{f.uuid}</div>
                    {
                        f.parameters.properties.map(p => {
                            return <div
                                key={p.propertyName}
                                className={classNames(
                                    "ui mini label",
                                    p.propertyRequired ? "red" : "yellow",
                                )}
                            >
                                {p.propertyName}
                            </div>
                        })
                    }
                    {
                        f.description.trim() == "" ?
                        <small className="description">
                            There is no description for this function
                        </small> :
                        <div className="description">
                            {f.description}
                        </div>
                    }
                </div>
            </div>
        })}
    </div>
}