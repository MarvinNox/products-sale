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
    hideLoadMoreBtn,
    showLoader,
    hideLoader,
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
            STORAGE_KEYS.currentPage = 2;
            STORAGE_KEYS.searchValue = '';
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
    showLoader()
    pullData(getGoodsUrl(STORAGE_KEYS.searchValue, STORAGE_KEYS.currentPage))
        .then(response => {

            response.data.total > (STORAGE_KEYS.currentPage * 12) ? showLoadMoreBtn() : hideLoadMoreBtn();

            console.log('total:', response.data.total);
            console.log('curr:', ((STORAGE_KEYS.currentPage) * 12));

            if (response.data.total < (STORAGE_KEYS.currentPage - 1) * 12) {
                hideLoadMoreBtn();
                iziToast.warning({
                    message: 'Oops! You reach all of goods!'
                })
                return;
            }
            renderGoods(response.data.products);
            STORAGE_KEYS.currentPage++;
            smoothScroll()
        })
        .catch((error) => iziToast.error({
            message: `${error.message}`
        }))
        .finally(() => hideLoader())
}

export function searchSubmit(evt) {
    evt.preventDefault();
    showLoader()
    STORAGE_KEYS.searchValue = (evt.target.elements.searchValue.value);
    STORAGE_KEYS.currentPage = 1;

    pullData(getGoodsUrl(STORAGE_KEYS.searchValue))
        .then(response => {
            console.log('1st total:', response.data.total);
            console.log('1st curr:', ((STORAGE_KEYS.currentPage) * 12));

            if (response.data.total < (STORAGE_KEYS.currentPage - 1) * 12) {
                hideLoadMoreBtn();
                iziToast.warning({
                    message: 'Oops! You reach all of goods!'
                })
                return;
            }
            clearProductsList();
            renderGoods(response.data.products)
            STORAGE_KEYS.currentPage++;
        })
        .catch((error) => iziToast.error({
            message: `${error.message}`
        }))
        .finally(() => {
            hideLoader();
            smoothScroll();
        })
    refs.form.reset()
}
export function clearSearch() {
    refs.form.elements.searchValue.value = '';
}