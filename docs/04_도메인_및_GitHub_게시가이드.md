# [Task 5] 도메인 추천과 GitHub Pages 게시 방법

이 폴더는 빌드 과정이 없는 순수 HTML/CSS/JS 사이트다. GitHub에 올리고 설정 버튼 몇 개만 누르면 무료로 공개된다.

```
D.AX_Homepage/
├── index.html            ← 홈페이지 본문(한 페이지)
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/              ← 히어로·로고·캠퍼스 지도·파비콘·공유 이미지
├── docs/                 ← 분석 문서(공개 여부 선택, 아래 3-6 참고)
├── .nojekyll             ← GitHub의 Jekyll 변환을 끄는 빈 파일(지우지 말 것)
└── README.md
```

---

## 1. 도메인 추천

### 1순위: `dax.changwon.ac.kr` (대학 공식 하위 도메인)
- 대학 도메인을 쓰므로 지원자·기업·평가기관이 "공식 사이트"로 믿는다. 비용 0원.
- 대학 정보전산 담당 부서에 **DNS CNAME 레코드 1줄** 추가만 요청하면 된다(아래 4-1).
- 같은 방식의 대안: `dax-gs.changwon.ac.kr`, `defenseax.changwon.ac.kr`

### 2순위: 별도 도메인 구입 (`.kr`, 연 1~2만 원대)
가비아·후이즈 같은 등록업체나 KISA 후이즈(https://whois.kr)에서 사용 가능 여부를 먼저 확인한다(아래 이름의 사용 가능 여부는 확인하지 않았다).

| 후보 | 장점 |
|---|---|
| `cnudax.kr` | 짧고 "창원대(CNU)+D.AX"가 바로 읽힘 |
| `dax-cnu.kr` | 사업명이 앞에 와서 검색 노출에 유리 |
| `daxgrad.kr` | "D.AX 대학원"을 영어로 직관적으로 표현 |
| `defenseax.kr` | 사업 내용(Defense AX)이 그대로 드러남 |

> `.ac.kr`은 교육기관만 등록할 수 있어 대학 명의로 신청해야 한다. 그럴 바에는 1순위처럼 `changwon.ac.kr`의 하위 도메인을 받는 편이 빠르다.

### 3순위(바로 쓸 수 있는 무료 주소): GitHub 기본 주소
- 조직 계정을 `cnu-dax`로 만들면 → **`https://cnu-dax.github.io`**
- 개인 계정 저장소로 올리면 → `https://<아이디>.github.io/<저장소이름>/`
- 도메인 연결 전 임시 주소로 쓰고, 나중에 1·2순위 도메인을 붙인다.

**권장 조합**: GitHub 조직 `cnu-dax` + 저장소 `cnu-dax.github.io` 로 먼저 공개 → 학교에 `dax.changwon.ac.kr` 연결 요청.

---

## 2. 준비물
1. GitHub 계정(https://github.com/signup). 학교 메일로 가입하면 관리 인수인계가 쉽다.
2. (선택) Git 프로그램: https://git-scm.com/download/win — 웹 업로드만 쓸 거면 필요 없다.
3. 이 폴더(`D:\D.AX_Homepage`)

---

## 3. GitHub Pages로 게시하기

### 3-1. 조직(Organization) 만들기 — 권장
담당자가 바뀌어도 사이트를 넘겨주기 쉽다.
1. GitHub 오른쪽 위 프로필 사진 → **Your organizations** → **New organization**
2. **Create a free organization** 선택
3. Organization name: `cnu-dax` (다른 이름이면 아래 주소의 `cnu-dax`를 바꿔 읽는다)
4. Contact email: 사업단 메일, "This organization belongs to: A business or institution" → 기관명 `Changwon National University`
5. 함께 관리할 교직원을 **People → Invite member**로 초대

### 3-2. 저장소(Repository) 만들기
1. 조직 페이지 → **Repositories → New repository**
2. Repository name: **`cnu-dax.github.io`** (조직 이름 + `.github.io`를 정확히 입력해야 루트 주소가 된다)
   - 개인 계정이면 `dax-homepage`처럼 아무 이름이나 가능 → 주소는 `https://<아이디>.github.io/dax-homepage/`
3. **Public** 선택 (무료 플랜에서 Pages는 공개 저장소만 가능)
4. "Add a README file"은 체크하지 않는다(이 폴더에 이미 있다) → **Create repository**

### 3-3-A. 웹에서 끌어다 놓기로 업로드 (Git 몰라도 됨)
1. 새 저장소 화면의 **uploading an existing file** 링크 클릭
2. 탐색기에서 `D:\D.AX_Homepage` 안의 **내용물**(`index.html`, `assets` 폴더, `docs` 폴더, `README.md`, `.nojekyll`)을 선택해 브라우저 창에 끌어다 놓는다
   - 폴더 자체(`D.AX_Homepage`)를 끌면 한 단계 더 들어간 경로가 되어 사이트가 안 뜬다. **안의 내용물**을 끌어야 한다.
   - `.nojekyll`이 탐색기에 안 보이면: 탐색기 상단 **보기 → 표시 → 숨긴 항목** 체크
   - 원본 PDF(`2. D.AX대학원_소개.pdf`, 약 9MB)와 `.claude` 폴더는 올리지 않는다
3. 아래 Commit changes 칸에 "첫 게시" 입력 → **Commit changes**

### 3-3-B. Git 명령으로 업로드 (수정이 잦다면 이 방법)
Git 설치 후 Git Bash에서 실행한다. `.gitignore`에 PDF와 `.claude` 폴더가 이미 제외되어 있다.

```bash
cd /d/D.AX_Homepage
```

```bash
git init -b main
```

```bash
git add .
```

```bash
git commit -m "D.AX대학원 홈페이지 첫 게시"
```

```bash
git remote add origin https://github.com/cnu-dax/cnu-dax.github.io.git
```

```bash
git push -u origin main
```

처음 push할 때 브라우저 로그인 창이 뜨면 GitHub 계정으로 로그인한다.

### 3-4. Pages 켜기
1. 저장소 → **Settings** → 왼쪽 **Pages**
2. **Build and deployment → Source: Deploy from a branch**
3. **Branch: `main`**, 폴더 **`/ (root)`** → **Save**
4. 1~3분 뒤 같은 화면 위쪽에 "Your site is live at https://cnu-dax.github.io/" 가 뜬다
5. 진행 상황은 저장소 **Actions** 탭의 "pages build and deployment"에서 확인(초록 체크 = 완료)

### 3-5. 내용 수정하기
- 웹: 저장소에서 `index.html` 클릭 → 연필 아이콘(Edit) → 수정 → **Commit changes**. 1~2분 뒤 반영
- Git:

```bash
git add . && git commit -m "모집요강 반영" && git push
```

- 반영이 안 보이면 브라우저에서 `Ctrl + F5`(강력 새로고침)

### 3-6. `docs` 폴더 공개 여부
GitHub Pages는 저장소의 모든 파일을 공개한다. `docs/`의 분석 문서는 `https://<주소>/docs/01_PDF_분석.md` 로 누구나 볼 수 있다. 내부 검토용이라면 저장소에 올리지 말고 따로 보관하거나 `.gitignore`에 `docs/`를 추가한다.

---

## 4. 맞춤 도메인 연결

### 4-1. `dax.changwon.ac.kr` (학교 하위 도메인)
1. 대학 정보전산 담당 부서에 아래 내용으로 요청한다.

   | 호스트 | 타입 | 값 |
   |---|---|---|
   | `dax` | `CNAME` | `cnu-dax.github.io.` |

2. 저장소 **Settings → Pages → Custom domain**에 `dax.changwon.ac.kr` 입력 → **Save**
   (저장하면 저장소에 `CNAME` 파일이 자동으로 생긴다. Git으로 작업 중이면 `git pull`로 받아 둔다)
3. DNS가 퍼지면(보통 몇 분~몇 시간, 최대 24시간) "DNS check successful" 표시
4. **Enforce HTTPS** 체크 (인증서 발급에 최대 1시간 정도 걸릴 수 있음)

### 4-2. 구입한 도메인(예: `cnudax.kr`)
도메인 등록업체의 DNS 관리 화면에서:

- `www.cnudax.kr` 용

  | 호스트 | 타입 | 값 |
  |---|---|---|
  | `www` | `CNAME` | `cnu-dax.github.io.` |

- `cnudax.kr`(맨 앞 www 없는 주소) 용: A 레코드 4개, 필요하면 AAAA 4개

  | 호스트 | 타입 | 값 |
  |---|---|---|
  | `@` | `A` | `185.199.108.153` |
  | `@` | `A` | `185.199.109.153` |
  | `@` | `A` | `185.199.110.153` |
  | `@` | `A` | `185.199.111.153` |
  | `@` | `AAAA` | `2606:50c0:8000::153` |
  | `@` | `AAAA` | `2606:50c0:8001::153` |
  | `@` | `AAAA` | `2606:50c0:8002::153` |
  | `@` | `AAAA` | `2606:50c0:8003::153` |

그다음 4-1의 2~4단계와 같이 Custom domain에 `www.cnudax.kr`을 넣고 HTTPS를 켠다. 두 주소를 모두 등록해 두면 GitHub가 서로 넘겨준다.

### 4-3. 도메인 탈취 방지(권장)
조직 **Settings → Pages → Add a domain**에서 도메인을 "verified"로 등록한다. GitHub이 알려 주는 `_github-pages-challenge-cnu-dax` TXT 레코드를 DNS에 추가하면, 다른 사람이 같은 도메인을 자기 저장소에 붙이지 못한다.

### 4-4. 연결 확인
```bash
nslookup dax.changwon.ac.kr
```
결과에 `cnu-dax.github.io` 또는 `185.199.x.153`이 보이면 연결된 것이다.

---

## 5. 게시 후 할 일
1. **공유 미리보기 이미지**: 도메인이 정해지면 `index.html`의 `og:image`를 전체 주소로 바꾼다.
   `assets/img/og-image.jpg` → `https://dax.changwon.ac.kr/assets/img/og-image.jpg`
   (카카오톡 공유 미리보기는 https://developers.kakao.com/tool/debugger/sharing 에서 캐시를 지운다)
2. **검색 등록**: 네이버 서치어드바이저(https://searchadvisor.naver.com), Google Search Console(https://search.google.com/search-console)에 사이트 등록. 소유 확인용 HTML 파일이나 메타 태그를 받아 저장소에 넣으면 된다.
3. **학교 사이트 연결**: 대학 포털·인공지능디펜스공학과 홈페이지 배너나 메뉴에 링크를 걸어 달라고 요청.
4. **모집요강 확정 시**: `index.html`에서 `<div class="notice">` 부분(모집 일정)을 고친다.

## 6. 자주 막히는 곳
| 증상 | 원인과 해결 |
|---|---|
| 404 페이지가 뜸 | `index.html`이 저장소 맨 위에 있는지 확인. 폴더째 올렸다면 안의 파일을 루트로 옮긴다 |
| 디자인 없이 글자만 보임 | `assets` 폴더가 빠졌거나 경로가 바뀜. 저장소에 `assets/css/style.css`가 있는지 확인 |
| 이미지가 안 보임 | 파일 이름 대소문자 확인(GitHub은 `Hero.jpg`와 `hero.jpg`를 다르게 본다) |
| Custom domain이 자꾸 지워짐 | 저장소의 `CNAME` 파일을 지웠거나, 로컬에서 덮어썼음. `git pull` 후 작업 |
| HTTPS 체크가 비활성 | DNS 반영 전. 몇 시간 뒤 다시 시도. CAA 레코드가 있다면 `letsencrypt.org` 허용 필요 |
| 수정이 반영 안 됨 | Actions 탭에서 배포 완료 확인 후 `Ctrl + F5` |
