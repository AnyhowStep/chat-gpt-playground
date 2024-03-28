import * as React from "react";
import { QueryResult } from "./QueryResultItem";
import { SWIPLResultListView } from "./SWIPLResultListView";

export interface QueryResultListViewProps {
    queryResult : QueryResult;
    showJson : boolean;
}

export function QueryResultListView (props : QueryResultListViewProps) {
    const {
        queryResult,
        showJson,
    } = props;

    return <table className="ui celled selectable inverted table">
        <thead>
            <tr>
                <th>value</th>
                {showJson ? <th>JSON</th> : undefined}
            </tr>
        </thead>
        <tbody>
            {queryResult.resultSet.map((result, index) => {
                return <SWIPLResultListView
                    key={index}
                    result={result}
                    showJson={showJson}
                />
            })}
        </tbody>
    </table>
}