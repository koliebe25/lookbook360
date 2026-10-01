const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'verification-minimal');
const base='http://127.0.0.1:4175/index-minimal.html';
(async()=>{
  fs.mkdirSync(out,{recursive:true});
  const data=vm.runInNewContext(fs.readFileSync(path.join(root,'lookbook-minimal-data.js'),'utf8')+';looks;');
  const assets=data.flatMap(l=>[l.thumbnail,l.video,...l.products.map(p=>p.image)]);
  assets.forEach(asset=>assert.ok(fs.existsSync(path.join(root,asset)),asset));
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const errors=[];const checks=[];
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000}});
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base);
    assert.equal(await page.locator('.look-card').count(),7);
    for(const look of data){
      await page.locator(`[data-look="${look.id}"]`).click();
      await page.waitForFunction(()=>document.querySelector('#look-video').readyState>=2);
      assert.equal(await page.locator('#look-title').textContent(),look.nameKo);
      assert.equal(await page.locator('.product-card').count(),look.products.length);
      assert.ok(new URL(page.url()).searchParams.get('look')===look.id);
      assert.ok(await page.locator('#look-video').evaluate(v=>v.videoWidth>0&&!v.error));
    }
    checks.push('7개 룩의 영상 디코딩, 제목, 제품 수, URL 동기화');
    await page.locator('[data-look="01"]').click();
    await page.locator('[data-look="02"]').click();
    await page.goBack();assert.equal(await page.locator('#look-title').textContent(),data[0].nameKo);
    await page.reload();assert.equal(await page.locator('#look-title').textContent(),data[0].nameKo);
    checks.push('브라우저 뒤로가기 및 새로고침 상태 유지');
    await page.locator('[data-look="01"]').focus();await page.keyboard.press('End');
    assert.equal(await page.locator('#look-title').textContent(),data[6].nameKo);
    await page.keyboard.press('Home');assert.equal(await page.locator('#look-title').textContent(),data[0].nameKo);
    checks.push('키보드 Home/End 룩 선택');
    await page.locator('.product-card').first().click();assert.ok(await page.locator('#product-dialog').isVisible());
    assert.ok(await page.locator('#dialog-link').isHidden());
    await page.screenshot({path:path.join(out,'product-desktop.png')});
    await page.keyboard.press('Escape');assert.ok(await page.locator('#product-dialog').isHidden());
    assert.ok(await page.locator('.product-card').first().evaluate(el=>el===document.activeElement));
    checks.push('제품 확대, 미확정 판매 링크 숨김, ESC 닫기 및 포커스 복원');
    await page.waitForFunction(()=>document.querySelector('#look-video').readyState>=2);
    await page.locator('#look-video').evaluate(v=>v.pause());
    await page.screenshot({path:path.join(out,'desktop.png'),fullPage:true});
    for(const width of [768,390,320]){
      const mobile=await browser.newPage({viewport:{width,height:844},isMobile:width<700,hasTouch:width<700});
      mobile.on('pageerror',e=>errors.push(e.message));
      await mobile.goto(base+'?look=03');
      await mobile.waitForFunction(()=>document.querySelector('#look-video').readyState>=2);
      assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));
      assert.equal(await mobile.locator('#look-video').evaluate(v=>getComputedStyle(v).objectFit),'contain');
      if(width===390)await mobile.screenshot({path:path.join(out,'mobile.png')});
      if(width<700){
        await mobile.locator('#jump-products').tap();
        await mobile.waitForFunction(()=>document.activeElement?.id==='products' && Math.abs(document.querySelector('#products').getBoundingClientRect().top-22)<3);
        const savedScroll=await mobile.evaluate(()=>window.scrollY);
        await mobile.locator('.product-card').first().tap();
        assert.ok(await mobile.locator('#product-dialog').isVisible());
        if(width===390)await mobile.screenshot({path:path.join(out,'product-mobile.png')});
        await mobile.locator('#close-dialog').tap();
        assert.ok(Math.abs(await mobile.evaluate(()=>window.scrollY)-savedScroll)<5,'제품 확대를 닫은 뒤 읽던 위치 유지');
        if(width===390)await mobile.screenshot({path:path.join(out,'mobile-products.png')});
      }else{await mobile.screenshot({path:path.join(out,'tablet.png')});}
      await mobile.close();checks.push(`${width}px 화면 넘침 없음, 전신 비율 유지${width<700?', 제품 이동 및 확대':''}`);
    }
    const reduced=await browser.newPage({reducedMotion:'reduce'});
    await reduced.goto(base+'?look=wrong');assert.ok(reduced.url().endsWith('look=01'));
    await reduced.waitForFunction(()=>document.querySelector('#look-video').readyState>=2);
    assert.ok(await reduced.locator('#look-video').evaluate(v=>v.paused&&!v.autoplay));
    await reduced.close();checks.push('잘못된 룩 번호 복구 및 동작 감소 설정 시 자동재생 정지');
    const failed=await browser.newPage();
    await failed.route('**/*_scrub.mp4',route=>route.abort());
    await failed.goto(base);await failed.locator('#video-fallback').waitFor({state:'visible'});
    assert.equal(await failed.locator('.product-card').count(),5);
    await failed.locator('.product-card').first().click();assert.ok(await failed.locator('#product-dialog').isVisible());
    await failed.close();checks.push('영상 요청 실패 시 이미지 대체 및 제품 탐색 유지');
    assert.deepEqual(errors,[]);checks.push('브라우저 자바스크립트 오류 0건');
    const report={checkedAt:new Date().toISOString(),browser:'로컬 Chrome / Playwright',assetCount:assets.length,checks,errors,realMobileDeviceTest:false,publicDeployment:false};
    fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
