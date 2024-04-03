import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as uuid from "uuid";
import { Project, ProjectMeta, deleteFile, loadFile, loadProject, loadProjectsMeta, makeFile, saveFile, saveProject, saveProjectsMeta } from "./data";

export function ProjectEditPage () {
    const history = reactRouter.useHistory();
    const routeParams = reactRouter.useParams() as { uuid : string };
    const [
        project,
        setProject,
    ] = React.useState(() => loadProject(routeParams.uuid));

    React.useEffect(
        () => {
            if (project == undefined) {
                return;
            }
            const timer = setTimeout(() => {
                saveProject(project);
                const meta = loadProjectsMeta().map((m) : ProjectMeta => {
                    return m.uuid == project.uuid ?
                        {
                            uuid : project.uuid,
                            name : project.name,
                            description : project.description,
                        } :
                        m
                });
                saveProjectsMeta(meta);
            }, 1000);
            return () => clearTimeout(timer);
        },
        [project]
    );

    if (project == undefined) {
        return <div className="ui main container">
            Project {routeParams.uuid} not found
        </div>
    }

    return <div className="ui main container">
        <div className="ui form">
            <div className="two fields">
                <div className="field">
                    <label>Title</label>
                    <input
                        placeholder="Enter a File Title"
                        value={project.name}
                        onChange={(evt) => {
                            setProject({
                                ...project,
                                name : evt.target.value,
                            });
                        }}
                    />
                </div>
                <div className="field">
                    <label>Description</label>
                    <input
                        placeholder="Enter a File Description"
                        value={project.description}
                        onChange={(evt) => {
                            setProject({
                                ...project,
                                description : evt.target.value,
                            });
                        }}
                    />
                </div>
            </div>
        </div>
        <div className="ui segment divided selection massive list">
            {project.fileMetas.map(meta => {
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
                                const newProject : Project = {
                                    ...project,
                                    fileMetas : [
                                        ...project.fileMetas,
                                        {
                                            ...meta,
                                            uuid : newUuid,
                                            name : `Copy of ${displayName}`,
                                        },
                                    ],
                                };
                                setProject(newProject);
                                saveProject(newProject);
                                saveFile(newFile);
                            }
                        }}>
                            <i className="copy icon"></i>
                        </div>
                        <div className="ui icon red button" onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Delete ${displayName}?`)) {
                                const newProject : Project = {
                                    ...project,
                                    fileMetas : project.fileMetas
                                        .filter(m => m.uuid != meta.uuid),
                                };
                                setProject(newProject);
                                saveProject(newProject);
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
            const {
                meta,
                file,
            } = makeFile(project.uuid);
            const newProject : Project = {
                ...project,
                fileMetas : [
                    ...project.fileMetas,
                    meta,
                ],
            };
            saveProject(newProject);
            saveFile(file)
            setProject(newProject);
        }}>
            Create File
        </button>
    </div>
}