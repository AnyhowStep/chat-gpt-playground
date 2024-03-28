import * as React from "react";
import * as classNames from "classnames";
import { DisplayType } from "./SWIPLResultView";
import { QueryResultTableView } from "./QueryResultTableView";
import { QueryResultJsonView } from "./QueryResultJsonView";
import { QueryResultListView } from "./QueryResultListView";
import { SwiplQueryWrapper, SwiplResultWrapper } from "./swipl-wrapper";

export interface QueryResult {
    index : number,
    queryStr : string,
    swiplQuery : SwiplQueryWrapper|undefined,
    resultSet : SwiplResultWrapper[],
}

export interface QueryResultItemProps {
    queryResult : QueryResult;

    onChange : (queryResult : QueryResult) => void;
}

export function QueryResultItem (props : QueryResultItemProps) {
    const {
        queryResult,
        onChange,
    } = props;

    const [displayType, setDisplayType] = React.useState(DisplayType.Table);
    const [showJson, setShowJson] = React.useState(false);

    const [showMenu, setShowMenu] = React.useState(false);

    return <div className="item" key={queryResult.index}>
        <div
            className="right floated"
        >
            <div
                className={classNames(
                    "ui dropdown",
                    "ui icon secondary",
                    "button",
                    showMenu ? "open" : "",
                )}
                onClick={() => {
                    setShowMenu(!showMenu)
                }}
            >
                <i
                    className="bars icon"
                ></i>
                <div
                    className={classNames(
                        "left menu",
                    )}
                >
                    <div
                        className="item"
                        onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            setShowMenu(false);
                            setShowJson(!showJson);
                        }}
                    >
                        {showJson ? "Hide JSON" : "Show JSON"}
                    </div>
                    <div className="header">
                        Display
                    </div>
                    <div
                        className="item"
                        onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            setShowMenu(false);
                            setDisplayType(DisplayType.List);
                        }}
                    >
                        Display List
                    </div>
                    <div
                        className="item"
                        onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            setShowMenu(false);
                            setDisplayType(DisplayType.Table);
                        }}
                    >
                        Display Table
                    </div>
                    <div
                        className="item"
                        onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            setShowMenu(false);
                            setDisplayType(DisplayType.Json);
                        }}
                    >
                        Display JSON
                    </div>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="header">{queryResult.queryStr}</div>
            {
                displayType == DisplayType.Table ?
                <QueryResultTableView
                    queryResult={queryResult}
                    showJson={showJson}
                /> :
                displayType == DisplayType.Json ?
                <QueryResultJsonView
                    queryResult={queryResult}
                    showJson={showJson}
                /> :
                <QueryResultListView
                    queryResult={queryResult}
                    showJson={showJson}
                />
            }
            {
                queryResult.resultSet
                    .filter(result => result.error != undefined || result.output != undefined)
                    .map(result => {
                        return <div key={result.index} className="ui form">
                            {
                                result.error == undefined ?
                                undefined :
                                <div className="field">
                                    <label>Error #{result.index}</label>
                                    <textarea
                                        readOnly
                                        value={result.error}
                                    ></textarea>
                                </div>
                            }
                            {
                                result.output == undefined ?
                                undefined :
                                <div className="field">
                                    <label>Output #{result.index}</label>
                                    <textarea
                                        readOnly
                                        value={result.output}
                                    ></textarea>
                                </div>
                            }
                        </div>
                    })
            }
            {
                queryResult.swiplQuery == undefined ?
                undefined :
                <div className="ui buttons">
                    <button
                        className="ui primary button"
                        onClick={() => {
                            if (queryResult.swiplQuery == undefined) {
                                return;
                            }
                            const result = queryResult.swiplQuery.next();
                            onChange({
                                ...queryResult,
                                swiplQuery : queryResult.swiplQuery.hasNext() ?
                                    queryResult.swiplQuery :
                                    undefined,
                                resultSet : [
                                    ...queryResult.resultSet,
                                    result,
                                ],
                            });
                        }}
                    >
                        Next
                    </button>
                    <button
                        className="ui primary button"
                        onClick={() => {
                            if (queryResult.swiplQuery == undefined) {
                                return;
                            }
                            const arr : SwiplResultWrapper[] = [];
                            for (let i=0; i<10; ++i) {
                                const result = queryResult.swiplQuery.next();
                                arr.push(result);
                                if (!queryResult.swiplQuery.hasNext()) {
                                    break;
                                }
                            }

                            onChange({
                                ...queryResult,
                                swiplQuery : queryResult.swiplQuery.hasNext() ?
                                    queryResult.swiplQuery :
                                    undefined,
                                resultSet : [
                                    ...queryResult.resultSet,
                                    ...arr,
                                ],
                            });
                        }}
                    >
                        Next 10
                    </button>
                    <button
                        className="ui primary button"
                        onClick={() => {
                            if (queryResult.swiplQuery == undefined) {
                                return;
                            }
                            queryResult.swiplQuery.close();
                            onChange({
                                ...queryResult,
                                swiplQuery : undefined,
                            });
                        }}
                    >
                        Close
                    </button>
                </div>
            }
        </div>
    </div>;
}