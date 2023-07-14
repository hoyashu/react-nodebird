import { useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const Home = () => {
  const { logInDone } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  console.log(mainPosts);
  return (
    <AppLayout>
      {logInDone && <PostForm />}
      {mainPosts && mainPosts.map(post => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};
export default Home;
