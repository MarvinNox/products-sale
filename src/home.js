//Логіка сторінки Home

import { refs } from "./js/refs";
import { fetchCategories, fetchProducts } from "./js/products-api";
import { setCartCount, setWishListCount } from "./js/render-function";
import { switchCategory, handleSelectProduct, handleLoadMore, searchSubmit, clearSearch, scrollUpBtnShow, scrollUp } from "./js/handlers"
import { hideModal } from "./js/modal";



fetchCategories();
fetchProducts();

refs.listCategories.addEventListener('click', switchCategory);
refs.listProducts.addEventListener('click', handleSelectProduct);
refs.form.addEventListener('submit', searchSubmit);
refs.clearSearchBtn.addEventListener('click', clearSearch);
refs.modal.addEventListener('click', hideModal);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);


window.addEventListener('scroll', scrollUpBtnShow);
refs.scrollUpBtn.addEventListener('click', scrollUp)

setCartCount();
setWishListCount();