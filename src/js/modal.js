//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { refs } from "./refs";
import { addToCart, addToWishList } from "./handlers"
import { STORAGE_KEYS } from "./constants";
import { getCart, getWishlist } from "./storage.js"

export function showModal() {
    refs.modal.classList.add('modal--is-open');

    const wishList = getWishlist() || [];
    if (wishList.some(item => item === STORAGE_KEYS.selectedProdId)) {
        refs.addToWishBtn.textContent = 'Remove from Wishlist'
    } else {
        refs.addToWishBtn.textContent = 'Add to Wishlist'
    }
    const cartList = getCart() || [];
    if (cartList.some(item => item === STORAGE_KEYS.selectedProdId)) {
        refs.addToCartBtn.textContent = 'Remove from Cart'
    } else {
        refs.addToCartBtn.textContent = 'Add to Cart'
    }


    document.addEventListener('keydown', escapeModal);
    refs.addToCartBtn.addEventListener('click', addToCart);
    refs.addToWishBtn.addEventListener('click', addToWishList);
};

export function hideModal(evt) {
    if (evt.target.classList.contains("modal__close-btn") || evt.target === evt.currentTarget) {
        closeModal();
    }
};

function escapeModal(evt) {
    if (evt.key === 'Escape') {
        closeModal();
    }
};

function closeModal() {
    if (refs.modal.classList.contains('modal--is-open')) {
        refs.modal.classList.remove('modal--is-open');
    }
    document.removeEventListener('keydown', escapeModal);

    refs.addToCartBtn.removeEventListener('click', addToCart);
    refs.addToWishBtn.removeEventListener('click', addToWishList);
};