import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import styles from './ActionsTable.module.css';
import { Icons } from '..';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function ActionsTable({
    onClickEdit = () => {},
    onClickDel = () => {},
    onClickView = () => {},
    onClickCreate = () => {},
    linkView,
    edit,
    view,
    noDel,
    textButton,
    bgcButtonCustom,
    children,
}) {
    return (
        <div className={`${cx('actions-container')}`}>
            <div className={`${cx('actions-item-container')}`}>
                {(edit || view) && linkView ? (
                    <Link
                        to={linkView}
                        className={`${cx('actions-item')} ${
                            bgcButtonCustom || 'completebgc'
                        }`}
                        onClick={edit ? onClickEdit : onClickView}
                    >
                        {edit ? (
                            <Icons.EditIcon />
                        ) : !textButton ? (
                            <i
                                className='fa-solid fa-eye'
                                style={{ fontSize: '16px' }}
                            ></i>
                        ) : (
                            textButton
                        )}
                    </Link>
                ) : view ? (
                    <Link
                        className={`${cx('actions-item')} ${
                            bgcButtonCustom || 'completebgc'
                        }`}
                        to={linkView}
                        onClick={onClickCreate}
                    >
                        {!textButton ? (
                            <i
                                className='fa-solid fa-eye'
                                style={{ fontSize: '16px' }}
                            ></i>
                        ) : (
                            textButton
                        )}
                    </Link>
                ) : edit ? (
                    <div
                        className={`${cx('actions-item')} completebgc`}
                        onClick={onClickEdit}
                    >
                        <Icons.EditIcon />
                    </div>
                ) : (
                    ''
                )}
            </div>
            {!noDel && (
                <div
                    className={`${cx('actions-item-container')}`}
                    onClick={onClickDel}
                >
                    <div className={`${cx('actions-item')} cancelbgc`}>
                        <Icons.DeleteIcon />
                    </div>
                </div>
            )}
        </div>
    );
}

ActionsTable.propTypes = {
    onClickEdit: PropTypes.func,
    onClickDel: PropTypes.func,
    onClickView: PropTypes.func,
    linkView: PropTypes.string,
    edit: PropTypes.bool,
    view: PropTypes.bool,
    children: PropTypes.node,
};

export default ActionsTable;
