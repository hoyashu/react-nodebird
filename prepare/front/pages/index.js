import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { loadPostRequestAction } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { logInDone } = useSelector(state => state.user);
  const { hasMorePosts } = useSelector(state => state.post);
  const { loadPostLoading } = useSelector(state => state.post);
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(loadPostRequestAction({ count: 10 }));
  }, []);

  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView && hasMorePosts && !loadPostLoading) {
      dispatch(loadPostRequestAction({ count: 10 }));
    }
  }, [inView, hasMorePosts, loadPostLoading, mainPosts]);

  return (
    <AppLayout>
      {logInDone && <PostForm />}
      {mainPosts &&
        mainPosts.map((post, index) =>
          index === mainPosts.length - 4 ? (
            <>
              <div ref={hasMorePosts && !loadPostLoading ? ref : undefined} />
              <PostCard key={post.id} post={post} />
            </>
          ) : (
            <PostCard key={post.id} post={post} />
          ),
        )}
    </AppLayout>
  );
};
export default Home;
