import * as uuid from "uuid";
import * as localStorageUtil from "../local-storage-util";

export enum Key {
    PL_FILE = "PL_FILE",
    PL_FILES_META = "PL_FILES_META",
}

export interface File {
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

export function makeFile () : {
    file : File,
    meta : FileMeta,
} {
    const file : File = {
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

export function loadFilesMeta () : FileMeta[] {
    return JSON.parse(localStorageUtil.getItem(Key.PL_FILES_META) ?? "[]");
}

export function saveFilesMeta (filesMeta : FileMeta[]) {
    return localStorageUtil.setItem(
        Key.PL_FILES_META,
        JSON.stringify(filesMeta)
    );
}
