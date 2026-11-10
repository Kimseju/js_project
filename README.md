# BOXSHOT

격투기 선수의 전적을 단체 공식 사이트(UFC, ONE Championship, Black Combat, RISE, ROAD FC)에서 불러와 인스타그램 소개글에 연동하는 웹 서비스입니다.

## 실행 방법

### 1. 준비물

- [Node.js](https://nodejs.org/) 20 이상
- Git

### 2. 저장소 받기 & 패키지 설치

```bash
git clone https://github.com/Kimseju/js_project.git
cd js_project
npm install
```

### 3. 백엔드 서버 실행

선수 전적 조회는 백엔드 서버를 거치므로, 프론트 화면을 열기 전에 서버를 먼저 켜야 합니다.

```bash
cd backend
node server.js
```

- 서버 주소: `http://localhost:3000`
- 실행해도 터미널에 따로 메시지가 나오지 않습니다. 커서만 깜빡이고 있으면 정상적으로 켜진 상태입니다.
- 종료는 `Ctrl + C`

### 4. 프론트 화면 열기

서버를 켜둔 상태에서 `frontend/login.html` 파일을 브라우저로 엽니다.
(파일을 더블클릭하거나, VS Code의 Live Server 확장으로 열어도 됩니다.)

| 페이지    | 파일                         |
| --------- | ---------------------------- |
| 로그인    | `frontend/login.html`        |
| 대시보드  | `frontend/dashboard.html`    |
| 일정      | `frontend/schedule.html`     |
| 프로필    | `frontend/profile.html`      |
| 단체 연결 | `frontend/organization.html` |
| 설정      | `frontend/setting.html`      |

## 테스트 계정

| 항목     | 값             |
| -------- | -------------- |
| 아이디   | `boxshot_test` |
| 비밀번호 | `boxshot1234!` |

로그인 화면에서 **Instagram으로 계속하기**를 누른 뒤 위 계정을 입력합니다.

## 단체 연결 테스트용 선수 ID

단체 연결 페이지(`organization.html`)에서 단체 카드를 누르고 아래 ID를 입력하면 선수 정보가 조회됩니다.

| 단체             | 선수 ID          |
| ---------------- | ---------------- |
| UFC              | `joshua-van`     |
| ONE Championship | `cho-kyeong-jae` |
| Black Combat     | `95863943`       |
| RISE             | `lee_sunghyun`   |
| ROAD FC          | `NVVETg==`       |

> 전적은 각 단체 공식 사이트에서 실시간으로 가져옵니다. 인터넷 연결이 필요하며, 백엔드 서버가 꺼져 있으면 "서버에 연결할 수 없습니다" 메시지가 나옵니다.

## 인스타그램 소개글 연동

백엔드의 `POST /` 요청은 인스타그램 계정의 소개글을 변경합니다. 이 기능을 쓰려면 계정 정보가 필요합니다.

1. 프로젝트 최상위 폴더(`js_project/`)에 `.env` 파일을 만들고 아래처럼 입력합니다.

    ```
    INSTA_USER=boxshot_test
    INSTA_PASS=boxshot1234!
    ```

2. 로그인 세션을 저장할 `session` 폴더를 프로젝트 최상위에 만듭니다.

    ```bash
    mkdir session
    ```

3. 서버를 `.env`를 읽도록 실행합니다.

    ```bash
    cd backend
    node --env-file=../.env server.js
    ```
