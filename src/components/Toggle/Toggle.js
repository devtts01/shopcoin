import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'evergreen-ui';
import className from 'classnames/bind';
import styles from './Toggle.module.css';

const cx = className.bind(styles);
function Toggle({ label, status, onChange }) {
    return (
        <div className={`${cx('toggle-container')}`}>
            <Switch checked={status} onChange={onChange} className='mb0' />
            <p className={`${cx('toggle-label', 'mb0')}`}>{label}</p>
        </div>
    );
}

Toggle.propTypes = {
    label: PropTypes.string,
    status: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Toggle;
