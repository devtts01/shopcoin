import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import styles from './Image.module.css';

const cx = className.bind(styles);

function Image({ src, alt, className, errorImage }) {
    const classed = cx('image', className);
    const errorImgPlaceholder =
        'https://via.placeholder.com/139x39/FFFF00/000000?text=Shopcoinusa.com';
    return (
        <img
            src={src}
            alt={alt}
            className={classed}
            onError={(e) => {
                e.target.src = errorImage || errorImgPlaceholder;
            }}
        />
    );
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    errorImage: PropTypes.string,
};

export default Image;
