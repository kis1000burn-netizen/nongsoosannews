# 농수산유통신문

농수산 유통 정보, 기사 초안, 창간사, 발행인 특별기고, 전국 시세표를 제공하는 정적 웹사이트입니다.

## 구성

- `index.html`: 메인 페이지
- `styles.css`: 전체 스타일
- `app.js`: 시세표, AI 자료수집 시뮬레이션, 편집인 전용 기사화 도구
- `assets/`: 기사 썸네일 이미지
- `netlify.toml`: Netlify 배포 설정

## GitHub + Netlify 배포

1. 이 폴더를 GitHub 저장소에 업로드합니다.
2. Netlify에서 `Add new site` → `Import an existing project`를 선택합니다.
3. GitHub 저장소를 연결합니다.
4. Build settings는 아래처럼 둡니다.
   - Build command: 비워둠
   - Publish directory: `.`
5. 배포 후 Netlify에서 제공하는 도메인 또는 연결한 커스텀 도메인으로 접속합니다.

## 관리자 기능

외부 공개 화면에서는 AI 기사화 엔진이 숨겨져 있습니다. 편집인은 `편집인 로그인`을 통해 관리자 전용 기사 작성 도구를 사용할 수 있습니다.

현재 비밀번호는 운영자가 별도로 관리해야 하며, 실제 공개 운영 시에는 서버 기반 인증으로 전환하는 것을 권장합니다.
