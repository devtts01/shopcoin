import React from 'react';
import className from 'classnames/bind';
import { FormInput, SelectValue } from '../../components';
import styles from './ProfilePaymentUser.module.css';
import { numberUtils } from '../../utils';

const cx = className.bind(styles);

export default function ProfilePaymentUser({
    toogleModalBank,
    stateModalBank,
    bankValue,
    searchSelect,
    dataBankFlag,
    handleChangeBank,
    onChange,
    nameNum,
    nameAcc,
    user,
}) {
    const isShowBodyModalWithdarw =
        (user?.Wallet?.balance || user?.Wallet?.balance === 0) &&
        user?.payment?.bank?.bankName &&
        user?.payment?.bank?.name &&
        user?.payment?.bank?.account;
    return (
        <>
            <div className='fz16 mb8'>
                Support the following pyayment methods to load or withdraw
                funds.
            </div>
            {isShowBodyModalWithdarw && (
                <div className={`${cx('info-user')}`}>
                    <div className={`${cx('info-user-item')}`}>
                        <div className={`${cx('info-user-title')}`}>
                            Your Wallet
                        </div>
                        <div className={`${cx('info-user-desc')} vip`}>
                            {numberUtils.coinUSD(user?.Wallet?.balance)}
                        </div>
                    </div>
                    <div className={`${cx('info-user-item')}`}>
                        <div className={`${cx('info-user-title')}`}>
                            Your bank account
                        </div>
                        <div className={`${cx('info-user-desc')} complete`}>
                            <div className='text-right'>
                                {user?.payment?.bank?.bankName}
                            </div>
                            <div className='text-right'>
                                {user?.payment?.bank?.name}
                            </div>
                            <div className='text-right'>
                                {user?.payment?.bank?.account}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <SelectValue
                label='Choose bank'
                nameSearch='bank'
                toggleModal={toogleModalBank}
                stateModal={stateModalBank}
                valueSelect={bankValue}
                onChangeSearch={searchSelect}
                dataFlag={dataBankFlag}
                onClick={handleChangeBank}
            />
            <FormInput
                label='Account name'
                placeholder='Enter account name'
                type='text'
                name={nameAcc}
                onChange={onChange}
            />
            <FormInput
                label='Account number'
                placeholder='Enter account number'
                type='text'
                name={nameNum}
                onChange={onChange}
            />
        </>
    );
}
