import produce from 'immer';

export const initialState = {
  mainPosts: [
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

          content: '댓글입니다~~',

          User: {
            userEmail: 'dd2@naver.com',

            nickName: 'gg',
          },
        },

        {
          postId: 2,

          content: '댓글입니다~~',

          User: {
            userEmail: 'dfd@naver.com',

            nickName: 'ㅇㄹㄴㅇ',
          },
        },

        {
          postId: 2,

          content: '댓글입니다~~',

          User: {
            userEmail: 'dfgd@naver.com',

            nickName: 'gㄹㅇㄹㅇㄹg',
          },
        },
      ],
    },

    {
      id: 1,

      User: {
        userEmail: 'dd5@naver.com',

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
          postId: 3,

          content: '댓글입니다~~',

          User: {
            userEmail: 'dd1@naver.com',

            nickName: 'gg',
          },
        },

        {
          postId: 3,

          content: '댓글입니다~~',

          User: {
            userEmail: 'ddd@naver.com',

            nickName: 'ㅇㄹㄴㅇ',
          },
        },

        {
          postId: 3,

          content: '댓글입니다~~',

          User: {
            userEmail: 'daa@naver.com',

            nickName: 'gㄹㅇㄹㅇㄹg',
          },
        },
      ],
    },
  ],

  imagePath: [],

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

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';

export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';

export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';

export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';

export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';

export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

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
