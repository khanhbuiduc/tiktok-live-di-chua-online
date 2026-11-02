import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const DEFAULT_CHANNEL = process.env.TIKTOK_CHANNEL || 'dichua0nline';

const PUBLIC_DIR = path.join(__dirname, 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');
const DATA_DIR = path.join(__dirname, 'data');
const STATE_FILE = path.join(DATA_DIR, 'state.json');
const QUE_XAM_FILE = path.join(DATA_DIR, 'que_xam.json');
const GENERATED_BG_ARTIFACT =
  '/home/laptop-khanh/.gemini/antigravity/brain/f5d608cb-42b6-4cea-8b04-c9c65099956c/chua_linh_ung_bg_1793633042803.jpg';
const LOCAL_BG_FILE = path.join(ASSETS_DIR, 'chua_linh_ung_bg.jpg');
const GENERATED_AVATAR_ARTIFACT =
  '/home/laptop-khanh/.gemini/antigravity/brain/f5d608cb-42b6-4cea-8b04-c9c65099956c/chua_online_avatar_1793634979003.jpg';
const LOCAL_AVATAR_FILE = path.join(ASSETS_DIR, 'chua_online_avatar.jpg');

// Ensure directories exist and copy generated temple background if available
fs.mkdirSync(ASSETS_DIR, { recursive: true });
fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(LOCAL_BG_FILE) && fs.existsSync(GENERATED_BG_ARTIFACT)) {
  try {
    fs.copyFileSync(GENERATED_BG_ARTIFACT, LOCAL_BG_FILE);
    console.log('[Assets] Copied generated 9:16 temple background to public/assets/chua_linh_ung_bg.jpg');
  } catch (err) {
    console.warn('[Assets] Could not copy background artifact:', err.message);
  }
}
if (!fs.existsSync(LOCAL_AVATAR_FILE) && fs.existsSync(GENERATED_AVATAR_ARTIFACT)) {
  try {
    fs.copyFileSync(GENERATED_AVATAR_ARTIFACT, LOCAL_AVATAR_FILE);
  } catch {
    // ignore
  }
}

// Load fortune sticks (Quẻ Xăm)
let queXamList = [];
try {
  queXamList = JSON.parse(fs.readFileSync(QUE_XAM_FILE, 'utf8'));
} catch (err) {
  console.warn('[Data] Fallback default Quẻ Xăm loaded:', err.message);
  queXamList = [
    {
      number: 99,
      rank: 'THƯỢNG THƯỢNG CÁT',
      title: 'Quẻ Số 99 — Vạn Sự Viên Thành — Cửu Cửu Đại Cát',
      poem: [
        'Chín tầng mây trắng ánh hào quang',
        'Từ bi Phật Tổ độ nhân gian',
        'Thí chủ lòng thành dâng lễ bái',
        'Trọn đời trường thọ hưởng vinh khang.'
      ],
      meaning: 'Quẻ tối thượng cát tường. Sức khỏe trường thọ, công danh hiển đạt, vạn sự viên thành.'
    }
  ];
}

// Initial / Persistent State matching @chuaonline68
const defaultState = {
  channel: DEFAULT_CHANNEL,
  isConnected: false,
  connectionStatus: 'idle',
  viewerCount: 193,
  huongCount: 12064,
  congDucCount: 418243,
  goMoCount: 91890,
  leaderboard: {
    'tran_minh_quan': {
      uniqueId: 'tran_minh_quan',
      nickname: 'Trần Minh Quân',
      avatar: '',
      merit: 19410
    },
    'dieu_thao_t': {
      uniqueId: 'dieu_thao_t',
      nickname: 'Diệu Thảo T...',
      avatar: '',
      merit: 15280
    },
    'ngoc_anh_n': {
      uniqueId: 'ngoc_anh_n',
      nickname: 'Ngọc Anh N...',
      avatar: '',
      merit: 12850
    },
    'pham_thanh': {
      uniqueId: 'pham_thanh',
      nickname: 'Phạm Thanh...',
      avatar: '',
      merit: 10420
    },
    'duc_tran': {
      uniqueId: 'duc_tran',
      nickname: 'Đức Trần',
      avatar: '',
      merit: 8940
    },
    'vu_duc_thinh': {
      uniqueId: 'vu_duc_thinh',
      nickname: 'Vũ Đức Thịnh',
      avatar: '',
      merit: 7650
    }
  },
  recentDevotees: [
    { uniqueId: 'quynh_finn', nickname: 'Quỳnh_Finn', avatar: '' },
    { uniqueId: 'na_skibidi', nickname: 'na skibidi', avatar: '' },
    { uniqueId: 'le_hoang_n', nickname: 'Lê Hoàng N...', avatar: '' },
    { uniqueId: 'chichi99', nickname: 'Chichi', avatar: '' },
    { uniqueId: 'hong_nhung', nickname: 'Hong Nhung', avatar: '' },
    { uniqueId: 'gia_hung672', nickname: 'gia.hung672', avatar: '' },
    { uniqueId: 'anh_thu_10', nickname: 'Anh Thư', avatar: '' },
    { uniqueId: 'gen_chovy', nickname: 'GEN Chovy', avatar: '' },
    { uniqueId: 'gai_tvinh', nickname: 'Gái TVinh', avatar: '' },
    { uniqueId: 'dy_tan', nickname: 'Dy Tân', avatar: '' },
    { uniqueId: 'tai_nguyen', nickname: 'Tài nguyễn 🩷', avatar: '' },
    { uniqueId: 'hoang_ngoc_tram', nickname: 'Hoàng Ngọc Trâm', avatar: '' },
    { uniqueId: 'viet_ha', nickname: 'Việt Hà🔔', avatar: '' },
    { uniqueId: 'smilebui', nickname: 'Smilebui', avatar: '' },
    { uniqueId: 'thao_pham', nickname: 'ThaoPham0705', avatar: '' },
    { uniqueId: 'bobimnghean', nickname: 'bobimnghean', avatar: '' }
  ]
};

let state = structuredClone(defaultState);
if (fs.existsSync(STATE_FILE)) {
  try {
    const saved = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    if (saved.channel === 'chuaonline68') {
      saved.channel = DEFAULT_CHANNEL;
    }
    state = { ...state, ...saved, isConnected: false, connectionStatus: 'idle' };
  } catch (err) {
    console.warn('[State] Failed to parse state.json, using default:', err.message);
  }
}

function saveState() {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    // Ignore write errors
  }
}

function getTopLeaderboard(limit = 10) {
  return Object.values(state.leaderboard)
    .sort((a, b) => b.merit - a.merit)
    .slice(0, limit);
}

function getPublicState() {
  return {
    channel: state.channel,
    isConnected: state.isConnected,
    connectionStatus: state.connectionStatus,
    viewerCount: state.viewerCount,
    huongCount: state.huongCount,
    congDucCount: state.congDucCount,
    goMoCount: state.goMoCount,
    topDevotees: getTopLeaderboard(10),
    recentDevotees: state.recentDevotees.slice(0, 16)
  };
}

// SSE Clients Registry
const sseClients = new Set();

function broadcast(eventType, payload) {
  const data = JSON.stringify({
    type: eventType,
    payload,
    state: getPublicState(),
    timestamp: Date.now()
  });
  const message = `data: ${data}\n\n`;
  for (const res of sseClients) {
    try {
      res.write(message);
    } catch {
      sseClients.delete(res);
    }
  }
}

function registerDevotee(user, meritDelta = 10) {
  const uniqueId = (user.uniqueId || user.nickname || 'thi_chu').toLowerCase();
  const nickname = user.nickname || user.uniqueId || 'Thí Chủ Hữu Duyên';
  const avatar = user.avatar || '';

  state.congDucCount += meritDelta;

  if (!state.leaderboard[uniqueId]) {
    state.leaderboard[uniqueId] = {
      uniqueId,
      nickname,
      avatar,
      merit: 0
    };
  }
  state.leaderboard[uniqueId].nickname = nickname;
  if (avatar) state.leaderboard[uniqueId].avatar = avatar;
  state.leaderboard[uniqueId].merit += meritDelta;

  // Put in recent devotees if not in top 6
  const existingIdx = state.recentDevotees.findIndex((d) => d.uniqueId === uniqueId);
  if (existingIdx !== -1) {
    state.recentDevotees.splice(existingIdx, 1);
  }
  state.recentDevotees.unshift({ uniqueId, nickname, avatar });
  if (state.recentDevotees.length > 24) {
    state.recentDevotees.length = 24;
  }
}

function pickRandomQueXam(forceTop = false) {
  const pool = forceTop
    ? queXamList.filter((q) => q.rank === 'THƯỢNG THƯỢNG CÁT')
    : queXamList;
  const list = pool.length > 0 ? pool : queXamList;
  return list[Math.floor(Math.random() * list.length)];
}

// Unified handler for temple events (both real TikTok Live & simulated actions)
function handleTempleInteraction(actionType, data = {}) {
  const user = {
    uniqueId: data.uniqueId || 'thi_chu_' + Math.floor(Math.random() * 999),
    nickname: data.nickname || 'Thí Chủ Hữu Duyên',
    avatar: data.avatar || ''
  };

  if (actionType === 'chat') {
    const comment = (data.comment || 'Nam Mô A Di Đà Phật, cầu bình an may mắn 🙏').trim();
    const merit = 10;
    state.huongCount += 1;
    registerDevotee(user, merit);

    // Check if comment explicitly asks for Xin Xăm / Rút Quẻ
    const lower = comment.toLowerCase();
    const wantsQue =
      lower.includes('xin xăm') ||
      lower.includes('xin quẻ') ||
      lower.includes('rút quẻ') ||
      lower.includes('gieo quẻ');

    broadcast('chat', {
      user,
      comment,
      merit,
      actionLabel: `Cầu phúc (+${merit} CĐ)`
    });

    if (wantsQue) {
      const que = pickRandomQueXam(false);
      broadcast('xinxam', {
        user,
        que,
        merit: 20,
        actionLabel: `🎋 Quẻ số ${que.number} (${que.rank})`
      });
    }
  } else if (actionType === 'like') {
    const likeCount = Math.min(Math.max(Number(data.likeCount) || 1, 1), 15);
    const merit = 15;
    state.goMoCount += likeCount;
    registerDevotee(user, merit);

    broadcast('like', {
      user,
      likeCount,
      merit,
      actionLabel: `🪵 Gõ Mõ (+${merit} CĐ)`
    });
  } else if (actionType === 'share') {
    const merit = 10;
    registerDevotee(user, merit);

    broadcast('share', {
      user,
      merit,
      actionLabel: `🔔 Thỉnh Đại Hồng Chung (+${merit} CĐ)`
    });
  } else if (actionType === 'gift') {
    const giftName = data.giftName || 'Hoa Hồng';
    const repeatCount = Math.max(Number(data.repeatCount) || 1, 1);
    const diamondCount = Math.max(Number(data.diamondCount) || 1, 1);
    const totalCoins = diamondCount * repeatCount;
    const merit = Math.max(totalCoins * 50, 50);

    state.huongCount += repeatCount;
    registerDevotee(user, merit);

    const que = pickRandomQueXam(totalCoins >= 10);

    broadcast('gift', {
      user,
      giftName,
      repeatCount,
      diamondCount,
      totalCoins,
      merit,
      que,
      actionLabel: `🌹 Dâng ${giftName} x${repeatCount} (+${merit} CĐ)`
    });
  } else if (actionType === 'xinxam') {
    const merit = 20;
    registerDevotee(user, merit);
    const que = data.queNumber
      ? queXamList.find((q) => q.number === Number(data.queNumber)) || pickRandomQueXam(true)
      : pickRandomQueXam(Boolean(data.forceTop));

    broadcast('xinxam', {
      user,
      que,
      merit,
      actionLabel: `🎋 Quẻ số ${que.number} (${que.rank})`
    });
  } else if (actionType === 'member' || actionType === 'follow') {
    const merit = 5;
    registerDevotee(user, merit);
    broadcast('member', {
      user,
      merit,
      actionLabel: `🙏 Hữu duyên nhập tự (+${merit} CĐ)`
    });
  }

  saveState();
}

// TikTok-Live-Connector Integration
let tiktokConnection = null;
let connectorModule = null;

async function loadTikTokConnector() {
  if (connectorModule) return connectorModule;
  const candidatePaths = [
    path.join(__dirname, 'TikTok-Live-Connector', 'dist', 'index.js'),
    'tiktok-live-connector'
  ];

  for (const modPath of candidatePaths) {
    try {
      connectorModule = await import(modPath);
      console.log(`[TikTok-Live-Connector] Loaded successfully from ${modPath}`);
      return connectorModule;
    } catch {
      // Try next path
    }
  }
  return null;
}

function extractUserFromEvent(eventData) {
  const u = eventData?.user || eventData || {};
  const avatar =
    u?.profilePicture?.url?.[0] ||
    u?.profilePictureUrl ||
    u?.avatarThumb?.urlList?.[0] ||
    '';
  return {
    uniqueId: u.uniqueId || u.displayId || 'thi_chu',
    nickname: u.nickname || u.uniqueId || 'Thí Chủ Hữu Duyên',
    avatar
  };
}

async function connectToTikTokLive(channelName) {
  const cleanChannel = String(channelName || DEFAULT_CHANNEL)
    .trim()
    .replace(/^@/, '');

  if (tiktokConnection) {
    try {
      await tiktokConnection.disconnect();
    } catch {
      // Ignore disconnect error
    }
    tiktokConnection = null;
  }

  state.channel = cleanChannel;
  state.connectionStatus = 'connecting';
  state.isConnected = false;
  broadcast('status', {
    status: 'connecting',
    message: `Đang kết nối tới phòng LIVE @${cleanChannel}...`
  });

  const mod = await loadTikTokConnector();
  if (!mod || !mod.TikTokLiveConnection) {
    state.connectionStatus = 'simulation_only';
    state.isConnected = false;
    const msg =
      'Chưa build thư viện TikTok-Live-Connector/dist. Hệ thống đang chạy ở chế độ Giả Lập Tương Tác (chạy `npm run setup:connector` để bật kết nối TikTok trực tiếp).';
    broadcast('status', { status: 'simulation_only', message: msg });
    return { ok: false, status: 'simulation_only', message: msg };
  }

  const { TikTokLiveConnection, WebcastEvent, ControlEvent } = mod;

  try {
    tiktokConnection = new TikTokLiveConnection(cleanChannel, {
      processInitialData: true,
      fetchRoomInfoOnConnect: true,
      enableExtendedGiftInfo: true
    });

    const CHAT_EVENT = WebcastEvent?.CHAT || 'chat';
    const LIKE_EVENT = WebcastEvent?.LIKE || 'like';
    const SHARE_EVENT = WebcastEvent?.SHARE || 'share';
    const GIFT_EVENT = WebcastEvent?.GIFT || 'gift';
    const MEMBER_EVENT = WebcastEvent?.MEMBER || 'member';
    const FOLLOW_EVENT = WebcastEvent?.FOLLOW || 'follow';
    const ROOM_USER_EVENT = WebcastEvent?.ROOM_USER || 'roomUser';
    const DISCONNECTED_EVENT = ControlEvent?.DISCONNECTED || 'disconnected';
    const ERROR_EVENT = ControlEvent?.ERROR || 'error';

    tiktokConnection.on(CHAT_EVENT, (data) => {
      const user = extractUserFromEvent(data);
      handleTempleInteraction('chat', {
        ...user,
        comment: data.comment || ''
      });
    });

    tiktokConnection.on(LIKE_EVENT, (data) => {
      const user = extractUserFromEvent(data);
      handleTempleInteraction('like', {
        ...user,
        likeCount: data.likeCount || 1
      });
    });

    tiktokConnection.on(SHARE_EVENT, (data) => {
      const user = extractUserFromEvent(data);
      handleTempleInteraction('share', user);
    });

    tiktokConnection.on(GIFT_EVENT, (data) => {
      // Avoid duplicate triggers on streakable gifts until streak ends or immediate trigger
      if (data.giftType === 1 && !data.repeatEnd) {
        return;
      }
      const user = extractUserFromEvent(data);
      handleTempleInteraction('gift', {
        ...user,
        giftName: data.giftDetails?.giftName || data.giftName || 'Lễ Vật',
        repeatCount: data.repeatCount || 1,
        diamondCount: data.giftDetails?.diamondCount || data.diamondCount || 1
      });
    });

    tiktokConnection.on(MEMBER_EVENT, (data) => {
      const user = extractUserFromEvent(data);
      handleTempleInteraction('member', user);
    });

    tiktokConnection.on(FOLLOW_EVENT, (data) => {
      const user = extractUserFromEvent(data);
      handleTempleInteraction('follow', user);
    });

    tiktokConnection.on(ROOM_USER_EVENT, (data) => {
      if (typeof data.viewerCount === 'number') {
        state.viewerCount = data.viewerCount;
        broadcast('roomUser', { viewerCount: state.viewerCount });
      }
    });

    tiktokConnection.on(DISCONNECTED_EVENT, () => {
      state.isConnected = false;
      state.connectionStatus = 'disconnected';
      broadcast('status', {
        status: 'disconnected',
        message: `Đã ngắt kết nối khỏi @${cleanChannel}`
      });
    });

    tiktokConnection.on(ERROR_EVENT, (err) => {
      console.warn('[TikTokLive] Error event:', err?.message || err);
    });

    const roomState = await tiktokConnection.connect();
    state.isConnected = true;
    state.connectionStatus = 'connected';
    if (roomState?.roomInfo?.user_count) {
      state.viewerCount = roomState.roomInfo.user_count;
    }

    const msg = `Đã kết nối trực tiếp tới TikTok LIVE @${cleanChannel} (Room ID: ${roomState?.roomId || 'Active'})`;
    console.log(`[TikTokLive] ${msg}`);
    broadcast('status', { status: 'connected', message: msg });
    return { ok: true, status: 'connected', roomId: roomState?.roomId, message: msg };
  } catch (err) {
    state.isConnected = false;
    state.connectionStatus = 'error';
    const errMsg = `Không thể kết nối tới @${cleanChannel}: ${err?.message || err}`;
    console.warn('[TikTokLive]', errMsg);
    broadcast('status', { status: 'error', message: errMsg });
    return { ok: false, status: 'error', message: errMsg };
  }
}

// MIME types for static serving
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function parseJsonBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // CORS headers for OBS / local widgets
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // SSE Endpoint
  if (pathname === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive'
    });
    res.write(
      `data: ${JSON.stringify({
        type: 'init',
        payload: { queXamCount: queXamList.length },
        state: getPublicState(),
        timestamp: Date.now()
      })}\n\n`
    );
    sseClients.add(res);
    req.on('close', () => {
      sseClients.delete(res);
    });
    return;
  }

  // State & Quẻ Xăm API
  if (pathname === '/api/state' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, state: getPublicState(), queXamList }));
    return;
  }

  // Connect to TikTok Live Channel API
  if (pathname === '/api/connect' && req.method === 'POST') {
    const body = await parseJsonBody(req);
    const result = await connectToTikTokLive(body.channel || state.channel);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ...result, state: getPublicState() }));
    return;
  }

  // Disconnect API
  if (pathname === '/api/disconnect' && req.method === 'POST') {
    if (tiktokConnection) {
      try {
        await tiktokConnection.disconnect();
      } catch {
        // ignore
      }
      tiktokConnection = null;
    }
    state.isConnected = false;
    state.connectionStatus = 'disconnected';
    broadcast('status', { status: 'disconnected', message: 'Đã ngắt kết nối TikTok LIVE.' });
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, state: getPublicState() }));
    return;
  }

  // Trigger / Simulate Action API
  if (pathname === '/api/action' && req.method === 'POST') {
    const body = await parseJsonBody(req);
    const actionType = body.action || 'chat';
    handleTempleInteraction(actionType, body);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, state: getPublicState() }));
    return;
  }

  // Fallback for generated background image if requested
  if (pathname === '/assets/chua_linh_ung_bg.jpg') {
    const imgPath = fs.existsSync(LOCAL_BG_FILE) ? LOCAL_BG_FILE : GENERATED_BG_ARTIFACT;
    if (fs.existsSync(imgPath)) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      fs.createReadStream(imgPath).pipe(res);
      return;
    }
  }

  // Static files in /public
  const safePath = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.normalize(path.join(PUBLIC_DIR, safePath));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log('==================================================================');
  console.log('🙏 ĐI CHÙA ONLINE - CHÙA LINH ỨNG (TikTok LIVE 9:16 Interactive)');
  console.log(`🌐 Giao diện LIVE / OBS Browser Source: http://localhost:${PORT}`);
  console.log(`📡 Kênh TikTok mặc định: @${state.channel}`);
  console.log('==================================================================');

  if (process.env.AUTO_CONNECT === '1') {
    connectToTikTokLive(state.channel);
  }
});
