/*
    Checks for the existence of nested object key
    Source: https://stackoverflow.com/a/2631198/14057610
*/

export default function checkNested(obj, level,  ...rest) {
    if (obj === undefined) return false;
    if (rest.length === 0 && obj.hasOwnProperty(level)) return true;
    return checkNested(obj[level], ...rest);
}