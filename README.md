# Greenyday

## 설치 파일

### front

> ```bash
>
> npm install jsonwebtoken
> npm i @mantine/ds@6.0.2
> npm i @mantine/core@6.0.2
> npm i @mantine/carousel@6.0.2
> npm i antd@5.3.1
> npm i autoprefixer@10.4.14
> npm i axios@1.3.4
> npm i flowbite-react@0.4.2
> npm i flowbite@1.6.4
> npm i immer@9.0.19
> npm i next-redux-wrapper@8.1.0
> npm i next@13.2.4
> npm i postcss@8.4.21
> npm i react-dom@18.2.0
> npm i react-helmet@6.1.0
> npm i react-redux@8.0.5
> npm i react@18.2.0
> npm i redux-devtools-extension@2.13.9
> npm i redux-saga@1.2.2
> npm i tw-elements@1.0.0-beta1
> npm i react-redux@8.0.7
> npm i redux-saga@1.2.3
> npm i redux-devtools-extension@2.13.9
> npm i tailwindcss@3.3.2
> ```

### back

> ```bash
> python -m venv myvenv
> source myvenv/bin/activate
> cd backend
> pip install -r requirements.txt
> python manage.py makemigrations
> python manage.py migrate
> python manage.py createsuperuser
> python manage.py runserver
> ```

## **_Backend End-points_**

> Resource modeling
>
> 1️⃣ 회원 관련 API
>
> | HTTP     | Path                       | Method | Permission      | 목적                                                                                                      |
> | -------- | -------------------------- | ------ | --------------- | --------------------------------------------------------------------------------------------------------- |
> | **POST** | /api/accounts/signup/      | CREATE | AllowAny        | 사용자 회원가입                                                                                           |
> | **POST** | /api/accounts/login/       | NONE   | AllowAny        | 사용자 로그인, access_token, refresh_token 생성 및 반환                                                   |
> | **GET**  | /api/accounts/login/kakao/ | NONE   | AllowAny        | 사용자 카카오 회원가입, 로그인, front에서 kakao code를 받아서 사용자의 계정 추출 후, 회원가입 혹은 로그인 |
> | **POST** | /api/accounts/logout/      | NONE   | IsAuthenticated | 사용자 로그아웃, BlacklistedToken에 refresh_token 추가                                                    |
>
> 2️⃣ 루틴 관련 API
>
> | HTTP    | Path                                   | Method   | Permission | 목적                                       |
> | ------- | -------------------------------------- | -------- | ---------- | ------------------------------------------ | ----------------------- |
> | **GET** | /api/items/                            | LIST     | AllowAny   | 그리니데이 메뉴 관련 정보들 조회           |
> | **GET** | /api/items/?category_id\_\_name=샐러드 | NONE     | Allowany   | 쿼리 스트링에 맞는 해당 카테고리 메뉴 조회 |
> | **GET** | /api/items/<int:pk>/                   | RETRIEVE | Allowany   | 특정 메뉴 디테일 조회                      |
> | **GET** | /api/main/                             | NONE     | Allowany   | 이벤트, 랜덤 메뉴, 체인점 조회             | (체인점 모델 생성 예정) |

## **_Frontend - Skills_**

> [JWT](https://github.com/Kimjimin97/Computer-Science/blob/main/Frontend/SSR_VS_CSR.md)
