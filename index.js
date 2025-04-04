import"./assets/styles-B8WhyOyT.js";import{a as f,i as c}from"./assets/vendor-X279WPgE.js";const o={listCategories:document.querySelector(".categories"),listProducts:document.querySelector(".products"),notFound:document.querySelector(".not-found"),loader:document.querySelector(".loader"),modal:document.querySelector(".modal"),productModal:document.querySelector(".modal-product"),loadMoreBtn:document.querySelector(".load-more__btn")};let m={BASE_URL_ALL:"https://dummyjson.com/products?limit=12&skip=12",SEARCH_KEY:"search?q=",CATEGORIES_KEY:"https://dummyjson.com/products/category-list"};function n(t){return f.get(`${t}`)}function y(t){t.unshift("all");const s=t.map(a=>`<li class="categories__item">
            <button class="categories__btn" type="button">${a}</button>
        </li>
        `).join("");o.listCategories.innerHTML=s}function u(t){const s=t.map(({id:a,images:e,description:d,title:r,brand:l,category:i,price:g})=>`<li class="products__item" data-id="${a}">
            <img class="products__image" src="${e[0]}" alt="${d}"/>
            <p class="products__title">${r}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${l}</span></p>
            <p class="products__category">Category: ${i} </p>
            <p class="products__price">Price: ${g} $</p>
        </li>`).join("");o.listProducts.innerHTML=s}function $({images:t,description:s,title:a,tags:e,shippingInformation:d,returnPolicy:r,price:l}){const i=`<img class="modal-product__img" src="${t[0]}" alt="${s}" />
        <div class="modal-product__content">
        <p class="modal-product__title">${a}</p>
        <ul class="modal-product__tags">${e.join(", ")}</ul>
        <p class="modal-product__description">${s}</p>
        <p class="modal-product__shipping-information">Shipping: ${d}</p>
        <p class="modal-product__return-policy">Return Policy: ${r}</p>
        <p class="modal-product__price">Price: ${l} $</p>
        
        </div>
    `;o.productModal.innerHTML=i}function h(){o.notFound.classList.add("not-found--visible")}function L(){o.notFound.classList.contains("not-found--visible")&&o.notFound.classList.remove("not-found--visible")}function E(){o.loader.style.display="none"}function S(){o.modal.classList.add("modal--is-open"),document.addEventListener("keydown",p)}function b(t){(t.target.classList.contains("modal__close-btn")||t.target===t.currentTarget)&&_()}function p(t){t.key==="Escape"&&_()}function _(){o.modal.classList.contains("modal--is-open")&&o.modal.classList.remove("modal--is-open"),document.removeEventListener("keydown",p)}function k(t){if(t.target.tagName==="BUTTON"){const s=t.target.textContent,a=`https://dummyjson.com/products/category/${s}`;if(s==="all"){n(m.BASE_URL_ALL).then(e=>u(e.data.products)).catch(e=>c.error({message:`${e.message}`}));return}else n(a).then(e=>{if(e.data.products.length===0){console.log("HEY"),h();return}L(),u(e.data.products)}).catch(e=>c.error({message:`${e.message}`}))}}function M(t){if(t.target.tagName!="UL"){const s=t.target.closest("li").dataset.id;n(`https://dummyjson.com/products/${s}`).then(a=>{$(a.data),S()}).catch(a=>c.error({message:`${a.message}`}))}}let C=1;const T=`https://dummyjson.com/products?limit=12&skip=${(C-1)*12}`;n(m.CATEGORIES_KEY).then(t=>y(t.data)).catch(t=>c.error({message:`${t.message}`}));n(T).then(t=>u(t.data.products)).catch(t=>c.error({message:`${t.message}`})).finally(()=>E());o.listCategories.addEventListener("click",k);o.listProducts.addEventListener("click",M);o.modal.addEventListener("click",b);
//# sourceMappingURL=index.js.map
