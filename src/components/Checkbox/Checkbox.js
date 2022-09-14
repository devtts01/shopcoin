import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import styles from './Checkbox.module.css';

const cx = className.bind(styles);

const Checkbox = forwardRef(
    (
        { index, htmlFor, value, onChange, label, checked, classNameText },
        ref
    ) => {
        const classedText = cx('checkbox-text', classNameText);
        return (
            <label
                key={index}
                htmlFor={htmlFor}
                className={`${cx('checkbox-item')}`}
            >
                <input
                    type='checkbox'
                    name={htmlFor}
                    value={value}
                    id={htmlFor}
                    onChange={onChange}
                    checked={checked}
                    ref={ref}
                />
                <label className={cx('checkmark')} htmlFor={htmlFor}></label>
                <span className={classedText}>{label}</span>
            </label>
        );
    }
);

Checkbox.propTypes = {
    index: PropTypes.number,
    htmlFor: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    checked: PropTypes.bool,
    classNameText: PropTypes.string,
};

export default Checkbox;
