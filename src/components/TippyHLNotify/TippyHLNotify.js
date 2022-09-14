import React from 'react';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Image } from '../';
import styles from './TippyHLNotify.module.css';

const cx = className.bind(styles);

function TippyHLNotify({ className, children }) {
    const classed = cx('tippy-headless-container', className);
    const avatarPlaceholder =
        'https://avatars.githubusercontent.com/u/81848005?v=4';
    return (
        <div className={classed}>
            <TippyHeadless
                appendTo={document.body}
                hideOnClick={true}
                trigger='click'
                interactive={true}
                delay={[0, 100]}
                render={(attrs) => (
                    <div className={`${cx('tippy')}`} tabIndex='-1' {...attrs}>
                        <div className={`${cx('tippy-item')}`}>
                            <Image
                                src={avatarPlaceholder}
                                alt='avatar'
                                className={cx('tippy-image')}
                            />
                            <div className={`${cx('tippy-info')}`}>
                                <p className={`${cx('tippy-title')}`}>...</p>
                                <p className={`${cx('tippy-desc')}`}>...</p>
                            </div>
                        </div>
                        <div className={`${cx('tippy-item')}`}>
                            <Skeleton
                                circle
                                width={30}
                                height={30}
                                className={cx('tippy-image')}
                            />
                            <div className={`${cx('tippy-info')}`}>
                                <Skeleton className={`${cx('tippy-title')}`} />
                                <Skeleton
                                    className={`${cx('tippy-desc')}`}
                                    width={120}
                                />
                            </div>
                        </div>
                    </div>
                )}
            >
                {children}
            </TippyHeadless>
        </div>
    );
}

TippyHLNotify.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default TippyHLNotify;
