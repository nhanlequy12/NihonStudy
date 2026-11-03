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

Tiến độ lưu trong `localStorage` của trình duyệt.

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
