import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postId: id, content }) => {
  const splitTags = content.split(/(#[^#\s]+)/);

  return (
    <>
      {splitTags.map((hashTag, index) => {
        if (hashTag.indexOf('#') !== -1) {
          return (
            <Link href={`/hashtag/${hashTag.replace('#', '')}`} key={`${id}_${index}`}>
              <a>{hashTag}</a>
            </Link>
          );
        }
        return hashTag;
      })}
    </>
  );
};

PostCardContent.propTypes = {
  userEmail: PropTypes.string,
  content: PropTypes.string,
};
export default PostCardContent;
