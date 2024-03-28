import * as React from "react";
import { SwiplResultWrapper } from "./swipl-wrapper";

interface ResultDescriptionViewProps {
    result : SwiplResultWrapper;
}

function ResultDescriptionView (props : ResultDescriptionViewProps) {
    const {
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
            return <td>
                {
                    Object.keys(parsed.bindings)
                        .map(key => `${key}=${parsed.bindings[key]}`)
                        .join(", ")
                }
            </td>;
        case "done":
            return <td>-done-</td>
        default:
            return <td>-TODO-</td>;
    }
}

export interface SWIPLResultListViewProps {
    result : SwiplResultWrapper;
    showJson : boolean;
}

export function SWIPLResultListView (props : SWIPLResultListViewProps) {
    const {
        result,
        showJson,
    } = props;

    return <tr>
        <ResultDescriptionView
            result={result}
        />
        {
            showJson ?
            <td className="extra">{JSON.stringify(result.result)}</td> :
            undefined
        }
    </tr>
}