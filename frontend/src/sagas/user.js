import { all, fork, put, call, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";

import { backUrl } from "../config/config";
import Router from "next/router";

import {
  SIGN_UP_REQUEST,
  KAKAO_SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../reducers/user";

import {
  SIGN_UP_FAIL_EMAILOVERLAP,
  SIGN_UP_FAIL_NICKNAMEOVERLAP,
  SIGN_UP_FAIL_PHONEOVERLAP,
} from "../reducers/user";

import {
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  LOGIN_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  LOGIN_IN_FAIL,
} from "../reducers/user";

import {
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
} from "../reducers/user";

//회원가입 saga
function signUpAPI(data) {
  return axios.post(backUrl + "/api/accounts/signup/", data);
}

function* SignUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);

    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    const errObject = err.response.data;

    for (var value in errObject) {
      if (value == "email") {
        yield put({
          type: SIGN_UP_FAIL_EMAILOVERLAP,
        });
      }
      if (value == "nickname") {
        yield put({ type: SIGN_UP_FAIL_NICKNAMEOVERLAP });
      }
      if (value == "phone") {
        yield put({ type: SIGN_UP_FAIL_PHONEOVERLAP });
      }
    }
  }
}

function kakaosignUpAPI(data) {
  return axios.post(backUrl + "/api/accounts/signup/", data);
}

function* KakaoSignUp(action) {
  try {
    const result = yield call(kakaosignUpAPI, action.data);

    localStorage.removeItem("email");
    localStorage.removeItem("nickname");

    localStorage.setItem("access_token", result.data.access_token);
    localStorage.setItem("refresh_token", result.data.refresh_token);

    yield put({
      type: LOGIN_IN_SUCCESS,
    });
  } catch (err) {
    const errObject = err.response.data;

    for (var value in errObject) {
      if (value == "nickname") {
        yield put({ type: SIGN_UP_FAIL_NICKNAMEOVERLAP });
      }
      if (value == "phone") {
        yield put({ type: SIGN_UP_FAIL_PHONEOVERLAP });
      }
    }
  }
}

//로그인 saga
function logInAPI(values) {
  return axios.post(backUrl + "/api/accounts/login/", values);
}

function refreshToken(values) {
  const refresh = localStorage.getItem("refresh_token");
  const api = axios.create({
    baseURL: backUrl,
    headers: {
      Authorization: refresh,
      "Content-Type": "application/json",
    },
  });
  return api.get("/refresh");
}

function* LogIn(action) {
  try {
    const result = yield call(logInAPI, action.values);

    localStorage.setItem("access_token", result.data.access_token);
    localStorage.setItem("refresh_token", result.data.refresh_token);

    // const jwt = require("jsonwebtoken");
    // const token = result.data.access_token;
    // const decodedToken = jwt.decode(token, { complete: true });
    // const expirationTime = new Date(decodedToken.payload.exp * 1000);
    // const currentTime = new Date();

    // if (expirationTime > currentTime) {
    //   const data = yield call(refreshToken, data);
    //   return;
    // }

    // http only cookie에 저장

    if ("is_kakao" in result.data) {
      return Router.push("/home");
    }
    yield put({
      type: LOGIN_IN_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOGIN_IN_FAIL,
    });
  }
}

function* LogOut(action) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  yield put({
    type: LOG_OUT_SUCCESS,
  });
}

function loadPostsAPI() {
  return axios.get(backUrl + "/api/main/");
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);

    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,

      error: err.response.data,
    });
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, SignUp);
}

function* watchKakaoSignup() {
  yield takeLatest(KAKAO_SIGN_UP_REQUEST, KakaoSignUp);
}
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, LogIn);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, LogOut);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

export default function* userSaga() {
  yield all([fork(watchLogout)]);
  yield all([fork(watchSignup)]);
  yield all([fork(watchKakaoSignup)]);
  yield all([fork(watchLogin)]);
  yield all([fork(watchLoadPosts)]);
}
