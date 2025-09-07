# OASIS Portal Vue

## 🚀 기술 스택

- **Vue 3** - Composition API를 활용한 현대적인 프론트엔드 프레임워크
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Headless UI** - 접근성을 고려한 UI 컴포넌트
- **Pinia** - Vue 3를 위한 직관적인 상태 관리 라이브러리
- **Vue Router** - Vue.js 공식 라우터
- **Vite** - 빠른 개발 서버와 번들링 도구

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   └── AppNavigation.vue
├── views/              # 페이지 컴포넌트
│   ├── Home.vue
│   ├── About.vue
│   ├── Login.vue
│   ├── Dashboard.vue
│   ├── Profile.vue
│   └── NotFound.vue
├── stores/             # Pinia 상태 관리
│   ├── index.js
│   ├── auth.js
│   └── app.js
├── router/             # Vue Router 설정
│   └── index.js
├── plugins/            # Vue 플러그인
│   └── vuetify.js
├── styles/             # 글로벌 스타일
│   ├── main.css        # Tailwind CSS 설정
│   └── design-tokens.md # 디자인 토큰 가이드
├── assets/             # 정적 자산
├── utils/              # 유틸리티 함수
└── composables/        # Vue Composition 함수
```

## 🛠️ 설치 및 실행

### 필요 조건

- Node.js 16+
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (localhost:3000)
npm run dev
```
