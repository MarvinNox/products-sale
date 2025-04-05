//Робота з loacalStorage
import { STORAGE_KEYS } from "./constants.js";
import { setCartCount, setWishListCount } from "./render-function.js";


export function saveWishlist(obj) {
    localStorage.setItem(STORAGE_KEYS.LS_WL_KEY, JSON.stringify(obj));
    setWishListCount();
};

export function getWishlist() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LS_WL_KEY));
};

export function removeFromWishlist(id) {
    saveWishlist(getWishlist().filter(item => item !== id));
    setWishListCount();
};

export function saveCart(obj) {
    localStorage.setItem(STORAGE_KEYS.LS_USER_CART_KEY, JSON.stringify(obj));
    setCartCount();
};

export function getCart() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LS_USER_CART_KEY));
};

export function removeFromCart(id) {
    saveCart(getCart().filter(item => item !== id));
    setCartCount();
};