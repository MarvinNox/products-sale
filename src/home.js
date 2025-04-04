//Логіка сторінки Home
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { refs } from "./js/refs";
import { STORAGE_KEYS } from "./js/constants";
import { pullData } from "./js/products-api";
import { renderCategory, renderGoods } from "./js/render-function";
import { switchCategory, handleSelectProduct } from "./js/handlers"
import { hideModal } from "./js/modal";

let currentPage = 1;
const goodsUrl = `https://dummyjson.com/products?limit=12&skip=${(currentPage - 1) * 12}`;


pullData(STORAGE_KEYS.CATEGORIES_KEY)
    .then(response => renderCategory(response.data)
    )
    .catch(error => iziToast.error({
        message: `${error.message}`
    }));

pullData(goodsUrl)
    .then(response => renderGoods(response.data.products))
    .catch(error => iziToast.error({
        message: `${error.message}`
    }));

refs.listCategories.addEventListener('click', switchCategory);
refs.listProducts.addEventListener('click', handleSelectProduct)

refs.closeModalBttn.addEventListener('click', hideModal);