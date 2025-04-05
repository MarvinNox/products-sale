//Робота з loacalStorage
import { STORAGE_KEYS } from "./constants.js";


export function saveWishlist(obj) {
    localStorage.setItem(STORAGE_KEYS.LS_WL_KEY, JSON.stringify(obj));
}

export function getWishlist() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LS_WL_KEY));
}

export function removeFromWishlist(id) {
    saveWishlist(getWishlist().filter(item => item !== id));
}

export function saveCart(obj) {
    localStorage.setItem(STORAGE_KEYS.LS_USER_CART_KEY, JSON.stringify(obj));
}

export function getCart() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LS_USER_CART_KEY));
}

export function removeFromCart(id) {
    saveCart(getCart().filter(item => item !== id));
}