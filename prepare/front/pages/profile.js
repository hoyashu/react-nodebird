import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  const followingList = [
    {
      nickName: 'Ant Design Title 1',
    },
    {
      nickName: 'Ant Design Title 2',
    },
    {
      nickName: 'Ant Design Title 3',
    },
    {
      nickName: 'Ant Design Title 4',
    },
  ];
  const followerList = [
    {
      nickName: 'Ant Design Title 1',
    },
    {
      nickName: 'Ant Design Title 2',
    },
    {
      nickName: 'Ant Design Title 3',
    },
    {
      nickName: 'Ant Design Title 4',
    },
  ];

  return (
    <>
      <Head>
        <title>NodeBard - 프로필</title>
      </Head>
      <AppLayout>
        <div>프로필</div>

        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};
export default Profile;
