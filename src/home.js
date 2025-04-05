//Логіка сторінки Home
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { refs } from "./js/refs";
import { STORAGE_KEYS } from "./js/constants";
import { pullData } from "./js/products-api";
import {
    renderCategory,
    renderGoods,
    clearProductsList
} from "./js/render-function";
import {
    switchCategory,
    handleSelectProduct,
    handleLoadMore,
    searchSubmit,
    clearSearch
} from "./js/handlers"
import { hideModal } from "./js/modal";
import {
    showLoader,
    hideLoader,
    showLoadMoreBtn,
    hideLoadMoreBtn,
    getGoodsUrl,
} from "./js/helpers";

// export let currentPage = 1;

pullData(STORAGE_KEYS.CATEGORIES_KEY)
    .then(response => {
        renderCategory(response.data)
    }
    )
    .catch(error => iziToast.error({
        message: `${error.message}`
    }))


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
    .catch(error => iziToast.error({
        message: `${error.message}`
    }))
    .finally(() => {
        hideLoader()

    });

refs.listCategories.addEventListener('click', switchCategory);
refs.listProducts.addEventListener('click', handleSelectProduct);
refs.form.addEventListener('submit', searchSubmit);
refs.clearSearchBtn.addEventListener('click', clearSearch);

refs.modal.addEventListener('click', hideModal);

refs.loadMoreBtn.addEventListener('click', handleLoadMore);