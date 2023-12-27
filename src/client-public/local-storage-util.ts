
export function localStorageSupported () {
    return (
        "localStorage" in self
    );
}

export function getItem (key : string) : string|null {
    return (
        localStorageSupported() ?
        localStorage.getItem(key) :
        null
    );
}

export function setItem (key : string, value : string) : void {
    if (localStorageSupported()) {
        localStorage.setItem(key, value);
    }
}

/**
 * https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage
 * @returns 
 */
export function kbUsed () : number {
    let _lsTotal = 0,
        _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
        console.log(_x.substring(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
    };
    const totalKb = Number((_lsTotal / 1024).toFixed(2));
    console.log("Total = " + totalKb + " KB");
    return totalKb;
}