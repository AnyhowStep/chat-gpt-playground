import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as uuid from "uuid";
import { FileMeta, deleteFile, loadFile, loadFilesMeta, makeFile, saveFile, saveFilesMeta } from "./data";

export function FileListPage () {
    const history = reactRouter.useHistory();
    const [
        files,
        setFiles,
    ] = React.useState(loadFilesMeta());

    return <div className="ui main container">
        <div className="ui segment divided selection massive list">
            {files.map(meta => {
                const displayName = meta.name.trim() == "" ?
                    `File ${meta.uuid}` :
                    meta.name;
                return <div className="item" key={meta.uuid} onClick={() => {
                    history.push(`/prolog/file/${meta.uuid}/edit`);
                }}>
                    <div className="extra right floated">
                        <div className="ui icon secondary button" onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Copy ${displayName}?`)) {
                                const existingFile = loadFile(meta.uuid);
                                if (existingFile == undefined) {
                                    alert(`Cannot find ${displayName} / ${meta.uuid}`);
                                    return;
                                }
                                const newUuid = uuid.v4();
                                const newFile = {
                                    ...existingFile,
                                    uuid : newUuid,
                                    name : `Copy of ${displayName}`,
                                };
                                const newFiles = [
                                    ...loadFilesMeta(),
                                    {
                                        ...meta,
                                        uuid : newUuid,
                                        name : `Copy of ${displayName}`,
                                    },
                                ];
                                setFiles(newFiles);
                                saveFilesMeta(newFiles);
                                saveFile(newFile);
                            }
                        }}>
                            <i className="copy icon"></i>
                        </div>
                        <div className="ui icon red button" onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Delete ${displayName}?`)) {
                                const newFiles = loadFilesMeta()
                                    .filter(m => m.uuid != meta.uuid);
                                setFiles(newFiles);
                                saveFilesMeta(newFiles);
                                deleteFile(meta);
                            }
                        }}>
                            <i className="trash icon"></i>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            {displayName}
                        </div>
                        <div className="ui mini label">{meta.uuid}</div>
                        {
                            meta.description.trim() == "" ?
                            <small className="description">
                                There is no description for this file
                            </small> :
                            <div className="description">
                                {meta.description}
                            </div>
                        }
                    </div>
                </div>
            })}
        </div>
        <button className="ui primary button" onClick={() => {
            const files = loadFilesMeta();
            const {
                meta,
                file,
            } = makeFile();
            const newFiles : FileMeta[] = [
                ...files,
                meta,
            ];
            saveFilesMeta(newFiles);
            saveFile(file)
            setFiles(newFiles);
        }}>
            Create File
        </button>
    </div>
}