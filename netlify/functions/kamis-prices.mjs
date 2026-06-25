const KAMIS_BASE = 'https://www.kamis.or.kr/service/price/xml.do';

const WATCHLIST = [
  { name: '배추', prefixes: ['배추/'], exclude: ['양배추'], type: 'agri', market: '도매', regionLabel: '전국' },
  { name: '무', prefixes: ['무/'], type: 'agri', market: '도매', regionLabel: '전국' },
  { name: '양파', prefixes: ['양파/'], type: 'agri', market: '도매', regionLabel: '전국' },
  { name: '마늘', prefixes: ['깐마늘', '피마늘'], type: 'agri', market: '도매', regionLabel: '전국' },
  { name: '고등어', prefixes: ['고등어/'], type: 'fish', market: '수산', regionLabel: '전국' },
  { name: '오징어', prefixes: ['물오징어/'], type: 'fish', market: '수산', regionLabel: '전국' },
  { name: '갈치', prefixes: ['갈치/'], type: 'fish', market: '수산', regionLabel: '전국' },
  { name: '김', prefixes: ['김/'], type: 'fish', market: '수출', regionLabel: '전남' }
];

const REGIONS = [
  { name: '수도권', code: '1101', key: 'seoul' },
  { name: '강원', code: '3214', key: 'gangwon' },
  { name: '충청', code: '2501', key: 'chungcheong' },
  { name: '호남', code: '3511', key: 'honam' },
  { name: '영남', code: '2100', key: 'yeongnam' },
  { name: '제주', code: '3911', key: 'jeju' }
];

const REGION_TRACKERS = ['배추/', '무/', '양파/'];

let cache = { payload: null, expiresAt: 0 };
const CACHE_MS = 30 * 60 * 1000;

function getKstToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date());
}

function normalizeSurveyDay(value) {
  if (!value) return null;
  return String(value).slice(0, 10);
}

function isSurveyToday(surveyDay) {
  const normalized = normalizeSurveyDay(surveyDay);
  return Boolean(normalized && normalized === getKstToday());
}

function isSuccess(code) {
  return code === '000' || code === '0' || code === 0;
}

function extractPriceItems(payload) {
  const price = payload?.price;
  if (!price) return [];
  return Array.isArray(price) ? price : [price];
}

function parseNumber(value) {
  if (value == null || value === '-') return null;
  const parsed = Number(String(value).replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function mapDirection(code) {
  if (code === '1') return 'up';
  if (code === '0') return 'down';
  return 'flat';
}

function formatChange(value, direction) {
  if (direction === 'flat') return '보합';
  const parsed = parseNumber(value);
  if (parsed == null) return '보합';
  const sign = parsed > 0 ? '+' : '';
  return `${sign}${parsed}%`;
}

function formatPrice(dpr1, unit) {
  const amount = parseNumber(dpr1);
  if (amount == null) return String(dpr1 || '-');
  const unitLabel = unit ? `/${unit}` : '';
  return `${amount.toLocaleString('ko-KR')}원${unitLabel}`;
}

function clsCode(item) {
  const code = item?.product_cls_code;
  return String(Array.isArray(code) ? code[0] : code);
}

function itemLabel(item) {
  return String(item.item_name || item.productName || '');
}

function formatDate(value) {
  const normalized = normalizeSurveyDay(value);
  if (!normalized) {
    return getKstToday().replace(/-/g, '.');
  }
  return normalized.replace(/-/g, '.');
}

function noteFromDirection(direction) {
  if (direction === 'up') return '전일 대비 상승';
  if (direction === 'down') return '전일 대비 하락';
  return '전일 대비 보합';
}

async function fetchKamis(action, extraParams = {}) {
  const certKey = process.env.KAMIS_CERT_KEY || 'test';
  const certId = process.env.KAMIS_CERT_ID || 'test';
  const usingDemoCredentials = !process.env.KAMIS_CERT_KEY || !process.env.KAMIS_CERT_ID;

  const url = new URL(KAMIS_BASE);
  url.searchParams.set('action', action);
  url.searchParams.set('p_cert_key', certKey);
  url.searchParams.set('p_cert_id', certId);
  url.searchParams.set('p_returntype', 'json');

  Object.entries(extraParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: { Accept: 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`KAMIS API HTTP ${response.status}`);
  }

  const payload = await response.json();
  return { payload, usingDemoCredentials };
}

function matchesWatch(item, watch) {
  const label = itemLabel(item);
  if (watch.exclude?.some(prefix => label.startsWith(prefix))) return false;
  return watch.prefixes.some(prefix => label.startsWith(prefix) || label.includes(prefix));
}

function pickWholesaleItem(items, watch) {
  const wholesale = items.filter(item => clsCode(item) === '02');
  const wholesaleMatch = wholesale.find(item => matchesWatch(item, watch));
  if (wholesaleMatch) return wholesaleMatch;

  const retail = items.filter(item => clsCode(item) === '01');
  return retail.find(item => matchesWatch(item, watch));
}

function buildCommodity(item, watch) {
  const direction = mapDirection(String(item.direction ?? '2'));
  const change = formatChange(item.value, direction);

  return {
    name: watch.name,
    type: watch.type,
    market: watch.market,
    price: formatPrice(item.dpr1, item.unit),
    change,
    direction,
    note: noteFromDirection(direction)
  };
}

function buildTableItem(item, watch) {
  const direction = mapDirection(String(item.direction ?? '2'));

  return {
    name: watch.name,
    region: watch.regionLabel,
    price: formatPrice(item.dpr1, item.unit),
    change: formatChange(item.value, direction),
    direction
  };
}

function buildRegionalIndex(items) {
  const tracked = items
    .filter(item => clsCode(item) === '02')
    .filter(item => REGION_TRACKERS.some(prefix => itemLabel(item).startsWith(prefix)));

  if (!tracked.length) return 100;

  const values = tracked
    .map(item => parseNumber(item.value))
    .filter(value => value != null);

  if (!values.length) return 100;

  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.round((100 + average) * 10) / 10;
}

function buildSummaryCopy(commodities, surveyDay) {
  const up = commodities.filter(item => item.direction === 'up').length;
  const down = commodities.filter(item => item.direction === 'down').length;
  const dayText = isSurveyToday(surveyDay)
    ? '당일 조사 기준'
    : `최근 조사일(${formatDate(surveyDay)}) 기준`;

  if (up > down) {
    return `aT KAMIS ${dayText}, 전일 대비 상승 품목(${up}개)이 우세합니다.`;
  }
  if (down > up) {
    return `aT KAMIS ${dayText}, 전일 대비 하락 품목(${down}개)이 우세합니다.`;
  }
  return `aT KAMIS ${dayText}, 주요 품목 가격이 전일 대비 혼조세를 보이고 있습니다.`;
}

function buildBriefing(commodities, surveyDay) {
  const movers = [...commodities]
    .filter(item => item.direction !== 'flat')
    .sort((a, b) => Math.abs(parseNumber(b.change)) - Math.abs(parseNumber(a.change)));

  const top = movers.slice(0, 2).map(item => item.name);
  const dayText = isSurveyToday(surveyDay) ? '당일' : formatDate(surveyDay);
  const title = top.length
    ? `${top.join('·')} ${dayText} 시세 변동 주목`
    : '주요 농수산물 가격 보합권, 수급 흐름 점검 필요';

  const upCount = commodities.filter(item => item.direction === 'up').length;
  const downCount = commodities.filter(item => item.direction === 'down').length;
  const temperature = Math.min(95, 55 + upCount * 6 + downCount * 2);

  return {
    title,
    summary: `aT KAMIS ${dayText} 조사 시세를 기준으로 주요 품목 ${commodities.length}개의 도매 가격을 홈 화면에 반영했습니다.`,
    points: [
      `상승 ${upCount}개 · 하락 ${downCount}개 · 보합 ${commodities.length - upCount - downCount}개`,
      movers[0] ? `${movers[0].name} ${movers[0].change} (${movers[0].price})` : '대표 품목 변동폭 확인 중',
      '출처: aT 농산물유통정보(KAMIS) Open API'
    ],
    temperature
  };
}

async function buildMarketPayload() {
  const { payload: salesPayload, usingDemoCredentials } = await fetchKamis('dailySalesList');
  const salesCode = salesPayload?.error_code ?? salesPayload?.result_code;

  if (!isSuccess(salesCode)) {
    throw new Error(`KAMIS dailySalesList 오류: ${salesCode}`);
  }

  const salesItems = extractPriceItems(salesPayload);
  const commodities = [];
  const tableItems = [];
  let referenceDay = null;

  WATCHLIST.forEach(watch => {
    const item = pickWholesaleItem(salesItems, watch);
    if (!item) return;
    const surveyDay = normalizeSurveyDay(item.lastest_day);
    if (surveyDay && (!referenceDay || surveyDay > referenceDay)) {
      referenceDay = surveyDay;
    }
    commodities.push(buildCommodity(item, watch));
    tableItems.push(buildTableItem(item, watch));
  });

  if (!commodities.length) {
    throw new Error('KAMIS에서 표시할 품목 데이터를 찾지 못했습니다.');
  }

  const regionResults = await Promise.all(
    REGIONS.map(async region => {
      try {
        const { payload } = await fetchKamis('dailyCountyList', { p_countycode: region.code });
        const code = payload?.error_code ?? payload?.result_code;
        if (!isSuccess(code)) return { name: region.name, index: 100, key: region.key };

        const index = buildRegionalIndex(extractPriceItems(payload));
        return { name: region.name, index, key: region.key };
      } catch {
        return { name: region.name, index: 100, key: region.key };
      }
    })
  );

  const nationalIndex = Math.round(
    (regionResults.reduce((sum, region) => sum + region.index, 0) / regionResults.length) * 10
  ) / 10;

  const referenceDate = formatDate(referenceDay);
  const surveyToday = isSurveyToday(referenceDay);
  const briefing = buildBriefing(commodities, referenceDay);
  const regionalIndexes = Object.fromEntries(
    regionResults.map(region => [region.key, region.index.toFixed(1)])
  );

  return {
    ok: true,
    source: 'kamis',
    usingDemoCredentials,
    updatedAt: new Date().toISOString(),
    nationalPriceIndex: {
      date: referenceDate,
      dateLabel: surveyToday ? '당일 시세' : '최근 조사일',
      surveyDate: referenceDay,
      isSurveyToday: surveyToday,
      index: nationalIndex,
      copy: buildSummaryCopy(commodities, referenceDay),
      regions: regionResults.map(({ name, index }) => ({ name, index })),
      items: tableItems.slice(0, 6)
    },
    commodities,
    briefing,
    regionalIndexes
  };
}

export const handler = async () => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=300'
  };

  try {
    if (cache.payload && Date.now() < cache.expiresAt) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ...cache.payload, cached: true })
      };
    }

    const payload = await buildMarketPayload();
    cache = { payload, expiresAt: Date.now() + CACHE_MS };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(payload)
    };
  } catch (error) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({
        ok: false,
        error: error.message || 'KAMIS 시세를 불러오지 못했습니다.'
      })
    };
  }
};
