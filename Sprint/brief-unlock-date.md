# Implementation Brief — Fix Unlock Date (min +1 ngày) & Preset 1/2 ngày

**Branch:** `fix/unlock-date-1-day-2-day`
**Người giao:** Agent-BA · **Người nhận:** Agent-Dev (agent-react)
**Tham chiếu PRD:** v1.2 — F-02, AC-02.1, AC-02.2, AC-02.3, AC-02.4, AC-03.x, Q3

---

## 1. Mục tiêu

Sửa quy tắc ngày mở hộp từ **tối thiểu 1 tháng** → **tối thiểu 1 ngày**, và bổ sung 2 preset nhanh **1 ngày / 2 ngày**.

## 2. Scope

✅ Trong scope:
- Đổi validate min-date ở tầng data (repository).
- Đổi min-date + thêm preset ở UI form tạo hộp.
- Gia cố chống nháy lộ content ở màn detail.

❌ Ngoài scope (KHÔNG làm):
- KHÔNG thêm preset `1 tuần`.
- KHÔNG đổi schema/migration DB (`unlockDate` vẫn là ISO string 00:00 local).
- KHÔNG đổi `getBoxStatus`, `openBox` guard (đã đúng).
- KHÔNG thêm feature mới ngoài 1 ngày/2 ngày.

## 3. Quy ước giữ nguyên
- `unlockDate` = **00:00 local của ngày mở** (`setHours(0,0,0,0)`).
- Trạng thái mở dựa trên `getBoxStatus`: `now >= unlockDate` → `ready_to_open`.
- Chỉ chọn ngày (không chọn giờ).

---

## 4. Công việc chi tiết

### B1 — `src/db/boxRepository.ts` → `validateUnlockDate()` (L139-150)
- Đổi mốc min từ `setMonth(+1)` thành **+1 ngày**: `minDate = hôm nay 00:00`, rồi `minDate.setDate(minDate.getDate() + 1)`.
- Chuẩn hóa `unlock` về `setHours(0,0,0,0)` rồi so `unlock < minDate` → `throw`.
- Đổi message lỗi: `'Ngày mở phải tối thiểu 1 ngày kể từ hôm nay'`.

### B2 — `app/create-box/[type].tsx` → presets (L46-62, L331-341)
- Mở rộng `PresetOption` để biểu diễn được đơn vị ngày (vd thêm `days?: number` hoặc field `unit: 'day' | 'month'`).
- `PRESET_OPTIONS` chính thức (đúng thứ tự):
  ```
  1 ngày · 2 ngày · 1 tháng · 3 tháng · 6 tháng · 1 năm
  ```
- Thêm helper `addDays(date, n)` bên cạnh `addMonths`.
- `handlePresetSelect()`: chọn `addDays`/`addMonths` theo unit, giữ `setHours(0,0,0,0)`.

### B3 — `app/create-box/[type].tsx` → min-date + picker (L64-70, L383-409, L697)
- `getMinDate()`: đổi `setMonth(+1)` → **+1 ngày** (`min = hôm nay 00:00; min.setDate(min.getDate()+1)`).
- `minimumDate={getMinDate()}` ở `DateTimePicker` (L697) sẽ tự chặn hôm nay + quá khứ.
- Sửa Alert trong `handleDatePickerChange` (L399) từ *"tối thiểu 1 tháng"* → *"tối thiểu 1 ngày"*.

### B4 — `app/box/[id]/detail.tsx` → gia cố ẩn content (L259-267)
- Giữ nguyên `useEffect` redirect.
- Thêm early-return **trước** khối render JSX: nếu `!box || status !== 'opened'` → `return null` (tránh mount content/image/openingNote/reflection 1 frame khi locked/ready).

---

## 5. File đụng tới
| File | Loại sửa |
|------|----------|
| `src/db/boxRepository.ts` | Logic validate (bắt buộc) |
| `app/create-box/[type].tsx` | Preset + min-date + message (bắt buộc) |
| `app/box/[id]/detail.tsx` | Early-return guard (khuyến nghị) |

Không đụng: `boxStore.tsx`, `pre-open.tsx`, `locked.tsx`, DB schema.

---

## 6. Acceptance Criteria (Dev tự kiểm trước khi giao QA)
- [ ] Tạo hộp với ngày = hôm nay/quá khứ → bị chặn, message "tối thiểu 1 ngày".
- [ ] Tạo hộp với ngày = ngày mai → thành công.
- [ ] Chip "1 ngày" → unlock = ngày tạo +1; "2 ngày" → +2.
- [ ] Đủ 6 preset (1 ngày, 2 ngày, 1/3/6 tháng, 1 năm) + "Tùy chỉnh"; KHÔNG có "1 tuần".
- [ ] `DateTimePicker` không cho chọn hôm nay/quá khứ.
- [ ] Mở thẳng route detail của hộp locked → không lộ content, redirect mượt.
- [ ] `openBox()` gọi trực tiếp khi chưa tới hạn → vẫn throw `BOX_NOT_READY` (guard tầng data còn nguyên).

---

## 7. Test cases bàn giao QA

**A. Min-date & validate**
1. `unlockDate = hôm nay` → throw "tối thiểu 1 ngày", không tạo.
2. `unlockDate = hôm qua` → throw.
3. `unlockDate = ngày mai (00:00)` → tạo OK.
4. Tạo lúc 23:50, preset 1 ngày → unlock = mai 00:00, OK.
5. Edge cuối tháng (tạo ngày 31, preset tháng) → không tràn mốc (regression M-2).

**B. Preset UI**
6. Hiển thị đúng 6 chip + "Tùy chỉnh", không có "1 tuần".
7. "1 ngày"→+1, "2 ngày"→+2 (AC-02.4).
8. Picker `minimumDate`=ngày mai; chọn quá khứ qua custom → Alert "tối thiểu 1 ngày".
9. "Đổi"/reset hoạt động đúng.

**C. Trạng thái & mở hộp**
10. unlock tương lai → `locked`, nút mở bị chặn.
11. `now == unlockDate` (00:00) → `ready_to_open` (biên `>=`).
12. Gọi `openBox` bypass UI khi chưa tới hạn → throw `BOX_NOT_READY`, `is_opened`=0.
13. Double-tap "Mở hộp" → mở 1 lần.

**D. Ẩn nội dung khi khóa**
14. Route detail của hộp locked → không render content/image/note/reflection, redirect không nháy.
15. `locked.tsx` chỉ hiện metadata.
16. Hộp ready chưa mở vào detail → đẩy về pre-open, chưa lộ content.

**E. Regression**
17. Tạo đủ 4 loại hộp vẫn OK.
18. Notification & xóa hộp không bị ảnh hưởng.

---

## 8. Doc follow-up (việc của BA/PO — KHÔNG thuộc Dev)
- `PRD.md` L171 (AC-02.2): bỏ `1 tuần`.
- `PRD.md` L683 (Sprint 0): sửa text preset cũ "1 tháng, 3 tháng...".
- `CLAUDE.md` L146: cập nhật "min = today + 1 ngày; preset: 1 ngày, 2 ngày, 1T, 3T, 6T, 1 năm".
