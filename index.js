import"./assets/styles-B8WhyOyT.js";import{a as I,i as r}from"./assets/vendor-X279WPgE.js";const a={form:document.querySelector(".search-form"),clearSearchBtn:document.querySelector(".search-form__btn-clear"),listCategories:document.querySelector(".categories"),listProducts:document.querySelector(".products"),notFound:document.querySelector(".not-found"),loader:document.querySelector(".loader"),modal:document.querySelector(".modal"),productModal:document.querySelector(".modal-product"),loadMoreBtn:document.querySelector(".load-more__btn"),addToCartBtn:document.querySelector(".modal-product__btn--cart"),addToWishBtn:document.querySelector(".modal-product__btn--wishlist"),cartCount:document.querySelector("[data-cart-count]"),wishListCount:document.querySelector("[data-wishlist-count]")};let o={LS_WL_KEY:"userWishList",LS_USER_CART_KEY:"userCart",BASE_URL_ALL:"https://dummyjson.com/products?limit=12&skip=12",CATEGORIES_KEY:"https://dummyjson.com/products/category-list",currentPage:1,selectedProdId:"",selectedCategory:"",searchValue:""};function n(t){return I.get(`${t}`)}function v(t){localStorage.setItem(o.LS_WL_KEY,JSON.stringify(t)),C()}function m(){return JSON.parse(localStorage.getItem(o.LS_WL_KEY))}function R(t){v(m().filter(e=>e!==t)),C()}function E(t){localStorage.setItem(o.LS_USER_CART_KEY,JSON.stringify(t)),L()}function p(){return JSON.parse(localStorage.getItem(o.LS_USER_CART_KEY))}function A(t){E(p().filter(e=>e!==t)),L()}function q(t){t.unshift("all");const e=t.map(s=>`<li class="categories__item">
            <button class="categories__btn" type="button">${s}</button>
        </li>
        `).join("");a.listCategories.innerHTML=e}function d(t){const e=t.map(({id:s,images:g,description:h,title:f,brand:_,category:y,price:w})=>`<li class="products__item" data-id="${s}">
            <img class="products__image" src="${g[0]}" alt="${h}"/>
            <p class="products__title">${f}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${_}</span></p>
            <p class="products__category">Category: ${y} </p>
            <p class="products__price">Price: ${w} $</p>
        </li>`).join("");a.listProducts.insertAdjacentHTML("beforeend",e)}function x({images:t,description:e,title:s,tags:g,shippingInformation:h,returnPolicy:f,price:_}){const y=`<img class="modal-product__img" src="${t[0]}" alt="${e}" />
        <div class="modal-product__content">
        <p class="modal-product__title">${s}</p>
        <ul class="modal-product__tags">${g.join(", ")}</ul>
        <p class="modal-product__description">${e}</p>
        <p class="modal-product__shipping-information">Shipping: ${h}</p>
        <p class="modal-product__return-policy">Return Policy: ${f}</p>
        <p class="modal-product__price">Price: ${_} $</p>
        </div>
    `;a.productModal.innerHTML=y}function i(){a.listProducts.innerHTML=""}function L(){const t=p()||[];a.cartCount.textContent=t.length}function C(){const t=m()||[];a.wishListCount.textContent=t.length}function $(){a.notFound.classList.add("not-found--visible")}function P(){a.notFound.classList.contains("not-found--visible")&&a.notFound.classList.remove("not-found--visible")}function u(t="",e=1,s=""){return t?`https://dummyjson.com/products/search?q=${t}&limit=12&skip=${(e-1)*12}`:s?`https://dummyjson.com/products/category/${s}?limit=12&skip=${(e-1)*12}`:`https://dummyjson.com/products?limit=12&skip=${(e-1)*12}`}function T(){a.loader.style.display="inline-block"}function S(){a.loader.style.display="none"}function l(){a.loadMoreBtn.style.display="block"}function c(){a.loadMoreBtn.style.display="none"}function B(){const t=document.querySelector(".products__item").getBoundingClientRect();window.scrollBy({top:t.height*1,behavior:"smooth"})}function j(){a.modal.classList.add("modal--is-open"),(m()||[]).some(s=>s===o.selectedProdId)?a.addToWishBtn.textContent="Remove from Wishlist":a.addToWishBtn.textContent="Add to Wishlist",(p()||[]).some(s=>s===o.selectedProdId)?a.addToCartBtn.textContent="Remove from Cart":a.addToCartBtn.textContent="Add to Cart",document.addEventListener("keydown",b),a.addToCartBtn.addEventListener("click",M),a.addToWishBtn.addEventListener("click",W)}function Y(t){(t.target.classList.contains("modal__close-btn")||t.target===t.currentTarget)&&k()}function b(t){t.key==="Escape"&&k()}function k(){a.modal.classList.contains("modal--is-open")&&a.modal.classList.remove("modal--is-open"),document.removeEventListener("keydown",b),a.addToCartBtn.removeEventListener("click",M),a.addToWishBtn.removeEventListener("click",W)}function O(t){if(t.target.tagName==="BUTTON"){o.selectedCategory=t.target.textContent;const e=`https://dummyjson.com/products/category/${o.selectedCategory}?limit=12&skip=0`;if(o.selectedCategory==="all"){o.selectedCategory="",o.currentPage=2,o.searchValue="",n(o.BASE_URL_ALL).then(s=>{o.currentPage++,i(),d(s.data.products),l()}).catch(s=>r.error({message:`${s.message}`}));return}else n(e).then(s=>{if(console.log(s.data.total),s.data.total===0){$();return}console.log(s.data.total),P(),i(),d(s.data.products),s.data.total<12?c():l()}).catch(s=>r.error({message:`${s.message}`})).finally(()=>c)}}function V(t){t.target.tagName!="UL"&&(o.selectedProdId=t.target.closest("li").dataset.id,n(`https://dummyjson.com/products/${o.selectedProdId}`).then(e=>{x(e.data),j()}).catch(e=>r.error({message:`${e.message}`})))}function W(t){const e=m()||[];if(e.some(s=>s===o.selectedProdId)){R(o.selectedProdId),a.addToWishBtn.textContent="Add to Wishlist";return}e.push(o.selectedProdId),v(e),a.addToWishBtn.textContent="Remove from Wishlist"}function M(t){const e=p()||[];if(e.some(s=>s===o.selectedProdId)){A(o.selectedProdId),a.addToCartBtn.textContent="Add to Cart";return}e.push(o.selectedProdId),E(e),a.addToCartBtn.textContent="Remove from Cart"}function K(t){T(),console.log(u(o.searchValue,o.currentPagey)),n(u(o.searchValue,o.currentPage,o.selectedCategory)).then(e=>{e.data.total<=o.currentPage*12?(c(),r.warning({message:"Oops! You reached all of the goods!"})):l(),d(e.data.products),o.currentPage++,B()}).catch(e=>r.error({message:`${e.message}`})).finally(()=>S())}function U(t){if(t.preventDefault(),P(),T(),o.searchValue=t.target.elements.searchValue.value.trim(),!o.searchValue){r.error({message:"Please enter a valid name!"});return}o.currentPage=1,n(u(o.searchValue)).then(e=>{if(e.data.total===0){i(),c(),$(),r.info({message:"Sorry! No results"});return}else l();if(e.data.total<=(o.currentPage-1)*12){c(),r.warning({message:"Oops! You reach all of goods!"});return}i(),d(e.data.products),o.currentPage++,B()}).catch(e=>r.error({message:`${e.message}`})).finally(()=>{S()}),a.form.reset()}function F(){a.form.elements.searchValue.value=""}n(o.CATEGORIES_KEY).then(t=>{q(t.data)}).catch(t=>r.error({message:`${t.message}`}));n(u(o.searchValue,o.currentPage)).then(t=>{d(t.data.products),t.data.total>(o.currentPage-1)*12?(o.currentPage++,l()):c()}).catch(t=>r.error({message:`${t.message}`})).finally(()=>{S()});a.listCategories.addEventListener("click",O);a.listProducts.addEventListener("click",V);a.form.addEventListener("submit",U);a.clearSearchBtn.addEventListener("click",F);a.modal.addEventListener("click",Y);a.loadMoreBtn.addEventListener("click",K);L();C();
//# sourceMappingURL=index.js.map
