(function(){
HTMLElement.prototype.__rc=function(){const r=this.getBoundingClientRect();const o={bubbles:true,cancelable:true,clientX:r.x+r.width/2,clientY:r.y+r.height/2,pointerId:1,pointerType:'mouse',button:0,view:window};for(const t of ['pointerover','pointerenter','mouseover','pointerdown','mousedown','pointerup','mouseup']) this.dispatchEvent(t.startsWith('pointer')?new PointerEvent(t,o):new MouseEvent(t,o)); HTMLElement.prototype.click.call(this);};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const vis=e=>e&&e.offsetParent!==null;
async function waitFor(fn,ms=30000){const t0=Date.now();while(Date.now()-t0<ms){let v;try{v=fn()}catch(e){};if(v)return v;await sleep(400);}return null;}
async function pngFile(b64,name,W=6050,H=7200){const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));const svg=await new Response(new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'))).text();const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const img=new Image();await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=url;});const c=document.createElement('canvas');c.width=W;c.height=H;c.getContext('2d').drawImage(img,0,0,W,H);const blob=await new Promise(r=>c.toBlob(r,'image/png'));return new File([blob],name+'.png',{type:'image/png'});}
window.__swapHere=async function(code,etsy){
 const log=s=>{localStorage.__swlog=code+': '+s;};
 try{
 log('fetch');
 const it=await (await fetch('https://raw.githubusercontent.com/andrewshanti/wrap-designs/23526267d047354137af292c93873c3913b5215b/items/'+code+'.json')).json();
 const file=await pngFile(it.b64,it.file);
 log('wait layer');
 await waitFor(()=>[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()==='Save product'),60000); await sleep(3000);
 if(![...document.querySelectorAll('button')].some(b=>vis(b)&&b.textContent.trim()==='delete')){const t=[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()==='design_services'); if(t){t.__rc(); await sleep(2000);}}
 const del=await waitFor(()=>document.body.innerText.includes(it.file.slice(0,14))&&[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()==='delete'),60000); if(!del) throw 'no layer';
 await sleep(1500); del.__rc(); await sleep(2000);
 if(document.body.innerText.includes(it.file.slice(0,14))) throw 'layer not deleted';
 let inp=document.querySelector('input[type=file][data-testid=filePicker]');
 for(let i=0;i<4&&!inp;i++){const lb=[...document.querySelectorAll('pfy-left-bar-button')].find(e=>e.textContent.trim()==='Upload');(lb.querySelector('button')||lb).__rc();await sleep(1500);inp=document.querySelector('input[type=file][data-testid=filePicker]');}
 if(!inp) throw 'no file input';
 log('upload');
 const dt=new DataTransfer(); dt.items.add(file); inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true}));
 const sv=await waitFor(()=>{const b=[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()==='Save product');return b&&!b.disabled&&document.body.innerText.includes(it.file.slice(0,14))&&[...document.querySelectorAll('button')].some(x=>vis(x)&&x.textContent.trim()==='Position')?b:null;},300000);
 if(!sv) throw 'upload not placed';
 await sleep(2500); log('save'); sv.__rc();
 await waitFor(()=>/mockup-library|product-details/.test(location.href),120000);
 if(/mockup-library/.test(location.href)){const ss=await waitFor(()=>[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()==='Save selection'),30000); await sleep(1500); ss.__rc(); await waitFor(()=>/product-details/.test(location.href),60000);}
 if(!/product-details/.test(location.href)) throw 'not on details';
 await sleep(4000); await waitFor(()=>!document.body.innerText.includes('Loading mockups')&&document.querySelectorAll('pfa-mockup-radio-item').length>3&&!/\b0 mockups selected/.test(document.body.innerText),90000); await sleep(4000);
 let res='saved';
 if(etsy){ log('publish'); if(typeof window.__etsyImg!=='function') (0,eval)(await (await fetch('https://raw.githubusercontent.com/andrewshanti/wrap-designs/44ff03db50960b924717e11dad1d70552a8beef2/etsyimg.js')).text()); res=await window.__etsyImg(true); if(/err/.test(res)){await sleep(15000); res=await window.__etsyImg(true);} }
 log('DONE '+res);
 }catch(e){log('ERR '+e);}
};
})();
window.__shopPub=async function(){
 const sleep=ms=>new Promise(r=>setTimeout(r,ms)); const vis=e=>e&&e.offsetParent!==null;
 let t0=Date.now(); while(Date.now()-t0<25000&&!document.body.innerText.match(/[1-9]\d*\/\d+ mockups selected/)) await sleep(800);
 await sleep(2500);
 const pb=[...document.querySelectorAll('button')].find(b=>vis(b)&&b.textContent.trim()==='Publish'); if(!pb||pb.disabled) return 'no publish';
 pb.__rc(); let c=null; for(let j=0;j<20&&!c;j++){await sleep(500); c=[...document.querySelectorAll('.cdk-overlay-pane button')].find(b=>vis(b)&&b.textContent.trim()==='Confirm');}
 if(!c) return 'no confirm'; c.__rc(); await sleep(3000); return 'published';
};
