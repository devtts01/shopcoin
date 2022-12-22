import React from 'react';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import { useAppContext, alertUtils } from '../../utils';
import { actions } from '../../app/';
import { Icons, Button } from '../';
import styles from './Modal.module.css';

const cx = className.bind(styles);

function Modal({
    children,
    titleHeader,
    actionButtonText,
    closeModal,
    openModal,
    classNameButton,
    errorMessage,
    onClick,
    isProcess,
    disabled,
    hideButton,
}) {
    const { state, dispatch } = useAppContext();
    const classed = cx('modal-button-me', classNameButton);
    const handleCloseAlert = () => {
        return alertUtils.closeAlert(dispatch, state, actions);
    };

    return (
        <div className={`${cx('modal-container-me')}`} onClick={closeModal}>
            <div className={`${cx('modal-content-me')}`} onClick={openModal}>
                <div className={`${cx('modal-header-me')}`}>
                    <div className={`${cx('modal-text-header-me')}`}>
                        {titleHeader}
                    </div>
                    <span
                        className={`${cx('modal-icon-header-me')}`}
                        onClick={closeModal}
                    >
                        <Icons.CloseIcon />
                    </span>
                </div>
                <div className={`${cx('modal-body-me')}`}>
                    {errorMessage && (
                        <Alert
                            severity='error'
                            style={{ margin: '0 24px' }}
                            onClose={handleCloseAlert}
                        >
                            {errorMessage}
                        </Alert>
                    )}
                    {children}
                </div>
                {!hideButton && (
                    <div className={`${cx('modal-footer-me')}`}>
                        <Button
                            // className={`${cx('modal-button-me')} btn-cancel`}
                            className='completebgc'
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classed}
                            onClick={onClick}
                            isProcess={isProcess}
                            disabled={isProcess || disabled}
                        >
                            {actionButtonText}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node,
    titleHeader: PropTypes.string,
    actionButtonText: PropTypes.string,
    closeModal: PropTypes.func,
    openModal: PropTypes.func,
    classNameButton: PropTypes.string,
    errorMessage: PropTypes.string,
    onClick: PropTypes.func,
};

export default Modal;
