import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import shortId from 'shortid';

import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function* addPost(action) {
  try {
    console.log('saga', action.data);
    // const result = yield call(logInAPI, action.data);

    const result = {
      id: shortId.generate(),
      User: {
        userEmail: action.data.userEmail,
        nickName: action.data.nickName,
      },
      content: action.data.content,
      Images: [],
      Comments: [],
    };

    yield delay(1000);

    yield put({
      type: ADD_POST_SUCCESS,
      data: result,
    });

    yield put({
      type: ADD_POST_TO_ME,
      data: result,
    });
  } catch (err) {
    yield put({ type: ADD_POST_FAILURE, data: err.response.data });
  }
}

function* removePost(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });

    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({ type: REMOVE_POST_FAILURE, data: err.response.data });
  }
}

function* addComment(action) {
  try {
    console.log('saga', action.data);
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({ type: ADD_POST_FAILURE, data: err.response.data });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)]);
}
