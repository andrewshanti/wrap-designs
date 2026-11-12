(function(){
const vis=e=>e&&e.offsetParent!==null; const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const lblOf=c=>(c.closest('label')||c.parentElement.parentElement).innerText.trim().replace(/\s+/g,' ');
window.__etsyImg=async function(publish){
 const info={};
 // 1. make the first context-1 mockup primary
 const items=[...document.querySelectorAll('pfa-mockup-radio-item')];
 const it=items.find(i=>/camera_label=context-1/.test(i.querySelector('img')?.src||''));
 if(!it) return JSON.stringify({err:'no context-1'});
 const st=[...it.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()==='star');
 it.scrollIntoView({block:'center'}); await sleep(400);
 (st.closest('button')||st).__rc(); await sleep(1500);
 // verify: primary tile image
 const prim=[...document.querySelectorAll('*')].find(e=>vis(e)&&e.children.length===0&&e.textContent.trim()==='Primary');
 let box=prim; for(let k=0;k<6&&box;k++){ box=box.parentElement; if(box.querySelector('img')) break; }
 info.primary=((box?.querySelector('img')?.src||'').match(/camera_label=[^&]+/)||[''])[0];
 // 2. sync only Mockups on publish
 for(const c of document.querySelectorAll('input[type=checkbox]')){
  const l=lblOf(c);
  if(/^(check )?Mockups$/.test(l) && !c.checked && !c.disabled){ (c.closest('label')||c.parentElement).__rc(); await sleep(500); }
 }
 const mk=[...document.querySelectorAll('input[type=checkbox]')].find(c=>/^(check )?Mockups$/.test(lblOf(c)));
 info.mockSync=!!(mk&&mk.checked);
 // 3. publish
 if(publish && /context-1/.test(info.primary) && info.mockSync){
  const pb=[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()==='Publish');
  if(pb&&!pb.disabled){ pb.__rc(); let pn; for(let j=0;j<10;j++){ await sleep(500); pn=[...document.querySelectorAll('.cdk-overlay-pane')].find(x=>[...x.querySelectorAll('button')].some(b=>/^(Confirm|Publish)$/.test(b.textContent.trim()))&&!/Edit shipping/.test(x.innerText)); if(pn) break; }
   if(pn){ [...pn.querySelectorAll('button')].filter(b=>/^(Confirm|Publish)$/.test(b.textContent.trim())).pop().__rc(); await sleep(2500);} info.pub=true; } else info.pub='disabled';
 }
 return JSON.stringify(info);
};
})();
'etsyimg loaded'
