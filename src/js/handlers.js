// Функції, які передаються колбеками в addEventListners
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { STORAGE_KEYS } from "./constants";
import { pullData } from "./products-api";
import { renderCategory, renderGoods } from "./render-function";
import { refs } from "./refs";

export function switchCategory(evt) {
    if (evt.target.tagName === "BUTTON") {
        const selectedCategory = evt.target.textContent;
        const selectedUrl = `https://dummyjson.com/products/category/${selectedCategory}`;

        if (selectedCategory === 'all') {
            pullData(STORAGE_KEYS.BASE_URL_ALL)
                .then(response => renderGoods(response.data.products))
                .catch(error => iziToast.error({
                    message: `${error.message}`
                }));
            return;
        } else {
            pullData(selectedUrl)
                .then(response => {
                    if (response.data.products.length === 0) {
                        console.log('HEY');
                        refs.notFound.classList.add('not-found--visible');
                        return;
                    }
                    renderGoods(response.data.products)
                })
                .catch(error => iziToast.error({
                    message: `${error.message}`
                }));
        }
    };
}