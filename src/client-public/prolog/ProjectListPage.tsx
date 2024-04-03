import * as React from "react";
import * as reactRouter from "react-router-dom";
import * as uuid from "uuid";
import { File, FileMeta, Project, ProjectMeta, deleteProject, loadFile, loadProject, loadProjectsMeta, makeFile, makeProject, saveFile, saveProject, saveProjectsMeta } from "./data";

export function ProjectListPage () {
    const history = reactRouter.useHistory();
    const [
        projects,
        setProjects,
    ] = React.useState(loadProjectsMeta());

    return <div className="ui main container">
        <div className="ui segment divided selection massive list">
            {projects.map(meta => {
                const displayName = meta.name.trim() == "" ?
                    `Project ${meta.uuid}` :
                    meta.name;
                return <div className="item" key={meta.uuid} onClick={() => {
                    history.push(`/prolog/project/${meta.uuid}/edit`);
                }}>
                    <div className="extra right floated">
                        <div className="ui icon secondary button" onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Copy ${displayName}?`)) {
                                const existingProject = loadProject(meta.uuid);
                                if (existingProject == undefined) {
                                    alert(`Cannot find ${displayName} / ${meta.uuid}`);
                                    return;
                                }
                                const newUuid = uuid.v4();
                                const newProject : Project = {
                                    ...existingProject,
                                    uuid : newUuid,
                                    name : `Copy of ${displayName}`,
                                    fileMetas : existingProject.fileMetas.map((existingMeta) => {
                                        const existingFile = loadFile(existingMeta.uuid) ?? makeFile(newProject.uuid).file;
                                        const newUuid = uuid.v4();
                                        const file : File = {
                                            ...existingFile,
                                            projectUuid : newProject.uuid,
                                            uuid : newUuid,
                                        };
                                        const meta : FileMeta = {
                                            ...existingMeta,
                                            uuid : newUuid,
                                        };
                                        saveFile(file);
                                        return meta;
                                    }),
                                };
                                const newProjects = [
                                    ...loadProjectsMeta(),
                                    {
                                        ...meta,
                                        uuid : newUuid,
                                        name : `Copy of ${displayName}`,
                                    },
                                ];
                                setProjects(newProjects);
                                saveProjectsMeta(newProjects);
                                saveProject(newProject);
                            }
                        }}>
                            <i className="copy icon"></i>
                        </div>
                        <div className="ui icon red button" onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (confirm(`Delete ${displayName}?`)) {
                                const newProjects = loadProjectsMeta()
                                    .filter(m => m.uuid != meta.uuid);
                                setProjects(newProjects);
                                saveProjectsMeta(newProjects);
                                deleteProject(meta);
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
                                There is no description for this project
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
            const projects = loadProjectsMeta();
            const {
                meta,
                project,
            } = makeProject();
            const newProjects : ProjectMeta[] = [
                ...projects,
                meta,
            ];
            saveProjectsMeta(newProjects);
            saveProject(project)
            setProjects(newProjects);
        }}>
            Create Project
        </button>
    </div>
}