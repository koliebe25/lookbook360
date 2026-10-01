"use strict";
const $ = (selector) => document.querySelector(selector);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const video = $("#look-video");
const dialog = $("#product-dialog");
const tags = [["도시적인", "카고", "올리브"], ["편안한", "와이드 핏", "베이지"], ["부드러운", "뉴트럴", "캐주얼"], ["가벼운", "활동적인", "일상"], ["주말", "핑크", "데님"], ["밝은", "겹쳐 입기", "아이보리"], ["아웃도어 무드", "레이어드", "올리브"]];
const summaries = ["간결한 블랙 톱과 볼륨 있는 카고 팬츠. 샌드 컬러 소품으로 완성한 도시의 일상.", "브라운 톱과 넉넉한 베이지 팬츠. 따뜻한 색으로 가볍게 맞춰 입는 하루.", "토프와 아이보리가 만나는 부드러운 조합. 토트백과 볼캡으로 더한 편안함.", "넉넉한 후디와 간결한 쇼츠. 가벼운 외출에도, 활동적인 하루에도.", "핑크 체크와 짙은 데님의 만남. 주말의 여유를 담은 부드러운 색감.", "밝은 색을 차분하게 겹쳐 입는 방식. 브라운 벨트로 더한 작은 포인트.", "올리브 베스트와 카고 팬츠의 조합. 아이보리와 브라운으로 이어지는 자연스러운 색감."];
const categoryOrder = {"아우터":0,"상의":1,"하의":2,"신발":3,"가방":4,"액세서리":5};
let currentIndex = -1;
let selectionVersion = 0;
let lastProductTrigger = null;
let lastProductScroll = {left:0,top:0};
let resumeAfterVisibility = false;
let userPaused = false;
const rotationSurface = $("#rotation-surface");
const ROTATION_SENSITIVITY = 1.55;
const SEEK_INTERVAL = 1000 / 30;
const rotation = {pointerId:null,active:false,startX:0,startY:0,startTime:0,width:1,duration:0,target:0,dirty:false,raf:0,lastSeek:-Infinity,wasPlaying:false,version:0};
function canRotate(){return !video.hidden && !video.error && video.readyState>=2 && Number.isFinite(video.duration) && video.duration>0;}
function wrapTime(time,duration){return ((time%duration)+duration)%duration;}
function updateRotationProgress(){
  const duration=video.duration;
  const time=rotation.active?rotation.target:video.currentTime;
  const percent=Number.isFinite(duration)&&duration>0?Math.min(100,Math.max(0,Math.round(time/duration*100))):0;
  rotationSurface.setAttribute("aria-valuenow",String(percent));
  rotationSurface.setAttribute("aria-valuetext",`영상의 ${percent}퍼센트 지점`);
  $("#rotation-progress").textContent=`${percent}%`;
}
function updateRotationAvailability(){const enabled=canRotate();rotationSurface.setAttribute("aria-disabled",String(!enabled));rotationSurface.tabIndex=enabled?0:-1;updateRotationProgress();}
function scheduleRotation(){if(!rotation.raf)rotation.raf=requestAnimationFrame(flushRotation);}
function flushRotation(now){
  rotation.raf=0;
  if(!rotation.active||rotation.version!==selectionVersion||!canRotate())return;
  // 포인터 이벤트는 최신 목표만 남기고, 디코더가 준비됐을 때 최대 초당 30회 반영합니다.
  if(rotation.dirty){
    if(now-rotation.lastSeek>=SEEK_INTERVAL&&!video.seeking){
      try{video.currentTime=rotation.target;rotation.lastSeek=now;rotation.dirty=false;}catch{finishRotation(false,false);return;}
    }
    if(rotation.dirty)scheduleRotation();
  }
}
function beginRotation(){
  rotation.active=true;rotation.wasPlaying=!video.paused;video.pause();
  rotationSurface.classList.add("is-dragging");rotationSurface.focus({preventScroll:true});
}
function setRotationTarget(x){
  rotation.target=wrapTime(rotation.startTime+(x-rotation.startX)/rotation.width*rotation.duration*ROTATION_SENSITIVITY,rotation.duration);
  rotation.dirty=true;updateRotationProgress();scheduleRotation();
}
function finishRotation(commit=true,restore=true){
  if(rotation.pointerId===null)return;
  const {pointerId,active,wasPlaying,version,target}=rotation;
  if(rotation.raf)cancelAnimationFrame(rotation.raf);
  rotation.raf=0;rotation.dirty=false;rotation.active=false;rotation.pointerId=null;
  rotationSurface.classList.remove("is-dragging");
  if(rotationSurface.hasPointerCapture(pointerId))rotationSurface.releasePointerCapture(pointerId);
  if(active&&version===selectionVersion){
    if(commit&&canRotate()){try{video.currentTime=target;}catch{/* 읽을 수 있는 마지막 장면 유지 */}}
    if(restore){userPaused=!wasPlaying;if(wasPlaying&&!document.hidden)playCurrent();}
  }
  updateRotationProgress();
}
rotationSurface.addEventListener("pointerdown",event=>{
  if(!event.isPrimary||event.button!==0||rotation.pointerId!==null||!canRotate())return;
  Object.assign(rotation,{pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,startTime:video.currentTime,target:video.currentTime,width:Math.max(1,rotationSurface.getBoundingClientRect().width),duration:video.duration,dirty:false,lastSeek:-Infinity,version:selectionVersion});
  rotationSurface.setPointerCapture(event.pointerId);
  if(event.pointerType!=="touch")beginRotation();
});
rotationSurface.addEventListener("pointermove",event=>{
  if(event.pointerId!==rotation.pointerId)return;
  if(!rotation.active){
    const dx=Math.abs(event.clientX-rotation.startX),dy=Math.abs(event.clientY-rotation.startY);
    if(Math.max(dx,dy)<6)return;
    if(dy>=dx){finishRotation(false,false);return;}
    beginRotation();
  }
  setRotationTarget(event.clientX);
});
rotationSurface.addEventListener("pointerup",event=>{if(event.pointerId!==rotation.pointerId)return;if(rotation.active)setRotationTarget(event.clientX);finishRotation();});
rotationSurface.addEventListener("pointercancel",event=>{if(event.pointerId===rotation.pointerId)finishRotation(false,true);});
rotationSurface.addEventListener("lostpointercapture",event=>{if(event.pointerId===rotation.pointerId)finishRotation();});
rotationSurface.addEventListener("keydown",event=>{
  if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key)||!canRotate())return;
  event.preventDefault();finishRotation(false,false);video.pause();userPaused=true;
  const step=event.shiftKey?video.duration/10:1/24;
  video.currentTime=event.key==="Home"?0:event.key==="End"?Math.max(0,video.duration-1/24):wrapTime(video.currentTime+(event.key==="ArrowRight"?step:-step),video.duration);
  updateRotationProgress();
});
window.addEventListener("blur",()=>finishRotation());
video.addEventListener("timeupdate",updateRotationProgress);
video.addEventListener("seeked",updateRotationProgress);
video.addEventListener("loadstart",updateRotationAvailability);
function initialIndex(){const requested = new URL(location.href).searchParams.get("look");const i=looks.findIndex(look=>look.id===requested);return i<0?0:i;}
function handleImageError(img){img.addEventListener("error",()=>{img.classList.add("image-missing");img.parentElement.setAttribute("data-image-unavailable","true");},{once:true});}
function makeNavigation(){
  looks.forEach((look,index)=>{
    const card=document.createElement("button");card.type="button";card.className="look-card";card.dataset.look=look.id;
    card.setAttribute("aria-label",`${look.id} ${look.nameKo} 룩 보기`);
    card.innerHTML=`<img src="${look.thumbnail}" alt="" width="47" height="59"><span><strong>${look.nameKo}</strong><small>룩 ${look.id}</small></span><span class="selected-mark" aria-hidden="true">·</span>`;
    handleImageError(card.querySelector("img"));card.addEventListener("click",()=>selectLook(index,"push"));
    $("#look-list").append(card);
  });
}
function safeProductUrl(value){try{const url=new URL(value);return /^https?:$/.test(url.protocol)?url.href:null;}catch{return null;}}
function showProduct(item,trigger){
  lastProductTrigger=trigger;
  lastProductScroll={left:window.scrollX,top:window.scrollY};
  $("#dialog-title").textContent=item.name;$("#dialog-category").textContent=item.category;$("#dialog-color").textContent=`컬러 · ${item.color}`;
  const image=$("#dialog-image");image.classList.remove("image-missing");image.src=item.image;image.alt=item.name;
  const url=safeProductUrl(item.detailUrl);$("#dialog-link").hidden=!url;$("#link-pending").hidden=!!url;
  if(url) $("#dialog-link").href=url;else $("#dialog-link").removeAttribute("href");
  document.body.classList.add("dialog-open");dialog.showModal();dialog.scrollTop=0;$("#close-dialog").focus({preventScroll:true});window.scrollTo({...lastProductScroll,behavior:"instant"});
}
function renderProducts(look){
  $("#product-list").replaceChildren();
  [...look.products].sort((a,b)=>categoryOrder[a.category]-categoryOrder[b.category]).forEach(item=>{
    const card=document.createElement("button");card.type="button";card.className="product-card";card.setAttribute("aria-label",`${item.name} 사진과 정보 보기`);card.setAttribute("aria-haspopup","dialog");
    card.innerHTML=`<img src="${item.image}" alt="${item.name}" width="98" height="112" loading="lazy"><span><span class="category">${item.category}</span><h3>${item.name}</h3><span class="color">${item.color}</span></span><span class="arrow" aria-hidden="true">↗</span>`;
    handleImageError(card.querySelector("img"));card.addEventListener("click",()=>showProduct(item,card));$("#product-list").append(card);
  });
  $("#product-count").textContent=String(look.products.length).padStart(2,"0");$("#mobile-product-count").textContent=look.products.length;
}
function selectLook(index,historyMode="replace"){
  if(index===currentIndex)return;
  finishRotation(false,false);
  currentIndex=(index+looks.length)%looks.length;const look=looks[currentIndex];selectionVersion++;userPaused=false;resumeAfterVisibility=false;
  $("#look-number").textContent=`룩 ${look.id}`;$("#look-name-en").textContent=look.name;$("#look-title").textContent=look.nameKo;$("#look-description").textContent=summaries[currentIndex];
  $("#look-tags").replaceChildren(...tags[currentIndex].map(tag=>{const el=document.createElement("li");el.textContent=tag;return el;}));
  $("#stage-count").textContent=`${look.id} / 07`;
  document.querySelectorAll(".look-card").forEach(card=>card.setAttribute("aria-pressed",String(card.dataset.look===look.id)));
  const selected=$(`.look-card[data-look="${look.id}"]`);const nav=$("#look-list");
  if(nav.scrollWidth>nav.clientWidth){nav.scrollTo({left:Math.max(0,selected.offsetLeft-nav.offsetLeft-(nav.clientWidth-selected.clientWidth)/2),behavior:reducedMotion.matches?"instant":"smooth"});}
  renderProducts(look);
  video.pause();video.hidden=false;$("#video-fallback").hidden=true;$("#fallback-image").src=look.thumbnail;
  video.poster=look.thumbnail;video.setAttribute("aria-label",`${look.nameKo} 착장 영상`);video.autoplay=!reducedMotion.matches;video.muted=true;video.src=look.video;video.load();
  updateRotationAvailability();
  $("#video-status").textContent=reducedMotion.matches?"재생 버튼을 누르면 움직이는 착장을 볼 수 있어요.":"영상 로딩 중에도 제품을 확인할 수 있어요.";
  if(historyMode!=="none") {const url=new URL(location.href);url.searchParams.set("look",look.id);try{history[historyMode==="push"?"pushState":"replaceState"]({look:look.id},"",url);}catch{/* 파일로 직접 열어도 탐색은 유지 */}}
  document.title=`${look.nameKo} · SANDEUL 룩북`;
  $("#announcement").textContent=`${look.nameKo}, 구성 제품 ${look.products.length}개`;
}
async function playCurrent(){const version=selectionVersion;try{await video.play();}catch(error){if(version===selectionVersion && error.name!=="AbortError")$("#video-status").textContent="재생 버튼을 누르면 움직이는 착장을 볼 수 있어요.";}}
video.addEventListener("loadeddata",()=>{if(video.readyState<2)return;updateRotationAvailability();$("#video-status").textContent=reducedMotion.matches?"재생 버튼을 누르면 움직이는 착장을 볼 수 있어요.":"";if(!rotation.active&&!reducedMotion.matches&&!document.hidden&&!userPaused)playCurrent();});
video.addEventListener("playing",()=>{$("#video-status").textContent="";userPaused=false;});
video.addEventListener("pause",()=>{if(!rotation.active&&!document.hidden&&video.readyState>=2)userPaused=true;});
video.addEventListener("error",()=>{if(!video.error)return;finishRotation(false,false);video.hidden=true;updateRotationAvailability();$("#video-fallback").hidden=false;$("#video-status").textContent="";});
$("#previous-look").addEventListener("click",()=>selectLook(currentIndex-1,"push"));
$("#next-look").addEventListener("click",()=>selectLook(currentIndex+1,"push"));
$("#look-list").addEventListener("keydown",event=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(event.key))return;event.preventDefault();let next=currentIndex;if(event.key==="Home")next=0;else if(event.key==="End")next=looks.length-1;else next+=["ArrowRight","ArrowDown"].includes(event.key)?1:-1;selectLook(next,"push");$(`.look-card[data-look="${looks[currentIndex].id}"]`).focus({preventScroll:true});});
$("#jump-products").addEventListener("click",()=>{$("#products").scrollIntoView({behavior:"instant",block:"start"});$("#products").focus({preventScroll:true});});
$("#close-dialog").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
dialog.addEventListener("close",()=>{document.body.classList.remove("dialog-open");lastProductTrigger?.focus({preventScroll:true});window.scrollTo({...lastProductScroll,behavior:"instant"});});
$("#dialog-image").addEventListener("error",()=>{$("#dialog-image").alt="제품 사진을 불러오지 못했습니다.";});
window.addEventListener("popstate",()=>{if(dialog.open)dialog.close();selectLook(initialIndex(),"none");});
document.addEventListener("visibilitychange",()=>{if(document.hidden){resumeAfterVisibility=rotation.active?rotation.wasPlaying:!video.paused;finishRotation(true,false);video.pause();}else if(resumeAfterVisibility&&!reducedMotion.matches&&!userPaused){resumeAfterVisibility=false;playCurrent();}});
reducedMotion.addEventListener("change",()=>{if(reducedMotion.matches){video.autoplay=false;video.pause();}});
makeNavigation();selectLook(initialIndex());
