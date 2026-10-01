const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const output=path.resolve(__dirname,'../verification-rotation');
const url='http://127.0.0.1:4175/index-minimal.html';
const checks=[];
const errors=[];
const wrap=(t,d)=>((t%d)+d)%d;
async function ready(page){await page.waitForFunction(()=>document.querySelector('#rotation-surface').getAttribute('aria-disabled')==='false');}
async function setTime(page,time){await page.locator('video').evaluate((v,t)=>{v.pause();v.currentTime=t;},time);await page.waitForFunction(()=>!document.querySelector('video').seeking&&document.querySelector('video').paused);}
async function state(page){return page.locator('video').evaluate(v=>({time:v.currentTime,duration:v.duration,paused:v.paused}));}
async function mouseDrag(page,fraction){const r=await page.locator('#rotation-surface').boundingBox();const startX=r.x+r.width*.5,y=r.y+r.height*.5;await page.mouse.move(startX,y);await page.mouse.down();await page.mouse.move(startX+r.width*fraction,y,{steps:16});await page.mouse.up();await page.waitForFunction(()=>!document.querySelector('video').seeking);}
(async()=>{
  fs.mkdirSync(output,{recursive:true});
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
    await page.goto(url);await ready(page);
    for(const [fraction,time] of [[.2,1],[-.3,.2],[1.2,1]]){
      await setTime(page,time);const before=await state(page);await mouseDrag(page,fraction);const after=await state(page);
      assert.ok(Math.abs(after.time-wrap(before.time+fraction*before.duration*1.55,before.duration))<.06,JSON.stringify({fraction,before,after}));
      assert.ok(after.paused);
    }
    checks.push('마우스 좌우 드래그 거리 비례, 양 끝 순환, 영상 밖 포인터 캡처, 정지 상태 유지');
    await page.locator('video').evaluate(v=>v.play());await mouseDrag(page,.1);assert.ok(!(await state(page)).paused);
    checks.push('재생 중 시작한 드래그 종료 후 재생 복원');
    await setTime(page,1);
    const rect=await page.locator('#rotation-surface').boundingBox();await page.mouse.move(rect.x+rect.width/2,rect.y+100);await page.mouse.down();
    const batch=await page.evaluate(async()=>{
      const v=document.querySelector('video'),surface=document.querySelector('#rotation-surface');const before=v.currentTime;
      for(let i=1;i<=120;i++)surface.dispatchEvent(new PointerEvent('pointermove',{pointerId:rotation.pointerId,pointerType:'mouse',isPrimary:true,clientX:rotation.startX+i/2,clientY:rotation.startY,bubbles:true}));
      const sameBeforeFrame=v.currentTime===before;
      await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);
      return {sameBeforeFrame,changedAfterFrame:v.currentTime!==before,pendingFrames:rotation.raf?1:0};
    });
    assert.ok(batch.sameBeforeFrame&&batch.changedAfterFrame);await page.mouse.up();
    checks.push('동일 프레임의 120개 이동 입력을 합쳐 requestAnimationFrame에서 영상 위치 갱신');
    await setTime(page,1);await page.locator('#rotation-surface').focus();await page.keyboard.press('ArrowRight');
    assert.ok(Math.abs((await state(page)).time-(1+1/24))<.005);
    checks.push('키보드 방향키로 한 프레임 탐색');
    await page.mouse.move(rect.x+rect.width/2,rect.y+150);await page.mouse.down();await page.mouse.move(rect.x+rect.width*.8,rect.y+150);
    await page.locator('[data-look="02"]').evaluate(el=>el.click());await page.mouse.up();await ready(page);
    assert.ok(await page.evaluate(()=>rotation.pointerId===null&&!rotation.active&&!rotation.raf));
    assert.ok((await page.locator('video').getAttribute('src')).includes('02_02'));
    checks.push('드래그 중 룩 변경 시 이전 탐색과 예약 프레임 취소');
    for(let i=1;i<=7;i++){await page.locator(`[data-look="0${i}"]`).click();await ready(page);await setTime(page,1);await mouseDrag(page,.12);assert.ok((await state(page)).time>1.5);}
    checks.push('7개 룩 영상에서 드래그 탐색 확인');
    await page.locator('[data-look="01"]').click();await ready(page);await setTime(page,1.5);await page.screenshot({path:path.join(output,'desktop.png')});
    const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
    await mobile.goto(url);await ready(mobile);await setTime(mobile,1);
    const cdp=await mobile.context().newCDPSession(mobile);const box=await mobile.locator('#rotation-surface').boundingBox();
    const x=box.x+box.width*.35,y=box.y+box.height*.5;
    async function touch(type,x,y){await cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x,y,id:1,radiusX:2,radiusY:2}]});}
    const beforeTouch=await state(mobile);await touch('touchStart',x,y);
    for(let i=1;i<=12;i++)await touch('touchMove',x+box.width*.2*i/12,y);
    await touch('touchEnd');await mobile.waitForFunction(()=>!document.querySelector('video').seeking);
    const afterTouch=await state(mobile);assert.ok(Math.abs(afterTouch.time-wrap(beforeTouch.time+box.width*.2/box.width*beforeTouch.duration*1.55,beforeTouch.duration))<.06);
    assert.ok(afterTouch.paused);checks.push('390px 터치 가로 드래그의 거리 비례 탐색과 정지 상태 유지');
    await mobile.screenshot({path:path.join(output,'mobile.png')});
    await setTime(mobile,1);await touch('touchStart',x,y);for(let i=1;i<=12;i++)await touch('touchMove',x,y-140*i/12);await touch('touchEnd');
    await mobile.waitForFunction(()=>scrollY>20);
    assert.ok(Math.abs((await state(mobile)).time-1)<.01);assert.ok(await mobile.evaluate(()=>!rotation.active&&rotation.pointerId===null));
    checks.push('영상 위 세로 터치 스크롤 유지 및 회전 취소');
    await mobile.locator('#jump-products').tap();await mobile.locator('.product-card').first().tap();assert.ok(await mobile.locator('#product-dialog').isVisible());await mobile.locator('#close-dialog').tap();
    checks.push('모바일 제품 목록 이동과 제품 확대 유지');
    const failed=await browser.newPage();await failed.route('**/*_scrub.mp4',route=>route.abort());await failed.goto(url);await failed.locator('#video-fallback').waitFor({state:'visible'});assert.equal(await failed.locator('#rotation-surface').getAttribute('aria-disabled'),'true');await failed.close();
    checks.push('영상 실패 시 회전 영역 비활성화 및 대체 이미지 유지');
    assert.deepEqual(errors,[]);
    fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({date:'2026-10-01',checks,errors,browser:'Chrome / Playwright + CDP 터치 입력',physicalDeviceTest:false},null,2));
    console.log(JSON.stringify({checks,errors},null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
