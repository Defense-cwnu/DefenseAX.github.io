# 국립창원대학교 D.AX대학원 홈페이지

방산 운용-제조 AX 혁신인재 양성(D.AX대학원) 소개 사이트. 과학기술정보통신부·IITP AX대학원 사업(2026–2031), 공동연구개발기관 한화에어로스페이스.

- 한 페이지 정적 사이트(HTML/CSS/JS), 빌드 과정 없음
- 게시: GitHub Pages (`main` 브랜치, `/ (root)`)
- 게시·도메인 연결 방법: [docs/04_도메인_및_GitHub_게시가이드.md](docs/04_도메인_및_GitHub_게시가이드.md)

## 로컬에서 보기

```bash
python -m http.server 8765
```

브라우저에서 http://localhost:8765 접속.

## 파일 구성

| 경로 | 내용 |
|---|---|
| `index.html` | 전체 콘텐츠(소개·목표·트랙·교육과정·입학·산학프로젝트·인프라·국제협력·교수진·문의) |
| `assets/css/style.css` | 디자인. 색 변수는 파일 맨 위 `:root` |
| `assets/js/main.js` | 모바일 메뉴, 트랙 전환, 메뉴 강조 |
| `assets/img/` | 히어로·로고·캠퍼스 지도·파비콘·공유 이미지 |
| `docs/` | PDF 분석, 사업 분석, 콘텐츠 구성안, 게시 가이드 |

## 자주 고치는 곳
- 모집 일정: `index.html`의 `<div class="notice">`
- 문의처: `index.html`의 `<section ... id="contact">`
- 트랙 색: `style.css`의 `--ops`(운용혁신), `--mfg`(제조혁신)
