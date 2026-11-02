# 🙏 ĐI CHÙA ONLINE — Chùa Linh Ứng (TikTok LIVE Interactive 9:16)

Dự án **Đi Chùa Online (`@dichua0nline`)** — Ứng dụng tương tác trực tiếp (Interactive Livestream) tỉ lệ dọc `9:16` (`1080x1920`) phát sóng trên **TikTok LIVE Studio / OBS Studio**, tích hợp thư viện `TikTok-Live-Connector` (v2.5.0).

---

## ✨ Tính Năng Nổi Bật

- **Giao diện Chính Điện Chùa Linh Ứng `9:16` (`1080x1920`):**
  - Tượng Phật Bà Quan Âm với vòng hào quang Mandala xoay tỏa sáng & hạt sáng tâm linh (Golden Bokeh Particles).
  - Bát hương đồng cháy đỏ đầu nhang kèm hiệu ứng khói bay nghi ngút.
  - Hàng ghế Chư Tăng / Phật Tử áo lam ngồi thiền (Top 1–6 Hàng Danh Dự + 16 vị trí hai bên thảm đỏ hoa sen).
  - Nhân vật hành lễ trung tâm quỳ vái lạy kèm bong bóng lời khấn và huy hiệu công đức.
- **Tương tác thời gian thực với người xem TikTok LIVE (`TikTok-Live-Connector`):**
  - 💬 **Bình luận (`chat`):** Dâng thẻ **`📜 SỚ CẦU AN`** bay lên trời + cắm thêm nhang (`+10 CĐ`, `+1 🔥 hương`).
  - ❤️ **Thả tim (`like`):** Kích hoạt **`🪵 Gõ Mõ`** kèm chữ `+15 Công Đức` bay lên và tiếng mõ gỗ thanh tịnh.
  - ↗️ **Chia sẻ LIVE (`share`):** Kích hoạt **`🔔 Thỉnh Đại Hồng Chung`** tỏa sóng âm vàng và tiếng chuông chùa ngân vang.
  - 🌹 **Tặng quà (`gift`) / Xin Xăm:** Mở **Popup Rút Quẻ Quan Âm Linh Ứng (`THƯỢNG THƯỢNG CÁT` - Quẻ Số 99, 68, 88...)** kèm 4 câu thơ giải quẻ, lời bàn và giọng đọc AI Tiếng Việt (TTS).
  - 🏆 **Bảng Xếp Hạng `TẤM LÒNG THÀNH`:** Tự động lưu trữ và vinh danh các thí chủ có điểm Công Đức cao nhất.

---

## 🚀 Cài Đặt & Khởi Chạy

```bash
# 1. Cài đặt & build thư viện TikTok-Live-Connector (nếu chưa có thư mục dist/)
npm run setup:connector

# 2. Khởi chạy Server Đi Chùa Online (mặc định tại cổng 3000)
npm start
```

- **Mở trình duyệt điều khiển & xem thử:** `http://localhost:3000`
- **URL sạch dùng cho OBS Browser Source / TikTok LIVE Studio (`1080x1920`):**
  `http://localhost:3000/?channel=dichua0nline&hud=0`

---

## 📂 Cấu Trúc Thư Mục

- [`PLAN.md`](./PLAN.md): Báo cáo khảo sát & kế hoạch thiết kế chi tiết.
- [`server.js`](./server.js): Backend Node.js kết nối `TikTok-Live-Connector` + Server-Sent Events (`/api/events`).
- [`data/que_xam.json`](./data/que_xam.json): Cơ sở dữ liệu Quẻ Xăm Quan Âm Linh Ứng.
- [`public/`](./public/): Giao diện Frontend `9:16` (`index.html`, `css/style.css`, `js/app.js`, `js/audio.js`, `assets/`).
- [`TikTok-Live-Connector/`](./TikTok-Live-Connector/): Thư viện core kết nối TikTok Webcast v2.5.0.
