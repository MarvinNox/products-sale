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

