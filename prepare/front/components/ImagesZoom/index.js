// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const ImageZoom = ({ postImages, setShowImageZoom, showImageZoomIndex }) => {
  const [swiper, setSwiper] = useState();

  const slider = useCallback(
    () => (
      <Swiper
        slidesPerView={1}
        onInit={e => setSwiper(e)}
        // onSwiper={swiper => setSwiper(swiper)}
        // onSlideChange={() => console.log('slide change')}
        navigation
      >
        {postImages.map((image, index) => (
          <SwiperSlide key={`zoom-${index}`}>
            <img style={{ width: '100%' }} src={image.src} alt={image.alt} role="presentation" />
          </SwiperSlide>
        ))}
      </Swiper>
    ),
    [],
  );

  useEffect(() => {
    if (swiper?.enabled) {
      swiper?.slideTo(showImageZoomIndex);
    }
    console.log(swiper);
    // swiper?.slideTo(showImageZoomIndex);
  }, [swiper]);

  const offZoom = useCallback(() => {
    setShowImageZoom(prevState => !prevState);
  }, []);

  const zoomWrapperStyle = useMemo(
    () => ({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 2,
    }),
    [],
  );

  const zoomWrapStyle = useMemo(() => ({ display: 'flex', height: '100%' }), []);
  const zoomLeftWrapperStyle = useMemo(
    () => ({
      maxWidth: '70%',
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }),
    [],
  );
  const zoomImgWrapperStyle = useMemo(
    () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [],
  );
  const zoomBottomWrapperStyle = useMemo(() => ({}), []);
  const zoomRightWrapperStyle = useMemo(
    () => ({
      background: 'red',
      flexGrow: 1,
    }),
    [],
  );
  return (
    <div style={zoomWrapperStyle}>
      <div style={zoomWrapStyle}>
        {/* 좌측 이미지 */}
        <div style={zoomLeftWrapperStyle}>
          <div>
            <CloseOutlined onClick={offZoom} style={{ color: 'white', fontSize: '24px' }} />
          </div>
          <div style={zoomImgWrapperStyle}>{slider()}</div>
          <div style={zoomBottomWrapperStyle}>바닥~</div>
        </div>
        {/* 우측 게시글 영역 */}
        <div style={zoomRightWrapperStyle}>~~~</div>
      </div>
    </div>
  );
};

ImageZoom.propTypes = {
  postImages: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
  setShowImageZoom: PropTypes.func,
  showImageZoomIndex: PropTypes.number,
  swiper: PropTypes.shape,
  setSwiper: PropTypes.func,
};
export default ImageZoom;
