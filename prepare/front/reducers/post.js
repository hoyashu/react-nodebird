import { faker } from '@faker-js/faker';
// eslint-disable-next-line import/no-extraneous-dependencies
import produce from 'immer';
import shortId from 'shortId';

export const initialState = {
  mainPosts: [],
  imagePath: [],

  hasMorePosts: true,

  // 화면 로드
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: false,

  // 게시글 추가
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,

  // 게시글 수정
  editPostLoading: false,
  editPostDone: false,
  editPostError: false,

  // 게시글 삭제
  removePostLoading: false,
  removePostDone: false,
  removePostError: false,

  // 댓글 추가
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: false,

  // 댓글 수정
  editCommentLoading: false,
  editCommentDone: false,
  editCommentError: false,

  // 댓글 삭제
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: false,

  // 좋아요
  changeCommentLoading: false,
  changeCommentDone: false,
  changeCommentError: false,
};

export const generateDummyPost = number =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        userEmail: faker.internet.email(),
        nickName: faker.person.fullName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.url(),
          alt: faker.lorem.word(),
        },
      ],
      Comments: [],
    }));

initialState.mainPosts = initialState.mainPosts.concat([
  {
    id: 1,
    User: {
      userEmail: faker.internet.email(),
      nickName: '제로초',
    },
    content: '첫번째 게시글 #해시태그 #익스프레스',
    Images: [
      {
        src: 'https://i.ytimg.com/vi/q6PcMa8zbWc/maxresdefault.jpg',
        alt: '슈화 귀여워',
      },
      {
        src: 'https://i.ytimg.com/vi/MMKU_TwY4wU/maxresdefault.jpg',
        alt: '슈화 귀여워',
      },
    ],
    Comments: [
      {
        postId: 1,
        content: faker.lorem.sentences(),
        User: {
          userEmail: faker.internet.email(),
          nickName: faker.person.fullName(),
        },
      },

      {
        postId: 1,
        content: faker.lorem.sentences(),
        User: {
          userEmail: faker.internet.email(),
          nickName: faker.person.fullName(),
        },
      },

      {
        postId: 1,
        content: faker.lorem.sentences(),
        User: {
          userEmail: faker.internet.email(),
          nickName: faker.person.fullName(),
        },
      },
    ],
  },
  {
    id: 2,
    User: {
      userEmail: '5126537@naver.com',
      nickName: '호야슈',
    },
    content: '슈화는 사랑입니다 #여자아이들 #슈화',
    Images: [
      {
        src: 'https://i.ytimg.com/vi/MMKU_TwY4wU/maxresdefault.jpg',
        alt: '슈화 귀여워',
      },
    ],
    Comments: [
      {
        postId: 2,
        content: faker.lorem.sentences(),
        User: {
          userEmail: faker.internet.email(),
          nickName: faker.person.fullName(),
        },
      },
      {
        postId: 2,
        content: faker.lorem.sentences(),
        User: {
          userEmail: faker.internet.email(),
          nickName: faker.person.fullName(),
        },
      },

      {
        postId: 2,
        content: faker.lorem.sentences(),
        User: {
          userEmail: faker.internet.email(),
          nickName: faker.person.fullName(),
        },
      },
    ],
  },
]);

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const loadPostRequestAction = data => ({
  type: LOAD_POST_REQUEST,
  data,
});
export const addPostRequestAction = data => ({
  type: ADD_POST_REQUEST,
  data,
});

export const removePostRequestAction = data => ({
  type: REMOVE_POST_REQUEST,
  data,
});

export const addCommentRequestAction = data => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = false;
        break;

      case LOAD_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.loadPostError = false;
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;

      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostDone = false;
        draft.loadPostError = true;
        break;

      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostDone = false;
        break;

      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(action.data);
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.addPostDone = false;
        break;

      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostDone = false;
        draft.addPostDone = true;
        break;

      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = false;
        break;

      case REMOVE_POST_SUCCESS: {
        draft.mainPosts = state.mainPosts.filter(v => v.id !== action.data.id);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.removePostError = false;
        break;
      }

      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostDone = false;
        draft.removePostError = true;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = false;
        break;

      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find(v => v.id === action.data.postId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.addCommentError = false;
        break;
      }

      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentDone = false;
        draft.addCommentError = true;
        break;

      default:
        return state;
    }
  });

export default reducer;
