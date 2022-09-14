import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import { Header, Sidebar } from '../';
import styles from './DefaultLayout.module.css';

const cx = className.bind(styles);

function DefaultLayout({ children }) {
    const location = useLocation();
    const { pathname } = location;
    const path = pathname.split('/').filter(Boolean);
    return (
        <div className={`${cx('mainpage')}`}>
            <Header />
            <div className={`${cx('content-container')}`}>
                <Sidebar className={`${cx('custom-sidebar')}`} />
                <div className={`${cx('content')}`}>
                    <Breadcrumb
                        titleList={
                            path.length > 0
                                ? path.map((item) => {
                                      return item.replace(/-/g, ' ');
                                  })
                                : ''
                        }
                        linkList={
                            path.length > 0
                                ? path.map((item) => {
                                      return item;
                                  })
                                : '/'
                        }
                    />
                    <div className={`${cx('page-title')}`}>
                        {path.length > 0
                            ? path[path.length - 1].replace(/-/g, ' ')
                            : 'Home'}
                    </div>
                    <div className={`${cx('main-content')}`}>{children}</div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
