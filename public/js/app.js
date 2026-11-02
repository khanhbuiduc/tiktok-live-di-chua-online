// Logic Điều Khiển Giao Diện Đi Chùa Online (9:16) & Kết Nối Sự Kiện Thời Gian Thực

(function () {
  const stage = document.getElementById('stage-9x16');
  const channelLabel = document.getElementById('channel-label');
  const viewerCountEl = document.getElementById('viewer-count');
  const huongCountEl = document.getElementById('huong-count');
  const congDucCountEl = document.getElementById('congduc-count');
  const goMoCountEl = document.getElementById('gomo-count');

  const prayerScrollsLayer = document.getElementById('prayer-scrolls-layer');
  const honorLeftEl = document.getElementById('honor-left');
  const honorRightEl = document.getElementById('honor-right');
  const sideLeftEl = document.getElementById('side-left');
  const sideRightEl = document.getElementById('side-right');

  const centerSpeechBubble = document.getElementById('center-speech-bubble');
  const centerAvatar = document.getElementById('center-avatar');
  const centerName = document.getElementById('center-name');
  const centerAction = document.getElementById('center-action');

  const tickerText = document.getElementById('ticker-text');
  const leaderboardList = document.getElementById('leaderboard-list');
  const giftFlyZone = document.getElementById('gift-fly-zone');

  const bellVisual = document.getElementById('bell-visual');
  const bellRings = document.getElementById('bell-rings');
  const bellMeritAnchor = document.getElementById('bell-merit-anchor');

  const xinxamVisual = document.getElementById('xinxam-visual');
  const gomoVisual = document.getElementById('gomo-visual');
  const gomoMeritAnchor = document.getElementById('gomo-merit-anchor');

  const xinxamModal = document.getElementById('xinxam-modal');
  const queRankEl = document.getElementById('que-rank');
  const queTitleEl = document.getElementById('que-title');
  const queUserEl = document.getElementById('que-user');
  const quePoemEl = document.getElementById('que-poem');
  const queMeaningEl = document.getElementById('que-meaning');

  // Streamer Dock Elements
  const streamerDock = document.getElementById('streamer-dock');
  const toggleDockBtn = document.getElementById('toggle-dock-btn');
  const closeDockBtn = document.getElementById('close-dock-btn');
  const inputChannel = document.getElementById('input-channel');
  const btnConnect = document.getElementById('btn-connect');
  const connectionStatusMsg = document.getElementById('connection-status-msg');

  const btnToggleAudio = document.getElementById('btn-toggle-audio');
  const btnToggleTts = document.getElementById('btn-toggle-tts');
  const btnToggleAutoSim = document.getElementById('btn-toggle-autSIM');

  const simUsernameInput = document.getElementById('sim-username');
  const simCommentInput = document.getElementById('sim-comment');

  let autoSimEnabled = true;
  let modalTimer = null;

  // 1. Tự động co giãn khung 1080x1920 vừa khít mọi màn hình hoặc OBS Browser Source
  function fitStageToViewport() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.min(vw / 1080, vh / 1920);
    stage.style.transform = `scale(${scale})`;
  }
  window.addEventListener('resize', fitStageToViewport);
  fitStageToViewport();

  // Kiểm tra query params (?channel=...&hud=0)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('hud') === '0') {
    streamerDock.classList.add('hidden');
    toggleDockBtn.classList.add('hidden');
  }
  if (urlParams.get('channel')) {
    inputChannel.value = urlParams.get('channel');
  }

  // Mở khóa âm thanh khi click bất kỳ đâu trên trang
  window.addEventListener(
    'pointerdown',
    () => {
      window.templeAudio.initContext();
    },
    { once: true }
  );

  // Định dạng số kiểu Việt Nam (12.064)
  function formatNumber(num) {
    return Number(num || 0).toLocaleString('vi-VN');
  }

  // Tạo SVG Tiểu sư / Phật tử áo lam ngồi thiền
  function createMonkSvgHtml(isHonor = false) {
    const robeColor = isHonor ? '#475569' : '#64748b';
    const cushionColor = isHonor ? '#d97706' : '#b45309';
    return `
      <svg viewBox="0 0 100 115" class="monk-figure">
        <ellipse cx="50" cy="100" rx="38" ry="10" fill="${cushionColor}" stroke="#fbbf24" stroke-width="1.5" />
        <path d="M26 96 C23 68, 34 54, 50 54 C66 54, 77 68, 74 96 Z" fill="${robeColor}" stroke="#cbd5e1" stroke-width="1.2" />
        <path d="M40 56 L50 70 L60 56" fill="none" stroke="#e2e8f0" stroke-width="2" />
        <circle cx="50" cy="34" r="18" fill="#fed7aa" stroke="#d97706" stroke-width="1.2" />
      </svg>
    `;
  }

  // 2. Render trạng thái tổng & Hàng ghế Chư Tăng / Phật Tử + BXH
  function renderState(state) {
    if (!state) return;
    const ch =
      !state.channel || state.channel === 'chuaonline68'
        ? inputChannel?.value || 'dichua0nline'
        : state.channel;
    channelLabel.textContent = `LIVE @${ch}`;
    viewerCountEl.textContent = formatNumber(state.viewerCount);
    huongCountEl.textContent = formatNumber(state.huongCount);
    congDucCountEl.textContent = formatNumber(state.congDucCount);
    goMoCountEl.textContent = formatNumber(state.goMoCount);

    // Render Hàng Danh Dự Top 1 - Top 6
    const top6 = (state.topDevotees || []).slice(0, 6);
    const left3 = top6.slice(0, 3);
    const right3 = top6.slice(3, 6);

    honorLeftEl.innerHTML = left3
      .map(
        (d, idx) => `
        <div class="devotee-seat">
          ${createMonkSvgHtml(true)}
          <div class="devotee-nameplate">
            <span class="rank-circle">${idx + 1}</span>
            <span class="seat-nickname">${escapeHtml(d.nickname)}</span>
          </div>
        </div>
      `
      )
      .join('');

    honorRightEl.innerHTML = right3
      .map(
        (d, idx) => `
        <div class="devotee-seat">
          ${createMonkSvgHtml(true)}
          <div class="devotee-nameplate">
            <span class="rank-circle">${idx + 4}</span>
            <span class="seat-nickname">${escapeHtml(d.nickname)}</span>
          </div>
        </div>
      `
      )
      .join('');

    // Render 16 vị trí ngồi thiền hai bên thảm đỏ
    const side16 = (state.recentDevotees || []).slice(0, 16);
    const sideLeft8 = side16.slice(0, 8);
    const sideRight8 = side16.slice(8, 16);

    sideLeftEl.innerHTML = sideLeft8
      .map((d) => renderSideSeatHtml(d))
      .join('');
    sideRightEl.innerHTML = sideRight8
      .map((d) => renderSideSeatHtml(d))
      .join('');

    // Render BXH TẤM LÒNG THÀNH (Top 3 hiển thị gọn đẹp ở footer)
    const topLb = (state.topDevotees || []).slice(0, 3);
    leaderboardList.innerHTML = topLb
      .map(
        (d, i) => `
        <div class="lb-row">
          <div class="lb-left">
            <span class="rank-circle">${i + 1}</span>
            <span class="lb-name">${escapeHtml(d.nickname)}</span>
          </div>
          <span class="lb-score">${formatNumber(d.merit)}</span>
        </div>
      `
      )
      .join('');
  }

  function renderSideSeatHtml(devotee) {
    const initial = (devotee.nickname || 'T').charAt(0).toUpperCase();
    const avatarHtml = devotee.avatar
      ? `<img src="${escapeHtml(devotee.avatar)}" alt="" />`
      : initial;
    return `
      <div class="side-seat">
        ${createMonkSvgHtml(false)}
        <div class="devotee-nameplate">
          <span class="mini-avatar">${avatarHtml}</span>
          <span class="seat-nickname">${escapeHtml(devotee.nickname)}</span>
        </div>
      </div>
    `;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // 3. Cập nhật nhân vật hành lễ trung tâm & thanh Ticker
  function updateCenterWorshipper(user, actionLabel, speechText) {
    const nickname = user?.nickname || 'Thí Chủ Hữu Duyên';
    centerName.textContent = nickname;
    centerAction.textContent = actionLabel;
    if (speechText) {
      centerSpeechBubble.textContent = `"${speechText}"`;
    }
    if (user?.avatar) {
      centerAvatar.innerHTML = `<img src="${escapeHtml(user.avatar)}" alt="" />`;
    } else {
      centerAvatar.textContent = '🙏';
    }

    tickerText.innerHTML = `<strong>${escapeHtml(nickname)}</strong> — ${escapeHtml(actionLabel)}`;
  }

  // 4. Hiệu ứng Thẻ SỚ CẦU AN bay lên
  function spawnSoCauAnCard(user, comment) {
    const card = document.createElement('div');
    card.className = 'so-cau-an-card';

    // Vị trí ngẫu nhiên quanh trục giữa bàn thờ
    const randomLeft = 140 + Math.floor(Math.random() * 480);
    const randomBottom = 40 + Math.floor(Math.random() * 140);
    card.style.left = `${randomLeft}px`;
    card.style.bottom = `${randomBottom}px`;

    card.innerHTML = `
      <div class="so-header">📜 SỚ CẦU AN</div>
      <div class="so-user">🙏 ${escapeHtml(user?.nickname || 'Thí Chủ Hữu Duyên')}</div>
      <div class="so-prayer">"${escapeHtml(comment)}"</div>
    `;

    prayerScrollsLayer.appendChild(card);
    setTimeout(() => {
      card.remove();
    }, 6400);
  }

  // 5. Hiệu ứng chữ "+10 Công Đức" / "+15 Công Đức" bay lên
  function spawnFloatingMerit(anchorEl, text = '+10 Công Đức') {
    const el = document.createElement('div');
    el.className = 'floating-merit-text';
    el.textContent = text;
    anchorEl.appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }

  // 6. Hiệu ứng Thỉnh Đại Hồng Chung (Sóng âm tròn + Rung chuông)
  function triggerBellEffect(merit = 10) {
    bellVisual.classList.remove('shake-anim');
    void bellVisual.offsetWidth;
    bellVisual.classList.add('shake-anim');

    const ring = document.createElement('div');
    ring.className = 'bell-ring-wave';
    bellRings.appendChild(ring);
    setTimeout(() => ring.remove(), 1350);

    spawnFloatingMerit(bellMeritAnchor, `+${merit} Công Đức`);
    window.templeAudio.playBellSound();
  }

  // 7. Hiệu ứng Gõ Mõ
  function triggerGoMoEffect(merit = 15) {
    gomoVisual.classList.remove('shake-anim');
    void gomoVisual.offsetWidth;
    gomoVisual.classList.add('shake-anim');

    spawnFloatingMerit(gomoMeritAnchor, `+${merit} Công Đức`);
    window.templeAudio.playWoodenFishSound();
  }

  // 8. Hiệu ứng Quà Tặng bay lên góc trái
  function triggerGiftFlyEffect(giftName = 'Hoa Hồng', repeatCount = 1) {
    const item = document.createElement('div');
    item.className = 'flying-gift-item';
    item.innerHTML = `🌹 ${escapeHtml(giftName)} x${repeatCount}`;
    giftFlyZone.appendChild(item);
    setTimeout(() => item.remove(), 3200);
  }

  // 9. Hiệu ứng Mở Popup Quẻ Xăm (Giống hệt @chuaonline68)
  function showXinXamModal(user, que) {
    if (!que) return;
    xinxamVisual.classList.remove('shake-anim');
    void xinxamVisual.offsetWidth;
    xinxamVisual.classList.add('shake-anim');

    window.templeAudio.playShakeFortuneSound();

    queRankEl.textContent = que.rank || 'THƯỢNG THƯỢNG CÁT';
    queTitleEl.textContent = que.title;
    queUserEl.textContent = user?.nickname || 'Thí Chủ Hữu Duyên';
    quePoemEl.innerHTML = (que.poem || []).map((line) => `<p>${escapeHtml(line)}</p>`).join('');
    queMeaningEl.textContent = que.meaning || '';

    xinxamModal.classList.remove('hidden');

    window.templeAudio.speakVietnamese(
      `Thí chủ ${user?.nickname || 'hữu duyên'} rút được ${que.title}. ${que.meaning}`
    );

    if (modalTimer) clearTimeout(modalTimer);
    modalTimer = setTimeout(() => {
      xinxamModal.classList.add('hidden');
    }, 6500);
  }

  xinxamModal.addEventListener('click', () => {
    xinxamModal.classList.add('hidden');
  });

  // 10. Xử lý sự kiện từ Server-Sent Events (/api/events)
  function handleIncomingEvent(msg) {
    if (msg.state) {
      renderState(msg.state);
    }
    const { type, payload } = msg;
    if (!payload) return;

    if (type === 'chat') {
      spawnSoCauAnCard(payload.user, payload.comment);
      updateCenterWorshipper(payload.user, payload.actionLabel, payload.comment);
      window.templeAudio.playPrayerChime();
    } else if (type === 'like') {
      triggerGoMoEffect(payload.merit || 15);
      updateCenterWorshipper(
        payload.user,
        payload.actionLabel,
        'Nam Mô A Di Đà Phật, tâm thành gõ mõ tích công đức 🙏'
      );
    } else if (type === 'share') {
      triggerBellEffect(payload.merit || 10);
      updateCenterWorshipper(
        payload.user,
        payload.actionLabel,
        'Tiếng chuông chùa ngân vang, cầu quốc thái dân an, gia đạo bình an 🔔'
      );
    } else if (type === 'gift') {
      triggerGiftFlyEffect(payload.giftName, payload.repeatCount);
      triggerBellEffect(payload.merit || 50);
      updateCenterWorshipper(
        payload.user,
        payload.actionLabel,
        `Thành tâm dâng lễ ${payload.giftName}, nguyện cầu hồng ân Tam Bảo gia hộ 🙏`
      );
      if (payload.que) {
        showXinXamModal(payload.user, payload.que);
      }
    } else if (type === 'xinxam') {
      updateCenterWorshipper(
        payload.user,
        payload.actionLabel,
        payload.que?.meaning || 'Quẻ tối thượng cát tường, vạn sự viên thành!'
      );
      showXinXamModal(payload.user, payload.que);
    } else if (type === 'status') {
      connectionStatusMsg.textContent = `Trạng thái: ${payload.message}`;
    }
  }

  function connectSSE() {
    const es = new EventSource('/api/events');
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        handleIncomingEvent(data);
      } catch {
        // Ignore parse error
      }
    };
    es.onerror = () => {
      es.close();
      setTimeout(connectSSE, 3000);
    };
  }
  connectSSE();

  // Gửi hành động lên Server
  async function sendAction(action, extra = {}) {
    window.templeAudio.initContext();
    try {
      await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...extra })
      });
    } catch {
      // Ignore network error
    }
  }

  // Click trực tiếp lên 3 Pháp Khí trên màn hình
  document.getElementById('btn-instrument-bell').addEventListener('click', () => {
    sendAction('share', { nickname: simUsernameInput.value || 'Dy Tân' });
  });
  document.getElementById('btn-instrument-gomo').addEventListener('click', () => {
    sendAction('like', { nickname: simUsernameInput.value || 'Thí Chủ Hữu Duyên', likeCount: 1 });
  });
  document.getElementById('btn-instrument-xinxam').addEventListener('click', () => {
    sendAction('xinxam', { nickname: simUsernameInput.value || 'PHAT TOAN los Santos', forceTop: true });
  });

  // Các nút trong Bảng Điều Khiển Streamer
  toggleDockBtn.addEventListener('click', () => {
    streamerDock.classList.toggle('hidden');
  });
  closeDockBtn.addEventListener('click', () => {
    streamerDock.classList.add('hidden');
  });
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'h' && document.activeElement.tagName !== 'INPUT') {
      streamerDock.classList.toggle('hidden');
    }
  });

  btnConnect.addEventListener('click', async () => {
    const channel = inputChannel.value.trim();
    if (!channel) return;
    connectionStatusMsg.textContent = `Đang kết nối tới @${channel}...`;
    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel })
      });
      const data = await res.json();
      connectionStatusMsg.textContent = `Trạng thái: ${data.message}`;
    } catch (err) {
      connectionStatusMsg.textContent = `Lỗi kết nối: ${err.message}`;
    }
  });

  btnToggleAudio.addEventListener('click', () => {
    window.templeAudio.initContext();
    window.templeAudio.soundEnabled = !window.templeAudio.soundEnabled;
    btnToggleAudio.classList.toggle('active', window.templeAudio.soundEnabled);
    btnToggleAudio.textContent = window.templeAudio.soundEnabled
      ? '🔊 Bật Nhạc Thiền & Chuông Mõ'
      : '🔇 Đã Tắt Âm Thanh';
  });

  btnToggleTts.addEventListener('click', () => {
    window.templeAudio.ttsEnabled = !window.templeAudio.ttsEnabled;
    btnToggleTts.classList.toggle('active', window.templeAudio.ttsEnabled);
    btnToggleTts.textContent = window.templeAudio.ttsEnabled
      ? '🗣️ Giọng Đọc AI (TTS): BẬT'
      : '🗣️ Giọng Đọc AI (TTS): TẮT';
  });

  btnToggleAutoSim.addEventListener('click', () => {
    autoSimEnabled = !autoSimEnabled;
    btnToggleAutoSim.classList.toggle('active', autoSimEnabled);
    btnToggleAutoSim.textContent = autoSimEnabled
      ? '🤖 Tự Động Demo Phiên LIVE: BẬT'
      : '🤖 Tự Động Demo Phiên LIVE: TẮT';
  });

  document.getElementById('btn-sim-chat').addEventListener('click', () => {
    sendAction('chat', {
      nickname: simUsernameInput.value || 'Hong Nhung',
      comment: simCommentInput.value || 'Con cầu tất cả môn thi trên 7 🙏'
    });
  });

  document.getElementById('btn-sim-like').addEventListener('click', () => {
    sendAction('like', {
      nickname: simUsernameInput.value || 'gia.hung672',
      likeCount: 3
    });
  });

  document.getElementById('btn-sim-share').addEventListener('click', () => {
    sendAction('share', {
      nickname: simUsernameInput.value || 'Dy Tân'
    });
  });

  document.getElementById('btn-sim-gift').addEventListener('click', () => {
    sendAction('gift', {
      nickname: simUsernameInput.value || 'Hoàng Ngọc Trâm',
      giftName: 'Hoa Hồng',
      repeatCount: 1,
      diamondCount: 1
    });
  });

  document.getElementById('btn-sim-xinxam').addEventListener('click', () => {
    sendAction('xinxam', {
      nickname: simUsernameInput.value || 'PHAT TOAN los Santos',
      queNumber: 99
    });
  });

  // 11. Chế độ Tự Động Demo Sống Động (khi chưa có sự kiện thật hoặc để giữ nhiệt phòng LIVE)
  const samplePrayers = [
    { nickname: 'Hong Nhung', comment: 'Con cầu tất cả môn thi trên 7 🙏' },
    { nickname: 'gia.hung672', comment: 'A DI ĐÀ PHẬT 🙏 Cầu gia đình bình an' },
    { nickname: 'ht.', comment: '10đ toán, 10đ anh, 10đ văn 🙏' },
    { nickname: 'Smilebui', comment: 'Cầu gia đình mọi người đều bình an, mạnh khỏe' },
    { nickname: 'GEN Chovy', comment: 'Nam mô A Di Đà Phật, cầu tháng mới may mắn' },
    { nickname: 'Gái TVinh', comment: 'Nam mô Quan Thế Âm Bồ Tát 🙏' },
    { nickname: 'Việt Hà🔔', comment: 'Con cầu công việc thuận buồm xuôi gió, vượt KPI' },
    { nickname: 'Tài nguyễn 🩷', comment: 'Mô Phật, cầu cha mẹ bách niên giai lão' },
    { nickname: 'Anh Thư', comment: 'Hữu duyên tương ngộ nơi cửa Phật, cầu bình an 🙏' }
  ];

  setInterval(() => {
    if (!autoSimEnabled) return;
    const rand = Math.random();
    const pick = samplePrayers[Math.floor(Math.random() * samplePrayers.length)];

    if (rand < 0.55) {
      sendAction('chat', pick);
    } else if (rand < 0.8) {
      sendAction('like', { nickname: pick.nickname, likeCount: 2 });
    } else if (rand < 0.94) {
      sendAction('share', { nickname: pick.nickname });
    } else {
      sendAction('xinxam', { nickname: pick.nickname, forceTop: true });
    }
  }, 3200);

  // 12. Hiệu ứng Hạt Sáng Tâm Linh (Golden Bokeh Particles Canvas)
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  const particles = Array.from({ length: 55 }, () => ({
    x: Math.random() * 1080,
    y: Math.random() * 1920,
    r: 1.5 + Math.random() * 3.8,
    vy: -0.35 - Math.random() * 0.65,
    vx: (Math.random() - 0.5) * 0.4,
    alpha: 0.25 + Math.random() * 0.65
  }));

  function animateParticles() {
    ctx.clearRect(0, 0, 1080, 1920);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) {
        p.y = 1930;
        p.x = Math.random() * 1080;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(253, 224, 71, ${p.alpha})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
})();
