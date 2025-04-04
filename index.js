import"./assets/styles-BK7AYJoX.js";import{a as l,i as r}from"./assets/vendor-X279WPgE.js";const e={listCategories:document.querySelector(".categories"),listProducts:document.querySelector(".products")};let m={BASE_URL:"https://dummyjson.com/docs/products/",SEARCH_KEY:"search?q=",CATEGORIES_KEY:"https://dummyjson.com/products/category-list"};function c(t){return l.get(`${t}`)}function _(t){t.unshift("all");const s=t.map(o=>`<li class="categories__item">
            <button class="categories__btn" type="button">${o}</button>
        </li>
        `).join("");e.listCategories.innerHTML=s}function g(t){const s=t.map(({id:o,images:a,description:i,title:n,brand:p,category:u,price:d})=>`<li class="products__item" data-id="${o}">
            <img class="products__image" src="${a[0]}" alt="${i}"/>
            <p class="products__title">${n}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${p}</span></p>
            <p class="products__category">Category: ${u} </p>
            <p class="products__price">Price: ${d}$</p>
        </li>`).join("");e.listProducts.innerHTML=s}let $=1;const E=`https://dummyjson.com/products?limit=12&skip=${($-1)*12}`;c(m.CATEGORIES_KEY).then(t=>_(t.data)).catch(t=>r.error({message:`${t.message}`}));c(E).then(t=>g(t.data.products)).catch(t=>r.error({message:`${t.message}`}));
//# sourceMappingURL=index.js.map
