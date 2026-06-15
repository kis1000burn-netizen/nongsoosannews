const briefing = {
  title: '배추·무 가격 변동성 확대, 산지 출하량 확인 필요',
  summary: '금주 주요 채소류는 기상 변수와 산지 출하 조절 영향으로 품목별 등락이 갈리고 있습니다.',
  points: [
    '채소류: 산지 출하량과 도매시장 반입량 동시 확인 필요',
    '수산물: 냉동 재고와 외식 수요 회복 여부가 핵심 변수',
    '정책: 지자체 지원사업 공고는 신청기한 중심으로 재분류'
  ],
  temperature: 72
};

const nationalPriceIndex = {
  date: '2026.06.16',
  index: 108.6,
  copy: '전국 평균 기준, 채소류와 일부 수산물의 상승 압력이 이어지고 있습니다.',
  regions: [
    { name: '수도권', index: 112.4 },
    { name: '강원', index: 104.8 },
    { name: '충청', index: 107.2 },
    { name: '호남', index: 103.9 },
    { name: '영남', index: 110.5 },
    { name: '제주', index: 115.1 }
  ],
  items: [
    { name: '배추', region: '강원·수도권', price: '18,400원', change: '+8.2%', direction: 'up' },
    { name: '무', region: '제주·영남', price: '13,900원', change: '+5.1%', direction: 'up' },
    { name: '양파', region: '호남', price: '2,650원', change: '-2.4%', direction: 'down' },
    { name: '고등어', region: '부산·수도권', price: '4,800원', change: '+3.7%', direction: 'up' },
    { name: '갈치', region: '제주', price: '12,300원', change: '-3.2%', direction: 'down' },
    { name: '김', region: '전남', price: '강세', change: '보합권', direction: 'flat' }
  ]
};

const commodities = [
  { name: '배추', type: 'agri', market: '도매', price: '18,400원', change: '+8.2%', direction: 'up', note: '출하량 변동' },
  { name: '무', type: 'agri', market: '도매', price: '13,900원', change: '+5.1%', direction: 'up', note: '기상 영향' },
  { name: '양파', type: 'agri', market: '소매', price: '2,650원', change: '-2.4%', direction: 'down', note: '저장물량 출회' },
  { name: '고등어', type: 'fish', market: '수산', price: '4,800원', change: '+3.7%', direction: 'up', note: '외식 수요' },
  { name: '오징어', type: 'fish', market: '수산', price: '9,700원', change: '+6.8%', direction: 'up', note: '수급 불안' },
  { name: '김', type: 'fish', market: '수출', price: '강세', change: '+4.5%', direction: 'up', note: '수출 호조' },
  { name: '마늘', type: 'agri', market: '산지', price: '6,200원', change: '-1.8%', direction: 'down', note: '재고 점검' },
  { name: '갈치', type: 'fish', market: '수산', price: '12,300원', change: '-3.2%', direction: 'down', note: '반입 증가' }
];

const policies = [
  { title: '농식품 지원사업 공고, 신청기한 중심으로 재정리 필요', desc: '현장 독자가 바로 확인할 수 있도록 대상·기한·문의처 기준으로 요약합니다.' },
  { title: '도매시장 제도 변경은 가격 형성 구조와 함께 해설', desc: '제도 소개보다 생산자·중도매인·식자재업체 영향 중심으로 분석합니다.' },
  { title: '수산물 수출입 통계는 품목별 국내 가격 영향까지 연결', desc: '수출 호조가 국내 공급과 외식업계 원가에 미치는 영향을 함께 봅니다.' }
];

const fields = [
  { title: '산지 출하 조절이 도매시장 가격에 미치는 영향', desc: '반입량, 저장물량, 기상 변수, 소비 수요를 한 기사 안에서 연결합니다.' },
  { title: '식자재 유통업체가 확인해야 할 이번 주 품목', desc: '급식·도시락·프랜차이즈 원가에 영향을 주는 품목을 따로 분류합니다.' },
  { title: '현장 제보는 품목·지역·시점·사진 기준으로 접수', desc: '제보를 기사화하기 위해 필요한 최소 데이터 구조를 표준화합니다.' }
];

const aiSources = [
  { name: 'aT 농산물유통정보', type: '가격 API', scope: '품목별 도·소매 가격 변동 감지', status: '대기 중' },
  { name: '해양수산부·수협 자료', type: '기관 공지', scope: '수산물 수급·수출입 정책 신호 추출', status: '대기 중' },
  { name: '도매시장 반입량', type: '공공 데이터', scope: '산지 출하량과 경락가 이상치 확인', status: '대기 중' },
  { name: '현장 제보함', type: '독자 입력', scope: '지역·품목·사진 기반 기사 단서 분류', status: '대기 중' }
];

const aiCandidates = [
  {
    headline: '배추 반입량 감소와 외식 수요 회복 신호 동시 포착',
    summary: '가격 상승 품목과 도매시장 반입량을 묶어 산지 출하 조절 여부를 확인해야 합니다.',
    priority: '상',
    checks: '산지 2곳'
  },
  {
    headline: '수산물 수출 호조 품목, 국내 외식 원가 영향 점검 필요',
    summary: '김·고등어 가격 흐름과 냉동 재고 데이터를 함께 확인할 기사 후보입니다.',
    priority: '중',
    checks: '통계 3건'
  },
  {
    headline: '지자체 농식품 지원사업 공고, 신청기한별 재분류 필요',
    summary: '정책 자료를 독자가 바로 쓸 수 있도록 대상·기간·문의처 중심으로 정리합니다.',
    priority: '중',
    checks: '공고 5건'
  }
];

const briefTitle = document.querySelector('#brief-title');
const briefSummary = document.querySelector('#brief-summary');
const briefPoints = document.querySelector('#brief-points');
const gaugeFill = document.querySelector('#gauge-fill');
const commodityGrid = document.querySelector('#commodity-grid');
const policyList = document.querySelector('#policy-list');
const fieldList = document.querySelector('#field-list');
const priceDate = document.querySelector('#price-date');
const nationalIndex = document.querySelector('#national-index');
const nationalIndexCopy = document.querySelector('#national-index-copy');
const nationalIndexGauge = document.querySelector('#national-index-gauge');
const regionalChart = document.querySelector('#regional-chart');
const nationalPriceTable = document.querySelector('#national-price-table');
const sourcePipeline = document.querySelector('#source-pipeline');
const aiHeadline = document.querySelector('#ai-headline');
const aiSummary = document.querySelector('#ai-summary');
const aiPriority = document.querySelector('#ai-priority');
const aiChecks = document.querySelector('#ai-checks');
const aiArticleQueue = document.querySelector('#ai-article-queue');
const refreshAi = document.querySelector('#refresh-ai');
const articleFileInput = document.querySelector('#article-file-input');
const articleSourceText = document.querySelector('#article-source-text');
const articleConvertButton = document.querySelector('#article-convert-button');
const articleSampleButton = document.querySelector('#article-sample-button');
const articleClearButton = document.querySelector('#article-clear-button');
const articleEngineStatus = document.querySelector('#article-engine-status');
const generatedTitle = document.querySelector('#generated-title');
const generatedLead = document.querySelector('#generated-lead');
const generatedBody = document.querySelector('#generated-body');
const generatedPoints = document.querySelector('#generated-points');
const generatedTags = document.querySelector('#generated-tags');
const articleEngineSection = document.querySelector('#article-engine');
const editorLoginButton = document.querySelector('#editor-login-button');
const editorLoginModal = document.querySelector('#editor-login-modal');
const editorLoginForm = document.querySelector('#editor-login-form');
const editorPassword = document.querySelector('#editor-password');
const editorLoginClose = document.querySelector('#editor-login-close');
const editorLoginStatus = document.querySelector('#editor-login-status');
const editorLogoutButton = document.querySelector('#editor-logout-button');
const adminOpenButtons = document.querySelectorAll('.admin-open-button');

const editorPasswordHash = '6e32747e87e645a3650e4b7ae1330ce8414527e427b75cd25d0d7861daa4f74a';

const articleSampleText = `강원 고랭지 배추 산지에서는 최근 잦은 비와 일교차 확대 영향으로 출하 작업이 지연되고 있다.
서울 가락시장과 수도권 주요 도매시장 반입량은 전주 대비 줄었고, 일부 중도매인은 외식업체 주문 회복까지 겹치며 단기 가격 강세가 이어질 수 있다고 보고 있다.
농식품 관련 기관은 산지별 생육 상황과 저장 물량을 함께 확인해야 한다고 설명했다.
다만 다음 주 기상 여건이 안정될 경우 출하량이 회복되면서 급등 폭은 제한될 가능성이 있다.
유통업계는 김치 제조업체, 급식업체, 식자재 납품업체의 발주 시점이 가격 변동을 키울 수 있어 도매가격과 산지 출하량을 동시에 점검해야 한다.`;

function renderNationalPriceIndex() {
  priceDate.textContent = nationalPriceIndex.date;
  nationalIndex.textContent = nationalPriceIndex.index.toFixed(1);
  nationalIndexCopy.textContent = nationalPriceIndex.copy;
  nationalIndexGauge.style.width = `${Math.min(nationalPriceIndex.index - 40, 100)}%`;
  regionalChart.innerHTML = nationalPriceIndex.regions.map(region => `
    <div class="region-row">
      <strong>${region.name}</strong>
      <span class="bar-track">
        <span class="bar-fill" style="width: ${Math.min(region.index - 45, 100)}%"></span>
      </span>
      <em>${region.index.toFixed(1)}</em>
    </div>
  `).join('');
  nationalPriceTable.innerHTML = nationalPriceIndex.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.region}</td>
      <td>${item.price}</td>
      <td class="${item.direction}">${item.change}</td>
    </tr>
  `).join('');
}

function renderBriefing() {
  briefTitle.textContent = briefing.title;
  briefSummary.textContent = briefing.summary;
  briefPoints.innerHTML = briefing.points.map(point => `<li>${point}</li>`).join('');
  gaugeFill.style.width = `${briefing.temperature}%`;
}

function renderCommodities(filter = 'all') {
  const list = filter === 'all' ? commodities : commodities.filter(item => item.type === filter);
  commodityGrid.innerHTML = list.map(item => `
    <article class="commodity-card">
      <small>${item.market} · ${item.note}</small>
      <h3>${item.name}</h3>
      <div class="price-row">
        <span class="price">${item.price}</span>
        <strong class="change ${item.direction}">${item.change}</strong>
      </div>
    </article>
  `).join('');
}

function renderArticleList(target, list) {
  target.innerHTML = list.map(item => `
    <a href="#" class="article-item">
      <strong>${item.title}</strong>
      <p>${item.desc}</p>
    </a>
  `).join('');
}

function renderAiSources(activeIndex = 0) {
  sourcePipeline.innerHTML = aiSources.map((source, index) => {
    const status = index === activeIndex ? '수집·분류 중' : source.status;

    return `
      <div class="collector-source-card">
        <strong>${source.name}</strong>
        <span>${source.type} · ${source.scope}</span>
        <div class="source-status">${status}</div>
      </div>
    `;
  }).join('');
}

function renderAiQueue(selectedIndex = 0) {
  const selected = aiCandidates[selectedIndex];

  aiHeadline.textContent = selected.headline;
  aiSummary.textContent = selected.summary;
  aiPriority.textContent = selected.priority;
  aiChecks.textContent = selected.checks;
  aiArticleQueue.innerHTML = aiCandidates.map((candidate, index) => `
    <a href="#" class="article-item">
      <strong>${candidate.headline}</strong>
      <p>${candidate.summary}</p>
      <span class="candidate-tag">${index === selectedIndex ? '현재 편집 큐' : `우선순위 ${candidate.priority}`}</span>
    </a>
  `).join('');
}

function splitSentences(text) {
  const normalized = text.replace(/\s+/g, ' ');
  const matches = normalized.match(/[^.!?。]+(?:[.!?。]|다\.|요\.|함\.|됨\.)?/g) || [];

  return matches
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 12);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char]);
}

function detectArticleCategory(text) {
  const rules = [
    { label: '가격·수급', words: ['가격', '시세', '반입량', '출하', '수급', '도매', '소매'] },
    { label: '정책·제도', words: ['정책', '지원사업', '공고', '기관', '지자체', '보조금'] },
    { label: '현장 리포트', words: ['산지', '현장', '제보', '농가', '어가', '시장'] },
    { label: '수산 유통', words: ['수산', '어획', '냉동', '수협', '해양', '수출'] }
  ];

  return rules
    .map(rule => ({
      label: rule.label,
      score: rule.words.reduce((sum, word) => sum + (text.includes(word) ? 1 : 0), 0)
    }))
    .sort((a, b) => b.score - a.score)[0].label;
}

function extractKeywords(text) {
  const words = ['배추', '무', '양파', '마늘', '고등어', '오징어', '갈치', '김', '산지', '도매시장', '수급', '가격', '정책', '출하량', '반입량', '외식', '급식', '수출'];
  const found = words.filter(word => text.includes(word));
  return [...new Set(found)].slice(0, 6);
}

function buildArticleDraft(source) {
  const cleanText = source.trim();
  const sentences = splitSentences(cleanText);
  const category = detectArticleCategory(cleanText);
  const keywords = extractKeywords(cleanText);
  const mainKeyword = keywords[0] || category;
  const titleBase = sentences[0] || cleanText.slice(0, 48);
  const title = titleBase.length > 34
    ? `${mainKeyword} 흐름 주목, ${titleBase.slice(0, 32)}...`
    : `${mainKeyword} 관련 유통 흐름 점검`;
  const lead = sentences[1] || `${category} 자료를 바탕으로 가격, 수급, 현장 영향을 종합 점검했습니다.`;
  const body = sentences.slice(0, 4);
  const points = [
    `${category} 관점에서 원문을 재분류했습니다.`,
    keywords.length ? `핵심 키워드: ${keywords.join(', ')}` : '핵심 키워드 추가 확인이 필요합니다.',
    '발행 전 출처, 수치, 지역명, 이해관계자 발언 검수가 필요합니다.'
  ];

  return {
    title,
    lead,
    body: body.length ? body : [cleanText.slice(0, 180)],
    points,
    tags: [category, ...keywords].slice(0, 7),
    count: cleanText.length
  };
}

function renderArticleDraft(draft) {
  articleEngineStatus.textContent = `전문 ${draft.count.toLocaleString()}자 분석 완료`;
  generatedTitle.textContent = draft.title;
  generatedLead.textContent = draft.lead;
  generatedBody.innerHTML = draft.body.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('');
  generatedPoints.innerHTML = draft.points.map(point => `<li>${escapeHtml(point)}</li>`).join('');
  generatedTags.innerHTML = draft.tags.map(tag => `<span>#${escapeHtml(tag)}</span>`).join('');
}

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hashBuffer)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function openEditorLogin() {
  editorLoginModal.classList.add('is-open');
  editorLoginModal.setAttribute('aria-hidden', 'false');
  editorLoginStatus.textContent = '';
  editorPassword.value = '';
  setTimeout(() => editorPassword.focus(), 30);
}

function closeEditorLogin() {
  editorLoginModal.classList.remove('is-open');
  editorLoginModal.setAttribute('aria-hidden', 'true');
}

function unlockArticleEngine() {
  articleEngineSection.classList.add('is-unlocked');
  articleEngineSection.setAttribute('aria-hidden', 'false');
  sessionStorage.setItem('editor-authenticated', 'true');
  closeEditorLogin();
  articleEngineSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function lockArticleEngine() {
  articleEngineSection.classList.remove('is-unlocked');
  articleEngineSection.setAttribute('aria-hidden', 'true');
  sessionStorage.removeItem('editor-authenticated');
}

function convertArticleSource() {
  const source = articleSourceText.value.trim();

  if (!source) {
    articleEngineStatus.textContent = '원문을 먼저 입력하세요';
    generatedTitle.textContent = '원문이 비어 있습니다.';
    generatedLead.textContent = '파일 업로드 또는 붙여넣기 후 기사화 실행을 눌러주세요.';
    generatedBody.innerHTML = '';
    generatedPoints.innerHTML = '';
    generatedTags.innerHTML = '';
    return;
  }

  articleEngineStatus.textContent = '전문 분석 중...';
  setTimeout(() => renderArticleDraft(buildArticleDraft(source)), 420);
}

document.querySelectorAll('.tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');
    renderCommodities(button.dataset.filter);
  });
});

refreshAi.addEventListener('click', () => {
  const selectedIndex = Math.floor(Math.random() * aiCandidates.length);
  const activeSourceIndex = Math.floor(Math.random() * aiSources.length);

  renderAiSources(activeSourceIndex);
  renderAiQueue(selectedIndex);
});

editorLoginButton.addEventListener('click', openEditorLogin);
adminOpenButtons.forEach(button => button.addEventListener('click', openEditorLogin));
editorLoginClose.addEventListener('click', closeEditorLogin);
editorLoginModal.addEventListener('click', event => {
  if (event.target === editorLoginModal) closeEditorLogin();
});
editorLoginForm.addEventListener('submit', async event => {
  event.preventDefault();
  editorLoginStatus.textContent = '인증 확인 중...';

  try {
    const inputHash = await sha256(editorPassword.value);
    if (inputHash === editorPasswordHash) {
      editorLoginStatus.textContent = '인증되었습니다.';
      unlockArticleEngine();
      return;
    }
    editorLoginStatus.textContent = '비밀번호가 올바르지 않습니다.';
  } catch (error) {
    editorLoginStatus.textContent = '이 브라우저에서는 관리자 인증을 처리할 수 없습니다.';
  }
});
editorLogoutButton.addEventListener('click', () => {
  lockArticleEngine();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

articleFileInput.addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  articleEngineStatus.textContent = `${file.name} 읽는 중...`;
  reader.addEventListener('load', () => {
    articleSourceText.value = reader.result;
    convertArticleSource();
  });
  reader.readAsText(file, 'utf-8');
});

articleConvertButton.addEventListener('click', convertArticleSource);
articleSampleButton.addEventListener('click', () => {
  articleSourceText.value = articleSampleText;
  convertArticleSource();
});
articleClearButton.addEventListener('click', () => {
  articleSourceText.value = '';
  articleEngineStatus.textContent = '원문 대기 중';
  generatedTitle.textContent = '원문을 입력하면 제목이 생성됩니다.';
  generatedLead.textContent = 'AI 기사화 엔진이 리드문, 본문 요약, 핵심 포인트, 태그를 자동 구성합니다.';
  generatedBody.innerHTML = '';
  generatedPoints.innerHTML = '';
  generatedTags.innerHTML = '';
});

renderNationalPriceIndex();
renderBriefing();
renderCommodities();
renderArticleList(policyList, policies);
renderArticleList(fieldList, fields);
renderAiSources();
renderAiQueue();

if (sessionStorage.getItem('editor-authenticated') === 'true') {
  articleEngineSection.classList.add('is-unlocked');
  articleEngineSection.setAttribute('aria-hidden', 'false');
}

(function () {
  const entryLetters = [
    { ch: '농', color: '#b9ff42', bg: 'rgba(185,255,66,.18)', glow: 'rgba(185,255,66,.9)' },
    { ch: '수', color: '#50e3ff', bg: 'rgba(80,227,255,.18)', glow: 'rgba(80,227,255,.9)' },
    { ch: '산', color: '#ffd36e', bg: 'rgba(255,211,110,.18)', glow: 'rgba(255,211,110,.9)' },
    { ch: '유', color: '#6ee7b7', bg: 'rgba(110,231,183,.18)', glow: 'rgba(110,231,183,.9)' },
    { ch: '통', color: '#b9ff42', bg: 'rgba(185,255,66,.18)', glow: 'rgba(185,255,66,.9)' },
    { ch: '신', color: '#50e3ff', bg: 'rgba(80,227,255,.18)', glow: 'rgba(80,227,255,.9)' },
    { ch: '문', color: '#ffd36e', bg: 'rgba(255,211,110,.18)', glow: 'rgba(255,211,110,.9)' }
  ];

  const cycleColors = [
    { c: '#ffffff', g: 'rgba(255,255,255,.92)' },
    { c: '#b9ff42', g: 'rgba(185,255,66,.95)' },
    { c: '#50e3ff', g: 'rgba(80,227,255,.95)' },
    { c: '#ffd36e', g: 'rgba(255,211,110,.95)' },
    { c: '#6ee7b7', g: 'rgba(110,231,183,.95)' }
  ];

  const cfg = {
    overlayId: 'agri-news-entry',
    rowId: 'agri-news-entry-row',
    taglineId: 'agri-news-entry-tagline',
    animMs: 680,
    gapMs: 255,
    fadeMs: 520
  };

  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = cfg.overlayId;
    overlay.setAttribute('aria-label', '농수산유통신문 진입 애니메이션');
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:999999;display:flex;flex-direction:column;' +
      'align-items:center;justify-content:center;gap:22px;cursor:pointer;' +
      'background:radial-gradient(circle at 50% 35%,rgba(185,255,66,.12),transparent 34%),#07100b;' +
      'font-family:"Pretendard","Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;';
    overlay.innerHTML =
      `<div id="${cfg.rowId}" style="display:flex;align-items:center;justify-content:center;gap:7px;min-height:72px;flex-wrap:wrap;"></div>` +
      `<div id="${cfg.taglineId}" style="font-size:.86rem;font-weight:800;letter-spacing:.22em;color:rgba(80,227,255,.82);opacity:0;transition:opacity .5s ease,transform .5s ease;transform:translateY(10px);">DATA MARKET JOURNAL</div>` +
      '<div style="position:absolute;bottom:22px;right:26px;font-size:.7rem;color:rgba(255,255,255,.24);letter-spacing:.1em;">tap to skip</div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  function buildLetters() {
    const row = document.getElementById(cfg.rowId);
    if (!row) return false;
    row.innerHTML = '';

    entryLetters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.id = `${cfg.rowId}-ltr-${index}`;
      span.textContent = letter.ch;
      span.style.cssText =
        'display:inline-flex;align-items:center;justify-content:center;' +
        'width:58px;height:58px;font-size:2rem;font-weight:900;' +
        'border-radius:50%;border:2px solid transparent;position:relative;' +
        `color:transparent;background:${letter.bg};opacity:0;` +
        'transform:translateX(80px) scale(0) rotate(220deg);';
      row.appendChild(span);
    });

    return true;
  }

  function addRing(parent, color) {
    const ring = document.createElement('div');
    ring.style.cssText =
      `position:absolute;inset:-4px;border-radius:inherit;border:2px solid ${color};` +
      'opacity:1;pointer-events:none;transform:scale(1);transition:opacity .55s ease,transform .55s ease;';
    parent.appendChild(ring);

    setTimeout(() => {
      ring.style.opacity = '0';
      ring.style.transform = 'scale(2.6)';
      setTimeout(() => ring.remove(), 660);
    }, 20);
  }

  function animateLetter(index, onDone) {
    const element = document.getElementById(`${cfg.rowId}-ltr-${index}`);
    if (!element) {
      if (onDone) setTimeout(onDone, 0);
      return;
    }

    const letter = entryLetters[index];
    const opacityMs = Math.round(cfg.animMs * 0.4);
    let done = false;

    function finish() {
      if (done) return;
      done = true;
      clearTimeout(safeTimeout);
      element.style.transition = '';
      element.style.opacity = '1';
      element.style.transform = 'translateX(0) scale(1) rotate(0deg)';
      element.style.borderRadius = '12px';
      element.style.color = letter.color;
      element.style.borderColor = `${letter.color}55`;
      element.style.boxShadow = `0 0 14px ${letter.glow}`;
      if (onDone) onDone();
    }

    const safeTimeout = setTimeout(finish, cfg.animMs + 350);
    element.addEventListener('transitionend', function handler(event) {
      if (event.propertyName === 'transform') {
        element.removeEventListener('transitionend', handler);
        finish();
      }
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.style.transition =
          `transform ${cfg.animMs}ms cubic-bezier(0.34,1.56,0.64,1),` +
          `opacity ${opacityMs}ms ease,border-radius ${cfg.animMs}ms ease`;
        element.style.transform = 'translateX(0) scale(1) rotate(0deg)';
        element.style.opacity = '1';
        element.style.borderRadius = '12px';
      });
    });

    setTimeout(() => addRing(element, letter.color), Math.round(cfg.animMs * 0.68));
  }

  function colorCycleAll(onDone) {
    let colorIndex = 0;
    const per = 210;
    const wave = 28;

    function applyColor(color) {
      entryLetters.forEach((_, index) => {
        setTimeout(() => {
          const element = document.getElementById(`${cfg.rowId}-ltr-${index}`);
          if (!element) return;
          element.style.transition = 'color .04s,box-shadow .04s,filter .04s,transform .08s';
          element.style.color = color.c;
          element.style.boxShadow = `0 0 26px ${color.g}`;
          element.style.filter = `brightness(2) drop-shadow(0 0 14px ${color.g})`;
          element.style.transform = 'translateX(0) scale(1.08) rotate(0deg)';
        }, index * wave);
      });
    }

    function next() {
      if (colorIndex >= cycleColors.length) {
        const resetDelay = wave * (entryLetters.length - 1) + 80;
        setTimeout(() => {
          entryLetters.forEach((letter, index) => {
            setTimeout(() => {
              const element = document.getElementById(`${cfg.rowId}-ltr-${index}`);
              if (!element) return;
              element.style.transition = 'color .4s,box-shadow .4s,filter .4s,transform .4s';
              element.style.color = letter.color;
              element.style.boxShadow = `0 0 14px ${letter.glow}`;
              element.style.filter = '';
              element.style.transform = 'translateX(0) scale(1) rotate(0deg)';
            }, index * wave);
          });
          setTimeout(onDone, resetDelay + 420);
        }, resetDelay);
        return;
      }

      applyColor(cycleColors[colorIndex]);
      colorIndex += 1;
      setTimeout(next, per);
    }

    next();
  }

  function playEntry() {
    const overlay = createOverlay();
    let completed = false;
    let safetyTimeout;

    function closeOverlay() {
      if (completed) return;
      completed = true;
      clearTimeout(safetyTimeout);
      overlay.style.transition = `opacity ${cfg.fadeMs}ms ease`;
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), cfg.fadeMs + 80);
    }

    overlay.addEventListener('click', closeOverlay, { once: true });
    safetyTimeout = setTimeout(closeOverlay, 12000);

    if (!buildLetters()) {
      closeOverlay();
      return;
    }

    const lastIndex = entryLetters.length - 1;
    entryLetters.forEach((_, index) => {
      setTimeout(() => {
        animateLetter(index, index === lastIndex ? afterAll : null);
      }, index * cfg.gapMs);
    });

    function afterAll() {
      setTimeout(() => {
        const tagline = document.getElementById(cfg.taglineId);
        if (tagline) {
          tagline.style.opacity = '1';
          tagline.style.transform = 'translateY(0)';
        }

        setTimeout(() => {
          colorCycleAll(() => {
            setTimeout(closeOverlay, 400);
          });
        }, 280);
      }, 80);
    }
  }

  playEntry();
})();
