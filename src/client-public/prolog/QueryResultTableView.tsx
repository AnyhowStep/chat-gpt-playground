import * as React from "react";
import { QueryResult } from "./QueryResultItem";
import { SWIPLResultTableView, getTableHeadings } from "./SWIPLResultTableView";

export interface QueryResultTableViewProps {
    queryResult : QueryResult;
    showJson : boolean;
}

export function QueryResultTableView (props : QueryResultTableViewProps) {
    const {
        queryResult,
        showJson,
    } = props;

    return <table className="ui celled selectable inverted table">
        <thead>
            <tr>
                {
                    getTableHeadings({
                        result : queryResult.resultSet[0],
                    })
                        .map(heading => <th key={heading}>{heading}</th>)
                }
                {showJson ? <th>JSON</th> : undefined}
            </tr>
        </thead>
        <tbody>
            {queryResult.resultSet.map((result, index) => {
                return <SWIPLResultTableView
                    key={index}
                    firstResult={queryResult.resultSet[0]}
                    result={result}
                    showJson={showJson}
                />
            })}
        </tbody>
    </table>
}