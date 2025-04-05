//Логіка сторінки Wishlist

import { refs } from "./js/refs";
import { notFoundDisabled, notFoundEnabled } from "./js/helpers";
import { fetchWishList } from "./js/products-api";
import { getWishlist } from "./js/storage";
import { setCartCount, setWishListCount } from "./js/render-function";
import { clearSearch, handleLoadMore, handleSelectProduct, searchSubmit } from "./js/handlers";
import { hideWishModal } from "./js/modal";


setCartCount();
setWishListCount();

const id = getWishlist();
id.length == 0 ? notFoundEnabled() : notFoundDisabled();

fetchWishList(id);

refs.listProducts.addEventListener('click', handleSelectProduct);
refs.modal.addEventListener('click', hideWishModal);
refs.clearSearchBtn.addEventListener('click', clearSearch);
refs.form.addEventListener('submit', searchSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);