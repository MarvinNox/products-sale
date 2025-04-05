//Логіка сторінки Cart

import { refs } from "./js/refs";
import { notFoundDisabled, notFoundEnabled, scrollUp, scrollUpBtnShow } from "./js/helpers";
import { fetchCartList } from "./js/products-api";
import { getCart } from "./js/storage";
import { setCartCount, setWishListCount } from "./js/render-function";
import { buyCart, clearSearch, handleLoadMore, handleSelectProduct, searchSubmit } from "./js/handlers";
import { hideCartModal } from "./js/modal";


setCartCount();
setWishListCount();

const id = getCart() || [];
id.length == 0 ? notFoundEnabled() : notFoundDisabled();

fetchCartList(id);

refs.listProducts.addEventListener('click', handleSelectProduct);
refs.modal.addEventListener('click', hideCartModal);
refs.clearSearchBtn.addEventListener('click', clearSearch);
refs.form.addEventListener('submit', searchSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);
refs.buyBtn.addEventListener('click', buyCart);
