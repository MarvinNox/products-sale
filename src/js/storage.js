//Робота з loacalStorage

import { refs } from "./refs.js";
import { STORAGE_KEYS } from "./constants.js";


export function addToLocal(obj) {
    localStorage.setItem(STORAGE_KEYS.LS_KEY, JSON.stringify(obj));
}

export function getFromLocal() {
    if (localStorage.getItem(refs.LS_KEY) === null) {
        return;
    }
    return JSON.parse(localStorage.getItem(refs.LS_KEY));
}