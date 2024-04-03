import * as React from "react";
import { SwiplResultWrapper } from "./swipl-wrapper";

interface ResultDescriptionViewProps {
    firstResult : SwiplResultWrapper;
    result : SwiplResultWrapper;
}

function ResultDescriptionView (props : ResultDescriptionViewProps) {
    const {
        firstResult,
        result,
    } = props;

    const parsed = result.parsed;

    switch (parsed.type) {
        case "error":
            return <td>
                <pre className="swipl-error-message">{parsed.message}</pre>
            </td>;
        case "boolean":
            return <td>
                {parsed.value ? "true" : "false"}
            </td>;
        case "bindings":
            return <>
                {
                    Object.keys(parsed.bindings)
                        .map(key => <td key={key}>{JSON.stringify(parsed.bindings[key])}</td>)
                }
            </>;
        case "done":
            return <>
                {
                    firstResult.parsed.type == "bindings" ?
                        Object
                            .keys(firstResult.parsed.bindings)
                            .map(key => <td key={key}>-done-</td>)
                        :
                        undefined
                }
            </>;
        default:
            return <td>-TODO-</td>;
    }
}

interface GetTableHeadingsArgs {
    result : SwiplResultWrapper;
}

export function getTableHeadings (props : GetTableHeadingsArgs) {
    const {
        result,
    } = props;

    const parsed = result.parsed;

    switch (parsed.type) {
        case "error":
            return ["error"];
        case "boolean":
            return ["value"];
        case "bindings":
            return Object.keys(parsed.bindings);
        case "done":
            return ["-done-"];
        default:
            return ["-TODO-"];
    }
}

export interface SWIPLResultTableViewProps {
    firstResult : SwiplResultWrapper;
    result : SwiplResultWrapper;
    showJson : boolean;
}

export function SWIPLResultTableView (props : SWIPLResultTableViewProps) {
    const {
        firstResult,
        result,
        showJson,
    } = props;

    return <tr>
        <ResultDescriptionView
            firstResult={firstResult}
            result={result}
        />
        {
            showJson ?
            <td>{JSON.stringify(result.result)}</td> :
            undefined
        }
    </tr>
}