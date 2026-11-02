// Hệ thống Âm Thanh Tâm Linh (Web Audio API Synthesizer + Web Speech TTS)
// Không phụ thuộc file MP3 ngoài — hoạt động 100% trên mọi trình duyệt & OBS Browser Source

class TempleAudioEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.ttsEnabled = true;
    this.ambientTimer = null;
    this.isUnlocked = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.isUnlocked = true;
    this.startAmbientMeditationDrone();
  }

  // Tiếng Đại Hồng Chung (Chuông Chùa Ngân Vang Trầm Hùng)
  playBellSound() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Các tần số bồi âm đặc trưng của Đại Hồng Chung đồng
    const partials = [
      { freq: 174, gain: 0.35, decay: 4.8 },
      { freq: 261.6, gain: 0.25, decay: 4.2 },
      { freq: 348, gain: 0.18, decay: 3.5 },
      { freq: 528, gain: 0.14, decay: 2.9 },
      { freq: 696, gain: 0.08, decay: 2.1 },
      { freq: 1046.5, gain: 0.04, decay: 1.4 }
    ];

    partials.forEach((p) => {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(p.freq, now);

      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(p.gain, now + 0.025);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + p.decay + 0.05);
    });
  }

  // Tiếng Mõ Gỗ ("Cốc! Cốc!" thanh tịnh)
  playWoodenFishSound() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gainNode = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(390, now + 0.09);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(580, now);
    filter.Q.setValueAtTime(6.0, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.45, now + 0.006);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Tiếng Chuông Bát / Chuông Nhỏ khi Dâng Sớ Cầu An
  playPrayerChime() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [528, 792, 1056].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.04);
      gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), now + idx * 0.04 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.04);
      osc.stop(now + 1.9);
    });
  }

  // Tiếng Lắc Ống Xăm Tre ("Xập xình... xập xình...")
  playShakeFortuneSound() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.playWoodenFishSound();
      }, i * 110);
    }
    setTimeout(() => {
      this.playBellSound();
    }, 600);
  }

  // Nhạc Thiền Định Nền (Pentatonic Singing Bowl Ambient)
  startAmbientMeditationDrone() {
    if (this.ambientTimer) return;
    const pentatonicNotes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
    this.ambientTimer = setInterval(() => {
      if (!this.soundEnabled || !this.ctx || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      const note = pentatonicNotes[Math.floor(Math.random() * pentatonicNotes.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 5.6);
    }, 4200);
  }

  // Giọng Đọc AI Tiếng Việt (Web Speech API)
  speakVietnamese(text) {
    if (!this.ttsEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'vi-VN';
      utter.rate = 0.95;
      utter.pitch = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find((v) => v.lang && v.lang.toLowerCase().includes('vi'));
      if (viVoice) utter.voice = viVoice;
      window.speechSynthesis.speak(utter);
    } catch {
      // Ignore speech errors
    }
  }
}

window.templeAudio = new TempleAudioEngine();
