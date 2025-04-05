// Функції, які передаються колбеками в addEventListners
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { STORAGE_KEYS } from "./constants";
import { pullData } from "./products-api";
import { clearProductsList, renderGoods, renderModal } from "./render-function";
import { refs } from "./refs";
import {
    notFoundDisabled,
    notFoundEnabled,
    smoothScroll,
    getGoodsUrl,
    showLoadMoreBtn,
    hideLoadMoreBtn
} from "./helpers.js";
import { showModal } from "./modal";
import {
    getWishlist,
    saveWishlist,
    removeFromWishlist,
    getCart,
    saveCart,
    removeFromCart,
} from "./storage.js"


export function switchCategory(evt) {
    if (evt.target.tagName === "BUTTON") {
        const selectedCategory = evt.target.textContent;
        const selectedUrl = `https://dummyjson.com/products/category/${selectedCategory}`;

        if (selectedCategory === 'all') {
            pullData(STORAGE_KEYS.BASE_URL_ALL)
                .then(response => {
                    STORAGE_KEYS.currentPage++;
                    clearProductsList();
                    renderGoods(response.data.products);
                    showLoadMoreBtn();
                })
                .catch(error => iziToast.error({
                    message: `${error.message}`
                }));
            return;
        } else {
            pullData(selectedUrl)
                .then(response => {
                    if (response.data.products.length === 0) {
                        notFoundEnabled();
                        return;
                    }
                    notFoundDisabled();
                    clearProductsList()
                    renderGoods(response.data.products)
                    hideLoadMoreBtn()
                })
                .catch(error => iziToast.error({
                    message: `${error.message}`
                }))
                .finally(() => hideLoadMoreBtn)
        }
    };
};

export function handleSelectProduct(event) {

    if (event.target.tagName != "UL") {
        STORAGE_KEYS.selectedProdId = event.target.closest('li').dataset.id;
        pullData(`https://dummyjson.com/products/${STORAGE_KEYS.selectedProdId}`)
            .then(response => {
                renderModal(response.data);
                showModal();
            })
            .catch(error => iziToast.error({
                message: `${error.message}`
            }))
    }
}

export function addToWishList(event) {
    const wishList = getWishlist() || [];
    if (wishList.some(item => item === STORAGE_KEYS.selectedProdId)) {
        removeFromWishlist(STORAGE_KEYS.selectedProdId);
        refs.addToWishBtn.textContent = 'Add to Wishlist';
        return;
    }
    wishList.push(STORAGE_KEYS.selectedProdId)
    saveWishlist(wishList)
    refs.addToWishBtn.textContent = 'Remove from Wishlist'
};
export function addToCart(event) {
    const cartList = getCart() || [];
    if (cartList.some(item => item === STORAGE_KEYS.selectedProdId)) {
        removeFromCart(STORAGE_KEYS.selectedProdId);
        refs.addToCartBtn.textContent = 'Add to Cart';
        return;
    }
    cartList.push(STORAGE_KEYS.selectedProdId)
    saveCart(cartList)
    refs.addToCartBtn.textContent = 'Remove from Cart'

};

export function handleLoadMore(evt) {
    pullData(getGoodsUrl(STORAGE_KEYS.currentPage))
        .then(response => {
            if (response.data.total < (STORAGE_KEYS.currentPage - 1) * 12) {
                hideLoadMoreBtn();
                iziToast.warning({
                    message: 'Oops! You reach and of goods!'
                })
                return;
            }
            renderGoods(response.data.products);
            STORAGE_KEYS.currentPage++;
            showLoadMoreBtn();
            smoothScroll()
        })
        .catch((error) => iziToast.error({
            message: `${error.message}`
        }))
}