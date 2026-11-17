(function(){
HTMLElement.prototype.__rc=function(){const r=this.getBoundingClientRect();const o={bubbles:true,cancelable:true,clientX:r.x+r.width/2,clientY:r.y+r.height/2,pointerId:1,pointerType:'mouse',button:0,view:window};for(const t of ['pointerover','pointerenter','mouseover','pointerdown','mousedown','pointerup','mouseup']) this.dispatchEvent(t.startsWith('pointer')?new PointerEvent(t,o):new MouseEvent(t,o)); HTMLElement.prototype.click.call(this);};
const S=ms=>new Promise(r=>setTimeout(r,ms)); window.__sleep=S;
const vis=e=>e&&e.offsetParent!==null;
const B=t=>[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()===t);
const leaf=t=>[...document.querySelectorAll('*')].find(e=>vis(e)&&e.children.length===0&&e.textContent.trim()===t);
async function W(fn,ms=30000){const t0=Date.now();while(Date.now()-t0<ms){let v;try{v=fn()}catch(e){};if(v)return v;await S(400);}return null;}
const setIn=(el,v)=>{el.focus();Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));el.dispatchEvent(new Event('blur',{bubbles:true}));};
const R=window.__appR||'https://raw.githubusercontent.com/andrewshanti/wrap-designs/a91a376b8a51253b114ef1dc5df0822311cf6923/apparel/';
const pf=async n=>new File([await (await fetch(R+n)).blob()],n,{type:'image/png'});
const CF=()=>window.__CFG||{}; const LIGHT_D=['White','Ivory','Butter','Bay','Chalky Mint','Blossom'], DARK_D=['Black','Pepper','Navy','Moss','Blue Jean'];
const posIns=()=>[...document.querySelectorAll('input')].filter(i=>vis(i)&&/^pfy-input/.test(i.id));
async function place(file,ratio,side){
 if(side==='back'){const bs=B('Back side'); if(bs){bs.__rc(); await S(1500);}}
 const del=B('delete'); if(del){del.__rc(); await S(1500);}
 let inp=document.querySelector('input[type=file][data-testid=filePicker]');
 for(let i=0;i<3&&!inp;i++){const lb=[...document.querySelectorAll('pfy-left-bar-button')].find(e=>e.textContent.trim()==='Upload');(lb.querySelector('button')||lb).__rc();await S(1500);inp=document.querySelector('input[type=file][data-testid=filePicker]');}
 if(!inp) throw 'no file input';
 const f=await pf(file); const dt=new DataTransfer(); dt.items.add(f); inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true}));
 if(!await W(()=>document.body.innerText.includes(file)&&posIns().length>=6,90000)) throw 'upload not placed '+file;
 if(!vis(B('Position'))){} await S(1500);
 const C2=(window.__CFG||{}); const mh=(side==='back'?(C2.maxHBack||11):(C2.maxH||11)); const w=Math.min(12, Math.round(mh*ratio*100)/100);
 setIn(posIns()[0],String(w)); await S(1000);
 setIn(posIns()[5],String(side==='back'?8:((window.__CFG||{}).frontTop||6))); await S(1000);
 const v=posIns().map(i=>i.value); if(Math.abs(parseFloat(v[0])-w)>0.05) throw 'width not set '+v;
 // center horizontally
 const h=[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()==='align_horizontal_center'); if(h){h.__rc(); await S(600);}
 return v.join(',');
}
window.__place=place;
function scrollTop(){const pan=leaf('Variants and layers'); let p=pan; for(let i=0;i<4&&p;i++) p=p.parentElement; p&&p.querySelectorAll('*').forEach(e=>{if(e.scrollTop>0) e.scrollTop=0});}
const sw=c=>[...document.querySelectorAll('button[title],button[aria-label]')].find(e=>vis(e)&&(e.getAttribute('title')||e.getAttribute('aria-label'))===c);
window.__buildTee=async function(id,name,ratio,opt){ opt=opt||{}; const side=opt.side||'front'; const C=CF(); const LIGHT=C.light||LIGHT_D, DARK=C.dark||DARK_D; const NV=String(C.nvar||77);
 const log=s=>{localStorage.__tee=id+': '+s;};
 try{
 log('editor');
 await W(()=>[...document.querySelectorAll('pfy-left-bar-button')].length>3,40000); await S(3000);
 // discard restore toast, close info
 const rt=leaf('You have previously unsaved changes to this product.'); if(rt){ let p=rt; for(let i=0;i<4;i++) p=p.parentElement; const x=[...p.querySelectorAll('button')].find(b=>b.textContent.trim()==='close'); x&&x.__rc(); await S(800);}
 const info=leaf('Important product information'); if(info){let p=info; for(let i=0;i<5;i++) p=p.parentElement; const c=[...p.querySelectorAll('button')].find(b=>b.textContent.trim()==='close'); c&&c.__rc(); await S(800);}
 if(!leaf('Variants and layers')){B('design_services').__rc(); await S(2000);}
 if(!leaf('Variants and layers')) throw 'no panel';
 log('variants');
 B('Select variants').__rc(); const pane=await W(()=>[...document.querySelectorAll('.cdk-overlay-pane')].find(p=>/Select variants/.test(p.innerText)&&/variants selected/.test(p.innerText)),15000); if(!pane) throw 'no variant dialog';
 for(const c of LIGHT.concat(DARK)){ const lab=[...pane.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()===c); let row=lab; for(let i=0;i<6&&row&&!row.querySelector('[role=checkbox]');i++) row=row.parentElement; const cb=row&&row.querySelector('[role=checkbox]'); if(!cb) throw 'no color '+c; if(cb.getAttribute('aria-checked')!=='true'){cb.__rc(); await S(350);} }
 await S(800); const sel=pane.innerText.match(/(\d+) variants selected/)?.[1]; if(sel!==NV) throw 'variants '+sel;
 [...pane.querySelectorAll('button')].find(b=>b.textContent.trim()==='close').__rc(); await S(1500);
 if(!leaf('Variants and layers')){B('design_services').__rc(); await S(2000);}
 log('default');
 scrollTop(); await S(500); sw('White').__rc(); await S(1200);
 await place(id+'_dk.png',ratio,side);
 for(const c of DARK){ log('spec '+c); scrollTop(); await S(600); sw(c).__rc(); await S(1500);
  const mk=[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.includes('Make a specific design for '+c)); if(!mk) throw 'no make '+c; mk.__rc(); await S(2500);
  await place(id+'_lt.png',ratio,side); }
 // verify
 for(const c of LIGHT.concat(DARK)){ scrollTop(); await S(300); sw(c).__rc(); await S(900); const want=(DARK.includes(c)?id+'_lt.png':id+'_dk.png'); if(!document.body.innerText.includes(want)) throw 'verify '+c; }
 log('save');
 B('Save product').__rc();
 if(!await W(()=>/mockup-library|product-details/.test(location.href),120000)) throw 'save timeout';
 if(/mockup-library/.test(location.href)){
  await W(()=>leaf('Person 1 Front'),30000); await S(2500);
  const cats=[...document.querySelectorAll('*')].filter(e=>vis(e)&&e.children.length===0&&/^Person/.test(e.textContent.trim())).map(e=>e.textContent.trim()).filter(t=>side==='back'?!/Front|Sleeve/.test(t):!/Back|Sleeve/.test(t)); log('mockups '+cats.join('/'));
  for(const c of cats){ const el=leaf(c); if(!el) continue; (el.closest('button,a,[role=tab]')||el.parentElement).__rc(); await S(2200);
   const sa=leaf('Select all'); const cb=sa&&(sa.closest('label')||sa.parentElement).querySelector('input[type=checkbox]'); if(cb&&!cb.checked){(sa.closest('label')||sa.parentElement).__rc(); await S(1200);} }
  const ss=await W(()=>B('Save selection'),20000); await S(1000); ss.__rc();
  if(!await W(()=>/product-details/.test(location.href),90000)) throw 'no details';
 }
 log('details');
 await W(()=>document.querySelectorAll('pfa-mockup-radio-item').length>3,60000); await S(3000);
 // primary: person-2 on Black
 const chip=[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()==='Black'&&/chip/.test(b.className)); if(chip){chip.__rc(); await S(3000);}
 const items=[...document.querySelectorAll('pfa-mockup-radio-item')]; const lab=i=>(i.querySelector('img')?.src||'').match(/camera_label=([^&]+)/)?.[1]||''; const it=items.find(i=>opt.primary&&lab(i)===opt.primary)||items.find(i=>lab(i)===(C.primary||'person-2'))||items.find(i=>/person/.test(lab(i))&&(side==='back'?/back/.test(lab(i)):!/back|sleeve/.test(lab(i))));
 if(it){ const st=[...it.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()==='star'); it.scrollIntoView({block:'center'}); await S(500); (st.closest('button')||st).__rc(); await S(2000);} 
 // title / description / tags
 const ti=[...document.querySelectorAll('input')].find(i=>vis(i)&&i.type!=='checkbox'&&i.value&&i.value.length>10&&!i.placeholder); 
 const title=opt.title||(name+(C.titleSuffix||' Comfort Colors T-Shirt, Christian Faith Tee, Love Is God')); if(ti){ setIn(ti,title); await S(500);} 
 const d=[...document.querySelectorAll('[contenteditable=true]')].find(vis); if(d&&!d.innerText.includes('Love Is God')){ d.focus(); d.innerHTML='<p><strong>Love Is God</strong> — faith apparel made to be worn every day.</p><p><br></p>'+d.innerHTML+'<p><br></p><p>Printed to order in the USA. Order by December 10 for Christmas delivery.</p>'; d.dispatchEvent(new InputEvent('input',{bubbles:true})); await S(500);}
 const tagIn=[...document.querySelectorAll('input')].find(e=>vis(e)&&e.placeholder==='Add tag');
 const nm=name.toLowerCase().replace(/[^a-z0-9 ]/g,'').trim();
 const tags=[nm.slice(0,20)+' shirt',nm.slice(0,20),'christian t shirt','faith shirt','jesus shirt',(C.kindTag||'comfort colors tee'),'bible verse shirt','church shirt','christian gift','religious shirt','love is god','christian apparel','faith based gift','Love Is God Apparel',(C.collTag||'Love Is God Tees')].concat(opt.tags||[]);
 for(const t of tags){ tagIn.focus(); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(tagIn,t); tagIn.dispatchEvent(new Event('input',{bubbles:true})); await S(150); for(const ty of ['keydown','keypress','keyup']) tagIn.dispatchEvent(new KeyboardEvent(ty,{key:'Enter',code:'Enter',keyCode:13,which:13,bubbles:true})); await S(250);}
 log('prices');
 const map=C.prices||{'S':32.99,'M':32.99,'L':32.99,'XL':32.99,'2XL':34.99,'3XL':36.99,'4XL':39.99};
 const rowOf=s=>[...document.querySelectorAll('tr')].slice(1).find(tr=>tr.innerText.replace(/check|\s+/g,' ').trim().split(' ')[0]===s);
 const box=s=>rowOf(s)?.querySelector('[role=checkbox]'); const on=b=>b.getAttribute('aria-checked')==='true';
 const sizes=Object.keys(map);
 for(const s of sizes){
  for(const z of sizes){const b=box(z); if(!b) throw 'no row '+z; if(on(b)!==(z===s)){b.__rc();await S(250);}}
  const es=[...document.querySelectorAll('button')].filter(b=>vis(b)&&b.textContent.trim()==='Edit price'); es[es.length-1].__rc(); await S(1000);
  const pane=await W(()=>{const i=[...document.querySelectorAll('.cdk-overlay-pane input')].find(vis); return i?i.closest('.cdk-overlay-pane'):null;},6000); if(!pane) throw 'no price dialog '+s;
  setIn([...pane.querySelectorAll('input')].find(vis),String(map[s])); await S(400);
  [...pane.querySelectorAll('button')].find(b=>/^(Apply|Save|Confirm)$/.test(b.textContent.trim())).__rc(); await S(1000);
 }
 for(const z of sizes){const b=box(z); if(!on(b)){b.__rc();await S(200);}}
 const rows=[...document.querySelectorAll('tr')].slice(1).map(r=>(r.innerText.match(/USD ([\d.]+)/)||[])[1]); const pv=Object.values(map).map(v=>v.toFixed(2)); if(rows.join()!==pv.join()) throw 'price check '+rows;
 log('publish');
 const pb=B('Publish'); pb.__rc(); let c=null; for(let j=0;j<12&&!c;j++){await S(500); c=[...document.querySelectorAll('.cdk-overlay-pane button')].find(b=>vis(b)&&/^(Confirm|Publish)$/.test(b.textContent.trim()));} if(c){c.__rc();}
 await W(()=>/store\/products/.test(location.href),30000);
 log('DONE');
 }catch(e){log('ERR '+e);}
};
})();
