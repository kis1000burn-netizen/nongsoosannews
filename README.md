# 농수산유통신문

농수산 유통 정보, 기사 초안, 창간사, 발행인 특별기고, 전국 시세표를 제공하는 정적 웹사이트입니다.

## 구성

- `index.html`: 메인 페이지
- `newsroom.html`: 기사 전문을 모아 읽는 뉴스룸 페이지
- `styles.css`: 전체 스타일
- `app.js`: 시세표, AI 자료수집 시뮬레이션, 편집인 전용 기사화 도구
- `netlify/functions/kamis-prices.mjs`: aT KAMIS Open API 연동 함수
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

## 매일 시세 자동 반영 (KAMIS API)

홈 화면 시세표는 Netlify Function이 aT 농산물유통정보(KAMIS) Open API에서 최근 도매 시세를 가져와 자동으로 갱신합니다.

### 1. KAMIS API 키 발급

1. [KAMIS Open API 이용신청](https://www.kamis.or.kr/customer/reference/openapi_list.do)에서 사용 신청
2. 승인 후 `인증키(p_cert_key)`와 `요청자 ID(p_cert_id)` 확인

### 2. Netlify 환경 변수 등록

Netlify 대시보드 → Site configuration → Environment variables:

| 변수명 | 값 |
| --- | --- |
| `KAMIS_CERT_KEY` | 발급받은 인증키 |
| `KAMIS_CERT_ID` | KAMIS 회원 아이디 |

등록 후 **재배포**하면 홈 화면에 실시간 시세가 반영됩니다.

키 발급 전에도 KAMIS 공개 테스트 키로 최근 조사일 시세가 자동 반영됩니다. 승인 후 위 환경 변수를 등록하면 본인 키로 전환됩니다.

### 3. 로컬 테스트

```bash
npm install -g netlify-cli
cp .env.example .env
# .env 파일에 KAMIS 키 입력
netlify dev
```

환경 변수가 없거나 API 호출이 실패하면 샘플 시세가 표시됩니다.

## 관리자 기능

외부 공개 화면에서는 AI 기사화 엔진이 숨겨져 있습니다. 편집인은 `편집인 로그인`을 통해 관리자 전용 기사 작성 도구를 사용할 수 있습니다.

현재 비밀번호는 운영자가 별도로 관리해야 하며, 실제 공개 운영 시에는 서버 기반 인증으로 전환하는 것을 권장합니다.
