import"./assets/styles-B8WhyOyT.js";import{a as $,i as c}from"./assets/vendor-X279WPgE.js";const e={listCategories:document.querySelector(".categories"),listProducts:document.querySelector(".products"),notFound:document.querySelector(".not-found"),loader:document.querySelector(".loader"),modal:document.querySelector(".modal"),productModal:document.querySelector(".modal-product"),loadMoreBtn:document.querySelector(".load-more__btn")};let n={LS_WL_KEY:"userWishList",BASE_URL_ALL:"https://dummyjson.com/products?limit=12&skip=12",SEARCH_KEY:"search?q=",CATEGORIES_KEY:"https://dummyjson.com/products/category-list",currentPage:1};function r(t){return $.get(`${t}`)}function E(t){t.unshift("all");const o=t.map(a=>`<li class="categories__item">
            <button class="categories__btn" type="button">${a}</button>
        </li>
        `).join("");e.listCategories.innerHTML=o}function d(t){const o=t.map(({id:a,images:s,description:i,title:u,brand:m,category:p,price:h})=>`<li class="products__item" data-id="${a}">
            <img class="products__image" src="${s[0]}" alt="${i}"/>
            <p class="products__title">${u}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${m}</span></p>
            <p class="products__category">Category: ${p} </p>
            <p class="products__price">Price: ${h} $</p>
        </li>`).join("");e.listProducts.insertAdjacentHTML("beforeend",o)}function M({images:t,description:o,title:a,tags:s,shippingInformation:i,returnPolicy:u,price:m}){const p=`<img class="modal-product__img" src="${t[0]}" alt="${o}" />
        <div class="modal-product__content">
        <p class="modal-product__title">${a}</p>
        <ul class="modal-product__tags">${s.join(", ")}</ul>
        <p class="modal-product__description">${o}</p>
        <p class="modal-product__shipping-information">Shipping: ${i}</p>
        <p class="modal-product__return-policy">Return Policy: ${u}</p>
        <p class="modal-product__price">Price: ${m} $</p>
        
        </div>
    `;e.productModal.innerHTML=p}function _(){e.listProducts.innerHTML=""}function P(){e.notFound.classList.add("not-found--visible")}function S(){e.notFound.classList.contains("not-found--visible")&&e.notFound.classList.remove("not-found--visible")}function f(t=1){return`https://dummyjson.com/products?limit=12&skip=${(t-1)*12}`}function b(){e.loader.style.display="none"}function g(){e.loadMoreBtn.style.display="block"}function l(){e.loadMoreBtn.style.display="none"}function k(){e.modal.classList.add("modal--is-open"),document.addEventListener("keydown",y)}function v(t){(t.target.classList.contains("modal__close-btn")||t.target===t.currentTarget)&&L()}function y(t){t.key==="Escape"&&L()}function L(){e.modal.classList.contains("modal--is-open")&&e.modal.classList.remove("modal--is-open"),document.removeEventListener("keydown",y)}function T(t){if(t.target.tagName==="BUTTON"){const o=t.target.textContent,a=`https://dummyjson.com/products/category/${o}`;if(o==="all"){r(n.BASE_URL_ALL).then(s=>{_(),d(s.data.products),g()}).catch(s=>c.error({message:`${s.message}`}));return}else r(a).then(s=>{if(s.data.products.length===0){P();return}S(),_(),d(s.data.products),l()}).catch(s=>c.error({message:`${s.message}`})).finally(()=>l)}}function B(t){if(t.target.tagName!="UL"){const o=t.target.closest("li").dataset.id;r(`https://dummyjson.com/products/${o}`).then(a=>{M(a.data),k()}).catch(a=>c.error({message:`${a.message}`}))}}function C(t){r(f(n.currentPage)).then(o=>{d(o.data.products),o.data.total>(n.currentPage-1)*12?(n.currentPage++,g()):l()}).catch(o=>c.error({message:`${o.message}`}))}r(n.CATEGORIES_KEY).then(t=>{E(t.data)}).catch(t=>c.error({message:`${t.message}`}));r(f(n.currentPage)).then(t=>{d(t.data.products),t.data.total>(n.currentPage-1)*12?(n.currentPage++,g()):l()}).catch(t=>c.error({message:`${t.message}`})).finally(()=>{b()});e.listCategories.addEventListener("click",T);e.listProducts.addEventListener("click",B);e.modal.addEventListener("click",v);e.loadMoreBtn.addEventListener("click",C);
//# sourceMappingURL=index.js.map
