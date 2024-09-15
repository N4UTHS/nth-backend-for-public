# 기업 소개 홈페이지 개발 프로젝트

## 저장소 소개
해당 저장소 코드 공개를 위해 생성된 저장소이며, 실제 운영 환경과 다를 수 있습니다.
<br>
실제 배포 및 개발은 별도의 비공개 저장소에서 진행됩니다.

## 개발 기간
2024년 7월 14일 ~ 8월 30일

## 배포 기간
2024년 8월 30일 ~ 현재

## 핵심 기능
- S3에 메인 화면 이미지 업로드 밑 불러오기
- 자회사 정보 추가 • 수정 • 삭제
- 공지사항 작성 • 수정 • 삭제
- 공지사항 첨부파일 S3 업로드 및 불러오기

## 프로젝트 구조 및 설명
```
nh-backend
├─ Dockerfile ──────────────────────── # Docker 이미지 설정 파일
├─ app.js ──────────────────────────── # 서버 엔트리 포인트
├─ configs ─────────────────────────── # 설정 파일 관리
│  ├─ aws.config.js ────────────────── # AWS 설정 파일
│  ├─ database.config.js ───────────── # MongoDB 연결 파일
│  └─ multer.config.js ─────────────── # 파일 업로드 설정 파일 (Multer)
├─ controllers ─────────────────────── # 비즈니스 로직 호출
│  ├─ admin
│  │  └─ login.controller.js ───────── # 관리자 로그인 컨트롤러
│  ├─ announcement.controller.js ───── # 공지사항 컨트롤러
│  ├─ image.controller.js ──────────── # 메인 화면 이미지 컨트롤러
│  └─ subsidiary.controller.js ─────── # 자회사 컨트롤러
├─ lib ─────────────────────────────── # 템플릿 관리
│  └─ emailTemplate.html ───────────── # 인증 코드 전송에 사용되는 이메일 템플릿
├─ middlewares ─────────────────────── # 미들웨어
│  └─ token.middleware.js ──────────── # 토큰 검증 관련 미들웨어
├─ models ──────────────────────────── # 데이터 모델 정의
│  ├─ announcement.model.js ────────── # 공지사항 데이터 모델 정의
│  ├─ subsidiary.model.js ──────────── # 자회사 데이터 모델 정의
│  ├─ verification.model.js ────────── # 인증 코드 데이터 모델 정의
│  └─ view.model.js ────────────────── # 조회수 모델 정의
├─ routes ──────────────────────────── # API 라우팅
│  ├─ admin.router.js ──────────────── # 관리자 기능 API 라우팅
│  ├─ announcement.router.js ───────── # 사용자 공지사항 관련 API 라우팅
│  ├─ mainPage.router.js ───────────── # 사용자 메인 화면 API 라우팅
│  └─ subsidiary.router.js ─────────── # 사용자 자회사 API 라우팅
├─ services ────────────────────────── # 비즈니스 로직 처리
│  ├─ admin
│  │  ├─ aws
│  │  │  └─ S3.service.js ──────────── # AWS S3 로직 수행
│  │  ├─ login
│  │  │  ├─ code.service.js ────────── # 인증 코드 관련 비즈니스 로직 수행
│  │  │  ├─ jwt.service.js ─────────── # JWT 토큰 로직 수행
│  │  │  └─ login.service.js ───────── # 관리자 로그인 로직 수행
│  │  └─ mail.service.js ───────────── # 인증 코드 전송 수행
│  ├─ announcement.service.js ──────── # 공지사항 비즈니스 로직 수행
│  └─ subsidiary.service.js ────────── # 자회사 비즈니스 로직 수행
└─ utils ───────────────────────────── # 유틸리티 함수 모음
   ├─ generateName.util.js ─────────── # S3 업로드 전 변경할 파일 이름 생성
   ├─ hash.util.js ─────────────────── # 문자열 해시화
   └─ randomStr.util.js ────────────── # 무작위 문자열 생성
```
