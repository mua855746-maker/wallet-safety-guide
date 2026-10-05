(()=>{
const supported=['zh','en','es','fr','de','ja','ko','pt'];const norm=x=>{const l=String(x||'').toLowerCase().split('-')[0];return supported.includes(l)?l:null};
let selected=norm(new URLSearchParams(location.search).get('lang'));
try{if(!selected&&localStorage.getItem('walletGuideLanguageMode')==='manual')selected=norm(localStorage.getItem('walletGuideLanguage'))}catch(_){}
const lang=selected||(navigator.languages||[navigator.language]).map(norm).find(Boolean)||'en';window.GUIDE_LOCALE=lang;document.documentElement.lang=lang==='zh'?'zh-CN':lang;
const file=lang==='zh'?'index.html':lang==='en'?'index-en.html':'international.html';
if(location.pathname.split('/').pop()!==file){const url=new URL(file,location.href);url.search=location.search;url.searchParams.set('lang',lang);url.hash=location.hash;location.replace(url.href)}
})();