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
| Chủ đề | 12 chủ đề × 15 từ N2, mỗi từ có cách đọc, nghĩa, loại từ và 2 câu ví dụ (có nút nghe) |
| Flashcard | Lặp lại ngắt quãng (SM-2 rút gọn), chọn mặt trước Nhật hoặc Việt, phím tắt Space/1-4 |
| Bài tập | Việt → Nhật (gõ), điền từ vào câu, dịch cả câu, trắc nghiệm 2 chiều, cách đọc kanji. Từ sai tự lưu |
| Luyện nghe | Nghe câu → chọn nghĩa / chép chính tả; 5 hội thoại kiểu đề 聴解 có script và tóm tắt |
| Shadowing | Nghe – lặp lại – nói theo; tắt phụ đề; micro chấm độ giống (Web Speech Recognition) |
| Đọc hiểu | 5 bài đọc N2 kèm từ khó, câu hỏi và giải thích; nghe cả bài |
| Từ đã lưu | Danh sách từ chưa biết theo chủ đề, luyện flashcard/bài tập riêng, xuất CSV cho Anki |

Âm thanh dùng Web Speech API của trình duyệt (không cần server). Chrome/Edge trên Windows có sẵn giọng tiếng Nhật; nhận dạng giọng nói cho shadowing cần Chrome/Edge.

Tiến độ lưu trong `localStorage` của trình duyệt.

## Thêm dữ liệu

- Từ vựng: `src/data/vocab.js` – thêm object vào mảng `words` của chủ đề (hoặc thêm chủ đề mới cùng `id`, `title`, `jp`, `icon`, `color`).
- Bài đọc: `src/data/reading.js`.
- Bài nghe: `src/data/listening.js` (`speaker`: `M` nam, `F` nữ, `N` người dẫn).

## Công nghệ

Vite + React 19 + react-router-dom. Không dùng backend.
