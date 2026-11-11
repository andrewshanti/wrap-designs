window.__P = window.__P || {q:[], done:[], err:[], running:false, status:''}; window.__P.ver=4;
HTMLElement.prototype.__rc=function(){const r=this.getBoundingClientRect();const o={bubbles:true,cancelable:true,clientX:r.x+r.width/2,clientY:r.y+r.height/2,pointerId:1,pointerType:'mouse',button:0,view:window};for(const t of ['pointerover','pointerenter','mouseover','pointerdown','mousedown','pointerup','mouseup']) this.dispatchEvent(t.startsWith('pointer')?new PointerEvent(t,o):new MouseEvent(t,o)); HTMLElement.prototype.click.call(this);};
(function(){
const P=window.__P;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const vis=e=>e&&e.offsetParent!==null;
const btn=t=>[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()===t);
const anyText=t=>[...document.querySelectorAll('button,a,span,div,p')].filter(e=>vis(e)&&e.textContent.trim()===t);
async function waitFor(fn,ms=30000){const t0=Date.now();while(Date.now()-t0<ms){let v;try{v=fn()}catch(e){};if(v)return v;await sleep(300);}return null;}
async function svgFromB64(b64){const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));return await new Response(new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'))).text();}
async function pngFile(b64,name,W=6050,H=7200){const svg=await svgFromB64(b64);const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const img=new Image();await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=url;});const c=document.createElement('canvas');c.width=W;c.height=H;c.getContext('2d').drawImage(img,0,0,W,H);const blob=await new Promise(r=>c.toBlob(r,'image/png'));URL.revokeObjectURL(url);return new File([blob],name+'.png',{type:'image/png'});}
function route(path){history.pushState({},'',path);window.dispatchEvent(new PopStateEvent('popstate',{state:{}}));}
const setVal=(el,v)=>{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));el.dispatchEvent(new Event('blur',{bubbles:true}));};
const rowBox=size=>[...document.querySelectorAll('tr')].find(tr=>tr.innerText.includes(size))?.querySelector('[role=checkbox]');
const isOn=b=>b.getAttribute('aria-checked')==='true';
async function setPrices(map){
 const sizes=Object.keys(map);
 for(const s of sizes){
  for(const z of sizes){const b=rowBox(z); if(!b) throw 'no row '+z; if(isOn(b)!==(z===s)){b.__rc();await sleep(250);}}
  const es=[...document.querySelectorAll('button')].filter(b=>vis(b)&&b.textContent.trim()==='Edit price'); es[es.length-1].__rc(); await sleep(900);
  const pane=await waitFor(()=>{const i=[...document.querySelectorAll('.cdk-overlay-pane input[type=number]')].find(vis); return i?i.closest('.cdk-overlay-pane'):null;},5000); if(!pane) throw 'no price dialog';
  setVal(pane.querySelector('input[type=number]'),String(map[s])); await sleep(300);
  [...pane.querySelectorAll('button')].find(b=>b.textContent.trim()==='Apply').__rc(); await sleep(900);
 }
 for(const z of sizes){const b=rowBox(z); if(!isOn(b)){b.__rc();await sleep(200);}}
}
async function one(it){
 P.status=it.id+': editor';
 route('/app/editor/1367/99');
 await waitFor(()=>[...document.querySelectorAll('pfy-left-bar-button')].find(e=>e.textContent.trim()==='Upload'),30000);
 await sleep(1500);
 for(const t of ['Explore by myself','Got it']){const b=anyText(t)[0]; if(b){b.__rc();await sleep(400);}}
 for(let i=0;i<4&&!document.querySelector('input[type=file][data-testid=filePicker]');i++){const lb=[...document.querySelectorAll('pfy-left-bar-button')].find(e=>e.textContent.trim()==='Upload');(lb.querySelector('button')||lb).__rc();await sleep(1200);}
 const inp=await waitFor(()=>document.querySelector('input[type=file][data-testid=filePicker]'),10000); if(!inp) throw 'no file input';
 P.status=it.id+': render+upload';
 const f=await pngFile(it.b64,it.file); const dt=new DataTransfer(); dt.items.add(f); inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true}));
 const okUp=await waitFor(()=>{const b=btn('Save product'); return b && !b.disabled && anyText('Position').length ? b : null;},90000); if(!okUp) throw 'upload not placed';
 await sleep(1500);
 P.status=it.id+': variants'; await P.ensureVariants(); await sleep(1500);
 P.status=it.id+': save design';
 const sv=await waitFor(()=>btn('Save product'),20000); sv.__rc();
 await waitFor(()=>/mockup-library|product-details/.test(location.href),90000);
 if(/mockup-library/.test(location.href)){ const ss=await waitFor(()=>btn('Save selection'),30000); await sleep(1500); ss.__rc(); await waitFor(()=>/product-details/.test(location.href),60000); }
 if(!/product-details/.test(location.href)) throw 'not on details page: '+location.pathname;
 const pid=await P.details(it);
 return pid;
}
P.details=async function(it){
 const pid=(location.href.match(/product-details\/([a-f0-9]+)/)||[])[1];
 P.status=it.id+': details '+pid; it.pid=pid;
 await waitFor(()=>[...document.querySelectorAll('input[type=text]')].find(vis),30000); await sleep(2000);
 const oo=btn('Opt-out'); if(oo){oo.__rc(); await sleep(800);}
 const t=[...document.querySelectorAll('input[type=text]')].find(vis); setVal(t,it.title);
 const d=[...document.querySelectorAll('[contenteditable=true]')].find(vis); d.focus(); document.execCommand('selectAll'); document.execCommand('insertHTML',false,it.desc); d.dispatchEvent(new Event('input',{bubbles:true})); await sleep(500);
 const dtv=anyText('Detailed table view')[0]; if(dtv){dtv.__rc(); await sleep(1200);}
 await setPrices(it.prices);
 { const t2=[...document.querySelectorAll('input[type=text]')].find(vis); if(t2 && t2.value!==it.title){ setVal(t2,it.title); await sleep(600);} }
 P.status=it.id+': saving';
 const sd=await waitFor(()=>btn('Save as draft')||btn('Save changes'),10000); sd.__rc();
 await sleep(3500);
 return pid;
};
P.run=async function(){ if(P.running) return; P.running=true;
 while(P.q.length){ const it=P.q.shift(); try{ const pid=await one(it); P.done.push({id:it.id,pid}); }catch(e){ P.err.push({id:it.id,e:String(e),pid:it.pid}); } }
 P.running=false; P.status='idle'; };
})();
'pipeline loaded'
