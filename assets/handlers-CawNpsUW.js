import{i as c,a as R}from"./vendor-htf-bluc.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();const s={form:document.querySelector(".search-form"),clearSearchBtn:document.querySelector(".search-form__btn-clear"),listCategories:document.querySelector(".categories"),listProducts:document.querySelector(".products"),notFound:document.querySelector(".not-found"),loader:document.querySelector(".loader"),modal:document.querySelector(".modal"),productModal:document.querySelector(".modal-product"),loadMoreBtn:document.querySelector(".load-more__btn"),addToCartBtn:document.querySelector(".modal-product__btn--cart"),addToWishBtn:document.querySelector(".modal-product__btn--wishlist"),cartCount:document.querySelector("[data-cart-count]"),wishListCount:document.querySelector("[data-wishlist-count]"),totalItemsCount:document.querySelector("[data-count]"),totalItemsPrice:document.querySelector("[data-price]"),buyBtn:document.querySelector(".cart-summary__btn"),scrollUpBtn:document.querySelector(".scrollToTopBtn"),colorChangeBtn:document.querySelector(".theme-toggle-button"),root:document.documentElement},o={LS_WL_KEY:"userWishList",LS_USER_CART_KEY:"userCart",LS_USER_THEME:"dark",BASE_URL_ALL:"https://dummyjson.com/products?limit=12&skip=12",CATEGORIES_KEY:"https://dummyjson.com/products/category-list",currentPage:1,selectedProdId:"",selectedCategory:"",searchValue:"",light:{"--main__text":"#242424","--main__back":"rgba(255, 255, 255, 0.87)","--search__back":"#f8f9fa","--search__back--focus":"#fff","--nav__counter":"#ff6b0a","--categ__btn":"#2d3748","--products__item--back":"#fff","--products__categ":"#4a5568"},dark:{"--main__text":"#e9e8e8","--main__back":"rgba(0, 0, 0, 0.87)","--search__back":"#131212","--search__back--focus":"#000","--nav__counter":"f8f9fa","--categ__btn":"#d2c8b7","--products__item--back":"#3a3a3a","--products__categ":"#b5aa97"}};function U(t){t.unshift("all");const e=t.map(r=>`<li class="categories__item">
            <button class="categories__btn" type="button">${r}</button>
        </li>
        `).join("");s.listCategories.innerHTML=e}function u(t){const e=t.map(({id:r,images:i,description:n,title:a,brand:l,category:p,price:O})=>`<li class="products__item" data-id="${r}">
            <img class="products__image" src="${i[0]}" alt="${n}"/>
            <p class="products__title">${a}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${l}</span></p>
            <p class="products__category">Category: ${p} </p>
            <p class="products__price">Price: ${O} $</p>
        </li>`).join("");s.listProducts.insertAdjacentHTML("beforeend",e)}function A({images:t,description:e,title:r,tags:i,shippingInformation:n,returnPolicy:a,price:l}){const p=`<img class="modal-product__img" src="${t[0]}" alt="${e}" />
        <div class="modal-product__content">
        <p class="modal-product__title">${r}</p>
        <ul class="modal-product__tags">${i.join(", ")}</ul>
        <p class="modal-product__description">${e}</p>
        <p class="modal-product__shipping-information">Shipping: ${n}</p>
        <p class="modal-product__return-policy">Return Policy: ${a}</p>
        <p class="modal-product__price">Price: ${l} $</p>
        </div>
    `;s.productModal.innerHTML=p}function m(){s.listProducts.innerHTML=""}function T(){const t=_()||[];s.cartCount.textContent=t.length}function P(){const t=h()||[];s.wishListCount.textContent=t.length}function E(t){localStorage.setItem(o.LS_WL_KEY,JSON.stringify(t)),P()}function h(){return JSON.parse(localStorage.getItem(o.LS_WL_KEY))}function j(t){E(h().filter(e=>e!==t)),P()}function B(t){localStorage.setItem(o.LS_USER_CART_KEY,JSON.stringify(t)),T()}function _(){return JSON.parse(localStorage.getItem(o.LS_USER_CART_KEY))}function N(t){B(_().filter(e=>e!==t)),T()}function $(){return JSON.parse(localStorage.getItem(o.LS_USER_THEME))||!1}function b(t){localStorage.setItem(o.LS_USER_THEME,JSON.stringify(t))}function v(){s.notFound.classList.add("not-found--visible")}function w(){s.notFound.classList.contains("not-found--visible")&&s.notFound.classList.remove("not-found--visible")}function S(t="",e=1,r=""){return t?`https://dummyjson.com/products/search?q=${t}&limit=12&skip=${(e-1)*12}`:r?`https://dummyjson.com/products/category/${r}?limit=12&skip=${(e-1)*12}`:`https://dummyjson.com/products?limit=12&skip=${(e-1)*12}`}function k(t){return`https://dummyjson.com/products/${t}`}function I(){s.loader.style.display="inline-block"}function y(){s.loader.style.display="none"}function g(){s.loadMoreBtn.style.display="block"}function f(){s.loadMoreBtn.style.display="none"}function q(){const t=document.querySelector(".products__item").getBoundingClientRect();window.scrollBy({top:t.height*1,behavior:"smooth"})}function L(t){Object.entries(t).forEach(([e,r])=>{s.root.style.setProperty(e,r)})}function J(){$()&&L(o.dark)}function d(t){return R.get(`${t}`)}async function D(){try{const t=await d(o.CATEGORIES_KEY);U(t.data)}catch(t){c.error({message:t.message})}}async function z(){try{const t=await d(S(o.searchValue,o.currentPage));u(t.data.products),t.data.total>(o.currentPage-1)*12?(o.currentPage++,g()):f()}catch(t){c.error({message:t.message})}finally{y()}}async function Y(t){m();try{let r=t.map(a=>k(a)).map(a=>d(a));const n=(await Promise.all(r)).map(a=>a.data);u(n)}catch(e){c.error({message:e.message})}finally{y()}}async function F(t){m();try{let r=t.map(a=>k(a)).map(a=>d(a));const i=await Promise.all(r),n=i.map(a=>a.data);if(u(n),i.length>0){s.totalItemsCount.textContent=i.length;const a=i.map(l=>l.data.price).reduce((l,p)=>l+p);s.totalItemsPrice.textContent=`$${a.toFixed(2)}`}else s.totalItemsCount.textContent=0,s.totalItemsPrice.textContent="$0"}catch(e){c.error({message:e.message})}finally{y()}}function K(){s.modal.classList.add("modal--is-open"),(h()||[]).some(r=>r===o.selectedProdId)?s.addToWishBtn.textContent="Remove from Wishlist":s.addToWishBtn.textContent="Add to Wishlist",(_()||[]).some(r=>r===o.selectedProdId)?s.addToCartBtn.textContent="Remove from Cart":s.addToCartBtn.textContent="Add to Cart",document.addEventListener("keydown",M),s.addToCartBtn.addEventListener("click",W),s.addToWishBtn.addEventListener("click",x)}function Q(t){(t.target.classList.contains("modal__close-btn")||t.target===t.currentTarget)&&C()}function X(t){(t.target.classList.contains("modal__close-btn")||t.target===t.currentTarget)&&(C(),Y(h()))}function Z(t){(t.target.classList.contains("modal__close-btn")||t.target===t.currentTarget)&&(C(),F(_()))}function M(t){t.key==="Escape"&&C()}function C(){s.modal.classList.contains("modal--is-open")&&s.modal.classList.remove("modal--is-open"),document.removeEventListener("keydown",M),s.addToCartBtn.removeEventListener("click",W),s.addToWishBtn.removeEventListener("click",x)}function tt(t){if(t.target.tagName==="BUTTON"){o.selectedCategory=t.target.textContent;const e=`https://dummyjson.com/products/category/${o.selectedCategory}?limit=12&skip=0`;if(o.selectedCategory==="all"){o.selectedCategory="",o.currentPage=2,o.searchValue="",d(o.BASE_URL_ALL).then(r=>{o.currentPage++,m(),u(r.data.products),g()}).catch(r=>c.error({message:`${r.message}`}));return}else o.currentPage=1,d(e).then(r=>{if(r.data.total===0){v();return}w(),m(),u(r.data.products),r.data.total<12?f():g()}).catch(r=>c.error({message:`${r.message}`})).finally(()=>f)}}function et(t){t.target.tagName!="UL"&&(o.selectedProdId=t.target.closest("li").dataset.id,d(`https://dummyjson.com/products/${o.selectedProdId}`).then(e=>{A(e.data),K()}).catch(e=>c.error({message:`${e.message}`})))}function x(){const t=h()||[];if(t.some(e=>e===o.selectedProdId)){j(o.selectedProdId),s.addToWishBtn.textContent="Add to Wishlist";return}t.push(o.selectedProdId),E(t),s.addToWishBtn.textContent="Remove from Wishlist"}function W(t){const e=_()||[];if(e.some(r=>r===o.selectedProdId)){N(o.selectedProdId),s.addToCartBtn.textContent="Add to Cart";return}e.push(o.selectedProdId),B(e),s.addToCartBtn.textContent="Remove from Cart"}function ot(){I(),d(S(o.searchValue,o.currentPage,o.selectedCategory)).then(t=>{t.data.total<=o.currentPage*12?(f(),c.warning({message:"Oops! You reached all of the goods!"})):g(),u(t.data.products),o.currentPage++,q()}).catch(t=>c.error({message:`${t.message}`})).finally(()=>y())}function st(t){if(t.preventDefault(),w(),I(),o.searchValue=t.target.elements.searchValue.value.trim(),!o.searchValue){c.error({message:"Please enter a valid name!"});return}o.currentPage=1,d(S(o.searchValue)).then(e=>{if(e.data.total===0){m(),f(),v(),c.info({message:"Sorry! No results"});return}else g();if(e.data.total<=(o.currentPage-1)*12){f(),c.warning({message:"Oops! You reach all of goods!"});return}m(),u(e.data.products),o.currentPage++,q()}).catch(e=>c.error({message:e.message})).finally(()=>{y()}),s.form.reset()}function rt(){s.form.elements.searchValue.value=""}function at(){+s.totalItemsCount.textContent?c.success({message:"Success!"}):c.error({message:"Cart is empty!"})}function V(t,e){let r;return function(...i){clearTimeout(r),r=setTimeout(()=>t.apply(this,i),e)}}function H(){window.pageYOffset>300?s.scrollUpBtn.classList.add("show"):s.scrollUpBtn.classList.remove("show")}const nt=V(H,300);function ct(){window.scrollTo({top:0,behavior:"smooth"})}function it(){$()?(L(o.light),b(!1)):(L(o.dark),b(!0))}export{P as a,w as b,X as c,J as d,rt as e,Y as f,h as g,et as h,st as i,ot as j,nt as k,ct as l,D as m,v as n,z as o,tt as p,Q as q,s as r,T as s,it as t,_ as u,F as v,Z as w,at as x};
//# sourceMappingURL=handlers-CawNpsUW.js.map
