import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import className from 'classnames/bind';
import { useAppContext } from '../../utils';
import { actions } from '../../app/';
import { Icons } from '../../components';
import routers from '../../routers/routers';
import styles from './Breadcrumb.module.css';

const cx = className.bind(styles);

function Breadcrumb({ titleList, linkList }) {
    const { state, dispatch } = useAppContext();
    const { currentUser } = state.set;
    function handleClick(e) {
        e.preventDefault();
        dispatch(
            actions.setData({
                ...state.set,
                form: {
                    nameCoin: '',
                    fullName: '',
                    symbolCoin: '',
                    indexCoin: '',
                    imageCoin: null,
                },
                edit: {
                    id: '',
                    data: null,
                    itemData: null,
                },
                data: {
                    ...state.set.data,
                    dataBlacklistUser: [],
                },
            })
        );
        // window.location.reload();
    }

    return (
        <div className={`${cx('breadcrumb-container')}`}>
            <div role='presentation' onClick={handleClick}>
                <Breadcrumbs
                    aria-label='breadcrumb'
                    separator={
                        titleList && <NavigateNextIcon fontSize='small' />
                    }
                >
                    <Link
                        to={
                            currentUser?.rule === 'user'
                                ? routers.homeUser
                                : routers.dashboard
                        }
                        className={`${cx(
                            'breadcrumb-link'
                        )} cl-primary hv-primary`}
                    >
                        <Icons.BreadcrumbHomeIcon className='mr8' />
                        Home
                    </Link>
                    {titleList &&
                        titleList.map((item, index) => {
                            const pathBefore = linkList.slice(0, index + 1);
                            return (
                                <Link
                                    key={index}
                                    to={`/${pathBefore.join('/')}`}
                                    className={`${cx('breadcrumb-link')}`}
                                >
                                    {item}
                                </Link>
                            );
                        })}
                </Breadcrumbs>
            </div>
        </div>
    );
}

Breadcrumb.propTypes = {
    titleList: PropTypes.node,
    link: PropTypes.array,
};

export default Breadcrumb;
