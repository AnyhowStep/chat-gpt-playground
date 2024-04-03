import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as classNames from "classnames";
import { FileMeta, Project, loadFile, loadProject, saveFile, saveProject } from "./data";
import { ErrorMessage } from "../ErrorMessage";
import { handleError } from "../error-handling";
import { useError } from "../use-error";
import "./file-edit-page.less";
import { QueryResultItem } from "./QueryResultItem";
import { SwiplQueryWrapper, SwiplResultWrapper, SwiplWrapper, makeSwipl } from "./swipl-wrapper";

export interface FileEditPageProps {
}

export function FileEditPage (props : FileEditPageProps) {
    const {
    } = props;
    const routeParams = reactRouter.useParams() as { uuid : string };
    const [
        file,
        setFile,
    ] = React.useState(() => loadFile(routeParams.uuid));
    const [swipl, setSwipl] = React.useState<SwiplWrapper|undefined>(undefined);

    const [query, setQuery] = React.useState("");

    const [queryResults, setQueryResults] = React.useState<{
        index : number,
        queryStr : string,
        swiplQuery : SwiplQueryWrapper|undefined,
        resultSet : SwiplResultWrapper[],
    }[]>([]);

    const [isLoading, setIsLoading] = React.useState(false);
    const error = useError();

    const swiplErrors = React.useRef<string[]>([]);

    React.useEffect(
        () => {
            if (swiplErrors.current.length > 0) {
                error.push("negative", [...swiplErrors.current]);
                swiplErrors.current.splice(0, swiplErrors.current.length);
            }
        },
        [swiplErrors.current.length]
    );

    React.useEffect(
        () => {
            if (file == undefined) {
                return;
            }
            const timer = setTimeout(() => {
                saveFile(file);
                const project = loadProject(file.projectUuid);
                if (project == undefined) {
                    return;
                }
                const newProject : Project = {
                    ...project,
                    fileMetas : project.fileMetas.map((m) : FileMeta => {
                        return m.uuid == file.uuid ?
                            {
                                uuid : file.uuid,
                                name : file.name,
                                description : file.description,
                            } :
                            m
                    }),
                };
                saveProject(newProject);
            }, 1000);
            return () => clearTimeout(timer);
        },
        [file]
    );

    if (file == undefined) {
        return <div className="ui main container">
            File {routeParams.uuid} not found
        </div>
    }

    return <div
        className="ui main container file-edit-page"
    >
        <div className="ui form">
            <div className="two fields">
                <div className="field">
                    <label>Title</label>
                    <input
                        placeholder="Enter a File Title"
                        value={file.name}
                        onChange={(evt) => {
                            setFile({
                                ...file,
                                name : evt.target.value,
                            });
                        }}
                    />
                </div>
                <div className="field">
                    <label>Description</label>
                    <input
                        placeholder="Enter a File Description"
                        value={file.description}
                        onChange={(evt) => {
                            setFile({
                                ...file,
                                description : evt.target.value,
                            });
                        }}
                    />
                </div>
            </div>
        </div>
        <div
            className="ui form content-form"
            style={{
            }}
        >
            <div className="two fields content-form-split">
                <div className="field content-field">
                    <label>Content</label>
                    <textarea
                        className="content"
                        value={file.content}
                        onChange={(evt) => {
                            setFile({
                                ...file,
                                content : evt.target.value,
                            });
                        }}
                    />
                </div>
                <div className="field">
                    <div className="ui form query-and-result-container">
                        <div className="field">
                            <label>Query</label>
                            <textarea
                                value={query}
                                onChange={(evt) => {
                                    setQuery(evt.target.value);
                                }}
                            />
                        </div>
                        <div className="field ui buttons">
                            <button
                                className={classNames(
                                    "ui primary button",
                                    isLoading ? "loading" : "",
                                )}
                                onClick={() => {
                                    if (isLoading) {
                                        return;
                                    }
                                    setSwipl(undefined);
                                    setIsLoading(true);

                                    makeSwipl()
                                        .then(swipl => {
                                            setIsLoading(false);
                                            const project = loadProject(file.projectUuid);
                                            if (project != undefined) {
                                                for (const fileMeta of project.fileMetas) {
                                                    swipl.writeFile(
                                                        `${fileMeta.name}.pl`,
                                                        loadFile(fileMeta.uuid)?.content ?? ""
                                                    );
                                                }
                                            }
                                            swipl.writeFile(`${file.name}.pl`, file.content);
                                            const consultResult = swipl.query(`consult("${file.name}.pl").`).once();
                                            if (consultResult.error) {
                                                error.push("negative", [consultResult.error]);
                                            } else {
                                                error.reset();
                                            }
                                            setSwipl(swipl);
                                            setQueryResults(queryResults.map((queryResult) => {
                                                if (queryResult.swiplQuery == undefined) {
                                                    return queryResult;
                                                }
                                                queryResult.swiplQuery.close();
                                                return {
                                                    ...queryResult,
                                                    swiplQuery : undefined,
                                                };
                                            }));
                                        })
                                        .catch((err) => {
                                            setIsLoading(false);
                                            handleError(error, err);
                                        });
                                }}
                            >
                                Load Content
                            </button>
                            <button
                                className={classNames(
                                    "ui primary button",
                                    isLoading ? "loading" : "",
                                    swipl == undefined ? "disabled" : "",
                                    queryResults.length > 0 && queryResults[0].swiplQuery != undefined ? "disabled" : "",
                                )}
                                onClick={() => {
                                    if (isLoading) {
                                        return;
                                    }
                                    if (swipl == undefined) {
                                        return;
                                    }
                                    if (queryResults.length > 0 && queryResults[0].swiplQuery != undefined) {
                                        return;
                                    }
                                    const swiplQuery = swipl.query(query);
                                    const result = swiplQuery.next();
                                    setQueryResults([
                                        {
                                            index : queryResults.length,
                                            queryStr : query,
                                            swiplQuery : swiplQuery.hasNext() ?
                                                swiplQuery :
                                                undefined,
                                            resultSet : [
                                                result,
                                            ],
                                        },
                                        ...queryResults,
                                    ]);
                                }}
                            >
                                Query
                            </button>
                        </div>
                        <div className="field result-list-container">
                            <label>Results</label>
                            <div className="ui divided selection list result-list">
                                {queryResults.map((queryResult, index) => {
                                    return <QueryResultItem
                                        key={queryResult.index}
                                        queryResult={queryResult}
                                        onChange={(newQueryResult) => {
                                            setQueryResults([
                                                ...queryResults.slice(0, index),
                                                newQueryResult,
                                                ...queryResults.slice(index+1),
                                            ]);
                                        }}
                                    />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="ui segment">
            <ErrorMessage
                error={error}
            />
        </div>
    </div>
}
