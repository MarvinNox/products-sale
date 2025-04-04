// Функції, які передаються колбеками в addEventListners
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { STORAGE_KEYS } from "./constants";
import { pullData } from "./products-api";
import { renderCategory, renderGoods, renderModal } from "./render-function";
import { refs } from "./refs";
import { notFoundDisabled, notFoundEnabled } from "./helpers";
import { showModal, hideModal } from "./modal";

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
                        notFoundEnabled();
                        return;
                    }
                    notFoundDisabled();
                    renderGoods(response.data.products)
                })
                .catch(error => iziToast.error({
                    message: `${error.message}`
                }));
        }
    };
};

export function handleSelectProduct(event) {
    if (event.target.tagName != "UL") {
        const selectedProdId = event.target.closest('li').dataset.id;
        pullData(`https://dummyjson.com/products/${selectedProdId}`)
            .then(response => {
                renderModal(response.data)
                showModal()
            })
            .catch(error => iziToast.error({
                message: `${error.message}`
            }))
    }
}

