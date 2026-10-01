const looks = [
  {
    id: "01",
    name: "SANDEUL CORE",
    nameKo: "산들 코어",
    description:
      "블랙 크롭 톱과 올리브 카고 팬츠에 샌드 컬러 액세서리를 더한 대표 어반 유틸리티 룩. 간결한 상체와 볼륨감 있는 하의가 선명한 대비를 만듭니다.",
    keywords: ["URBAN", "UTILITY", "CARGO", "MONO TONE", "TECHNICAL"],
    thumbnail: "public/lookbook/thumbnails/01_01.webp",
    video: "public/lookbook/videos/01_02_scrub.mp4",
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
    video: "public/lookbook/videos/02_02_scrub.mp4",
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
    video: "public/lookbook/videos/03_02_scrub.mp4",
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
    video: "public/lookbook/videos/04_02_scrub.mp4",
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
    video: "public/lookbook/videos/05_02_scrub.mp4",
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
    video: "public/lookbook/videos/06_02_scrub.mp4",
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
    video: "public/lookbook/videos/07_02_scrub.mp4",
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
    detailUrl: null,
  };
}
