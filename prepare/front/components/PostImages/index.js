import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';

import ImageZoom from '../ImagesZoom';
import { LiStyle, UlStyle } from './styles';

const PostImages = ({ postImages }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [showImageZoomIndex, setShowImageZoomIndex] = useState(0);

  const onZoom = useCallback(index => {
    setShowImageZoomIndex(index);
    console.log(index);
    setShowImageZoom(prevState => !prevState);
  }, []);

  if (postImages.length === 0) {
    return null;
  }
  const imgStyle = useMemo(
    () => ({
      width: '100%',
    }),
    [],
  );
  return (
    <div>
      <UlStyle>
        {postImages.map((image, index) => (
          <LiStyle key={`image-${image.src}`}>
            <a href="#" onClick={() => onZoom(index)}>
              <img style={imgStyle} src={image.src} alt={image.alt} />
            </a>
          </LiStyle>
        ))}
      </UlStyle>
      {showImageZoom && (
        <ImageZoom
          postImages={postImages}
          setShowImageZoom={setShowImageZoom}
          showImageZoomIndex={showImageZoomIndex}
        />
      )}
    </div>
  );
};

PostImages.propTypes = {
  postImages: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default PostImages;
