import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Col, Input, Layout, Menu, Row } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const { Search } = Input;

const HeaderStyled = styled.div`
  text-align: center;
  height: 64px;
  line-height: 64px;
  display: flex;
  align-items: center;
  background: red;
`;

const SearchColStyled = styled(Col)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const items = [
  {
    label: (
      <Link href="/">
        <a>노드버드</a>
      </Link>
    ),
    key: 'home',
    icon: <MailOutlined />,
  },
  {
    label: (
      <Link href="/profile">
        <a>프로필</a>
      </Link>
    ),
    key: 'profile',
    icon: <AppstoreOutlined />,
  },
  {
    label: (
      <Link href="/signup">
        <a>회원가입</a>
      </Link>
    ),
    key: 'signup',
    icon: <SettingOutlined />,
  },
];

const AppLayout = ({ children }) => {
  const me = useSelector(state => state.user.me);
  // const [logInDone, setlogInDone] = useState(false);

  const flexGrow = useMemo(() => ({ flexGrow: 1 }), []);

  return (
    <Layout>
      <HeaderStyled>
        <Row gutter={8} style={flexGrow}>
          <Col xs={24} md={20}>
            <Menu mode="horizontal" items={items} style={flexGrow} />
          </Col>
          <SearchColStyled xs={24} md={4}>
            <Search placeholder="input search text" />
          </SearchColStyled>
        </Row>
      </HeaderStyled>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://hoyashu.tistory.com/" target="_blank" rel="noreferrer noopener">
            Made by Hoyashu
          </a>
        </Col>
      </Row>
      <div>Footer</div>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
