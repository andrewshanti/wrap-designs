window.__fixSize=async function(colors,w,top){
 const S=ms=>new Promise(r=>setTimeout(r,ms)); const vis=e=>e&&e.offsetParent!==null;
 const B=t=>[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()===t);
 const leaf=t=>[...document.querySelectorAll('*')].find(e=>vis(e)&&e.children.length===0&&e.textContent.trim()===t);
 const setIn=(el,v)=>{el.focus();Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));el.dispatchEvent(new Event('blur',{bubbles:true}));};
 const posIns=()=>[...document.querySelectorAll('input')].filter(i=>vis(i)&&/^pfy-input/.test(i.id));
 const log=s=>{localStorage.__fix=s;};
 try{
 let t0=Date.now(); while(Date.now()-t0<40000&&document.querySelectorAll('pfy-left-bar-button').length<3) await S(500); await S(3000);
 const info=leaf('Important product information'); if(info){let p=info; for(let i=0;i<5;i++) p=p.parentElement; [...p.querySelectorAll('button')].find(b=>b.textContent.trim()==='close')?.__rc(); await S(800);}
 if(!leaf('Variants and layers')){B('design_services').__rc(); await S(2000);}
 const out=[];
 for(const c of colors){
  const pan=leaf('Variants and layers'); let p=pan; for(let i=0;i<4&&p;i++) p=p.parentElement; p&&p.querySelectorAll('*').forEach(e=>{if(e.scrollTop>0) e.scrollTop=0}); await S(400);
  const sw=[...document.querySelectorAll('button[title],button[aria-label]')].find(e=>vis(e)&&(e.getAttribute('title')||e.getAttribute('aria-label'))===c); sw.__rc(); await S(1500);
  // select the layer so position inputs show
  const lay=[...document.querySelectorAll('*')].find(e=>vis(e)&&e.children.length===0&&/_(dk|lt)\.png$/.test(e.textContent.trim())); if(!lay){out.push(c+':nolayer');continue;}
  if(posIns().length<6){ lay.__rc(); await S(1200); }
  if(posIns().length<6){ out.push(c+':noinputs'); continue; }
  setIn(posIns()[0],String(w)); await S(900); setIn(posIns()[5],String(top)); await S(900);
  const h=[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()==='align_horizontal_center'); if(h){h.__rc(); await S(500);}
  out.push(c+':'+posIns().map(i=>i.value).slice(0,2).join('x'));
 }
 log('save '+out.join(' '));
 B('Save product').__rc();
 t0=Date.now(); while(Date.now()-t0<120000&&!/product-details|mockup-library/.test(location.href)) await S(800);
 if(/mockup-library/.test(location.href)){ const ss=await (async()=>{let b;for(let i=0;i<40&&!(b=B('Save selection'));i++) await S(500); return b;})(); ss&&ss.__rc(); t0=Date.now(); while(Date.now()-t0<60000&&!/product-details/.test(location.href)) await S(800);}
 await S(6000);
 const pb=B('Publish'); pb&&pb.__rc(); let cf=null; for(let j=0;j<16&&!cf;j++){await S(500); cf=[...document.querySelectorAll('.cdk-overlay-pane button')].find(b=>vis(b)&&/^(Confirm|Publish)$/.test(b.textContent.trim()));} cf&&cf.__rc(); await S(4000);
 log('DONE '+out.join(' '));
 }catch(e){log('ERR '+e);}
};
