# FutureBoxes — UI/UX Design Guideline

> Reverse-engineered từ thiết kế tham khảo **Hume Smart Home** (Smart Technology).
> Hướng đi đã chốt: **Full Dark Redesign** + **Single Orange Accent**.
> Tài liệu này là nguồn chân lý (source of truth) cho UI. Khi đổi token, cập nhật cả `src/constants/*` lẫn file này.

---

## 1. Ngôn ngữ thiết kế (Visual Style)

**Phong cách chủ đạo:** Dark Glassmorphism — nền charcoal tối, card kính mờ (frosted glass) nổi trên ảnh/gradient, một điểm nhấn cam ấm duy nhất, bo góc lớn, typography đậm-thoáng.

**Nguyên tắc cốt lõi:**
- Nền tối làm nội dung & ảnh nổi bật; cam chỉ dùng cho **hành động** (CTA, toggle bật, slider, trạng thái active) — không lạm dụng.
- Card = lớp kính: nền trắng độ mờ thấp + viền sáng mảnh + blur → cảm giác chiều sâu, không dùng đổ bóng nặng như light theme.
- Mỗi màn hình có **1 hành động chính** nổi bật bằng nút pill cam ở thumb zone.

### 1.1 Màu sắc (Color Tokens)

**Brand & Action**

| Token | Hex | Dùng cho |
|-------|-----|----------|
| `accent` | `#F26B1F` | Primary action, toggle ON, slider, icon active, link |
| `accentPressed` | `#D85A12` | Trạng thái pressed của accent |
| `accentSoft` | `rgba(242,107,31,0.14)` | Nền chip/icon active, halo |
| `accentGradient` | `#F58A33 → #F26B1F` | Nền nút CTA pill (135°) |

**Backgrounds & Surfaces**

| Token | Hex / RGBA | Dùng cho |
|-------|-----------|----------|
| `background` | `#0E0E10` | Nền app cấp 0 |
| `backgroundElevated` | `#161618` | Nền sheet/section cấp 1 |
| `surfaceGlass` | `rgba(255,255,255,0.06)` | Card kính mờ (kèm blur) |
| `surfaceGlassStrong` | `rgba(255,255,255,0.10)` | Card nổi hơn / hover |
| `surfaceSolid` | `#1C1C1F` | Card đặc khi không blur được (Android fallback) |
| `inputBg` | `rgba(255,255,255,0.05)` | Nền input/field |

**Text**

| Token | Hex | Dùng cho |
|-------|-----|----------|
| `textPrimary` | `#FFFFFF` | Heading, nội dung chính |
| `textSecondary` | `#A0A0A8` | Mô tả, label phụ |
| `textMuted` | `#6B6B73` | Placeholder, metadata, disabled |
| `textOnAccent` | `#FFFFFF` | Chữ trên nền cam |

**Borders & Effects**

| Token | RGBA | Dùng cho |
|-------|------|----------|
| `borderGlass` | `rgba(255,255,255,0.10)` | Viền card kính (1px) |
| `borderGlassStrong` | `rgba(255,255,255,0.18)` | Viền focus/active |
| `divider` | `rgba(255,255,255,0.06)` | Đường phân cách list |
| `overlay` | `rgba(0,0,0,0.55)` | Nền modal/backdrop |
| `blurIntensity` | 24–40 (expo-blur) | Cường độ blur card kính |

**Semantic** (giữ tối giản, lệch tông tối)

| Token | Hex | Dùng cho |
|-------|-----|----------|
| `success` | `#3CCB7F` | Hoàn tất, hộp đã mở thành công |
| `warning` | `#F2B01F` | Cảnh báo nhẹ |
| `danger` | `#FF5A5A` | Xóa hộp, lỗi |
| `info` | `#5B8DEF` | Thông tin trung tính |

> **Box-type identity:** KHÔNG còn 4 màu riêng. Mọi loại hộp (message/goal/memory/decision) dùng chung `accent` cam; **phân biệt bằng icon glyph** (Ionicons) đặt trong vòng tròn `accentSoft`.

### 1.2 Typography

- **Font:** System (iOS San Francisco / Android Roboto) — giữ nguyên `FontFamily` hiện tại. Không nạp font ngoài để khỏi tăng bundle.
- **Cảm giác:** Heading **bold, lớn, dòng thoáng**; body nhẹ, màu `textSecondary`.

| Style | Size | Weight | Line height | Letter spacing | Color |
|-------|------|--------|-------------|----------------|-------|
| Display / Hero | 28–32 | 700 | 1.2 | -0.3 | textPrimary |
| H1 (screen title) | 24 | 700 | 1.25 | -0.3 | textPrimary |
| H2 (section) | 18–20 | 600 | 1.3 | -0.2 | textPrimary |
| Body | 14–15 | 400 | 1.5 | 0 | textSecondary |
| Body strong | 14–15 | 600 | 1.4 | 0 | textPrimary |
| Label / Caption | 12–13 | 500 | 1.4 | 0 | textSecondary |
| Overline (eyebrow) | 11 | 600 | 1.2 | +1.2 (UPPERCASE) | textMuted |
| Button | 15–16 | 600 | 1 | +0.2 | textOnAccent |

---

## 2. Mobile-First Rules

- **Touch target:** tối thiểu **44×44pt**; khoảng cách giữa 2 target ≥ 8pt. Toggle/icon nhỏ vẫn phải có hitSlop để đủ 44pt.
- **Thumb zone:** Hành động chính (CTA pill) đặt **đáy màn hình**, cách safe-area-bottom 16–24pt. Nút phụ/đóng (X, back) ở **góc trên** chấp nhận được vì ít dùng.
- **Layout:** **Single column**. Lề ngang (gutter) **20pt**. Nội dung không chạm mép.
- **Safe area:** Luôn bọc `SafeAreaView` / dùng `useSafeAreaInsets`; header chừa tai thỏ, CTA chừa home indicator.
- **Spacing system — 4pt grid** (khớp `Spacing` hiện có): `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48`.
  - Trong card: padding **16–20pt**. Giữa các section: **24pt**. Giữa item trong list: **12pt**.
- **Radius** (khớp/ mở rộng `Radius`): chip/input `12` · card `20` · sheet `24–28` · button & pill `full (9999)` · icon badge tròn `full`.
- **Content priority:** Eyebrow → Heading lớn → mô tả ngắn → nội dung/setup → **1 CTA chính**. Mỗi màn 1 mục tiêu rõ.

---

## 3. Responsive Strategy

App là **mobile portrait-first** (Expo). Quy tắc tương thích trong phạm vi điện thoại + tablet.

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 600dp | 1 cột, gutter 20pt |
| Large phone | 600–767dp | 1 cột, gutter 24pt, max content width 560pt căn giữa |
| Tablet | ≥ 768dp | Content max-width **600pt** căn giữa; grid 2 cột cho list hộp |

- **Layout adaptation:** Mobile dùng **Flexbox dọc**; ≥768dp chuyển list hộp sang **grid 2 cột** (`flexWrap` hoặc `FlatList numColumns`). CTA pill giới hạn `maxWidth 480pt` căn giữa trên tablet.
- **Media scaling:** Ảnh hộp dùng `resizeMode="cover"`, bọc trong khung bo `20pt`, tỉ lệ cố định **16:10**; dùng `aspectRatio` thay vì height cứng.
- **Typography scaling:** Theo `PixelRatio.getFontScale()` của hệ thống (tôn trọng Accessibility). Không phóng font theo chiều rộng màn; chỉ tăng **khoảng cách & max-width** trên tablet. Giới hạn `maxFontSizeMultiplier` ≈ 1.4 cho heading để khỏi vỡ layout.
- **Orientation:** Khóa **portrait** (theo bản chất app). Nếu mở landscape trên tablet, giữ content căn giữa max-width 600pt.

---

## 4. Component Library

Mỗi component khai báo đủ states. Trạng thái `Hover` chỉ áp dụng web/tablet-with-pointer; mobile bỏ qua, dùng `Pressed`.

### 4.1 Button

**Primary (CTA Pill)** — nền gradient cam, radius full, chữ trắng 600, có chevron `»` bên phải, full-width trong gutter.

| State | Hình thức |
|-------|-----------|
| Default | Gradient `#F58A33→#F26B1F`, text trắng, shadow cam nhẹ (`shadowColor accent, opacity .35, radius 16`) |
| Pressed | Scale **0.97**, gradient tối hơn (`accentPressed`), shadow giảm |
| Disabled | `rgba(255,255,255,0.08)`, text `textMuted`, không shadow, không nhận chạm |
| Loading | Giữ kích thước, ẩn text, hiện `ActivityIndicator` trắng; nút khóa tương tác |
| Focused (web) | Viền `borderGlassStrong` 2px offset |

**Secondary / Ghost** — nền `surfaceGlass`, viền `borderGlass`, text `textPrimary`. Pressed: nền `surfaceGlassStrong`.

**Icon button** (X, back, settings): 44×44, nền trong suốt → pressed `accentSoft`, icon `textSecondary` → active `accent`.

### 4.2 Input Field

Nền `inputBg`, viền `borderGlass` 1px, radius 12, padding 14–16, text trắng, placeholder `textMuted`.

| State | Hình thức |
|-------|-----------|
| Default | Viền `borderGlass`, label `textSecondary` phía trên |
| Focused | Viền **`accent` 1.5px**, halo `accentSoft`, label đổi `accent` |
| Filled | Như default, text `textPrimary` |
| Disabled | Opacity 0.5, không nhận chạm |
| Error/Invalid | Viền `danger`, helper text `danger` + icon cảnh báo |
| Success | Viền `success`, icon check `success` cuối field |

- Counter ký tự (nếu giới hạn) ở góc dưới phải, `textMuted`; chuyển `warning` khi còn <10%.

### 4.3 Card (Glass)

Nền `surfaceGlass` + `expo-blur` (intensity 24–40, fallback `surfaceSolid` khi `blurReductionEnabled`), viền `borderGlass`, radius 20, padding 16–20.

| State | Hình thức |
|-------|-----------|
| Default | Glass nền + viền mảnh |
| Pressed (nếu tappable) | Scale 0.98, nền `surfaceGlassStrong` |
| Selected/Active | Viền `accent` 1.5px + halo `accentSoft` |
| Disabled | Opacity 0.4 |
| Skeleton | Khối `surfaceGlass` + shimmer (mục 5) |

**Box card (list hộp):** icon tròn `accentSoft` (glyph theo loại) + tiêu đề + metadata; trạng thái hiển bằng **badge/label**, không bằng màu nền:
- `locked` → icon khóa, label `textMuted`.
- `ready_to_open` → label `accent` + chấm cam nhấp nháy.
- `opened` → label `textMuted`, opacity 0.85.

### 4.4 Toggle / Switch

Track tắt `rgba(255,255,255,0.16)` · track bật **`accent`** · thumb trắng. Pressed: thumb hơi giãn. Disabled: opacity 0.4. Animate 200ms ease-out.

### 4.5 Slider

Track nền `rgba(255,255,255,0.16)`, phần đã chọn `accent`, thumb tròn trắng có shadow. Khi kéo: thumb scale 1.15 + tooltip giá trị nền `surfaceGlassStrong`.

### 4.6 Tab / Segmented control

Hàng icon+label trên nền glass; tab active có nền `accentSoft` + icon/label `accent`; inactive `textSecondary`. Indicator trượt 250ms.

### 4.7 Bottom Sheet / Modal

Nền `backgroundElevated`, bo trên `24pt`, grabber `rgba(255,255,255,0.25)` rộng 36×4 ở giữa. Backdrop `overlay`. Trượt lên 300ms ease-out; vuốt xuống để đóng.

---

## 5. Interaction & Motion

**Nguyên tắc Vibe:** mượt, ấm, có chiều sâu. Chuyển động ngắn, phản hồi tức thì; cam "thở" cho trạng thái chờ mở hộp.

### 5.1 Timing & Easing

| Loại | Duration | Easing |
|------|----------|--------|
| Micro (press, toggle, ripple) | 120–200ms | ease-out |
| Standard (sheet, fade, slide) | 250–300ms | `cubic-bezier(0.22,1,0.36,1)` (ease-out-quint) |
| Emphasis (mở hộp, confetti) | 400–600ms | spring (reanimated: damping 14, stiffness 120) |

Dùng **react-native-reanimated** (đã có trong stack). Tránh `Animated` cũ cho gesture nặng.

### 5.2 Micro-interactions

- **Press:** mọi phần tử tappable scale **0.97–0.98** + giảm opacity nhẹ, 120ms.
- **Toggle/Check:** track đổi màu + thumb trượt 200ms; haptic `Light` (expo-haptics) khi đổi.
- **CTA pill:** press → scale 0.97 + shadow cam co lại; nhả → spring về.
- **Tab switch:** indicator trượt + icon active đổi `accent` mượt 250ms.
- **Ready-to-open badge:** chấm cam pulse (opacity 0.4↔1, scale 1↔1.3) lặp 1.5s.

### 5.3 Special Patterns

- **Skeleton loading:** Khi tải list hộp, hiện 3–4 card skeleton (`surfaceGlass` + shimmer gradient trắng 8% chạy ngang 1.2s). Không dùng spinner toàn màn cho list.
- **Optimistic UI:** Tạo/xóa hộp cập nhật store (`ADD_BOX`/`DELETE_BOX`) ngay, rollback nếu DB lỗi + toast `danger`.
- **Debounced search:** Ô tìm kiếm hộp (F-17) debounce **300ms** trước khi lọc; hiện spinner nhỏ trong field khi đang lọc tập lớn.
- **Pull-to-refresh:** List hộp hỗ trợ kéo refresh; spinner tint **`accent`** trên nền tối.
- **Empty state:** Icon lớn trong vòng `accentSoft` + 1 dòng heading + 1 CTA pill ("Tạo hộp đầu tiên").
- **Haptics:** Mở hộp thành công → `Success`; xóa → `Warning`; nhấn CTA chính → `Light`.
- **Reduce motion:** Tôn trọng `AccessibilityInfo.isReduceMotionEnabled` → tắt pulse/confetti, chỉ fade.

---

## 6. Migration Notes (light → dark)

Khi triển khai, cập nhật `src/constants/colors.ts` sang bảng token dark ở trên và rà soát màn hình:
- Bỏ object `boxType` 4 màu nền sáng → dùng `accent` + `accentSoft` chung; phân loại bằng icon trong `BOX_TYPE_CONFIG`.
- Thay `Shadow` (đổ bóng đen cho light) bằng **viền kính + blur**; chỉ giữ shadow cam cho CTA.
- Kiểm tra contrast: text trên glass phải đạt **WCAG AA** (≥4.5:1 cho body). `textSecondary #A0A0A8` trên `#0E0E10` đạt ~7:1 ✓.
- Thêm `expo-blur` cho card kính (có fallback `surfaceSolid` cho thiết bị tắt blur).

> Mọi thay đổi cấu trúc (thêm thư viện như `expo-blur`/`expo-haptics`, đổi token) phải cập nhật phần **Kiến trúc dự án** trong `CLAUDE.md` cùng phiên làm việc.
