// Функції, які передаються колбеками в addEventListners
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { STORAGE_KEYS } from "./constants";
import { pullData } from "./products-api";
import { clearProductsList, renderGoods, renderModal } from "./render-function";
import { refs } from "./refs";
import { notFoundDisabled, notFoundEnabled } from "./helpers";
import { showModal } from "./modal";
import { addToLocal, getFromLocal } from "./storage.js"
import { getGoodsUrl, showLoadMoreBtn, hideLoadMoreBtn } from "./helpers.js";

export function switchCategory(evt) {
    if (evt.target.tagName === "BUTTON") {
        const selectedCategory = evt.target.textContent;
        const selectedUrl = `https://dummyjson.com/products/category/${selectedCategory}`;

        if (selectedCategory === 'all') {
            pullData(STORAGE_KEYS.BASE_URL_ALL)
                .then(response => {
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
        const selectedProdId = event.target.closest('li').dataset.id;
        pullData(`https://dummyjson.com/products/${selectedProdId}`)
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

};
export function addToCart(event) {

};

export function handleLoadMore(evt) {
    pullData(getGoodsUrl(STORAGE_KEYS.currentPage))
        .then(response => {
            renderGoods(response.data.products);
            if (response.data.total > (STORAGE_KEYS.currentPage - 1) * 12) {
                STORAGE_KEYS.currentPage++;
                showLoadMoreBtn();
            } else {
                hideLoadMoreBtn();
            }

        })
        .catch((error) => iziToast.error({
            message: `${error.message}`
        }))
}