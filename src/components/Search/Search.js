import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { Icons } from '../';
import styles from './Search.module.css';

const cx = className.bind(styles);

function Search({ className, placeholder = 'Search', onChange, name, value }) {
    const classed = cx('search-container', className);
    return (
        <div className={classed}>
            <div className={`${cx('search-icon')}`}>
                <Icons.SearchIcon className={`${cx('icon')}`} />
            </div>
            <div className={`${cx('search-input')}`}>
                <input
                    type='text'
                    placeholder={placeholder}
                    className={`${cx('input')}`}
                    onChange={onChange}
                    name={name}
                    value={value}
                />
            </div>
        </div>
    );
}

Search.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.node,
};

export default Search;
