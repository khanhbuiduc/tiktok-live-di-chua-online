# KẾ HOẠCH DỰ ÁN: ĐI CHÙA ONLINE — CHỐN BÌNH AN (`@chuaonline68` Clone & Upgrade)

> **Mục tiêu đầu ra:** Sản phẩm Interactive Livestream hoàn chỉnh chạy thời gian thực (tỉ lệ dọc `9:16` — `1080x1920`), kết nối trực tiếp với phòng LIVE TikTok qua thư viện `TikTok-Live-Connector` có sẵn trong workspace và phát trực tiếp lên **TikTok LIVE Studio / OBS Browser Source**.

---

## 1. BÁO CÁO KHẢO SÁT KÊNH TIKTOK `@chuaonline68` ("ĐI CHÙA ONLINE | Chốn Bình An🙏")

Qua khảo sát trực tiếp phiên LIVE đang phát sóng của kênh `@chuaonline68`, sản phẩm được cấu thành từ 4 lớp trải nghiệm chính:

### 1.1. Bố Cục Màn Hình Dọc `9:16` (`1080x1920`)
Toàn bộ khung hình chia làm 4 tầng từ trên xuống dưới theo phối cảnh nhìn thẳng vào Chính Điện:

1. **Tầng 1 — Header & Hoành Phi (15% trên cùng):**
   - **2 Pill Trạng Thái (Góc trên trái & phải):**
     - Trái: `🟢 LIVE @chuaonline68 • [Số mắt xem] mắt`
     - Phải: `🔥 [Tổng số hương] hương • ✨ [Tổng điểm] CĐ`
   - **Bức Hoành Phi / Cửa Võng Sơn Son Thếp Vàng:**
     - Tiêu đề lớn: **`CHÙA LINH ỨNG`**
     - Phụ đề thư pháp: *`Cầu Bình An - Cầu Tài Lộc - Cầu May Mắn`*
   - **Đèn lồng lục giác gỗ:** Treo đối xứng hai bên cột lim, đung đưa nhẹ và tỏa sáng vàng ấm.

2. **Tầng 2 — Chính Điện, Tượng Phật & Pháp Khí (35% giữa trên):**
   - **Trung tâm:** Tượng **Phật Bà Quan Âm** đứng trên đài sen trắng 3 tầng, phía sau là **vòng hào quang Mandala vàng kim xoay tròn** tỏa các hạt sáng (particles/bokeh).
   - **Bàn thờ Thượng & Hạ:** Hai bình hoa cúc vàng đối xứng, mâm ngũ quả, nến thờ và **Lư Hương đồng** ở chính giữa luôn có nhang cháy đỏ đầu kèm khói bay nghi ngút.
   - **3 Pháp Khí Tương Tác hai bên bàn thờ:**
     - Bên trái: Quả chuông đồng treo giá gỗ — Nhãn **`🔔 Thỉnh Chuông`**.
     - Bên phải trên: Ống tre đựng thẻ xăm — Nhãn **`🎋 Xin Xăm`**.
     - Bên phải dưới: Cái mõ gỗ đặt trên đệm — Nhãn **`🪵 Gõ Mõ (91.890)`** (tăng số đếm mỗi khi gõ).

3. **Tầng 3 — Sân Chùa, Thảm Đỏ Hoa Sen & Đội Ngũ Phật Tử Ngồi Thiền (40% giữa dưới):**
   - **Thảm đỏ hoa sen (Center Aisle):** Trải dọc chính giữa theo phối cảnh tụ lên bậc tam cấp.
   - **Hàng Ngang Danh Dự (Top 1 – Top 6 Công Đức):** 6 nhân vật tiểu sư/phật tử mặc áo lam ngồi trên bồ đoàn lớn ngay trước bàn thờ (3 trái: `① ② ③`, 3 phải: `④ ⑤ ⑥`) kèm tên người xem có điểm Công Đức cao nhất.
   - **Hai Dãy Ngồi Thiền Hai Bên (16 vị trí phụ — 4 hàng x 2 cột mỗi bên):** Các nhân vật áo lam nhỏ hơn gắn **Avatar TikTok + Tên người xem** đang hiện diện trong phòng.
   - **Vị Trí Hành Lễ Trung Tâm (Center Action Spot):**
     - Nằm chính giữa thảm đỏ. Mỗi khi có người tương tác, nhân vật đại diện sẽ quỳ vái lạy hướng về tượng Phật.
     - Trên đầu có **bong bóng thoại (Speech Bubble)** hiển thị lời cầu nguyện hoặc lời bàn quẻ xăm.
     - Dưới chân có **thẻ Avatar + Tên + Hành động** (VD: `Cầu phúc (+10 CĐ)`, `🔔 Thỉnh Đại Hồng Chung (+10 CĐ)`, `🎋 Quẻ số 99 (Thượng Thượng Cát)`).

4. **Tầng 4 — Footer: Ticker Thông Báo, Bảng Hướng Dẫn & BXH `TẤM LÒNG THÀNH` (10% dưới cùng):**
   - **Góc dưới trái (trên):** Thanh thông báo tức thời (`🌸 [Tên] — 🔴 Cầu phúc (+10 CĐ) 🌸`).
   - **Góc dưới trái (dưới):** Bảng hướng dẫn mức tương tác (`Thành tâm dâng một lễ...` | `1 COIN / CMT` | `5 COINS / TIM` | `10+ COINS`).
   - **Góc dưới phải:** Bảng xếp hạng **`TẤM LÒNG THÀNH`** vinh danh Top thí chủ công đức nhiều nhất.

---

### 1.2. Ma Trận Tương Tác Thời Gian Thực (Event Mapping)

| Sự kiện TikTok (`TikTok-Live-Connector`) | Hành động trong Chùa Online | Hiệu ứng Hình ảnh (Visual FX) | Âm thanh (SFX / TTS) | Điểm Công Đức & Bộ đếm |
| :--- | :--- | :--- | :--- | :--- |
| **`chat`** (Bình luận lời khấn, cầu thi cử, bình an, "A Di Đà Phật"...) | **Dâng Sớ Cầu An & Thắp Hương** | - Tạo thẻ **`📜 SỚ CẦU AN`** (gồm tên + nội dung khấn) bay từ bàn thờ lên cao.<br>- Cắm thêm 1 nén hương cháy sáng vào Lư Hương.<br>- Nhân vật trung tâm quỳ lạy + hiện bong bóng lời khấn. | Tiếng chuông nhỏ ngân nhẹ + (Tùy chọn) Giọng đọc TTS lời cầu nguyện. | `+10 CĐ`, `+1 🔥 hương` |
| **`like`** (Thả tim phiên LIVE) | **Gõ Mõ Tích Công Đức** | - Cái mõ gỗ (`🪵 Gõ Mõ`) nảy lên theo nhịp.<br>- Chữ **`+15 Công Đức`** màu xanh/vàng bay lên tại vị trí cái mõ.<br>- Xếp người thả tim vào 1 ghế ngồi thiền trống trên sân chùa. | Tiếng mõ gỗ *"Cốc! Cốc!"* thanh tịnh. | `+15 CĐ`, tăng bộ đếm `🪵 Gõ Mõ (xx.xxx)` |
| **`share`** (Chia sẻ phiên LIVE) | **Thỉnh Đại Hồng Chung** | - Quả chuông đồng (`🔔 Thỉnh Chuông`) rung lắc, tỏa sóng âm tròn màu vàng.<br>- Chữ **`+10 Công Đức`** bay lên.<br>- Nhân vật trung tâm hiện `🔔 Thỉnh Đại Hồng Chung (+10 CĐ)`. | Tiếng Đại Hồng Chung ngân vang trầm hùng (`Boong...`). | `+10 CĐ` |
| **`gift`** (Tặng quà 1–5 Coins: Hoa Hồng `Rose`, `Heart Me`...) | **Dâng Hoa / Dâng Lễ & Rút Quẻ Xăm** | - Hiệu ứng icon quà tặng (`🌹 xN`) bay lên góc trái.<br>- Ống xăm (`🎋 Xin Xăm`) lắc mạnh và mở **Popup Quẻ Xăm** (`Quẻ Số 1–100`) ngay giữa màn hình trong 6 giây kèm 4 câu thơ & lời bàn. | Tiếng lắc ống xăm + Giọng đọc AI (TTS) đọc tên thí chủ & lời giải quẻ. | `+50 CĐ` / mỗi Coin (cập nhật BXH `TẤM LÒNG THÀNH`) |
| **`gift`** (Quà lớn `10+ Coins`) | **Đại Lễ Cầu An & Hào Quang Chiếu Rọi** | - Hào quang Phật Bà bùng sáng rực rỡ, mưa hoa sen vàng rơi khắp màn hình.<br>- Mở Popup **Quẻ Thượng Thượng Cát** đặc biệt vinh danh Đại Thí Chủ.<br>- Đưa ngay lên hàng ghế danh dự **Top 1 – Top 6**. | Tiếng chuông trống Bát Nhã + Giọng đọc AI vinh danh Đại Thí Chủ. | `+100 CĐ` / mỗi Coin |
| **`member` / `follow`** (Vào phòng / Follow kênh) | **Thí Chủ Hữu Duyên Nhập Tự** | - Xếp người xem vào vị trí ngồi thiền trên sân chùa.<br>- Hiển thị lời chào trên thanh Ticker góc dưới trái. | Tiếng chuông gió nhẹ. | `+5 CĐ` |

---

## 2. KIẾN TRÚC KỸ THUẬT CỦA SẢN PHẨM

Sử dụng trực tiếp thư viện **`TikTok-Live-Connector` (v2.5.0)** đã có sẵn tại `/home/laptop-khanh/Documents/personal/tiktok-live/TikTok-Live-Connector`:

```
tiktok-live/
├── TikTok-Live-Connector/       # Thư viện core kết nối TikTok Webcast (đã có sẵn)
├── PLAN.md                      # Tài liệu kế hoạch & thiết kế chi tiết
├── package.json                 # Quản lý script khởi chạy Server & Build
├── server.js                    # Node.js Backend: Kết nối TikTok LIVE + WebSocket/SSE Bridge + Lưu trữ BXH
├── data/
│   ├── que_xam.json             # Cơ sở dữ liệu 30+ Quẻ Xăm Linh Ứng (Thơ 4 câu + Lời bàn)
│   └── state.json               # Lưu trữ bền vững tổng Hương, tổng Công Đức, BXH Tấm Lòng Thành
└── public/
    ├── index.html               # Giao diện chính 9:16 (1080x1920) dùng cho OBS / TikTok LIVE Studio
    ├── css/
    │   └── style.css            # Hệ thống CSS Animation: Hào quang xoay, Khói hương, Sớ bay, Chư tăng lạy
    ├── js/
    │   ├── app.js               # Logic xử lý sự kiện real-time, hàng đợi (Queue) Xin Xăm & Sớ Cầu An
    │   └── audio.js             # Bộ tổng hợp âm thanh Web Audio API (Chuông, Mõ, Nhạc Thiền) + Web Speech TTS
    └── assets/
        └── chua_linh_ung_bg.png # Hình nền Chính Điện Chùa Linh Ứng tỉ lệ 9:16 độ phân giải cao
```

### Điểm nổi bật của kiến trúc:
1. **Kết nối trực tiếp TikTok LIVE (`TikTok-Live-Connector`):**
   - Nhập bất kỳ `@username` TikTok nào đang LIVE ngay trên bảng điều khiển (hoặc qua biến môi trường/URL param `?channel=chuaonline68`) để bắt sự kiện `chat`, `gift`, `like`, `share`, `member`, `roomUser` theo thời gian thực.
2. **Chế độ Auto-Demo & Bảng Điều Khiển Ẩn (Control Panel):**
   - Khi chưa bật LIVE thật hoặc muốn test trên OBS, có sẵn thanh công cụ (ẩn/hiện bằng phím `D` hoặc nút góc màn hình) để giả lập: *Bình luận Sớ Cầu An, Thả Tim Gõ Mõ, Share Thỉnh Chuông, Tặng Hoa Hồng, Xin Xăm Thượng Thượng Cát, Bật/Tắt chế độ Tự Động (Auto-Simulation)*.
3. **Hệ thống Âm Thanh Không Cần File Rời (Zero-Dependency Web Audio Synthesizer + TTS):**
   - Tự động tổng hợp tiếng **Đại Hồng Chung** ngân vang bằng sóng hài FM/Additive Synthesis, tiếng **Mõ Gỗ** cộng hưởng trầm ấm, nhạc nền **Thiền Định** êm dịu và giọng đọc **Tiếng Việt (Web Speech API / Google TTS)** đọc lời cầu nguyện & quẻ xăm.
4. **Sẵn sàng phát sóng trực tiếp lên TikTok:**
   - Tương thích 100% với **OBS Studio (Browser Source `1080x1920`)** và **TikTok LIVE Studio (Window/Browser Capture)**.

---

## 3. HƯỚNG DẪN ĐƯA SẢN PHẨM LÊN SÓNG TIKTOK LIVE TRỰC TIẾP

1. **Bước 1 — Khởi chạy hệ thống Đi Chùa Online:**
   ```bash
   node server.js
   ```
   Truy cập `http://localhost:3000` (hoặc `http://localhost:3000/?channel=TEN_KENH_CUA_BAN&hud=0` để ẩn nút cài đặt khi lên sóng).

2. **Bước 2 — Thiết lập trong OBS Studio / TikTok LIVE Studio:**
   - Tạo Canvas dọc: **Base/Output Resolution = `1080x1920`** (tỉ lệ `9:16`).
   - Thêm nguồn **Browser Source**:
     - URL: `http://localhost:3000/?channel=TEN_KENH_TIKTOK_CUA_BAN`
     - Width: `1080` | Height: `1920`
     - Tích chọn *"Control audio via OBS"* để thu cả tiếng Chuông, tiếng Mõ, nhạc Thiền và giọng đọc Quẻ Xăm.

3. **Bước 3 — Bắt đầu phiên LIVE trên TikTok:**
   - Ngay khi kênh của bạn bấm **Go LIVE**, `server.js` (sử dụng `TikTok-Live-Connector`) sẽ tự động bắt luồng sự kiện từ phòng LIVE và hiển thị trực tiếp tên, avatar, lời khấn và quà tặng của người xem lên màn hình Chính Điện.
