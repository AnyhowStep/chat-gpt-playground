export interface File {
    path : string;
    content : string;
}

export interface TermCoverage {
    enterCount : number;
    successCount : number;
    failCount : number;
}

export interface LineCoverage {
    lineNumber : number;
    content : string;
    terms : TermCoverage[];
}

export interface FileCoverage {
    path : string;
    lineCount : number;
    coverCount : number;

    lines : LineCoverage[];
}

export interface Coverage {
    files : FileCoverage[];
}

function parseTermCoverage (countStr : string) : TermCoverage {
    if (countStr == "###") {
        return {
            enterCount : 0,
            successCount : 0,
            failCount : 0,
        };
    }

    if (countStr.startsWith("++")) {
        const count = Number(countStr.substring(2).replace(/,/g, ""));
        return {
            enterCount : count,
            successCount : count,
            failCount : 0,
        };
    }

    if (countStr.startsWith("--")) {
        const count = Number(countStr.substring(2).replace(/,/g, ""));
        return {
            enterCount : count,
            successCount : 0,
            failCount : count,
        };
    }

    const successFailMatch = /\+((\d|,)+)\-((\d|,)+)/.exec(countStr);
    if (successFailMatch != undefined) {
        const successCount = Number(successFailMatch[1].replace(/,/g, ""));
        const failCount = Number(successFailMatch[2].replace(/,/g, ""));
        return {
            enterCount : successCount + failCount,
            successCount,
            failCount,
        };
    }

    const enterSuccessMatch = /\+((\d|,)+)\*((\d|,)+)/.exec(countStr);
    if (enterSuccessMatch != undefined) {
        const enterCount = Number(enterSuccessMatch[1].replace(/,/g, ""));
        const successCount = Number(enterSuccessMatch[2].replace(/,/g, ""));
        return {
            enterCount,
            successCount,
            failCount : enterCount - successCount,
        };
    }

    throw new Error(`Unknown countStr: ${countStr}`);
}

export function calculateCoverage (files : File[]) : Coverage {
    const path2Data = new Map<string, {
        path : string,
        lines : Map<number, LineCoverage>,
    }>();
    for (const file of files) {
        const coverage = path2Data.get(file.path) ?? {
            path : file.path,
            lines :  new Map<number, LineCoverage>(),
        };
        path2Data.set(file.path, coverage);

        const rawLines = file.content.split("\n");
        const lines = rawLines
            .map((line, index) : LineCoverage|undefined => {
                const match = /^\s+(\d+)\s(\S+)\s+/.exec(line);
                if (match == undefined) {
                    return undefined;
                }
                const lineNumber = Number(match[1]);
                const countStr = match[2];
                let content = line.substring(Math.min(13, match[0].length));
                const terms : TermCoverage[] = [];
                terms.push(parseTermCoverage(countStr));
                // if (lineNumber == 78) {
                //     //11184
                //     console.log("WEIRD", lineNumber, content, content.length, content.codePointAt(0));
                // }

                let nxtIndex = index;
                while (/^\s*\S$/.test(content) && content.codePointAt(content.length-1) == 11184) {
                    ++nxtIndex;
                    const nxtLine = rawLines[nxtIndex];
                    const nxtMatch = /^\s+(\S+)\s+/.exec(nxtLine);
                    if (nxtMatch == undefined) {
                        break;
                    }
                    const nxtCountStr = nxtMatch[1];
                    content = nxtLine.substring(Math.min(13, nxtMatch[0].length));
                    terms.push(parseTermCoverage(nxtCountStr));
                }

                return {
                    lineNumber,
                    content,
                    terms,
                };
            })
            .filter((line) : line is LineCoverage => {
                return line != undefined;
            });

        for (const line of lines) {
            const merge = coverage.lines.get(line.lineNumber) ?? {
                lineNumber : line.lineNumber,
                content : line.content,
                terms : [],
            };
            coverage.lines.set(line.lineNumber, merge);

            for (let i=0; i<line.terms.length; ++i) {
                const lineTerm = line.terms[i];
                if (i < merge.terms.length) {
                    const mergeTerm = merge.terms[i];
                    mergeTerm.enterCount += lineTerm.enterCount;
                    mergeTerm.successCount += lineTerm.successCount;
                    mergeTerm.failCount += lineTerm.failCount;
                } else {
                    merge.terms.push({
                        ...lineTerm,
                    });
                }
            }
        }
    }

    const result : Coverage = {
        files : [],
    };
    for (const data of path2Data.values()) {
        const lines = [...data.lines.values()]
            .sort((a, b) => {
                return a.lineNumber - b.lineNumber;
            });
        const fileCoverage : FileCoverage = {
            path : data.path,
            lines,
            lineCount : lines.length,
            coverCount : lines.filter(line => line.terms.every(term => term.enterCount > 0)).length,
        };
        result.files.push(fileCoverage);
    }

    return result;
}