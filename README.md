# Oasis Portal Vue

Vue3, Vuetify, Pinia를 활용한 현대적인 웹 포털 애플리케이션입니다.

## 🚀 기술 스택

- **Vue 3** - Composition API를 활용한 현대적인 프론트엔드 프레임워크
- **Vuetify 3** - Material Design 기반의 UI 컴포넌트 라이브러리
- **Pinia** - Vue 3를 위한 직관적인 상태 관리 라이브러리
- **Vue Router** - Vue.js 공식 라우터
- **Sass/SCSS** - CSS 전처리기
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
│   ├── variables.scss
│   └── global.scss
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

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 코드 품질

```bash
# ESLint 검사
npm run lint

# Prettier 포맷팅
npm run format
```

## 🔐 인증

데모 계정 정보:

- **이메일**: admin@example.com
- **비밀번호**: password

## ✨ 주요 기능

### 🎨 UI/UX

- Material Design 기반의 현대적인 인터페이스
- 반응형 디자인 (모바일, 태블릿, 데스크톱 지원)
- 라이트/다크 테마 지원
- 직관적인 네비게이션

### 🔒 인증 시스템

- 로그인/로그아웃 기능
- 사용자 세션 관리
- 라우트 가드를 통한 접근 제어
- 사용자 프로필 관리

### 📊 대시보드

- 통계 카드
- 차트 및 그래프 (차트 라이브러리 연동 시)
- 최근 활동 피드
- 할 일 목록

### 🎛️ 상태 관리

- Pinia를 활용한 중앙집중식 상태 관리
- 인증 상태 관리
- 앱 전역 설정 관리
- 알림 시스템

### 🎨 스타일링

- Sass/SCSS 기반 스타일링
- 재사용 가능한 변수 및 믹스인
- 유틸리티 클래스
- 컴포넌트별 스코프 스타일

## 📦 커스터마이징

### 테마 설정

`src/plugins/vuetify.js`에서 테마 색상을 커스터마이징할 수 있습니다:

```javascript
const lightTheme = {
  colors: {
    primary: "#1976d2",
    secondary: "#424242",
    // ... 다른 색상들
  },
};
```

### SCSS 변수

`src/styles/variables.scss`에서 SCSS 변수를 수정할 수 있습니다:

```scss
$primary-color: #1976d2;
$secondary-color: #424242;
// ... 다른 변수들
```

## 🚀 배포

### Vercel

```bash
npm run build
# dist 폴더를 Vercel에 배포
```

### Netlify

```bash
npm run build
# dist 폴더를 Netlify에 배포
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.

---

**Happy Coding! 🎉**
