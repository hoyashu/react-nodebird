import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Upload } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPostRequestAction } from '../reducers/post';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const { TextArea } = Input;

const PostForm = () => {
  const dispatch = useDispatch();
  const addPostDone = useSelector(state => state.post.addPostDone);
  const me = useSelector(state => state.user.me);
  const [form] = Form.useForm();

  useEffect(() => {
    if (addPostDone) {
      form.resetFields();
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    const content = form.getFieldValue('content');
    dispatch(addPostRequestAction({ userEmail: me.userEmail, nickName: me.nickName, content }));
  }, []);

  return (
    <Form
      name="postForm"
      {...formItemLayout}
      onFinish={onSubmit}
      style={{
        maxWidth: 600,
      }}
      form={form}
    >
      <Form.Item label="TextArea" name="content" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
