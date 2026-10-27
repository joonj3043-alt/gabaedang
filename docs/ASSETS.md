# 에셋 출처와 교체

사진 6개는 본 프로젝트에서 내장 이미지 생성 도구로 새로 생성한 이미지입니다. 타사 웹사이트 사진이나 상표 로고를 내려받지 않았습니다. 입력 시안은 사용자가 권리를 보유한 자료라는 요청의 전제에 따라 구도 참조로 사용했습니다. 생성 결과의 독점성·상표 권리까지 확인한 것은 아닙니다.

| 경로 | 용도 |
|---|---|
| assets/hero.webp | 이전 버전 보관용 배달 라이더, 1536×1024 |
| assets/hero-v2.webp | 최종 PC 히어로·첫 카드·OG용 라이더, 1536×1024 |
| assets/hero-mobile.webp | 모바일 전용 강변 라이더, 1024×1536 |
| assets/bike.webp | 바이크 카드, 1536×1024 |
| assets/partner.webp | 제휴 악수 카드, 1536×1024 |
| assets/philosophy.webp | 강변 철학 파노라마, 2172×724 |
| assets/logo.svg | 시안의 바이크 모티프를 참고한 직접 작성 벡터 초안 |

WebP는 생성 PNG를 품질 88로 인코딩한 배포용 파일입니다. 폰트 파일은 배포하지 않고 OS 기본 글꼴을 사용합니다. 아이콘 SVG는 프로젝트 소스에 직접 작성했습니다. TALK는 상담을 식별하는 텍스트 배지이며 카카오 공식 로고 에셋이 아닙니다.

원본 기업 로고가 있다면 logo.svg를 교체하고 favicon도 함께 확인하세요. 사진을 교체할 때는 각 파일명과 주제 위치를 유지하거나 style.css의 background-position을 조정하세요.

## 사용한 생성 프롬프트

방식: 내장 imagegen. hero만 첨부 시안 이미지를 참조 입력으로 사용했습니다.

### hero
Wide photorealistic website background, 1536x1024 landscape. Seoul-like riverfront road, bridge and modern tall buildings at warm sunset with pale blue sky. Black helmeted delivery rider seen from rear, riding black motorcycle with large black delivery box, positioned on RIGHT 65-85% of image. Entire left 45% clean pale sky and river negative space for dark text. Premium realistic photography. No text, no logos, no borders. Match the attached reference hero photography mood, NOT the UI.

### bike
Photorealistic premium black classic motorcycle close-up, tank, handlebars and headlight in warm amber sunset, city bokeh. Landscape 3:2, no logos, no text, no UI.

### partner
Photorealistic close-up two business people in dark suits shaking hands, hands centered upper half, golden sunset modern city glass windows background, elegant commercial photograph, landscape 3:2. No text logos UI.

### philosophy
Photorealistic extra wide riverfront panorama in Seoul at pale warm sunset. Bridge across river, distant modern skyline, a single black helmeted delivery rider seated on riverside steps on far RIGHT edge seen from behind, small in frame. Left two thirds bright pale sky and river empty space. Peaceful hopeful, soft blue and cream. No text logos UI.

### hero-mobile
Create portrait 1024x1536 premium photorealistic delivery website background. Seoul river bridge tall skyline sunset pale warm sky top fading blue. Delivery rider black helmet black outfit on motorcycle large black delivery box seen rear, on far RIGHT with helmet at x82% y60%, motorcycle extends off bottom, entire upper 45% only blue sky, LEFT 60% open river sky and distant low skyline for white headline. City skyscrapers concentrated right side. No text logos UI. For mobile hero typography space.

## 최종 재검수 추가 에셋

hero-v2.webp는 내장 imagegen으로 생성 후 WebP 품질 90으로 인코딩했습니다. 입력 시안의 방향과 박스 위치를 우선한 최종 프롬프트는 아래와 같습니다.

Create ONLY the photographic desktop hero BACKGROUND from the attached reference, NOT any website or mockup. Wide landscape 1536x1024. Faithfully match the reference photograph's composition: black helmet delivery motorcycle rider viewed from rear-left, riding towards RIGHT. The large black rectangular delivery box is on the LEFT of the rider torso, at x52-70%, rider helmet at x68%, y18%, shoulders x65-80%. Right hand grips handlebar extending RIGHT, motorcycle front on RIGHT. Motorcycle rear box visible in center-right, not on far right. Modern Seoul riverside, high rises around center and right, bridge at lower third, warm pale sunset to RIGHT, cool pale blue sky left. Leftmost 43% has light sky, hazy distant river trees and city, usable quiet pale negative space for navy text. Rider body and motorcycle occupy right half and extend bottom. Premium lifelike commercial photo, black leather textures, no visible branding. Absolutely no text, no letters, no logos, no UI, no cards, no watermark. Only one continuous photo.
