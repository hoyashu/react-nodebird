import { Button, Checkbox, Form, Input } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import { signUpRequestAction } from '../reducers/user';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup = () => {
  const me = useSelector(state => state.user.me);
  const router = useRouter();
  useEffect(() => {
    if (me && me.userEmail) {
      router.push('/');
    }
  }, [me && me.userEmail]);

  const signUpLoading = useSelector(state => state.user.signUpLoading);
  const dispatch = useDispatch();
  const onFinish = useCallback(values => {
    dispatch(signUpRequestAction(values));
  }, []);
  return (
    <AppLayout>
      <Head>
        <title>NodeBard - 회원가입</title>
      </Head>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nickName"
          label="닉네임"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="비밀번호 체크"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>I have read the agreement</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AppLayout>
  );
};
export default Signup;
