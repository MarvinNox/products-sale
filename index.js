import"./assets/styles-BK7AYJoX.js";import{a as g,i as r}from"./assets/vendor-X279WPgE.js";const c={listCategories:document.querySelector(".categories"),listProducts:document.querySelector(".products"),notFound:document.querySelector(".not-found")};let i={BASE_URL_ALL:"https://dummyjson.com/products?limit=12&skip=12",SEARCH_KEY:"search?q=",CATEGORIES_KEY:"https://dummyjson.com/products/category-list"};function a(t){return g.get(`${t}`)}function _(t){t.unshift("all");const e=t.map(o=>`<li class="categories__item">
            <button class="categories__btn" type="button">${o}</button>
        </li>
        `).join("");c.listCategories.innerHTML=e}function n(t){const e=t.map(({id:o,images:s,description:d,title:u,brand:l,category:p,price:m})=>`<li class="products__item" data-id="${o}">
            <img class="products__image" src="${s[0]}" alt="${d}"/>
            <p class="products__title">${u}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand: ${l}</span></p>
            <p class="products__category">Category: ${p} </p>
            <p class="products__price">Price: ${m} $</p>
        </li>`).join("");c.listProducts.innerHTML=e}function h(t){if(t.target.tagName==="BUTTON"){const e=t.target.textContent,o=`https://dummyjson.com/products/category/${e}`;if(e==="all"){a(i.BASE_URL_ALL).then(s=>n(s.data.products)).catch(s=>r.error({message:`${s.message}`}));return}else a(o).then(s=>{if(s.data.products.length===0){console.log("HEY"),c.notFound.classList.add("not-found--visible");return}n(s.data.products)}).catch(s=>r.error({message:`${s.message}`}))}}let $=1;const y=`https://dummyjson.com/products?limit=12&skip=${($-1)*12}`;a(i.CATEGORIES_KEY).then(t=>_(t.data)).catch(t=>r.error({message:`${t.message}`}));a(y).then(t=>n(t.data.products)).catch(t=>r.error({message:`${t.message}`}));c.listCategories.addEventListener("click",h);
//# sourceMappingURL=index.js.map
