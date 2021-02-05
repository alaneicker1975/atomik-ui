import React, { useState, useEffect, useRef } from 'react';
import debounce from 'debounce';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useSmoothScroll from 'react-smooth-scroll-hook';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../button';

const Carousel = ({ className, height, items, width, ...others }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const ref = useRef(null);

  const { scrollTo } = useSmoothScroll({
    ref,
    speed: 20,
    direction: 'x',
  });

  useEffect(() => {
    window.onresize = debounce(() => {
      setImageWidth(ref.current.clientWidth);
    }, 200);
  }, []);

  useEffect(() => {
    setImageWidth(ref.current.clientWidth);
  }, [ref]);

  useEffect(() => {
    scrollTo(`#image-${selectedIndex}`);
  }, [selectedIndex, scrollTo]);

  return (
    <div
      className={classnames('atomikui-carousel', className)}
      {...others}
      style={{ width, height }}
    >
      <div className="atomikui-carousel__viewport" ref={ref}>
        {items.map((img, index) => (
          <div
            key={`image-${index + 1}`}
            id={`image-${index}`}
            style={{
              minWidth: imageWidth,
              background: `center/cover url(${img})`,
            }}
          />
        ))}
      </div>
      <div className="atomikui-carousel__controls">
        {selectedIndex > 0 && (
          <Button
            className="atomikui-carousel__controls__prev-btn"
            theme="hollow"
            aria-label="previous item"
            onClick={() => setSelectedIndex(selectedIndex - 1)}
          >
            <Icon icon={faChevronLeft} size="2x" color="white" />
          </Button>
        )}
        {selectedIndex < items.length - 1 && (
          <Button
            className="atomikui-carousel__controls__next-btn"
            theme="hollow"
            aria-label="next item"
            onClick={() => setSelectedIndex(selectedIndex + 1)}
          >
            <Icon icon={faChevronRight} size="2x" color="white" />
          </Button>
        )}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  /** items to be rendered in carousel */
  items: PropTypes.arrayOf(PropTypes.string),
  /** Specifies custom component classes. */
  className: PropTypes.string,
  /** height of carousel */
  height: PropTypes.number,
  /** width of carousel */
  width: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
};

Carousel.defaultProps = {
  items: [],
  className: '',
  height: 300,
  width: '100%',
};

export default Carousel;
