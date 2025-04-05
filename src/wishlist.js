//Логіка сторінки Wishlist

import iziToast from "izitoast";
import { STORAGE_KEYS } from "./js/constants";
import { getGoodsByID } from "./js/helpers";
import { pullData } from "./js/products-api";
import { refs } from "./js/refs";
import { getWishlist } from "./js/storage";
import { renderGoods, setCartCount, setWishListCount } from "./js/render-function";
import { handleSelectProduct } from "./js/handlers";
import { hideModal } from "./js/modal";

setCartCount();
setWishListCount();

const id = getWishlist();
const links = id.map((id) => getGoodsByID(id));
let requests = links.map((url) => pullData(url));

Promise.all(requests)
    .then(resp => resp.map(obj => obj.data))
    .then(data => {
        renderGoods(data)
    })
    .catch(error => iziToast.error({ message: error.message }))

refs.listProducts.addEventListener('click', handleSelectProduct);
refs.modal.addEventListener('click', hideModal);