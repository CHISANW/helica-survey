# Helica Survey

## 개요
Helica Survey는 사용자들의 통증 위치, 운동 동기, 건강 점검 방식 등 다양한 건강 관련 데이터를 수집하는 설문조사 애플리케이션입니다. 수집된 데이터는 분석을 통해 개인화된 건강 관리 서비스의 기반으로 활용됩니다.

## 데이터베이스 구조

아래는 Helica Survey의 데이터베이스 ERD(Entity Relationship Diagram)입니다:

![데이터베이스 ERD](https://github.com/user-attachments/assets/5fe6d3cb-3ddf-4d44-add5-888f7d7eacb0)

## 기술 스택

### 백엔드
- **프레임워크**: NestJS (v11.0.1)
- **언어**: TypeScript (v5.7.3)
- **데이터베이스**: MySQL (mysql2 v3.14.1)
- **ORM**: TypeORM (v0.3.22)
- **유효성 검사**: class-validator (v0.14.1), class-transformer (v0.5.1)

### 개발 도구
- **코드 스타일**: ESLint (v9.18.0), Prettier (v3.5.3)
- **컴파일러**: SWC (@swc/core v1.10.7, @swc/cli v0.6.0)
- **패키지 관리자**: npm

### 배포 환경
- **컨테이너화**: Docker

## API 엔드포인트

### 설문조사 API

#### 설문 참여 가능 여부 확인
- **URL**: `GET /surveys`
- **설명**: 클라이언트의 IP 기반으로 설문 참여 가능 여부 확인
- **응답 예시**:
  ```json
  {
    "success": true
  }
  ```

#### 설문조사 제출
- **URL**: `POST /surveys`
- **설명**: 사용자 설문조사 데이터 제출
- **요청 헤더**:
    - `x-helica-user-key`: 사용자 인증 키
- **응답 예시**:
  ```json
  {
    "success": "설문 완료"
  }
  ```

#### 이메일 업데이트
- **URL**: `POST /surveys/email`
- **설명**: 사용자 이메일 정보 업데이트
- **요청 본문**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **응답 예시**:
  ```json
  {
    "success": "success"
  }
  ```

## 설치 및 실행

```bash
# 패키지 설치
$ npm install

# 개발 모드 실행
$ npm run start:dev

# 프로덕션 모드 실행
$ npm run start:prod
```

## Docker 배포

```bash
# Docker 이미지 빌드
$ docker build -t helica-survey .

# Docker 컨테이너 실행
$ docker run -p 3000:3000 helica-survey
```

## 라이선스

본 프로젝트는 MIT 라이선스를 따릅니다.
