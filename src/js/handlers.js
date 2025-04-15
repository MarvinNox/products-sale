// Функції, які передаються колбеками в addEventListners

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { STORAGE_KEYS } from "./constants";
import { fetchProducts, pullData } from "./products-api";
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
    applyTheme,
    clearCategorySelector,
} from "./helpers.js";
import { showModal } from "./modal";
import {
    getWishlist,
    saveWishlist,
    removeFromWishlist,
    getCart,
    saveCart,
    removeFromCart,
    getTheme,
    setTheme,
} from "./storage.js"

export async function switchCategory(evt) {
    if (evt.target.tagName === "BUTTON") {

        clearCategorySelector();
        evt.target.classList.add('categories__btn--active')

        STORAGE_KEYS.selectedCategory = evt.target.textContent;
        const selectedUrl = `https://dummyjson.com/products/category/${STORAGE_KEYS.selectedCategory}?limit=12&skip=0`;
        if (STORAGE_KEYS.selectedCategory === 'all') {
            STORAGE_KEYS.selectedCategory = '';
            STORAGE_KEYS.currentPage = 1;
            STORAGE_KEYS.searchValue = '';
            await pullData(STORAGE_KEYS.BASE_URL_ALL)
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
            STORAGE_KEYS.searchValue = '';
            STORAGE_KEYS.currentPage = 1;
            await pullData(selectedUrl)
                .then(response => {
                    if (response.data.total === 0) {
                        notFoundEnabled();
                        return;
                    };
                    notFoundDisabled();
                    clearProductsList();
                    renderGoods(response.data.products);
                    if (response.data.total < 12) {
                        hideLoadMoreBtn();
                    } else {
                        showLoadMoreBtn();
                    }
                })
                .catch(error => iziToast.error({
                    message: `${error.message}`
                }))
                .finally(() => STORAGE_KEYS.currentPage++);
        };
    };
};

export async function handleSelectProduct(event) {

    if (event.target.tagName != "UL") {
        STORAGE_KEYS.selectedProdId = event.target.closest('li').dataset.id;
        await pullData(`https://dummyjson.com/products/${STORAGE_KEYS.selectedProdId}`)
            .then(response => {
                renderModal(response.data);
                showModal();
            })
            .catch(error => iziToast.error({
                message: `${error.message}`
            }))
    };
};

export function addToWishList() {
    const wishList = getWishlist() || [];
    if (wishList.some(item => item === STORAGE_KEYS.selectedProdId)) {
        removeFromWishlist(STORAGE_KEYS.selectedProdId);
        refs.addToWishBtn.textContent = 'Add to Wishlist';
        return;
    }
    wishList.push(STORAGE_KEYS.selectedProdId);
    saveWishlist(wishList);
    refs.addToWishBtn.textContent = 'Remove from Wishlist';
};

export function addToCart() {
    const cartList = getCart() || [];
    if (cartList.some(item => item === STORAGE_KEYS.selectedProdId)) {
        removeFromCart(STORAGE_KEYS.selectedProdId);
        refs.addToCartBtn.textContent = 'Add to Cart';
        return;
    }
    cartList.push(STORAGE_KEYS.selectedProdId);
    saveCart(cartList);
    refs.addToCartBtn.textContent = 'Remove from Cart';
};

export async function handleLoadMore() {
    showLoader();
    await pullData(getGoodsUrl(STORAGE_KEYS.searchValue, STORAGE_KEYS.currentPage, STORAGE_KEYS.selectedCategory))
        .then(response => {
            if (response.data.total <= (STORAGE_KEYS.currentPage * 12)) {
                hideLoadMoreBtn();
                iziToast.warning({
                    message: 'Oops! You reached all of the goods!',
                });
            } else {
                showLoadMoreBtn();
            };
            renderGoods(response.data.products);
            STORAGE_KEYS.currentPage++;
            smoothScroll();
        })
        .catch((error) => iziToast.error({
            message: `${error.message}`
        }))
        .finally(() => hideLoader());
};

export async function searchSubmit(evt) {
    evt.preventDefault();
    notFoundDisabled();
    showLoader();
    clearCategorySelector();
    STORAGE_KEYS.searchValue = (evt.target.elements.searchValue.value).trim();
    if (!STORAGE_KEYS.searchValue) {
        iziToast.error({
            message: 'Please enter a valid search keyword!'
        })
        return;
    };
    STORAGE_KEYS.currentPage = 1;
    await pullData(getGoodsUrl(STORAGE_KEYS.searchValue))
        .then(response => {
            if (response.data.total === 0) {
                clearProductsList();
                hideLoadMoreBtn();
                notFoundEnabled();
                iziToast.info({
                    message: 'Sorry! No results'
                })
                return;
            } else {
                showLoadMoreBtn();
            };
            if (response.data.total <= (STORAGE_KEYS.currentPage - 1) * 12) {
                hideLoadMoreBtn();
                iziToast.warning({
                    message: 'Oops! You reach all of goods!'
                });
                return;
            };
            clearProductsList();
            renderGoods(response.data.products);
            STORAGE_KEYS.currentPage++;
            smoothScroll();
        })
        .catch((error) => iziToast.error({
            message: error.message,
        }))
        .finally(() => {
            hideLoader();
        });
    refs.form.reset();
};

export function clearSearch() {
    refs.form.elements.searchValue.value = '';
    STORAGE_KEYS.currentPage = 1;
    clearProductsList();
    clearCategorySelector();
    fetchProducts();
};

export function buyCart() {
    if (+refs.totalItemsCount.textContent) {
        iziToast.success({
            message: 'Success!'
        });
    } else {
        iziToast.error({
            message: 'Cart is empty!'
        })
    };
};

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

export function scrollUpBtn() {
    if (window.pageYOffset > 300) {
        refs.scrollUpBtn.classList.add("show");
    } else {
        refs.scrollUpBtn.classList.remove("show");
    };
};

export const scrollUpBtnShow = debounce(scrollUpBtn, 300);

export function scrollUp() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

export function themeToggler() {
    let currentTheme = getTheme();
    if (!currentTheme) {
        applyTheme(STORAGE_KEYS.dark);
        setTheme(true);
    } else {
        applyTheme(STORAGE_KEYS.light)
        setTheme(false);
    }
};
