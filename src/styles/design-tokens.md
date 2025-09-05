# 디자인 토큰 사용 가이드

이 프로젝트는 피그마 디자인 시스템을 기반으로 한 체계적인 디자인 토큰을 사용합니다.

## 색상 팔레트

### Primary Colors (주 브랜드 색상)

```css
/* Tailwind 클래스 사용 */
bg-primary-500    /* 기본 브랜드 색상 */
text-primary-700  /* 텍스트용 진한 브랜드 색상 */
border-primary-300 /* 테두리용 연한 브랜드 색상 */

/* CSS 변수 직접 사용 */
background-color: var(--color-primary-500);
```

### Semantic Colors (상태별 색상)

- **Success**: `bg-success-500`, `text-success-700`
- **Warning**: `bg-warning-500`, `text-warning-700`
- **Danger**: `bg-danger-500`, `text-danger-700`
- **Neutral**: `bg-neutral-100`, `text-neutral-800`

## 타이포그래피

### 폰트 크기

```html
<!-- 제목 -->
<h1 class="text-4xl font-bold">대제목</h1>
<h2 class="text-3xl font-semibold">중제목</h2>
<h3 class="text-2xl font-medium">소제목</h3>

<!-- 본문 -->
<p class="text-base">기본 텍스트</p>
<span class="text-sm text-neutral-600">보조 텍스트</span>
<small class="text-xs text-neutral-500">작은 텍스트</small>
```

### 폰트 패밀리

- **Sans**: Pretendard 기반 (기본값)
- **Mono**: JetBrains Mono 기반 (코드용)

## 스페이싱

8px 그리드 시스템을 사용합니다.

```html
<!-- 마진/패딩 -->
<div class="p-4">16px 패딩</div>
<div class="m-6">24px 마진</div>
<div class="px-8 py-4">좌우 32px, 상하 16px</div>

<!-- 갭 -->
<div class="flex gap-3">12px 간격</div>
<div class="grid grid-cols-3 gap-6">24px 간격</div>
```

## 테두리 반경

```html
<button class="rounded-md">기본 버튼 (6px)</button>
<div class="rounded-lg">카드 (8px)</div>
<img class="rounded-full">프로필 이미지</img>
```

## 그림자

```html
<div class="shadow-sm">얇은 그림자</div>
<div class="shadow-md">중간 그림자</div>
<div class="shadow-lg">진한 그림자</div>
```

## 실제 사용 예시

### 버튼 컴포넌트

```html
<!-- Primary Button -->
<button
  class="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-colors"
>
  기본 버튼
</button>

<!-- Secondary Button -->
<button
  class="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium px-6 py-3 rounded-lg border border-neutral-300"
>
  보조 버튼
</button>
```

### 카드 컴포넌트

```html
<div class="bg-white rounded-xl shadow-lg border border-neutral-200 p-6">
  <h3 class="text-xl font-semibold text-neutral-900 mb-4">카드 제목</h3>
  <p class="text-neutral-600 leading-relaxed">카드 내용</p>
</div>
```

### 폼 요소

```html
<!-- Input -->
<input
  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  placeholder="텍스트 입력"
/>

<!-- Label -->
<label class="block text-sm font-medium text-neutral-700 mb-2"> 라벨 </label>
```

## CSS 변수 직접 사용

Tailwind 클래스가 커버하지 못하는 경우 CSS 변수를 직접 사용할 수 있습니다:

```css
.custom-component {
  background: linear-gradient(
    135deg,
    var(--color-primary-500),
    var(--color-primary-600)
  );
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal) var(--transition-ease-in-out);
}
```

## 다크 모드 지원

향후 다크 모드 지원을 위해 토큰 기반 시스템을 구축했습니다. 다크 모드 구현 시 CSS 변수만 변경하면 전체 테마가 바뀝니다.
