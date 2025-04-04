//Функцію для створення, рендеру або видалення розмітки
import { refs } from "./refs";
import { STORAGE_KEYS } from "./constants";

export function renderCategory(arrCategories) {
    arrCategories.unshift('all');
    const markup = arrCategories.map((item) =>
        `<li class="categories__item">
            <button class="categories__btn" type="button">${item}</button>
        </li>
        `).join("");
    refs.listCategories.innerHTML = markup;
};

export function renderGoods(arrGoods) {
    const markup = arrGoods.map(({ id, images, description, title, brand, category, price }) =>
        `<li class="products__item" data-id="${id}">
            <img class="products__image" src="${images[0]}" alt="${description}"/>
            <p class="products__title">${title}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${brand}</span></p>
            <p class="products__category">Category: ${category} </p>
            <p class="products__price">Price: ${price}$</p>
        </li>`).join("");
    refs.listProducts.innerHTML = markup;
};