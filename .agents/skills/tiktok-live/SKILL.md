---
name: tiktok-live
description: tích hợp và xây dựng các sản phẩm Interactive Livestream trên TikTok (như Đi Chùa Online, Game tương tác LIVE) sử dụng thư viện TikTok-Live-Connector (v2.5.0) có sẵn trong workspace.
---

# Skill: TikTok Live Interactive Stream (`TikTok-Live-Connector` v2.5.0)

Skill này hướng dẫn cách sử dụng thư viện `./TikTok-Live-Connector` (`zerodytrash/TikTok-Live-Connector` v2.5.0) trong dự án để lắng nghe sự kiện thời gian thực từ bất kỳ phòng LIVE TikTok nào và hiển thị lên giao diện OBS / TikTok LIVE Studio (`1080x1920`, tỉ lệ `9:16`).

## 1. Khởi tạo kết nối TikTok LIVE

```js
import { TikTokLiveConnection, WebcastEvent, ControlEvent } from './TikTok-Live-Connector/dist/index.js';

const connection = new TikTokLiveConnection('chuaonline68', {
  processInitialData: true,
  fetchRoomInfoOnConnect: true,
  enableExtendedGiftInfo: true
});

await connection.connect();
```

## 2. Các Sự Kiện Tương Tác Quan Trọng (`WebcastEvent`)

- `WebcastEvent.CHAT` (`'chat'`): Người xem bình luận (`data.comment`, `data.user.uniqueId`, `data.user.nickname`, `data.user.profilePicture.url[0]`).
- `WebcastEvent.LIKE` (`'like'`): Người xem thả tim (`data.likeCount`, `data.totalLikeCount`, `data.user`).
- `WebcastEvent.SHARE` (`'share'`): Người xem chia sẻ phiên LIVE (`data.user`).
- `WebcastEvent.GIFT` (`'gift'`): Người xem tặng quà (`data.giftId`, `data.repeatCount`, `data.repeatEnd`, `data.giftDetails.giftName`, `data.giftDetails.diamondCount`).
  - *Lưu ý:* Với quà tặng tính chuỗi (`data.giftType === 1`), chỉ xử lý khi `data.repeatEnd === true` để tránh lặp sự kiện.
- `WebcastEvent.MEMBER` (`'member'`): Người xem mới vào phòng LIVE.
- `WebcastEvent.FOLLOW` (`'follow'`): Người xem bấm Follow chủ kênh.
- `WebcastEvent.ROOM_USER` (`'roomUser'`): Cập nhật số mắt xem (`data.viewerCount`).

## 3. Quy Trình Phát Trực Tiếp Lên TikTok (OBS / TikTok LIVE Studio)

1. Chạy Backend + Web UI:
   ```bash
   node server.js
   ```
2. Trong **OBS Studio** hoặc **TikTok LIVE Studio**:
   - Đặt độ phân giải khung hình dọc: `1080x1920` (9:16).
   - Thêm nguồn **Browser Source** trỏ tới: `http://localhost:3000/?channel=TEN_KENH_TIKTOK&hud=0` (`Width: 1080`, `Height: 1920`).
