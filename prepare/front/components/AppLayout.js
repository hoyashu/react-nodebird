import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from 'antd';
import Home from '../pages';
import Profile from '../pages/profile';
import Signup from '../pages/signup';
import { useState } from 'react';

const items = [
  {
    label: (
      <Link href="/">
        <a>노드버드</a>
      </Link>
    ),
    key: 'home',
  },
  {
    label: (
      <Link href="/profile">
        <a>프로필</a>
      </Link>
    ),
    key: 'profile',
  },
  {
    label: (
      <Link href="/signup">
        <a>회원가입</a>
      </Link>
    ),
    key: 'signup',
  },
];

const AppLayout = ({ children }) => {
  const [current, setCurrent] = useState('mail');
  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
