import * as React from "react";
import * as reactRouter from "react-router-dom";
import { ApiConfiguration } from "./local-storage-util";
// import classNames = require("classnames");

export interface ApiConfigurationListProps {
    ApiConfigurations : readonly ApiConfiguration[];
    editOnClick : boolean;
    leftFloatedContent? : (ApiConfiguration : ApiConfiguration) => JSX.Element;
    rightFloatedContent? : (ApiConfiguration : ApiConfiguration) => JSX.Element;
}

export function ApiConfigurationList (props : ApiConfigurationListProps) {
    const history = reactRouter.useHistory();
    const {
        ApiConfigurations,
        editOnClick,
        leftFloatedContent,
        rightFloatedContent,
    } = props;

    return <div className="ui segment divided selection massive list">
        {ApiConfigurations.map(item => {
            return <div className="item" key={item.uuid} onClick={() => {
                if (!editOnClick) {
                    return;
                }
                history.push(`/api-configuration/${item.uuid}/edit`);
            }}>
                {
                    leftFloatedContent == undefined ?
                    undefined :
                    <div className="left floated content">
                        {leftFloatedContent(item)}
                    </div>
                }
                {
                    rightFloatedContent == undefined ?
                    undefined :
                    <div className="right floated content">
                        {rightFloatedContent(item)}
                    </div>
                }
                <div className="content">
                    <div className="header">
                        {
                            item.name.trim() == "" ?
                            `Api Configuration ${item.uuid}` :
                            item.name
                        }
                    </div>
                    <div className="ui mini label">{item.uuid}</div>
                    <div className="ui mini label">{item.domain}</div>
                    <div className="ui mini label">{item.root}</div>
                </div>
            </div>
        })}
    </div>
}