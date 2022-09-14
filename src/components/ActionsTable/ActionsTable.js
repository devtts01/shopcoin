import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import styles from './ActionsTable.module.css';
import { Icons } from '..';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function ActionsTable({
    onClickEdit,
    onClickDel,
    onClickView,
    linkView,
    edit,
    view,
    children,
}) {
    return (
        <div className={`${cx('actions-container')}`}>
            <div className={`${cx('actions-item-container')}`}>
                {(edit || view) && linkView ? (
                    <Link
                        to={linkView}
                        className={`${cx('actions-item', 'link', 'edit')}`}
                        onClick={edit ? onClickEdit : onClickView}
                    >
                        {edit ? <span className={`${cx('actions-item-icon')}`}>
                            <Icons.EditIcon />
                        </span> : <span>
                            <i className='fa-solid fa-eye'></i>
                        </span>}
                    </Link>
                ) : view ? (
                    <Link
                        className={`${cx('actions-item', 'link', 'edit')}`}
                        to={linkView}
                    >
                        <span>
                            <i className='fa-solid fa-eye'></i>
                        </span>
                    </Link>
                ) : edit ? (
                    <div
                        className={`${cx('actions-item', 'edit')}`}
                        onClick={onClickEdit}
                    >
                        <span className={`${cx('actions-item-icon')}`}>
                            <Icons.EditIcon />
                        </span>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div
                className={`${cx('actions-item-container')}`}
                onClick={onClickDel}
            >
                <div className={`${cx('actions-item', 'delete')}`}>
                    <span className={`${cx('actions-item-icon', 'delete')}`}>
                        <Icons.DeleteIcon />
                    </span>
                </div>
            </div>
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
