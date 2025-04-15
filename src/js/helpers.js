//Допоміжні функції

import { STORAGE_KEYS } from "./constants";
import { refs } from "./refs";
import { getTheme } from "./storage";

export function notFoundEnabled() {
    refs.notFound.classList.add('not-found--visible');
};

export function notFoundDisabled() {
    if (refs.notFound.classList.contains('not-found--visible')) {
        refs.notFound.classList.remove('not-found--visible');
    };
};

export function getGoodsUrl(q = '', currentPage = 1, selectedCategory = '') {
    if (q) {
        return `https://dummyjson.com/products/search?q=${q}&limit=12&skip=${(currentPage - 1) * 12}`;
    } else if (selectedCategory) {
        return `https://dummyjson.com/products/category/${selectedCategory}?limit=12&skip=${(currentPage - 1) * 12}`
    } else {
        return `https://dummyjson.com/products?limit=12&skip=${(currentPage - 1) * 12}`;
    };
};

export function getGoodsByID(id) {
    return `https://dummyjson.com/products/${id}`
};

export function showLoader() {
    refs.loader.style.display = 'inline-block';
};
export function hideLoader() {
    refs.loader.style.display = 'none';
};
export function showLoadMoreBtn() {
    refs.loadMoreBtn.style.display = 'block';
};
export function hideLoadMoreBtn() {
    refs.loadMoreBtn.style.display = 'none';
};

export function smoothScroll() {
    const galleryCard = document.querySelector('.products__item').getBoundingClientRect();
    window.scrollBy({
        top: galleryCard.height * 1,
        behavior: 'smooth',
    });
};

export function applyTheme(mode) {
    Object.entries(mode).forEach(([key, value]) => {
        refs.root.style.setProperty(key, value);
    });
};

export function detectTheme() {
    const savedTheme = getTheme();
    if (savedTheme) {
        applyTheme(STORAGE_KEYS.dark);
    }
}

export function clearCategorySelector() {
    const activeCategory = document.querySelector('button.categories__btn--active');
    if (activeCategory) {
        activeCategory.classList.remove('categories__btn--active');
    }
}