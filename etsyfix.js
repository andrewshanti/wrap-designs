(function(){
const vis=e=>e&&e.offsetParent!==null; const sleep=ms=>new Promise(r=>setTimeout(r,ms));
window.__etsyFix=async function(publish){
 if(!window.__EM) window.__EM=await (await fetch('https://raw.githubusercontent.com/andrewshanti/wrap-designs/6f746564563bb5383670698c132e78349dbe2b12/etsy_by_title.json')).json();
 const setVal=(el,v)=>{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);['input','change','blur'].forEach(t=>el.dispatchEvent(new Event(t,{bubbles:true})));};
 const t=[...document.querySelectorAll('input[type=text]')].find(vis); const cur=t.value.trim(); let m=window.__EM[cur]; if(!m){ m=Object.values(window.__EM).find(x=>x.title===cur); } if(!m) return 'nomap:'+cur;
 if(t.value!==m.title){ setVal(t,m.title); await sleep(500); }
 const tagCount=()=>+((document.body.innerText.match(/(\d+)\/13 tags added/)||[])[1]||-1);
 const curTags=[...document.querySelectorAll('*')].filter(e=>vis(e)&&e.children.length===0&&e.textContent.trim()==='close').length;
 if(tagCount()!==13 || window.__forceTags){
  const ca=[...document.querySelectorAll('button,a,span')].find(e=>vis(e)&&e.textContent.trim()==='Clear all'); if(ca){ ca.__rc(); await sleep(800); }
  const inp=[...document.querySelectorAll('input')].find(e=>vis(e)&&e.placeholder==='Add tag');
  for(const tg of m.tags){ inp.focus(); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(inp,tg); inp.dispatchEvent(new Event('input',{bubbles:true})); await sleep(120); for(const ty of ['keydown','keypress','keyup']) inp.dispatchEvent(new KeyboardEvent(ty,{key:'Enter',code:'Enter',keyCode:13,which:13,bubbles:true})); await sleep(200); }
 }
 // economy
 if(/Selected methods \(1\/2/.test(document.body.innerText)){
  const sm=[...document.querySelectorAll('*')].find(e=>vis(e)&&e.children.length===0&&/Selected methods \(1\/2/.test(e.textContent));
  let box=sm; for(let i=0;i<4;i++){ box=box.parentElement; if(box.querySelector('button')) break; } box.querySelector('button').__rc(); await sleep(1800);
  const cb=[...document.querySelectorAll('input[type=checkbox]')].find(c=>/Economy \(from/.test((c.closest('label')||c.parentElement.parentElement).innerText));
  if(cb&&!cb.checked){ const r=cb.parentElement.getBoundingClientRect(); const el=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)||cb.parentElement; el.__rc?el.__rc():el.click(); await sleep(1000); }
  const x=[...document.querySelectorAll('button')].filter(b=>vis(b)&&b.textContent.trim()==='close').pop(); if(x){ x.__rc(); await sleep(800);} }
 // publishing settings: tags + description sync
 for(const lbl of ['Tags']){ const cb=[...document.querySelectorAll('input[type=checkbox]')].find(c=>new RegExp('^\\s*(check)?\\s*'+lbl+'\\s*$').test((c.closest('label')||c.parentElement.parentElement).innerText.trim())); if(cb&&!cb.checked&&!cb.disabled){ (cb.closest('label')||cb.parentElement).__rc(); await sleep(600); } }
 if(t.value!==m.title){ setVal(t,m.title); await sleep(400); }
 const tagsCb=[...document.querySelectorAll('input[type=checkbox]')].find(c=>/^\s*(check)?\s*Tags\s*$/.test((c.closest('label')||c.parentElement.parentElement).innerText.trim()));
 const info={tags:tagCount(), econ:/Selected methods \(2\/2/.test(document.body.innerText), tagSync:tagsCb&&tagsCb.checked, title:t.value.slice(0,30)};
 if(publish && info.tags===13){ const pb=[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()==='Publish'); if(pb&&!pb.disabled){ pb.__rc(); let pn; for(let j=0;j<10;j++){ await sleep(500); pn=[...document.querySelectorAll('.cdk-overlay-pane')].find(x=>[...x.querySelectorAll('button')].some(b=>/^(Confirm|Publish)$/.test(b.textContent.trim()))&&!/Edit shipping/.test(x.innerText)); if(pn) break; } if(pn){ [...pn.querySelectorAll('button')].filter(b=>/^(Confirm|Publish)$/.test(b.textContent.trim())).pop().__rc(); await sleep(2500);} info.pub=true; } else info.pub='disabled'; }
 return JSON.stringify(info); };
})();
'etsyfix loaded'
