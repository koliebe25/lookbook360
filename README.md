# SANDEUL LOOKBOOK

7개의 착장 영상을 감상하고 각 룩의 구성 제품을 확인하는 모바일 우선 정적 웹앱입니다.

## 운영 주소

- Vercel: https://lookbook360.vercel.app

## 로컬 실행

PowerShell에서 현재 폴더로 이동한 뒤 다음 명령을 실행합니다.

```powershell
python -m http.server 4173
```

브라우저에서 `http://localhost:4173`을 엽니다.

## 주요 파일

- `index.html`: 화면 구조
- `styles.css`: 반응형 레이아웃과 디자인
- `app.js`: 7개 룩 데이터와 상호작용
- `public/lookbook/thumbnails/`: 룩 WebP 썸네일
- `public/lookbook/products/cards/`: 제품 카드 WebP 이미지
- `public/lookbook/videos/`: 원본 사본과 빠른 드래그 탐색용 `*_scrub.mp4`
- `public/lookbook/brand/`: 투명 WebP 로고
- `scripts/prepare_app_assets.py`: 제품 카드·로고·영상 준비 스크립트

## 현재 MVP 제한

- 제품 상세 주소는 교육용 테스트를 위해 네이버 쇼핑 홈으로 통일되어 있습니다.
- 가격과 소재는 확인된 정보가 없어 표시하지 않습니다.
- 로그인, 저장, 장바구니, 제품 추가 기능은 포함하지 않습니다.
