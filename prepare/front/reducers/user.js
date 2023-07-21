import produce from 'immer';

export const initialState = {
  me: null,
  signUpDate: {},
  loginData: {},

  // 회원가입
  signUpLoading: false,
  signUpDone: false,
  signUpError: false,

  // 로그인
  logInLoading: false,
  logInDone: false,
  logInError: false,

  // 로그아웃
  logOutLoading: false,
  logOutDone: false,
  logOutError: false,

  // 닉네임 변경
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: false,

  // 팔로우 신청
  addFollowLoading: false,
  addFollowDone: false,
  addFollowError: false,

  // 팔로우 취소
  removeFollowLoading: false,
  removeFollowDone: false,
  removeFollowError: false,
};

export const CHANGE_NICKNAME = 'CHANGE_NICKNAME';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';

export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';

export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';

export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';

export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';

export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

// action creator

const changeNicknameAction = data => ({
  type: CHANGE_NICKNAME_REQUEST,

  data,
});

export const signUpRequestAction = data => ({
  type: SIGN_UP_REQUEST,

  data,
});

export const loginRequestAction = data => ({
  type: LOG_IN_REQUEST,

  data,
});

export const loginOutRequestAction = data => ({
  type: LOG_OUT_REQUEST,

  data,
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;

        draft.signUpDone = false;

        draft.signUpError = false;

        break;

      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;

        draft.signUpDone = true;

        draft.signUpError = false;

        break;

      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;

        draft.signUpDone = false;

        draft.signUpError = true;

        break;

      case LOG_IN_REQUEST:
        draft.logInLoading = true;

        draft.logInDone = false;

        draft.logInError = false;

        break;

      case LOG_IN_SUCCESS:
        draft.logInLoading = false;

        draft.logInDone = true;

        draft.logInError = false;

        draft.me = action.data;

        break;

      case LOG_IN_FAILURE:
        draft.logInLoading = false;

        draft.logInDone = false;

        draft.logInError = true;

        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;

        draft.logOutDone = false;

        draft.logOutError = false;

        break;

      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;

        draft.logOutDone = true;

        draft.logOutError = false;

        draft.logInDone = false;

        draft.me = null;

        break;

      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;

        draft.logOutDone = false;

        draft.logOutError = true;

        break;

      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;

        draft.changeNicknameDone = false;

        draft.changeNicknameError = false;

        break;

      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;

        draft.changeNicknameDone = true;

        draft.changeNicknameError = false;

        draft.me.nickName = action.data;

        break;

      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;

        draft.changeNicknameDone = false;

        draft.changeNicknameError = true;

        break;

      case ADD_POST_TO_ME:
        draft.me.Posts.unshift(action.data);

        break;

      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter(v => v.postId !== action.data.id);

        break;

      default:
        return state;
    }
  });

export default reducer;
