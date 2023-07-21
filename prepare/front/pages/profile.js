import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  console.log('Profile');
  const me = useSelector(state => state.user.me);
  const router = useRouter();

  useEffect(() => {
    if (!(me && me.userEmail)) {
      console.log('router.push');
      router.push('/');
    }
  }, [me && me.userEmail]);

  if (!me) {
    return null;
  }

  const Followings = useSelector(state => state.user.me?.Followings);
  const Followers = useSelector(state => state.user.me?.Followers);

  return (
    <>
      <Head>
        <title>NodeBard - 프로필</title>
      </Head>
      <AppLayout>
        <div>프로필</div>

        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={Followings} />
        <FollowList header="팔로워 목록" data={Followers} />
      </AppLayout>
    </>
  );
};

// Profile.propTypes = {
//   followingList: PropTypes.shape({
//     userEmail: PropTypes.string,
//     nickName: PropTypes.string,
//   }),
//   followerList: PropTypes.shape({
//     userEmail: PropTypes.string,
//     nickName: PropTypes.string,
//   }),
// };
export default Profile;
