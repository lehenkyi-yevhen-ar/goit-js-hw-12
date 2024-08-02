import{S as L,i as c,a as u}from"./assets/vendor-BPs2jpei.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const v=document.querySelector("#gallery-container");let b=new L("#gallery-container a",{captionsData:"title",captions:!0,captionDelay:250,overlay:!0,captionPosition:"bottom"});function f(r){if(r.hits.length===0){c.info({title:"No results found",message:"Try a different search term."});return}const a=r.hits.map(e=>`
        <a href="${e.largeImageURL}" data-lightbox="gallery" title="Tags: ${e.tags}">
            <div class="image-wrapper">
                <img src="${e.previewURL}" alt="${e.tags}" title="
                Tags: ${e.tags} 
            ">
            <div class="caption">
                <div class="su-caption">
                Likes ${e.likes} </div>
                <div class="su-caption">
                Views ${e.views} </div>
                <div class="su-caption">
                Comments ${e.comments} </div>
                <div class="su-caption">
                Downloads ${e.downloads} </div>
            </div>
            </div>
        </a>
    `).join("");v.insertAdjacentHTML("beforeend",a),b.refresh()}class w{constructor(a,e){this.buttonEL=a,this.hiddenClass=e}hide(){this.buttonEL.classList.add(this.hiddenClass)}show(){this.buttonEL.classList.remove(this.hiddenClass)}disable(){this.buttonEL.disabled=!0}enable(){this.buttonEL.disabled=!1}}const E="https://pixabay.com/api/",$="45189521-352d969f92f63c5bc874c10a6";u.defaults.baseURL=E;async function g({page:r=1,per_page:a=15,q:e=""}={}){try{const{data:o}=await u.get("",{params:{page:r,per_page:a,q:e,key:$,image_type:"photo",orientation:"horizontal",safesearch:!0}});return o}catch(o){throw new Error(`Error fetching data ${o.message}`)}}const d=document.querySelector('[data-action="load-more"]'),n=new w(d,"is-hidden"),q=document.querySelector(".search-form"),m=document.querySelector(".loader"),S=document.querySelector("#gallery-container"),i={page:1,per_page:15,q:"",maxPage:0,image_type:"photo",orientation:"horizontal",safesearch:!0};q.addEventListener("submit",P);function h(){m.classList.remove("hidden")}function p(){m.classList.add("hidden")}n.hide();async function P(r){r.preventDefault();const a=r.currentTarget;a&&(S.innerHTML="");const e=r.currentTarget.elements.query.value.trim().toLowerCase();if(e===""){c.info({message:"Type something to find!"});return}h(),i.page=1,i.q=e;try{const o=await g(i);i.maxPage=Math.ceil(o.totalHits/i.per_page),p(),f(o),i.maxPage>1?(n.show(),n.enable(),d.addEventListener("click",y)):n.hide()}catch(o){c.error({message:`Помилка під час запиту: ${o.message} `})}finally{a&&a.reset()}}async function y(){i.page+=1,n.hide(),h();try{const r=await g(i);p(),f(r,!0),n.enable(),n.show();let e=document.querySelector(".image-wrapper").getBoundingClientRect();window.scrollBy({top:2*e.height,behavior:"smooth"})}catch(r){c.error({message:`Error during the request: ${r.message}`})}finally{i.page===i.maxPage&&(n.hide(),d.removeEventListener("click",y),c.info({message:"We're sorry, but you've reached the end of search results."}))}}
//# sourceMappingURL=commonHelpers.js.map
