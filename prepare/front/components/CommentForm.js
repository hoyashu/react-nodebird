import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addCommentRequestAction } from '../reducers/post';

const CommentForm = ({ post }) => {
  const userEmail = useSelector(state => state.user.me?.userEmail);
  const nickName = useSelector(state => state.user.me?.nickName);
  const addCommentLoading = useSelector(state => state.post.addCommentLoading);
  const addCommentDone = useSelector(state => state.post.addCommentDone);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const comment = Form.useWatch('comment', form);

  useEffect(() => {
    if (addCommentDone) {
      form.resetFields();
    }
  }, [addCommentDone]);

  const onSubmit = useCallback(
    values => {
      if (!userEmail) {
        alert('로그인 후 작성해주세요.');
        return;
      }

      const data = {
        postId: post.id,
        User: {
          userEmail,
          nickName,
        },
        content: values.comment,
      };

      dispatch(addCommentRequestAction(data));
    },
    [userEmail, comment],
  );

  return (
    <Form name={`commentForm-${post.id}`} form={form} onFinish={onSubmit}>
      <Form.Item name="comment">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={addCommentLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      userEmail: PropTypes.string,
      nickName: PropTypes.string,
    }),
    content: PropTypes.string,
  }).isRequired,
};
export default CommentForm;
