import { Avatar, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginOutRequestAction } from '../reducers/user';

const UserProfile = () => {
  console.log('UserProfile');
  const me = useSelector(state => state.user?.me);
  const logOutLoading = useSelector(state => state.user?.logOutLoading);

  const dispatch = useDispatch();
  const { Meta } = Card;

  const onLogOut = useCallback(() => {
    dispatch(loginOutRequestAction());
    // setlogInDone(false);
  }, []);
  return (
    <Card
      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
      actions={[
        <>
          짹짹
          <br />
          {me.Posts.length}
        </>,
        <>
          팔로워
          <br />
          {me.Followings.length}
        </>,
        <>
          팔로잉
          <br />
          {me.Followers.length}
        </>,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title={me.nickName}
        description={
          <Button onClick={onLogOut} loading={logOutLoading}>
            로그아웃
          </Button>
        }
      />
    </Card>
  );
};
UserProfile.propTypes = {
  setlogInDone: PropTypes.func,
};
export default UserProfile;
