// Функції для роботи з бекендом
import { STORAGE_KEYS } from "./constants.js";

// API ендпоінти:

import axios from "axios";
import { clearProductsList, renderCategory, renderGoods } from "./render-function.js";
import { getGoodsByID, getGoodsUrl, hideLoader, hideLoadMoreBtn, showLoadMoreBtn } from "./helpers.js";
import iziToast from "izitoast";
import { refs } from "./refs.js";

export function pullData(KEY) {
    return axios.get(`${KEY}`);
};

export async function fetchCategories() {
    try {
        const request = await pullData(STORAGE_KEYS.CATEGORIES_KEY);
        renderCategory(request.data);

    } catch (error) {
        iziToast.error({
            message: error.message,
        });
    };
};

export async function fetchProducts() {
    try {
        const request = await pullData(getGoodsUrl(STORAGE_KEYS.searchValue, STORAGE_KEYS.currentPage));
        renderGoods(request.data.products);
        if (request.data.total > (STORAGE_KEYS.currentPage - 1) * 12) {
            STORAGE_KEYS.currentPage++;
            showLoadMoreBtn();
        } else {
            hideLoadMoreBtn();
        }
    } catch (error) {
        iziToast.error({
            message: error.message,
        })
    } finally {
        hideLoader();
    };
};

export async function fetchWishList(id) {
    clearProductsList();
    try {
        const links = id.map((id) => getGoodsByID(id));
        let requests = links.map((url) => pullData(url));
        const responses = await Promise.all(requests);
        const products = responses.map(obj => obj.data);
        renderGoods(products);
    } catch (error) {
        iziToast.error({
            message: error.message,
        })
    } finally {
        hideLoader();
    };
};

export async function fetchCartList(id) {
    clearProductsList();
    try {
        const links = id.map((id) => getGoodsByID(id));
        let requests = links.map((url) => pullData(url));
        const responses = await Promise.all(requests);
        const products = responses.map(obj => obj.data);
        renderGoods(products);

        if (responses.length > 0) {
            refs.totalItemsCount.textContent = responses.length;
            const totalPrice = responses.map(item => item.data.price).reduce((acc, item) => acc + item);
            refs.totalItemsPrice.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            refs.totalItemsCount.textContent = 0;
            refs.totalItemsPrice.textContent = '$0';
        };

    } catch (error) {
        iziToast.error({
            message: error.message,
        })
    } finally {
        hideLoader();
    };
};
