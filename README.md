# 가배당 공식 홈페이지 최종 수정 패키지

2026-10-27 재검수본입니다. 이전 버전과의 비교·수정 내용·검증 범위는 `docs/QA.md`를 먼저 확인하세요.

`refinement.css`는 시안 정밀 보정 레이어입니다. `style.css` 다음에 로드하며 반드시 함께 업로드하세요.

첨부 PC·모바일 시안에 맞춰 제작한 HTML/CSS/JavaScript 정적 홈페이지입니다. 빌드나 npm 설치 없이 실행됩니다. 실제 운영정보와 접수 서비스 연결 전의 납품용 소스이며, 실제 접수·예약·결제가 활성화된 완성 운영 서비스는 아닙니다.

## 빠른 시작

1. ZIP을 해제합니다.
2. `index.html`을 열어 디자인을 확인합니다. 권장 검수 방법은 프로젝트 폴더에서 `python3 -m http.server 8080` 실행 후 `http://localhost:8080` 접속입니다.
3. `config.js`에 실제 고객사 정보를 입력합니다.
4. 아래 배포 절차에 따라 GitHub Pages에 올립니다.

## GitHub Pages 배포

- ZIP 자체가 아니라 **프로젝트 폴더 안의 파일**을 저장소 루트에 업로드합니다. 루트에 `index.html`, `style.css`, `app.js`, `config.js`, `assets/`가 있어야 합니다.
- 숨김 파일 `.nojekyll`도 포함합니다.
- 저장소 Settings → Pages → Deploy from a branch → main → /(root) → Save를 선택합니다.
- GitHub가 표시하는 배포 URL을 사용합니다. 조직 설정과 플랜에 따라 Pages 사용 조건이 다를 수 있습니다.
- 모든 내부 경로는 상대경로여서 `계정.github.io/저장소명/` 구조에서도 사용 가능합니다.
- 본 작업에서 실제 GitHub 저장소 업로드 및 공개 배포는 수행하지 않았습니다.
- 실서비스 도메인이 확정되면 `config.js`의 `siteUrl`을 입력하고 `node tools/prepare-seo.mjs https://계정.github.io/저장소명/`을 실행한 뒤 변경 파일과 `sitemap.xml`을 업로드합니다. 검색·공유 크롤러를 위해 정적 HTML에 절대 URL을 넣는 단계입니다. URL이 없는 기본 패키지의 OG 이미지는 상대경로입니다.

## 파일 구성

| 파일 | 역할 |
|---|---|
| index.html | 시안 기반 메인 |
| delivery.html | 배달 운영 및 플랫폼 안내 |
| bike.html | 바이크·용품·렌탈·정비 안내 |
| partners.html | 제휴 서비스 안내 |
| rider.html | 라이더 지원 안내 |
| merchant.html | 가맹점 상담 안내 |
| contact.html | 문의 폼 및 수집·이용 동의 |
| privacy.html | 고객사 검토용 개인정보처리방침 초안 |
| 404.html | 잘못된 주소 안내 |
| config.js | 연락처·회사 정보·접수 연결 설정 |
| app.js / style.css / refinement.css | 공통 기능 / 반응형 디자인 / 최종 시안 보정 |
| assets/ | 로고 SVG·사진 WebP |
| docs/ | 시안 분석·검수 기록·에셋 출처·연결 매뉴얼 |
| tools/prepare-seo.mjs | 배포 주소 확정 후 정적 SEO 생성 |

## 회사 정보 변경

`config.js`의 `company`에 legalName(법인/사업자명), ceo(대표자), registration(사업자등록번호), address(주소)를 입력합니다. `phone`에는 실제 대표번호, `kakaoUrl`에는 `https://pf.kakao.com/...` 형식의 공식 상담 채널 주소를 입력합니다. 빈 항목은 미연결 상태로 유지됩니다. 임의의 전화번호·주소·등록번호는 넣지 않았습니다.

실제 전화는 기기의 전화 앱을 열고, 카카오톡은 새 창으로 공식 채널을 엽니다. 데스크톱에서 전화 앱이 없는 경우 통화가 시작되지 않을 수 있습니다.

브랜드명과 본문은 각 HTML에서 변경합니다. 푸터와 헤더는 각 HTML에 포함되므로 공통 문구 수정 시 모든 페이지에 적용하세요. 스타일과 JavaScript는 공통 파일 한 곳에서 관리합니다.

## 문의 폼 연결

`docs/FORM-INTEGRATION.md`를 참고하세요. GitHub Pages에는 서버가 없으므로 외부 API/서버리스 함수가 필요합니다. 서버의 2xx 응답과 `{ "ok": true, "receiptId": "실제 접수번호" }`가 모두 확인될 때만 접수 완료를 표시합니다.

접수 활성화에는 endpoint, enabled:true, privacy.approved:true, controller, retention, contact가 모두 필요합니다. `privacy.html`의 위탁·국외이전·안전조치 등 본문을 운영 상황에 맞게 확정하고 승인 후 활성화하세요. 설정 플래그만 바꾸어 개인정보처리방침이 완성되는 것은 아닙니다.

## 납품 전 고객사 확인 사항

- 원본 로고 및 상표 사용 권한, 최종 대표 철학 문구 승인
- 대표번호, 카카오톡 채널, 법적 회사 정보
- 운영 지역·시간, 배달 수수료·정산 방식·지원 자격
- 배민·쿠팡 안내 범위와 제휴 여부
- 바이크 렌탈·정비 실제 제공 범위·가격
- 인터넷 가입·간병 서비스 실제 제공 여부와 계약 주체
- 개인정보처리방침, 수집 보유기간, 담당자, 외부 수탁자
- 접수 서버 구축과 실제 상담 수신 테스트

## 디자인과 검수 한계

시안의 구성·색상·사진 배치·모바일 카드 전환을 구현했습니다. 사진은 원본 분리 에셋이 없어 AI로 별도 제작했고 로고는 시안 모티프의 SVG 초안입니다. 서체는 기기 기본 한글 서체이므로 시안의 손글씨와 동일하지 않습니다. 정확한 동일성에는 고객사의 원본 로고·사진·라이선스가 확인된 폰트 파일이 필요합니다.

검수 결과와 실제 수행 범위는 `docs/QA.md`에 기재했습니다. 화면 크기 검사는 Chromium의 iframe CSS 뷰포트를 사용했으며 실제 단말·Safari·Firefox 및 브라우저 기본 확대/축소 검수는 미실시입니다.
