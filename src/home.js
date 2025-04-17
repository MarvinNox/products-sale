//Логіка сторінки Home

import { refs } from "./js/refs";
import { fetchCategories, fetchProducts } from "./js/products-api";
import { setCartCount, setWishListCount } from "./js/render-function";
import {
    switchCategory,
    handleSelectProduct,
    handleLoadMore,
    searchSubmit,
    clearSearch,
    scrollUpBtnShow,
    scrollUp,
    themeToggler
} from "./js/handlers"

import { hideModal } from "./js/modal";
import { detectTheme } from "./js/helpers";


detectTheme();

fetchCategories();
fetchProducts();

refs.listCategories.addEventListener('click', switchCategory);
refs.listProducts.addEventListener('click', handleSelectProduct);
refs.form.addEventListener('submit', searchSubmit);
refs.clearSearchBtn.addEventListener('click', clearSearch);
refs.modal.addEventListener('click', hideModal);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);
window.addEventListener('scroll', scrollUpBtnShow);
refs.scrollUpBtn.addEventListener('click', scrollUp);
refs.colorChangeBtn.addEventListener('click', themeToggler);

setCartCount();
setWishListCount();
