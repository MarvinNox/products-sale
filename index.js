import"./assets/styles-DLS-0iiV.js";import{a as _,i as a}from"./assets/vendor-X279WPgE.js";const s={listCategories:document.querySelector(".categories"),listProducts:document.querySelector(".products"),notFound:document.querySelector(".not-found"),loader:document.querySelector(".loader"),modal:document.querySelector(".modal"),productModal:document.querySelector(".modal-product"),closeModalBttn:document.querySelector(".modal__close-btn")};let p={BASE_URL_ALL:"https://dummyjson.com/products?limit=12&skip=12",SEARCH_KEY:"search?q=",CATEGORIES_KEY:"https://dummyjson.com/products/category-list"};function r(t){return _.get(`${t}`)}function g(t){t.unshift("all");const e=t.map(c=>`<li class="categories__item">
            <button class="categories__btn" type="button">${c}</button>
        </li>
        `).join("");s.listCategories.innerHTML=e}function u(t){const e=t.map(({id:c,images:o,description:d,title:n,brand:l,category:i,price:m})=>`<li class="products__item" data-id="${c}">
            <img class="products__image" src="${o[0]}" alt="${d}"/>
            <p class="products__title">${n}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${l}</span></p>
            <p class="products__category">Category: ${i} </p>
            <p class="products__price">Price: ${m} $</p>
        </li>`).join("");s.listProducts.innerHTML=e}function $({images:t,description:e,title:c,tags:o,shippingInformation:d,returnPolicy:n,price:l}){const i=`<img class="modal-product__img" src="${t[0]}" alt="${e}" />
        <div class="modal-product__content">
        <p class="modal-product__title">${c}</p>
        <ul class="modal-product__tags">${o.join(", ")}</ul>
        <p class="modal-product__description">${e}</p>
        <p class="modal-product__shipping-information">Shipping: ${d}</p>
        <p class="modal-product__return-policy">Return Policy: ${n}</p>
        <p class="modal-product__price">Price: ${l} $</p>
        
        </div>
    `;s.productModal.innerHTML=i}function f(){s.notFound.classList.add("not-found--visible")}function h(){s.notFound.classList.contains("not-found--visible")&&s.notFound.classList.remove("not-found--visible")}function y(){s.modal.classList.add("modal--is-open")}function L(){s.modal.classList.contains("modal--is-open")&&s.modal.classList.remove("modal--is-open")}function E(t){if(t.target.tagName==="BUTTON"){const e=t.target.textContent,c=`https://dummyjson.com/products/category/${e}`;if(e==="all"){r(p.BASE_URL_ALL).then(o=>u(o.data.products)).catch(o=>a.error({message:`${o.message}`}));return}else r(c).then(o=>{if(o.data.products.length===0){console.log("HEY"),f();return}h(),u(o.data.products)}).catch(o=>a.error({message:`${o.message}`}))}}function S(t){if(t.target.tagName!="UL"){const e=t.target.closest("li").dataset.id;r(`https://dummyjson.com/products/${e}`).then(c=>{$(c.data),y()}).catch(c=>a.error({message:`${c.message}`}))}}let b=1;const C=`https://dummyjson.com/products?limit=12&skip=${(b-1)*12}`;r(p.CATEGORIES_KEY).then(t=>g(t.data)).catch(t=>a.error({message:`${t.message}`}));r(C).then(t=>u(t.data.products)).catch(t=>a.error({message:`${t.message}`}));s.listCategories.addEventListener("click",E);s.listProducts.addEventListener("click",S);s.closeModalBttn.addEventListener("click",L);
//# sourceMappingURL=index.js.map
