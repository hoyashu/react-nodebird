import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, List, Popover } from 'antd';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removePostRequestAction } from '../reducers/post';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';

const { Meta } = Card;

const PostCard = ({ post }) => {
  console.log('PostCard', post);
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.user.me?.userEmail);
  const removePostLoading = useSelector(state => state.post.removePostLoading);
  const removePostDone = useSelector(state => state.post.removePostDone);
  const [isLiked, setIsLiked] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const removePost = useCallback(() => {
    dispatch(
      removePostRequestAction({
        id: post.id,
      }),
    );
  }, []);

  const content = useMemo(
    () => (
      <>
        {userEmail && post.User?.userEmail === userEmail && (
          <>
            <Button>수정</Button>
            <Button type="primary" onClick={removePost} loading={removePostLoading}>
              삭제
            </Button>
          </>
        )}
        <Button>신고</Button>
      </>
    ),
    [userEmail],
  );

  const onToggleHeart = useCallback(() => setIsLiked(prev => !prev), []);
  const onToggleComment = useCallback(() => setIsComment(prev => !prev), []);

  return (
    <>
      <Card
        cover={<PostImages postImages={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          isLiked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleHeart} />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleHeart} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover key="edit" content={content} title="Title" trigger="click">
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={post.User?.nickName}
          description={<PostCardContent postId={post.id} content={post.content} />}
        />
      </Card>

      {isComment && (
        <div>
          <CommentForm post={post} />
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={item => (
              <List.Item actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}>
                <List.Item.Meta title={item.User.nickName} description={item.content} />
              </List.Item>
            )}
          />
        </div>
      )}
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      userEmail: PropTypes.string,
      nickName: PropTypes.string,
    }),
    content: PropTypes.string,
    Images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
      }),
    ),
    Comments: PropTypes.arrayOf(
      PropTypes.shape(
        {
          postId: PropTypes.number,
          content: PropTypes.string,
          User: {
            userEmail: PropTypes.string,
            nickName: PropTypes.string,
          },
        }.isRequired,
      ),
    ),
  }).isRequired,
};
export default PostCard;
