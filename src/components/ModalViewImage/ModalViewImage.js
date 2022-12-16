import React from 'react';
import className from 'classnames/bind';
import { Icons, Image } from '..';
import styles from './ModalViewImage.module.css';

const cx = className.bind(styles);

export default function ModalViewImage({
    stateModal,
    closeModal,
    uniqueData,
    indexImage,
    setIndexImage,
}) {
    const clickArrowImage = (e) => {
        if (e === 'left') {
            if (indexImage === 0) {
                setIndexImage(uniqueData.length - 1);
            } else {
                setIndexImage(indexImage - 1);
            }
        } else {
            if (indexImage === uniqueData.length - 1) {
                setIndexImage(0);
            } else {
                setIndexImage(indexImage + 1);
            }
        }
    };
    return (
        <>
            {stateModal && (
                <div className={`${cx('modal-container')}`}>
                    <div className={`${cx('modal-body')}`}>
                        <div className={`${cx('modal-header')}`}>
                            <div
                                className={`${cx(
                                    'modal-header-icon-container'
                                )}`}
                                onClick={closeModal}
                            >
                                <Icons.CloseIcon
                                    className={`${cx(
                                        'modal-header-icon-item'
                                    )}`}
                                />
                            </div>
                        </div>
                        <div className={`${cx('modal-footer')}`}>
                            <div
                                className={`${cx('left')}`}
                                onClick={() => clickArrowImage('left')}
                            >
                                <Icons.ArrowLeftIcon
                                    className={`${cx('left-icon')}`}
                                />
                            </div>
                            <div className={`${cx('middle')}`}>
                                <Image
                                    src={`${process.env.REACT_APP_URL_SERVER}/${uniqueData[indexImage]}`}
                                    alt=''
                                    className={`${cx('image-view')}`}
                                />
                            </div>
                            <div
                                className={`${cx('right')}`}
                                onClick={() => clickArrowImage('right')}
                            >
                                <Icons.ArrowRightIcon
                                    className={`${cx('right-icon')}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
