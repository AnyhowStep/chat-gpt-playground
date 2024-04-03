import * as uuid from "uuid";
import * as localStorageUtil from "../local-storage-util";

export enum Key {
    PL_PROJECT = "PL_PROJECT",
    PL_PROJECTS_META = "PL_PROJECTS_META",
    PL_FILE = "PL_FILE",
    PL_FILES_META = "PL_FILES_META",
}

export interface Project {
    uuid : string,
    name : string,
    description : string,

    fileMetas : FileMeta[],
}

export interface ProjectMeta {
    uuid : string,
    name : string,
    description : string,
}

export function makeProject () : {
    project : Project,
    meta : ProjectMeta,
} {
    const project : Project = {
        uuid : uuid.v4(),
        name : "",
        description : "",
        fileMetas : [],
    };
    var meta : ProjectMeta = {
        uuid : project.uuid,
        name : project.name,
        description : project.description,
    };
    return {
        project,
        meta,
    };
}

export function loadProject (uuid : string) : Project|undefined {
    const str = localStorageUtil.getItem(`${Key.PL_PROJECT}_${uuid}`);
    if (str == undefined) {
        return undefined;
    }
    return JSON.parse(str);
}

export function saveProject (file : Project) {
    return localStorageUtil.setItem(
        `${Key.PL_PROJECT}_${file.uuid}`,
        JSON.stringify(file)
    );
}

export function deleteProject (file : Pick<Project, "uuid">) {
    return localStorageUtil.removeItem(
        `${Key.PL_PROJECT}_${file.uuid}`
    );
}

export function loadProjectsMeta () : ProjectMeta[] {
    return JSON.parse(localStorageUtil.getItem(Key.PL_PROJECTS_META) ?? "[]");
}

export function saveProjectsMeta (filesMeta : ProjectMeta[]) {
    return localStorageUtil.setItem(
        Key.PL_PROJECTS_META,
        JSON.stringify(filesMeta)
    );
}

export interface File {
    projectUuid : string,
    uuid : string,
    name : string,
    description : string,
    content : string,
}

export interface FileMeta {
    uuid : string,
    name : string,
    description : string,
}

export function makeFile (projectUuid : string) : {
    file : File,
    meta : FileMeta,
} {
    const file : File = {
        projectUuid,
        uuid : uuid.v4(),
        name : "",
        description : "",
        content : "",
    };
    var meta : FileMeta = {
        uuid : file.uuid,
        name : file.name,
        description : file.description,
    };
    return {
        file,
        meta,
    };
}

export function loadFile (uuid : string) : File|undefined {
    const str = localStorageUtil.getItem(`${Key.PL_FILE}_${uuid}`);
    if (str == undefined) {
        return undefined;
    }
    return JSON.parse(str);
}

export function saveFile (file : File) {
    return localStorageUtil.setItem(
        `${Key.PL_FILE}_${file.uuid}`,
        JSON.stringify(file)
    );
}

export function deleteFile (file : Pick<File, "uuid">) {
    return localStorageUtil.removeItem(
        `${Key.PL_FILE}_${file.uuid}`
    );
}

// export function loadFilesMeta () : FileMeta[] {
//     return JSON.parse(localStorageUtil.getItem(Key.PL_FILES_META) ?? "[]");
// }

// export function saveFilesMeta (filesMeta : FileMeta[]) {
//     return localStorageUtil.setItem(
//         Key.PL_FILES_META,
//         JSON.stringify(filesMeta)
//     );
// }
