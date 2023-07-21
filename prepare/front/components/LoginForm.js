import { faker } from '@faker-js/faker';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginRequestAction } from '../reducers/user';

const LoginForm = () => {
  const logInLoading = useSelector(state => state.user.logInLoading);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const email = Form.useWatch('email', form);
  const userPassword = Form.useWatch('userPassword', form);

  const onSubmitForm = useCallback(() => {
    dispatch(
      loginRequestAction({
        userEmail: '5126537@naver.com',
        password: 'zzz',
        nickName: '호야슈',
        Posts: [
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
                  userEmail: faker.internet.email(),
                  nickName: faker.person.fullName(),
                },
              },
              {
                postId: 2,
                content: '댓글입니다~~',
                User: {
                  userEmail: faker.internet.email(),
                  nickName: faker.person.fullName(),
                },
              },
              {
                postId: 2,
                content: '댓글입니다~~',
                User: {
                  userEmail: faker.internet.email(),
                  nickName: faker.person.fullName(),
                },
              },
            ],
          },
        ],
        Followings: [
          {
            userEmail: faker.internet.email(),
            nickName: faker.person.fullName(),
          },
          {
            userEmail: faker.internet.email(),
            nickName: faker.person.fullName(),
          },
          {
            userEmail: faker.internet.email(),
            nickName: faker.person.fullName(),
          },
        ],
        Followers: [
          {
            userEmail: faker.internet.email(),
            nickName: faker.person.fullName(),
          },
          {
            userEmail: faker.internet.email(),
            nickName: faker.person.fullName(),
          },
          {
            userEmail: faker.internet.email(),
            nickName: faker.person.fullName(),
          },
        ],
      }),
    );
  }, [email, userPassword]);

  const onSubmitFormFail = useCallback(errorInfo => {
    console.log('Failed:', errorInfo);
  }, []);

  return (
    <Form
      form={form}
      name="loginForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onSubmitForm}
      onFinishFailed={onSubmitFormFail}
      autoComplete="off"
    >
      <Form.Item label="이메일" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="비밀번호"
        name="userPassword"
        rules={[{ required: true, message: 'Please input your userPassword!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
      </Form.Item>
      <Form.Item>
        <Link href="/signup">회원가입</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
