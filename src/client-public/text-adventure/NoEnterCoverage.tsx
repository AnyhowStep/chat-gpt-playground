import * as React from "react";
import * as classNames from "classnames";
import { FileCoverage } from "./coverage";

export interface NoEnterCoverageProps {
    file : FileCoverage;
}

export function NoEnterCoverage (props : NoEnterCoverageProps) {
    const {
        file,
    } = props;

    const lines = file.lines
        .filter(line => {
            return line.terms.some(term => term.enterCount == 0);
        });

    if (lines.length == 0) {
        return <></>;
    }

    return <>
        No Enter Coverage
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
                                            term.enterCount == 0 ?
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