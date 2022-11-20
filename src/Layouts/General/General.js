import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import className from 'classnames/bind';
import {
    useAppContext,
    alertUtils,
    searchUtils,
    refreshPage,
} from '../../utils';
import { Search, Button, TableData, Icons } from '../../components';
import { actions } from '../../app/';
import styles from './General.module.css';

const cx = className.bind(styles);

function General({
    valueSearch,
    nameSearch,
    onCreate,
    onUpdateRate,
    linkCreate,
    textBtnNew,
    textBtnUpdateAllFields,
    dataFlag,
    totalData,
    dataHeaders,
    children,
    className,
    classNameButton,
    classNameButtonUpdateAllFields,
}) {
    const { state, dispatch } = useAppContext();
    const { del, upd, cre, error } = state.set.message;
    const { alertModal } = state.toggle;
    const closeAlert = () => {
        return alertUtils.closeAlert(dispatch, state, actions);
    };
    const changeSearch = (e) => {
        return searchUtils.logicSearch(e, dispatch, state, actions);
    };
    const classed = cx('general-container', className);
    const classedButton = cx('general-button', classNameButton);
    const classedButtonAllFileds = cx(
        'general-button',
        classNameButtonUpdateAllFields
    );
    return (
        <>
            <div className={classed}>
                {(del || upd || cre || error) && alertModal && (
                    <Alert
                        severity='success'
                        className='mb8'
                        onClose={closeAlert}
                    >
                        {del ? del : upd ? upd : cre ? cre : error}
                    </Alert>
                )}
                <div className={`${cx('general-top')}`}>
                    <Search
                        name={nameSearch}
                        value={valueSearch}
                        onChange={changeSearch}
                    />
                    <div className='flex-center'>
                        {textBtnUpdateAllFields && (
                            <Button
                                className={classedButtonAllFileds}
                                onClick={onUpdateRate}
                            >
                                <span
                                    className={`${cx('general-button-icon')}`}
                                >
                                    <i className='fa-regular fa-pen-to-square'></i>
                                </span>
                                <span
                                    className={`${cx('general-button-text')}`}
                                >
                                    {textBtnUpdateAllFields}
                                </span>
                            </Button>
                        )}
                        {textBtnNew && (
                            <Button
                                className={classedButton}
                                onClick={onCreate}
                                to={linkCreate}
                            >
                                <span
                                    className={`${cx('general-button-icon')}`}
                                >
                                    <i className='fa-solid fa-plus'></i>
                                </span>
                                <span
                                    className={`${cx('general-button-text')}`}
                                >
                                    {textBtnNew}
                                </span>
                            </Button>
                        )}
                        <Button
                            className='confirmbgc'
                            onClick={refreshPage.refreshPage}
                        >
                            <div className='flex-center'>
                                <Icons.RefreshIcon className='fz12' />
                                <span
                                    className={`${cx('general-button-text')}`}
                                >
                                    Refresh Page
                                </span>
                            </div>
                        </Button>
                    </div>
                </div>
                <div className={`${cx('general-table-container')}`}>
                    <TableData
                        data={dataFlag}
                        totalData={totalData}
                        headers={dataHeaders}
                        search={valueSearch}
                    >
                        {children}
                    </TableData>
                </div>
            </div>
        </>
    );
}

General.propTypes = {
    valueSearch: PropTypes.string,
    nameSearch: PropTypes.string,
    onCreate: PropTypes.func,
    linkCreate: PropTypes.string,
    textBtnNew: PropTypes.string,
    dataFlag: PropTypes.array,
    totalData: PropTypes.number,
    dataHeaders: PropTypes.object,
    titleDelModal: PropTypes.string,
    textDelModal: PropTypes.string,
    // typeDataDel: PropTypes.node,
    nameTypeDataDel: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
};

export default General;
