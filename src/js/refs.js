//Обʼєкт з посиланнями на ДОМ елементи

export const refs = {
    form: document.querySelector('.search-form'),
    clearSearchBtn: document.querySelector('.search-form__btn-clear'),
    listCategories: document.querySelector(".categories"),
    listProducts: document.querySelector(".products"),
    notFound: document.querySelector(".not-found"),
    loader: document.querySelector(".loader"),
    modal: document.querySelector('.modal'),
    productModal: document.querySelector(".modal-product"),
    loadMoreBtn: document.querySelector('.load-more__btn'),
    addToCartBtn: document.querySelector('.modal-product__btn--cart'),
    addToWishBtn: document.querySelector('.modal-product__btn--wishlist'),
    cartCount: document.querySelector('[data-cart-count]'),
    wishListCount: document.querySelector('[data-wishlist-count]'),
    totalItemsCount: document.querySelector('[data-count]'),
    totalItemsPrice: document.querySelector('[data-price]'),

};
