import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { Icons } from '..';
import styles from './SearchDate.module.css';

const cx = className.bind(styles);

function SearchDate({
    className,
    placeholder = 'Search by date...',
    onChange,
    name,
    value,
}) {
    const classed = cx('search-container', className);
    return (
        <div className={classed}>
            <div className={`${cx('search-icon')}`}>
                <Icons.SearchDateIcon className={`${cx('icon')}`} />
            </div>
            <div className={`${cx('search-input')}`}>
                <input
                    type='datetime-local'
                    placeholder={placeholder}
                    className={`${cx('input')}`}
                    onChange={onChange}
                    name={name}
                    value={value}
                    required
                />
            </div>
        </div>
    );
}

SearchDate.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.node,
};

export default SearchDate;
