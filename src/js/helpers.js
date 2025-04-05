//Допоміжні функції

import { refs } from "./refs";

export function notFoundEnabled() {
    refs.notFound.classList.add('not-found--visible');
}
export function notFoundDisabled() {
    if (refs.notFound.classList.contains('not-found--visible')) {
        refs.notFound.classList.remove('not-found--visible');
    }
}

export function getGoodsUrl(q = '', currentPage = 1) {
    if (q) {
        return `https://dummyjson.com/products/search?q=${q}&limit=12&skip=${(currentPage - 1) * 12}`;
    } else {
        return `https://dummyjson.com/products?limit=12&skip=${(currentPage - 1) * 12}`;
    }


};


export function showLoader() {
    refs.loader.style.display = 'inline-block';
}
export function hideLoader() {
    refs.loader.style.display = 'none';
}
export function showLoadMoreBtn() {
    refs.loadMoreBtn.style.display = 'block';
}
export function hideLoadMoreBtn() {
    refs.loadMoreBtn.style.display = 'none';
}

export function smoothScroll() {
    const galleryCard = document.querySelector('.products__item').getBoundingClientRect();
    window.scrollBy({
        top: galleryCard.height * 1,
        behavior: 'smooth',
    })
}
