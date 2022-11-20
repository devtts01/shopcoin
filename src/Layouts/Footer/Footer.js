import React from 'react';
import className from 'classnames/bind';
import styles from './Footer.module.css';

const cx = className.bind(styles);

function Footer({ className }) {
    const classed = cx('footer-container', className);
    return (
        <div className={classed}>
            <h4>This is Footer!!</h4>
        </div>
    );
}

export default Footer;
