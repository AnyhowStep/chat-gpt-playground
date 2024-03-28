import * as React from "react";
import { QueryResult } from "./QueryResultItem";

export interface QueryResultJsonViewProps {
    queryResult : QueryResult;
    showJson : boolean;
}

export function QueryResultJsonView (props : QueryResultJsonViewProps) {
    const {
        queryResult,
        showJson,
    } = props;

    return <div className="description">
        <textarea
            readOnly
            value={JSON.stringify(
                queryResult.resultSet.map((result) => result.parsed),
                null,
                2
            )}
        ></textarea>
        {
            showJson ?
            <textarea
                readOnly
                value={JSON.stringify(
                    queryResult.resultSet.map(result => result.result),
                    null,
                    2
                )}
            ></textarea> :
            undefined
        }
    </div>
}