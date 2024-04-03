import * as React from "react";
import { SwiplResultWrapper, makeSwipl } from "../prolog/swipl-wrapper";
import { useError } from "../use-error";
import { handleError } from "../error-handling";
import { ErrorMessage } from "../ErrorMessage";
import { Coverage, calculateCoverage } from "./coverage";
import { NoEnterCoverage } from "./NoEnterCoverage";
import { NoSuccessCoverage } from "./NoSuccessCoverage";

declare const TEXT_ADVENTURE_CONSTANTS : {
    fileNames : string[],
};

export function TestsPage () {
    console.log(TEXT_ADVENTURE_CONSTANTS);
    const [isLoading, setIsLoading] = React.useState(false);
    const error = useError();

    const [coverage, setCoverage] = React.useState<Coverage|undefined>(undefined);
    const [results, setResults] = React.useState<(SwiplResultWrapper & { fileName : string })[]>([]);
    const [testDuration, setTestDuration] = React.useState(0);

    React.useEffect(
        () => {
            const f = async () => {
                try {
                    const startTime = new Date().getTime();
                    setIsLoading(true);
                    error.reset();
                    const files = await Promise.all(
                        TEXT_ADVENTURE_CONSTANTS.fileNames
                            .map(fileName => [
                                fileName,
                                `${window.location.pathname}client-public/dist/text-adventure/${fileName}`,
                            ])
                            .map(([fileName, filePath]) => fetch(filePath)
                                .then((res) => res.text())
                                .then((text) => {
                                    return {
                                        fileName,
                                        text,
                                    };
                                })
                            )
                    );
                    const tests : {
                        fileName : string,
                        testName : string,
                    }[] = [];
                    files.map(file => {
                        const regex = /:-\s+begin_tests\((\w+)/g;
                        for (let m = regex.exec(file.text); m != undefined; m = regex.exec(file.text)) {
                            tests.push({
                                fileName : file.fileName,
                                testName : m[1]
                            });
                        }
                    });
                    const testFileNames : string[] = [...new Set(tests.map(test => test.fileName))];
                    console.log(`testFileNames`, testFileNames);
                    console.log(`tests`, tests);

                    const covFiles : {
                        path : string,
                        content : string,
                    }[] = [];
                    const results : (SwiplResultWrapper & { fileName : string, testName : string })[] = [];

                    {
                        const swipl = await makeSwipl();
                        for (const file of files) {
                            swipl.writeFile(
                                file.fileName,
                                file.text
                            );
                        }

                        {
                            const consultResult = swipl.query(`consult("./globals.pl").`).once();
                            if (consultResult.error) {
                                error.push("negative", [consultResult.error]);
                            }
                        }
                        for (const fileName of testFileNames) {
                            {
                                const consultResult = swipl.query(`consult(${JSON.stringify(fileName)}).`).once();
                                if (consultResult.error) {
                                    error.push("negative", [consultResult.error]);
                                    //continue;
                                }
                            }
                        }

                        for (const test of tests) {
                            console.log(`Running test for ${test.fileName}/${test.testName}`);
                            swipl.query(`game:retractAllDynamicFacts().`).once();
                            const runTestsResult = swipl.query(`coverage(run_tests(${test.testName})).`).once();
                            console.log(`runTestsResult`, runTestsResult);

                            results.push({
                                ...runTestsResult,
                                index : results.length,
                                fileName : test.fileName,
                                testName : test.testName,
                            });
                        }
                        const showResult = swipl.query(`show_coverage([annotate(true)]).`).once();
                        if (showResult.output != undefined) {
                            const regex = /\s+(\S+?\.pl\.cov)/g;
                            let m : RegExpExecArray|null = null;
                            while (m = regex.exec(showResult.output)) {
                                if (m[1].includes("test-")) {
                                    continue;
                                }
                                const covFileContent = swipl.readFile(m[1], { encoding:"utf8" });
                                //console.log(`covFile ${m[1]}`);
                                //console.log(covFileContent);
                                covFiles.push({
                                    path : m[1],
                                    content : covFileContent,
                                });
                            }
                        }

                        results.sort((a, b) => {
                            if (a.error == undefined) {
                                return 0;
                            }
                            if (b.error == undefined) {
                                return 0;
                            }
                            const aVal = a.error.includes("ERROR") ?
                                0 :
                                a.error.includes("FAILED") ?
                                1 :
                                a.error.includes("Warning") ?
                                2 :
                                3;
                            const bVal = b.error.includes("ERROR") ?
                                0 :
                                b.error.includes("FAILED") ?
                                1 :
                                b.error.includes("Warning") ?
                                2 :
                                3;
                            return aVal - bVal;
                        });

                        const coverage = calculateCoverage(covFiles);

                        setCoverage(coverage);
                        setResults(results);
                        setIsLoading(false);
                        setTestDuration(new Date().getTime() - startTime);
                    }

                    // for (const filePath of TEXT_ADVENTURE_CONSTANTS.fileNames) {
                    //     const parts = filePath.split("/");
                    //     const lastPart = parts[parts.length-1];
                    //     if (!lastPart.startsWith("test-")) {
                    //         continue;
                    //     }
                    //     if (!lastPart.endsWith(".pl")) {
                    //         continue;
                    //     }

                    //     const swipl = await makeSwipl();
                    //     for (const file of files) {
                    //         swipl.writeFile(
                    //             file.fileName,
                    //             file.text
                    //         );
                    //     }
                    //     {
                    //         const consultResult = swipl.query(`consult("./globals.pl").`).once();
                    //         if (consultResult.error) {
                    //             error.push("negative", [consultResult.error]);
                    //             continue;
                    //         }
                    //     }
                    //     {
                    //         const consultResult = swipl.query(`consult(${JSON.stringify(filePath)}).`).once();
                    //         if (consultResult.error) {
                    //             error.push("negative", [consultResult.error]);
                    //             //continue;
                    //         }
                    //     }
        
                    //     console.log(`Running test for ${filePath}`);
                    //     const runTestsResult = swipl.query(`coverage(run_tests).`).once();
                    //     console.log(`runTestsResult`, runTestsResult);
                        
                    //     const showResult = swipl.query(`show_coverage([annotate(true)]).`).once();
                    //     if (showResult.output != undefined) {
                    //         const regex = /\s+(\S+?\.pl\.cov)/g;
                    //         let m : RegExpExecArray|null = null;
                    //         while (m = regex.exec(showResult.output)) {
                    //             if (m[1].includes("test-")) {
                    //                 continue;
                    //             }
                    //             const covFileContent = swipl.readFile(m[1], { encoding:"utf8" });
                    //             //console.log(`covFile ${m[1]}`);
                    //             //console.log(covFileContent);
                    //             covFiles.push({
                    //                 path : m[1],
                    //                 content : covFileContent,
                    //             });
                    //         }
                    //     }

                    //     results.push({
                    //         ...runTestsResult,
                    //         index : results.length,
                    //         fileName: filePath,
                    //     });
                    // }
        
                    // results.sort((a, b) => {
                    //     if (a.error == undefined) {
                    //         return 0;
                    //     }
                    //     if (b.error == undefined) {
                    //         return 0;
                    //     }
                    //     const aVal = a.error.includes("ERROR") ?
                    //         0 :
                    //         a.error.includes("FAILED") ?
                    //         1 :
                    //         a.error.includes("Warning") ?
                    //         2 :
                    //         3;
                    //     const bVal = b.error.includes("ERROR") ?
                    //         0 :
                    //         b.error.includes("FAILED") ?
                    //         1 :
                    //         b.error.includes("Warning") ?
                    //         2 :
                    //         3;
                    //     return aVal - bVal;
                    // });

                    // const coverage = calculateCoverage(covFiles);

                    // setCoverage(coverage);
                    // setResults(results);
                    // setIsLoading(false);
                    // setTestDuration(new Date().getTime() - startTime);
                } catch (err) {
                    setIsLoading(false);
                    handleError(error, err);
                }
            };
            f();
        },
        []
    );

    return <div className="ui main container">
        <ErrorMessage error={error}/>
        <h3>
            Test Duration: {testDuration/1000}s
        </h3>
        {
            coverage == undefined ?
            undefined :
            <div className="ui segment divided selection list">
                {
                    coverage.files.map(file => {
                        return <div key={file.path}>
                            <h3 className="header">
                                {file.path} ({file.coverCount}/{file.lineCount})
                            </h3>
                            <div className="description">
                                <NoEnterCoverage file={file}/>
                                <NoSuccessCoverage file={file}/>
                            </div>
                        </div>
                    })
                }
            </div>
        }
        <div className="ui segment divided selection massive list">
            {
                isLoading ?
                <div className="ui active inline loader"></div> :
                undefined
            }
            {results.map((result) => {
                return <div key={result.fileName} className="item">
                    <div className="header">
                        {result.fileName}
                    </div>
                    <div className="ui form">
                        {
                            result.error == undefined ?
                            undefined :
                            <div className="field">
                                <label>
                                    Output
                                    ({
                                        result.error.includes("ERROR") ?
                                        "ERROR" :
                                        result.error.includes("FAILED") ?
                                        "FAILED" :
                                        result.error.includes("Warning") ?
                                        "Warning" :
                                        "Passed"
                                    })
                                </label>
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
                                <label>Output</label>
                                <textarea
                                    readOnly
                                    value={result.output}
                                ></textarea>
                            </div>
                        }
                    </div>
                </div>
            })}
        </div>
    </div>;
}