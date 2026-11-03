# NihonStudy – Web học tiếng Nhật N2

Ứng dụng web học từ vựng JLPT N2 theo chủ đề, lấy cảm hứng từ các web học tiếng Anh: mỗi từ đều có ví dụ, có flashcard, bài tập Việt → Nhật, luyện nghe, shadowing, đọc hiểu và danh sách từ chưa biết.

## Chạy

```bash
npm install
npm run dev
```

Mở http://localhost:5173. Build bản tĩnh bằng `npm run build` (thư mục `dist/`), có thể deploy lên GitHub Pages / Netlify / Vercel vì dùng HashRouter.

## Tính năng

| Trang | Nội dung |
|---|---|
| Tổng quan | Thống kê từ đã học, chuỗi ngày học, tiến độ từng chủ đề, kết quả gần đây |
| Chủ đề | 13 nhóm · 72 bài · ~1.700 từ N2: bộ "Chủ đề cơ bản" tự soạn (180 từ) và bộ "2500 từ vựng N2" lấy từ jtest.net (12 chương × 5 bài, 1.546 từ, mỗi từ có cách đọc, nghĩa, từ đồng nghĩa/trái nghĩa/liên quan, 2–4 ví dụ kèm kana và file phát âm) |
| Flashcard | Lặp lại ngắt quãng (SM-2 rút gọn), chọn mặt trước Nhật hoặc Việt, phím tắt Space/1-4 |
| Bài tập | Việt → Nhật (gõ), điền từ vào câu, dịch cả câu, trắc nghiệm 2 chiều, cách đọc kanji. Từ sai tự lưu |
| Luyện nghe | Nghe câu → chọn nghĩa / chép chính tả; 5 hội thoại kiểu đề 聴解 có script và tóm tắt |
| Shadowing | Nghe – lặp lại – nói theo; tắt phụ đề; micro chấm độ giống (Web Speech Recognition) |
| Đọc hiểu | 5 bài đọc N2 kèm từ khó, câu hỏi và giải thích; nghe cả bài |
| Từ đã lưu | Danh sách từ chưa biết theo chủ đề, luyện flashcard/bài tập riêng, xuất CSV cho Anki |

Âm thanh: từ vựng bộ jtest dùng file mp3 của jtest.net; các từ tự soạn và câu ví dụ dùng Web Speech API của trình duyệt (không cần server). Chrome/Edge trên Windows có sẵn giọng tiếng Nhật; nhận dạng giọng nói cho shadowing cần Chrome/Edge.

Tiến độ lưu trong `localStorage` của trình duyệt và, nếu bật Firebase, đồng bộ lên Firestore theo từng tài khoản (xem phần "Lưu tiến độ trên cloud").

## Thêm dữ liệu

- Từ vựng tự soạn: `src/data/basic.js` – thêm object vào mảng `words` của chủ đề (hoặc thêm chủ đề mới cùng `id`, `title`, `jp`, `icon`, `color`). `src/data/vocab.js` gộp các nguồn thành `groups`/`topics`.
- Bài đọc: `src/data/reading.js`.
- Bài nghe: `src/data/listening.js` (`speaker`: `M` nam, `F` nữ, `N` người dẫn).

## Công nghệ

Vite + React 19 + react-router-dom. Không dùng backend.

## Cập nhật bộ từ jtest.net

Dữ liệu `src/data/jtest-n2.json` được tải từ https://jtest.net/tu-vung-n2 bằng script trong `scripts/`:

```bash
npm run data:jtest
```

Script tải 60 bài (có nghỉ 0,7 giây giữa các trang) rồi chuyển sang JSON gọn. Chỉ dùng cho mục đích học cá nhân.

## Lưu tiến độ trên cloud (Firebase)

Mỗi máy tự động có một tài khoản ẩn danh riêng, dữ liệu không liên quan nhau. Đăng nhập Google để dùng chung tiến độ trên nhiều máy. Không có cấu hình Firebase thì app vẫn chạy, chỉ lưu trên máy.

1. Vào https://console.firebase.google.com → **Add project** (tắt Google Analytics cũng được).
2. **Build → Authentication → Get started → Sign-in method**: bật **Anonymous** và **Google**.
   Trong tab **Settings → Authorized domains** thêm `nhanlequy12.github.io` (và `localhost` đã có sẵn).
3. **Build → Firestore Database → Create database** (production mode, chọn region gần, vd `asia-southeast1`).
   Mở tab **Rules**, dán nội dung file `firestore.rules` rồi **Publish**.
4. **Project settings (⚙) → Your apps → Add app → Web (</>)**, đặt tên bất kỳ, không cần Hosting. Copy khối `firebaseConfig`.
5. Chạy local: tạo file `.env.local` theo mẫu `.env.example` và điền các giá trị từ `firebaseConfig`.
6. Deploy GitHub Pages: vào repo **Settings → Secrets and variables → Actions → New repository secret**, tạo 6 secret cùng tên trong `.env.example`. Push lại (hoặc **Actions → Deploy → Run workflow**) để build nhận config.

Dữ liệu nằm ở Firestore collection `users/{uid}`, mỗi user một tài liệu (từ đã lưu, SRS, lịch sử bài tập, cài đặt). Rules chỉ cho phép user đọc/ghi tài liệu của chính mình. Lưu ý: API key của Firebase web không phải bí mật thật sự, bảo mật nằm ở Rules.
