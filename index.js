import{a as p,S as d,i}from"./assets/vendor-CsOP1TRZ.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const y="51878894-a5638140813a030bb43789a30",f="https://pixabay.com/api/",g=async s=>{const o={key:y,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};try{return(await p.get(f,{params:o})).data.hits}catch{throw new Error("Unable to fetch images")}},l=document.querySelector(".gallery");let h=new d(".gallery a");const L=s=>{const o=s.map(({webformatURL:r,largeImageURL:a,tags:e,likes:t,views:n,comments:u,downloads:m})=>`
    <li class="gallery-item">
      <a href="${a}">
        <img src="${r}" alt="${e}" />
      </a>
      <div class="info">
        <span>Likes: ${t}</span>
        <span>Views: ${n}</span>
        <span>Comments: ${u}</span>
        <span>Downloads: ${m}</span>
      </div>
    </li>
  `).join("");l.innerHTML=o,h.refresh()},b=()=>{l.innerHTML=""},w=()=>{document.getElementById("loader").classList.add("show")},q=()=>{document.getElementById("loader").classList.remove("show")},c=document.querySelector(".form"),S=c.elements["search-text"];c.querySelector('button[type="submit"]');document.querySelector("main");c.addEventListener("submit",async s=>{s.preventDefault();const o=S.value.trim();if(o===""){i.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}b(),w();try{const r=await g(o);if(!r||r.length===0){i.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(r)}catch(r){i.error({title:"Error",message:r.message,position:"topRight"})}finally{q()}});
//# sourceMappingURL=index.js.map
