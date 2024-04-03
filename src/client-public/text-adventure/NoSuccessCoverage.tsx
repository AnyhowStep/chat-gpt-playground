import * as React from "react";
import * as classNames from "classnames";
import { FileCoverage } from "./coverage";

export interface NoSuccessCoverageProps {
    file : FileCoverage;
}

export function NoSuccessCoverage (props : NoSuccessCoverageProps) {
    const {
        file,
    } = props;

    const lines = file.lines
        .filter(line => {
            return !/^\s*false$/.test(line.content) &&
                line.terms.some(term => term.enterCount > 0 && term.successCount == 0);
        });

    if (lines.length == 0) {
        return <></>;
    }

    return <>
        No Success Coverage
        <table className="ui celled selectable unstackable inverted table">
            <tbody>
            {lines
                .map(line => {
                    return <tr key={line.lineNumber}>
                        <td>
                            L{line.lineNumber}
                        </td>
                        <td>
                            {line.terms
                                .map((term, index) => {
                                    return <div key={index}
                                        className={classNames(
                                            "ui mini label",
                                            term.successCount == 0 ?
                                            "red" :
                                            "green"
                                        )}
                                    >
                                        &nbsp;
                                    </div>;
                                })
                            }
                        </td>
                        <td>
                            <code><pre style={{ display : "inline" }}>{line.content}</pre></code>
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
    </>;
}