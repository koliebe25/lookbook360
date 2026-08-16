const SHOP_URL = "https://shopping.naver.com/ns/home";

const looks = [
  {
    id: "01",
    name: "SANDEUL CORE",
    nameKo: "산들 코어",
    description:
      "블랙 크롭 톱과 올리브 카고 팬츠에 샌드 컬러 액세서리를 더한 대표 어반 유틸리티 룩. 간결한 상체와 볼륨감 있는 하의가 선명한 대비를 만듭니다.",
    keywords: ["URBAN", "UTILITY", "CARGO", "MONO TONE", "TECHNICAL"],
    thumbnail: "public/lookbook/thumbnails/01_01.webp",
    video: "public/lookbook/videos/01_02.mp4",
    duration: "00:06",
    products: [
      product("01_headband", "블랙 헤드밴드", "액세서리", "블랙"),
      product("01_top", "블랙 크롭 슬리브리스", "상의", "블랙"),
      product("01_pants", "올리브 카고 조거 팬츠", "하의", "올리브"),
      product("01_bag", "샌드 크로스백", "가방", "샌드 베이지"),
      product("01_boots", "아이보리 레이스업 부츠", "신발", "아이보리"),
    ],
  },
  {
    id: "02",
    name: "SAND CARGO",
    nameKo: "샌드 카고",
    description:
      "브라운 크롭 톱과 베이지 와이드 카고 팬츠를 조합한 따뜻하고 담백한 데일리 유틸리티 룩. 넓게 떨어지는 팬츠가 편안한 움직임을 강조합니다.",
    keywords: ["SAND", "EARTH TONE", "WIDE FIT", "CARGO", "MINIMAL"],
    thumbnail: "public/lookbook/thumbnails/02_01.webp",
    video: "public/lookbook/videos/02_02.mp4",
    duration: "00:06",
    products: [
      product("02_top", "브라운 크롭 탱크톱", "상의", "브라운"),
      product("02_pants", "베이지 와이드 카고 팬츠", "하의", "베이지"),
      product("02_sneakers", "화이트 로우톱 스니커즈", "신발", "화이트"),
    ],
  },
  {
    id: "03",
    name: "SOFT NEUTRAL",
    nameKo: "소프트 뉴트럴",
    description:
      "토프 니트와 아이보리 와이드 팬츠를 중심으로 부드러운 중성 색상을 겹친 시티 캐주얼 룩. 그래픽 토트백과 볼캡이 편안한 리듬을 더합니다.",
    keywords: ["NEUTRAL", "KNIT", "IVORY", "RELAXED", "CITY CASUAL"],
    thumbnail: "public/lookbook/thumbnails/03_01.webp",
    video: "public/lookbook/videos/03_02.mp4",
    duration: "00:08",
    products: [
      product("03_knit", "토프 반소매 니트 폴로", "상의", "토프"),
      product("03_pants", "아이보리 와이드 팬츠", "하의", "아이보리"),
      product("03_tote", "그래픽 캔버스 토트백", "가방", "아이보리"),
      product("03_cap", "아이보리 레터링 볼캡", "액세서리", "아이보리"),
      product("03_sneakers", "화이트 로우톱 스니커즈", "신발", "화이트"),
    ],
  },
  {
    id: "04",
    name: "ACTIVE EASE",
    nameKo: "액티브 이즈",
    description:
      "오트밀 오버핏 후디와 블랙 바이커 쇼츠를 조합한 가벼운 애슬레저 룩. 뉴트럴 액세서리로 운동과 일상의 경계를 편안하게 연결합니다.",
    keywords: ["ATHLEISURE", "HOODIE", "ACTIVE", "COMFORT", "NEUTRAL"],
    thumbnail: "public/lookbook/thumbnails/04_01.webp",
    video: "public/lookbook/videos/04_02.mp4",
    duration: "00:06",
    products: [
      product("04_hoodie", "오트밀 오버핏 후디", "상의", "오트밀"),
      product("04_shorts", "블랙 바이커 쇼츠", "하의", "블랙"),
      product("04_cap", "토프 볼캡", "액세서리", "토프"),
      product("04_tote", "아이보리 캔버스 토트백", "가방", "아이보리"),
      product("04_sneakers", "화이트 코트 스니커즈", "신발", "화이트"),
    ],
  },
  {
    id: "05",
    name: "BLUSH DENIM",
    nameKo: "블러시 데님",
    description:
      "블러시 핑크 체크 셔츠와 짙은 인디고 와이드 데님을 매치한 부드러운 위켄드 룩. 아이보리와 골드 액세서리가 밝고 단정한 인상을 완성합니다.",
    keywords: ["BLUSH", "CHECK", "DENIM", "WEEKEND", "FEMININE CASUAL"],
    thumbnail: "public/lookbook/thumbnails/05_01.webp",
    video: "public/lookbook/videos/05_02.mp4",
    duration: "00:06",
    products: [
      product("05_shirt", "블러시 체크 셔츠", "상의", "블러시 핑크"),
      product("05_tank", "아이보리 리브드 탱크톱", "상의", "아이보리"),
      product("05_denim", "인디고 와이드 데님", "하의", "인디고"),
      product("05_bag", "아이보리 크레센트 숄더백", "가방", "아이보리"),
      product("05_jewelry", "골드 미니멀 주얼리 세트", "액세서리", "골드"),
      product("05_sneakers", "아이보리 스니커즈", "신발", "아이보리"),
    ],
  },
  {
    id: "06",
    name: "IVORY WEEKEND",
    nameKo: "아이보리 위켄드",
    description:
      "아이보리 스트라이프 카디건과 화이트 와이드 팬츠로 톤을 맞춘 깨끗한 레이어드 룩. 브라운 벨트가 밝은 색조에 차분한 중심을 만듭니다.",
    keywords: ["IVORY", "TONE ON TONE", "CARDIGAN", "CLEAN", "WEEKEND"],
    thumbnail: "public/lookbook/thumbnails/06_01.webp",
    video: "public/lookbook/videos/06_02.mp4",
    duration: "00:06",
    products: [
      product("06_cardigan", "아이보리 스트라이프 카디건", "상의", "아이보리"),
      product("06_tank", "아이보리 리브드 탱크톱", "상의", "아이보리"),
      product("06_pants", "화이트 와이드 팬츠", "하의", "화이트"),
      product("06_belt", "브라운 벨트", "액세서리", "브라운"),
      product("06_cap", "화이트 볼캡", "액세서리", "화이트"),
      product("06_sneakers", "화이트 코트 스니커즈", "신발", "화이트"),
    ],
  },
  {
    id: "07",
    name: "FIELD LAYER",
    nameKo: "필드 레이어",
    description:
      "올리브 퀼팅 베스트와 카고 팬츠에 브라운 워크 부츠를 더한 필드 유틸리티 룩. 아이보리 티셔츠가 묵직한 올리브 톤 사이에 밝은 균형을 만듭니다.",
    keywords: ["FIELD", "LAYER", "OLIVE", "QUILTED", "WORKWEAR"],
    thumbnail: "public/lookbook/thumbnails/07_01.webp",
    video: "public/lookbook/videos/07_02.mp4",
    duration: "00:06",
    products: [
      product("07_vest", "올리브 퀼팅 베스트", "아우터", "올리브"),
      product("07_tee", "아이보리 긴소매 티셔츠", "상의", "아이보리"),
      product("07_pants", "올리브 카고 팬츠", "하의", "올리브"),
      product("07_beanie", "올리브 니트 비니", "액세서리", "올리브"),
      product("07_boots", "브라운 워크 부츠", "신발", "브라운"),
    ],
  },
];

function product(id, name, category, color) {
  return {
    id,
    name,
    category,
    color,
    image: `public/lookbook/products/cards/${id}.webp`,
    detailUrl: SHOP_URL,
  };
}

const elements = {
  desktopLookList: document.querySelector("#desktop-look-list"),
  mobileLookList: document.querySelector("#mobile-look-list"),
  videoFrame: document.querySelector(".video-frame"),
  video: document.querySelector("#look-video"),
  scrubSurface: document.querySelector("#scrub-surface"),
  scrubReadout: document.querySelector("#scrub-readout"),
  videoFallback: document.querySelector("#video-fallback"),
  fallbackImage: document.querySelector("#fallback-image"),
  videoNumber: document.querySelector("#video-number"),
  videoDuration: document.querySelector("#video-duration"),
  lookNumber: document.querySelector("#look-number"),
  lookNameKo: document.querySelector("#look-name-ko"),
  lookTitle: document.querySelector("#look-title"),
  lookDescription: document.querySelector("#look-description"),
  lookKeywords: document.querySelector("#look-keywords"),
  railPosition: document.querySelector("#rail-position"),
  mobilePosition: document.querySelector("#mobile-position"),
  previousLook: document.querySelector("#previous-look"),
  nextLook: document.querySelector("#next-look"),
  desktopProductCount: document.querySelector("#desktop-product-count"),
  desktopProductList: document.querySelector("#desktop-product-list"),
  mobileProductCount: document.querySelector("#mobile-product-count"),
  openProducts: document.querySelector("#open-products"),
  productSheet: document.querySelector("#product-sheet"),
  closeProducts: document.querySelector("#close-products"),
  sheetSubtitle: document.querySelector("#sheet-subtitle"),
  sheetProductList: document.querySelector("#sheet-product-list"),
  shareButtons: document.querySelectorAll(".share-button"),
  toast: document.querySelector("#toast"),
};

let currentIndex = getInitialIndex();
let toastTimer;
const scrubState = {
  active: false,
  pointerId: null,
  startX: 0,
  startTime: 0,
  pendingTime: 0,
  duration: 0,
  wasPlaying: false,
  animationFrameId: 0,
};

let themeSampleId = 0;

function getInitialIndex() {
  const requested = new URL(window.location.href).searchParams.get("look");
  const index = looks.findIndex((look) => look.id === requested);
  return index >= 0 ? index : 0;
}

function createLookCard(look, mobile = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "look-card";
  button.dataset.lookId = look.id;
  button.setAttribute("aria-label", `${look.id} ${look.nameKo} 룩 보기`);
  button.innerHTML = `
    <img src="${look.thumbnail}" alt="" width="156" height="208" ${look.id === "01" ? "" : 'loading="lazy"'} />
    <span class="look-card-copy">
      <strong>${look.name}</strong>
      <span>${look.nameKo}</span>
    </span>
    <span class="look-card-number" aria-hidden="true">${look.id}</span>
  `;
  button.addEventListener("click", () => selectLookById(look.id, true, mobile));
  return button;
}

function renderNavigation() {
  const desktopFragment = document.createDocumentFragment();
  const mobileFragment = document.createDocumentFragment();
  looks.forEach((look) => {
    desktopFragment.append(createLookCard(look));
    mobileFragment.append(createLookCard(look, true));
  });
  elements.desktopLookList.append(desktopFragment);
  elements.mobileLookList.append(mobileFragment);
}

function createProductCard(item) {
  const link = document.createElement("a");
  link.className = "product-card";
  link.href = item.detailUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `${item.name} 제품 페이지로 이동`);
  link.innerHTML = `
    <img src="${item.image}" alt="${item.name}" width="600" height="750" loading="lazy" />
    <div class="product-card-copy">
      <span class="product-category">${item.category}</span>
      <h3>${item.name}</h3>
      <p class="product-color">COLOR · ${item.color}</p>
      <span class="product-link">
        제품 자세히 보기 <span aria-hidden="true">↗</span>
      </span>
    </div>
  `;
  return link;
}

function mixColor(source, target, targetWeight) {
  return source.map((channel, index) =>
    Math.round(channel * (1 - targetWeight) + target[index] * targetWeight),
  );
}

function toRgbChannels(color) {
  return color.join(" ");
}

function applyVideoTone(color) {
  const paper = mixColor(color, [255, 255, 255], 0.08);
  const surface = mixColor(color, [255, 255, 255], 0.7);
  const line = mixColor(color, [63, 65, 59], 0.2);
  const muted = mixColor(color, [49, 52, 47], 0.58);
  const rootStyle = document.documentElement.style;

  rootStyle.setProperty("--video-tone-rgb", toRgbChannels(color));
  rootStyle.setProperty("--paper-rgb", toRgbChannels(paper));
  rootStyle.setProperty("--surface-rgb", toRgbChannels(surface));
  rootStyle.setProperty("--paper", `rgb(${toRgbChannels(paper)})`);
  rootStyle.setProperty("--surface", `rgb(${toRgbChannels(surface)})`);
  rootStyle.setProperty("--line", `rgb(${toRgbChannels(line)})`);
  rootStyle.setProperty("--muted", `rgb(${toRgbChannels(muted)})`);
}

function median(values) {
  values.sort((a, b) => a - b);
  return values[Math.floor(values.length / 2)];
}

function sampleVideoTone() {
  const video = elements.video;
  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !video.videoWidth || !video.videoHeight) return;

  const sampleId = ++themeSampleId;
  const canvas = document.createElement("canvas");
  canvas.width = 72;
  canvas.height = Math.max(72, Math.round((video.videoHeight / video.videoWidth) * canvas.width));
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return;

  try {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const red = [];
    const green = [];
    const blue = [];
    const edgeX = Math.max(4, Math.round(canvas.width * 0.12));
    const edgeY = Math.max(4, Math.round(canvas.height * 0.06));

    for (let y = 0; y < canvas.height; y += 2) {
      for (let x = 0; x < canvas.width; x += 2) {
        const isEdge = x < edgeX || x >= canvas.width - edgeX || y < edgeY;
        if (!isEdge) continue;
        const offset = (y * canvas.width + x) * 4;
        red.push(pixels[offset]);
        green.push(pixels[offset + 1]);
        blue.push(pixels[offset + 2]);
      }
    }

    if (sampleId === themeSampleId && red.length) {
      applyVideoTone([median(red), median(green), median(blue)]);
    }
  } catch (error) {
    // 영상 픽셀 읽기가 제한되면 현재 중립 테마를 유지한다.
  }
}

function renderProducts(look) {
  elements.desktopProductList.replaceChildren();
  elements.sheetProductList.replaceChildren();
  look.products.forEach((item) => {
    elements.desktopProductList.append(createProductCard(item));
    elements.sheetProductList.append(createProductCard(item));
  });
  elements.desktopProductCount.textContent = `${look.products.length} ITEMS`;
  elements.mobileProductCount.textContent = String(look.products.length);
  elements.sheetSubtitle.textContent = `${look.nameKo} · ${look.products.length}개 제품`;
}

function updateNavigation(look, scrollMobile) {
  document.querySelectorAll(".look-card").forEach((card) => {
    const selected = card.dataset.lookId === look.id;
    card.setAttribute("aria-current", selected ? "true" : "false");
    card.setAttribute("aria-pressed", String(selected));
  });
  const position = `${look.id} / ${String(looks.length).padStart(2, "0")}`;
  elements.railPosition.textContent = position;
  elements.mobilePosition.textContent = position;
  if (scrollMobile) {
    elements.mobileLookList
      .querySelector(`[data-look-id="${look.id}"]`)
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
}

function updateVideo(look) {
  cancelScrub(false, false);
  elements.videoFrame.classList.add("is-switching");
  elements.videoFallback.hidden = true;
  elements.video.hidden = false;
  elements.video.pause();
  elements.video.poster = look.thumbnail;
  elements.video.src = look.video;
  elements.video.setAttribute("aria-label", `${look.nameKo} 착장 영상`);
  elements.fallbackImage.src = look.thumbnail;
  elements.fallbackImage.alt = `${look.nameKo} 룩 이미지`;
  elements.video.load();
  const playAttempt = elements.video.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(() => {
      // 자동 재생이 차단된 경우 브라우저 기본 재생 버튼으로 시작할 수 있다.
    });
  }
}

function updateUrl(look) {
  const url = new URL(window.location.href);
  url.searchParams.set("look", look.id);
  window.history.replaceState({ look: look.id }, "", url);
}

function updateLookCopy(look) {
  elements.videoNumber.textContent = look.id;
  elements.videoDuration.textContent = look.duration;
  elements.lookNumber.textContent = `No.${look.id}`;
  elements.lookNameKo.textContent = look.nameKo;
  elements.lookTitle.textContent = look.name;
  elements.lookDescription.textContent = look.description;
  elements.lookKeywords.replaceChildren(
    ...look.keywords.map((keyword) => {
      const item = document.createElement("li");
      item.textContent = keyword;
      return item;
    }),
  );
  document.title = `SANDEUL LOOKBOOK — ${look.name}`;
}

function selectLook(index, updateHistory = true, scrollMobile = false) {
  currentIndex = (index + looks.length) % looks.length;
  const look = looks[currentIndex];
  updateNavigation(look, scrollMobile);
  updateLookCopy(look);
  renderProducts(look);
  updateVideo(look);
  if (updateHistory) updateUrl(look);
}

function selectLookById(id, updateHistory = true, scrollMobile = false) {
  const index = looks.findIndex((look) => look.id === id);
  selectLook(index >= 0 ? index : 0, updateHistory, scrollMobile);
}

function showVideoFallback() {
  cancelScrub(false, false);
  elements.video.hidden = true;
  elements.videoFallback.hidden = false;
  elements.videoFrame.classList.remove("is-switching");
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2400);
}

async function shareCurrentLook() {
  const look = looks[currentIndex];
  const shareData = {
    title: `SANDEUL LOOKBOOK — ${look.name}`,
    text: `${look.nameKo} 룩을 감상해 보세요.`,
    url: window.location.href,
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(shareData.url);
    showToast("현재 룩의 링크를 복사했습니다.");
  } catch (error) {
    if (error?.name !== "AbortError") {
      showToast("링크를 복사하지 못했습니다. 주소창의 URL을 이용해 주세요.");
    }
  }
}

function openProductSheet() {
  if (typeof elements.productSheet.showModal === "function") {
    elements.productSheet.showModal();
    document.body.classList.add("sheet-open");
    elements.closeProducts.focus();
  }
}

function closeProductSheet() {
  if (elements.productSheet.open) elements.productSheet.close();
}

function normalizeScrubTime(time, duration) {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  return ((time % duration) + duration) % duration;
}

function updateScrubReadout(time = elements.video.currentTime) {
  const duration = elements.video.duration;
  const percent = Number.isFinite(duration) && duration > 0 ? Math.round((time / duration) * 100) : 0;
  const boundedPercent = Math.min(100, Math.max(0, percent));
  elements.scrubReadout.value = `${boundedPercent}%`;
  elements.scrubReadout.textContent = `${boundedPercent}%`;
  elements.scrubSurface.setAttribute("aria-valuenow", String(boundedPercent));
  elements.scrubSurface.setAttribute("aria-valuetext", `영상의 ${boundedPercent}퍼센트 지점`);
}

function applyPendingScrubTime() {
  scrubState.animationFrameId = 0;
  if (!Number.isFinite(scrubState.pendingTime)) return;
  if (Math.abs(elements.video.currentTime - scrubState.pendingTime) > 1 / 120) {
    elements.video.currentTime = scrubState.pendingTime;
  }
  updateScrubReadout(scrubState.pendingTime);
}

function scheduleScrubFrame(time) {
  scrubState.pendingTime = time;
  if (scrubState.animationFrameId) return;
  scrubState.animationFrameId = window.requestAnimationFrame(applyPendingScrubTime);
}

function beginScrub(event) {
  if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
  const duration = elements.video.duration;
  if (!Number.isFinite(duration) || duration <= 0 || !elements.videoFallback.hidden) return;

  scrubState.active = true;
  scrubState.pointerId = event.pointerId;
  scrubState.startX = event.clientX;
  scrubState.startTime = elements.video.currentTime;
  scrubState.pendingTime = elements.video.currentTime;
  scrubState.duration = duration;
  scrubState.wasPlaying = !elements.video.paused;
  elements.video.pause();
  elements.videoFrame.classList.add("is-scrubbing");
  elements.scrubSurface.setPointerCapture(event.pointerId);
  updateScrubReadout();
}

function moveScrub(event) {
  if (!scrubState.active || event.pointerId !== scrubState.pointerId) return;
  const dragWidth = Math.max(elements.scrubSurface.clientWidth, 1);
  const distance = event.clientX - scrubState.startX;
  const targetTime = normalizeScrubTime(
    scrubState.startTime + (distance / dragWidth) * scrubState.duration,
    scrubState.duration,
  );
  scheduleScrubFrame(targetTime);
  if (event.cancelable) event.preventDefault();
}

function cancelScrub(resumePlayback = true, applyFinalFrame = true) {
  if (!scrubState.active && !scrubState.animationFrameId) return;
  const shouldResume = resumePlayback && scrubState.wasPlaying;
  scrubState.active = false;
  scrubState.pointerId = null;
  elements.videoFrame.classList.remove("is-scrubbing");

  if (scrubState.animationFrameId) {
    window.cancelAnimationFrame(scrubState.animationFrameId);
    scrubState.animationFrameId = 0;
  }

  if (!applyFinalFrame) {
    scrubState.pendingTime = 0;
    return;
  }

  scrubState.animationFrameId = window.requestAnimationFrame(() => {
    applyPendingScrubTime();
    if (shouldResume && elements.videoFallback.hidden) {
      elements.video.play().catch(() => {});
    }
  });
}

function endScrub(event) {
  if (!scrubState.active || event.pointerId !== scrubState.pointerId) return;
  const pointerId = event.pointerId;
  cancelScrub(true);
  if (elements.scrubSurface.hasPointerCapture(pointerId)) {
    elements.scrubSurface.releasePointerCapture(pointerId);
  }
}

function scrubWithKeyboard(event) {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  const duration = elements.video.duration;
  if (!Number.isFinite(duration) || duration <= 0) return;
  event.preventDefault();
  event.stopPropagation();
  const frameStep = 1 / 24;
  const step = event.shiftKey ? frameStep * 12 : frameStep;
  const direction = event.key === "ArrowRight" ? 1 : -1;
  elements.video.pause();
  scheduleScrubFrame(normalizeScrubTime(elements.video.currentTime + direction * step, duration));
}

renderNavigation();
selectLook(currentIndex, true, false);

elements.video.addEventListener("loadeddata", () => {
  elements.videoFrame.classList.remove("is-switching");
  updateScrubReadout();
  window.requestAnimationFrame(sampleVideoTone);
});
elements.video.addEventListener("error", showVideoFallback);
elements.video.addEventListener("timeupdate", () => {
  if (!scrubState.active) updateScrubReadout();
});
elements.scrubSurface.addEventListener("pointerdown", beginScrub);
elements.scrubSurface.addEventListener("pointermove", moveScrub);
elements.scrubSurface.addEventListener("pointerup", endScrub);
elements.scrubSurface.addEventListener("pointercancel", endScrub);
elements.scrubSurface.addEventListener("lostpointercapture", endScrub);
elements.scrubSurface.addEventListener("keydown", scrubWithKeyboard);
elements.previousLook.addEventListener("click", () => selectLook(currentIndex - 1, true, true));
elements.nextLook.addEventListener("click", () => selectLook(currentIndex + 1, true, true));
elements.openProducts.addEventListener("click", openProductSheet);
elements.closeProducts.addEventListener("click", closeProductSheet);
elements.productSheet.addEventListener("close", () => {
  document.body.classList.remove("sheet-open");
  elements.openProducts.focus();
});
elements.productSheet.addEventListener("click", (event) => {
  if (event.target === elements.productSheet) closeProductSheet();
});
elements.shareButtons.forEach((button) => button.addEventListener("click", shareCurrentLook));

window.addEventListener("keydown", (event) => {
  if (elements.productSheet.open || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "ArrowLeft") selectLook(currentIndex - 1, true, true);
  if (event.key === "ArrowRight") selectLook(currentIndex + 1, true, true);
});

window.addEventListener("popstate", () => {
  const requested = new URL(window.location.href).searchParams.get("look");
  selectLookById(requested, false, true);
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    elements.video.pause();
  } else if (!elements.videoFallback.hidden) {
    return;
  } else {
    elements.video.play().catch(() => {});
  }
});
