/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Image, Loading } from '../';
import { useAppContext } from '../../utils';
import { actions } from '../../app/';
import styles from './TableData.module.css';

const cx = className.bind(styles);

export function TrObjectIcon({ item }) {
    return (
        <>
            <div className={`${cx('send-container')}`}>
                <span className={`${cx('send-icon')}`}>{item.send.icon}</span>
                <span className={`${cx('send-text')}`}>
                    <span className={`${cx('text')}`}>{item.send.title}</span>
                    <span className={`${cx('number')}`}>
                        {item.send.number}
                    </span>
                </span>
            </div>
            <div className={`${cx('received-container')}`}>
                <span className={`${cx('received-icon')}`}>
                    {item.received.icon}
                </span>
                <span className={`${cx('received-text')}`}>
                    <span className={`${cx('text')}`}>
                        {item.received.title}
                    </span>
                    <span className={`${cx('number')}`}>
                        {item.received.number}
                    </span>
                </span>
            </div>
        </>
    );
}
export function TrObjectNoIcon({ item }) {
    return (
        <>
            <div className={cx('name')}>{item.name}</div>
            <div className={cx('email')}>{item.email}</div>
            {/* <Link to={item.path} className={cx('link-user')}>
                <span className={cx('link-user-text')}>View User</span>
                <Icons.ViewUserIcon className={`${cx('link-user-icon')}`} />
            </Link> */}
        </>
    );
}
export function TrStatus({ item, onClick }) {
    const classItem = item.toLowerCase().replace(' ', '');
    return (
        <div onClick={onClick} className='cr-pointer'>
            <span className={`${classItem + 'bgc'} status`}>{item}</span>
        </div>
    );
}
export function TrObjectImage({ item }) {
    return (
        <>
            <Image src={item} alt={item} className={`${cx('image')}`} />
        </>
    );
}

function TableData({
    data = [],
    totalData,
    headers,
    search,
    noActions,
    children,
}) {
    const { name, index, h1, h2, h3, h4, h5, h6 } = headers;
    const { state, dispatch } = useAppContext();
    const { show, page } = state.set.pagination;
    const { sort } = state.set;
    const lengthHeader = Object.keys(headers).length;
    const handleChangeLimitPage = (e) => {
        dispatch(
            actions.setData({
                ...state.set,
                pagination: {
                    ...state.set.pagination,
                    show: parseInt(e.target.value),
                },
            })
        );
    };
    const handleChangePage = (e, value) => {
        dispatch(
            actions.setData({
                ...state.set,
                pagination: {
                    ...state.set.pagination,
                    page: parseInt(value),
                },
            })
        );
    };
    const sortASC = (field) => {
        return data.sort((a, b) => {
            if (field !== 'createdAt') {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return new Date(a[field]) - new Date(b[field]);
            }
        });
    };
    const sortDESC = (field) => {
        return data.sort((a, b) => {
            if (field !== 'createdAt') {
                return a[field] < b[field] ? 1 : -1;
            } else {
                return new Date(b[field]) - new Date(a[field]);
            }
        });
    };
    const handleSort = () => {
        if (sort === 'asc') {
            dispatch(
                actions.setData({
                    ...state.set,
                    sort: 'desc',
                })
            );
            switch (name) {
                case process.env.REACT_APP_DEPOSITS_NAME:
                case process.env.REACT_APP_WITHDRAW_NAME:
                    sortASC('createdAt');
                    break;
                case process.env.REACT_APP_USER_NAME:
                    sortASC('payment.username');
                    break;
                case process.env.REACT_APP_DASHBOARD_NAME:
                    sortASC('symbol');
                    break;
                default:
                    sortASC('_id');
            }
        } else {
            dispatch(
                actions.setData({
                    ...state.set,
                    sort: 'asc',
                })
            );
            switch (name) {
                case process.env.REACT_APP_DEPOSITS_NAME:
                case process.env.REACT_APP_WITHDRAW_NAME:
                    sortDESC('createdAt');
                    break;
                case process.env.REACT_APP_USER_NAME:
                    sortDESC('payment.username');
                    break;
                case process.env.REACT_APP_DASHBOARD_NAME:
                    sortDESC('symbol');
                    break;
                default:
                    sortDESC('_id');
            }
        }
    };
    function Thead({ item }) {
        return (
            <>
                {item && (
                    <th
                        className={`${cx(item.iconSort && 'hovered')}`}
                        onClick={item.iconSort && handleSort}
                    >
                        {item.title}{' '}
                        {item.iconSort && (
                            <span className={`${cx('icon-sort')}`}>
                                {item.iconSort}
                            </span>
                        )}
                    </th>
                )}
            </>
        );
    }
    const start = (page - 1) * show + 1;
    const end = start + data.length - 1;
    return (
        <>
            <table className={`${cx('table')}`}>
                <thead className={`${cx('thead')}`}>
                    <tr>
                        <Thead item={index} />
                        <Thead item={h1} />
                        <Thead item={h2} />
                        <Thead item={h3} />
                        <Thead item={h4} />
                        <Thead item={h5} />
                        <Thead item={h6} />
                        {!noActions && <th></th>}
                    </tr>
                </thead>
                {data.length > 0 ? (
                    <tbody className='tbody'>{children}</tbody>
                ) : search.length === 0 && data.length === 0 ? (
                    <tbody className='tbody'>
                        <tr>
                            <td
                                colSpan={lengthHeader}
                                style={{ textAlign: 'center' }}
                            >
                                No Data
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <Loading />
                )}
            </table>
            {data.length > 0 && (
                <div className={`${cx('pagination-countpage')}`}>
                    <div className={`${cx('notvalue')}`}></div>
                    <Stack
                        spacing={2}
                        className={`${cx('pagination-container')}`}
                    >
                        <Pagination
                            onChange={handleChangePage}
                            page={page}
                            showFirstButton
                            showLastButton
                            count={parseInt(Math.ceil(totalData / show)) || 0}
                            variant='outlined'
                            shape='rounded'
                        />
                    </Stack>
                    <div className={`${cx('countpage-container')}`}>
                        <select
                            className={`${cx('countpage-select')}`}
                            value={show}
                            onChange={handleChangeLimitPage}
                        >
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='30'>30</option>
                            <option value='50'>50</option>
                        </select>
                        <span className={`${cx('countpage-text')}`}>
                            items per page | {start} - {end} of {totalData}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

TableData.propTypes = {
    headers: PropTypes.object,
    data: PropTypes.array,
    totalData: PropTypes.number,
    children: PropTypes.node,
    search: PropTypes.string,
};

export default TableData;
