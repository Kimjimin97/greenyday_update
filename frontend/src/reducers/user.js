import produce from "immer";

export const initialState = {
  logInLoading: false,
  logInDone: false, //로그인 시도중
  logInFail: false,
  logInError: null,
  logOutLoading: false, //로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  postUpLoading: false,
  postUpDone: false,
  postUpError: null,
  me: null,
  meAddress: null,
  signUpDate: {},
  loginData: {},

  emailOverLap: false,
  nicknameOverLap: false,
  nickname: false,
  phoneOverLap: false,

  mainPosts: [],

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
};

//회원가입 action
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const KAKAO_SIGN_UP_REQUEST = "KAKAO_SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";

// 중복 실패
export const SIGN_UP_FAIL_EMAILOVERLAP = "SIGN_UP_FAIL_EMAILOVERLAP";
export const SIGN_UP_FAIL_NICKNAMEOVERLAP = "SIGN_UP_FAIL_NICKNAMEOVERLAP";
export const SIGN_UP_FAIL_PHONEOVERLAP = "SIGN_UP_FAIL_PHONEOVERLAP";

export const ON_CHANGE_EMAILOVERLAP = "ON_CHANGE_EMAILOVERLAP";
export const ON_CHANGE_NICKNAMEOVERLAP = "ON_CHANGE_NICKNAMEOVERLAP";
export const ON_CHANGE_PHONEOVERLAP = "ON_CHANGE_PHOENEOVERLAP";

export const LOG_IN_REQUEST = "LOGIN_IN_REQUEST ";
export const LOGIN_IN_FAIL = "LOGIN_IN_FAIL ";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST ";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS ";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";
export const LOGIN_IN_SUCCESS = "LOGIN_IN_SUCCESS";

export const signupRequestAction = (data) => ({
  type: SIGN_UP_REQUEST,
  data,
});

export const kakaosignupRequestAction = (data) => ({
  type: KAKAO_SIGN_UP_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SIGN_UP_SUCCESS:
        draft.signUpDone = true;
        break;

      case LOGIN_IN_SUCCESS:
        draft.logInDone = true;
        draft.logInFail = false;
        break;

      case LOGIN_IN_FAIL:
        draft.logInFail = true;

      case LOG_OUT_SUCCESS:
        draft.logInDone = false;
        break;

      case SIGN_UP_FAIL_EMAILOVERLAP:
        draft.signUpDone = false;
        draft.emailOverLap = true;
        break;

      case SIGN_UP_FAIL_NICKNAMEOVERLAP:
        draft.signUpDone = false;
        draft.nicknameOverLap = true;
        break;

      case SIGN_UP_FAIL_PHONEOVERLAP:
        draft.signUpDone = false;
        draft.phoneOverLap = true;
        break;

      case ON_CHANGE_EMAILOVERLAP:
        draft.emailOverLap = false;
        break;

      case ON_CHANGE_NICKNAMEOVERLAP:
        draft.nicknameOverLap = false;
        break;

      case ON_CHANGE_PHONEOVERLAP:
        draft.phoneOverLap = false;
        break;

      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;

      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        break;

      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
