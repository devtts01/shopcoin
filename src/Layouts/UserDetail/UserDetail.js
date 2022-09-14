import React, {useEffect, useState} from 'react'
import className from 'classnames/bind';
import {useParams} from 'react-router-dom';
import moment from 'moment';
import {FormInput, Button} from '../../components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { axiosUtils, useAppContext } from '../../utils';
import { actions } from '../../app/';
import styles from './UserDetail.module.css';

const cx = className.bind(styles);

function UserDetail() {
    const {idUser} = useParams();
    const { state, dispatch } = useAppContext();
    const { edit } = state.set;
    const [feeValue, setFeeValue] = useState(edit?.itemData && edit.itemData.fee);
    useEffect(() => {
        if(idUser){
            const getData = async () => {
                const process = await axiosUtils.userGet(`getUser/${idUser}`);
                const { user } = process;
                dispatch(
                    actions.setData({
                        ...state.set,
                        edit: {
                            ...state.set.edit,
                            itemData: user,
                        },
                    })
                );
            };
            getData();
        }
    },[]);
    const changeFee = (e) => {
        setFeeValue(e.target.value);
    }
    function ItemRender({ title, info, feeCustom }) {
        return (
            <div className={`${cx('detail-item')}`}>
                <div className={`${cx('detail-title')}`}>{title}</div>
                <div className={`${cx('detail-status')}`}>
                    <span className={`${cx('info')}`}>
                        {info ? info : 0.15}
                    </span>
                </div>
            </div>
        );
    }
  return (
    <div className={`${cx('buySellDetail-container')}`}>
        <div className={`${cx('detail-container')}`}>
            <div className={`${cx('detail-item')}`}>
                <div className={`${cx('detail-title')}`}>Rank</div>
                <div className={`${cx('detail-status')}`}>
                    {edit?.itemData ? (
                        <>
                            <span
                                className={`status fwb ${edit.itemData.rank
                                    .toLowerCase()
                                    .replace(' ', '')}`}
                            >
                                {edit.itemData.rank}
                            </span>
                        </>
                    ) : (
                        <Skeleton width={50} />
                    )}
                </div>
            </div>
            <ItemRender
                title='Username'
                info={edit?.itemData && edit.itemData.payment.username}
            />
            <ItemRender
                title='Email'
                info={edit?.itemData && edit.itemData.payment.email}
            />
            <ItemRender
                title='Rule'
                info={edit?.itemData && edit.itemData.payment.rule}
            />
            <ItemRender
                title='Bank Name'
                info={edit?.itemData && edit.itemData.payment.bank.bankName}
            />
            <ItemRender
            feeCustom
                title='Fee'
                info={edit?.itemData && edit.itemData.fee}
            />
            <ItemRender
                title='Created At'
                info={edit?.itemData && moment(edit.itemData.createAt).format('DD/MM/YYYY')}
            />
        </div>
        <div className={`${cx('detail-container')}`}>
                <div className={`${cx('detail-item')}`}>
                    <FormInput type='text' name='fee' placeholder='Fee' className={`${cx('fee-input')}`} label='Change fee' value={feeValue} onChange={changeFee}/>
                </div>
                <div className={`${cx('detail-item', 'left')}`}>
                    <Button>Update</Button>
                </div>
            </div>
    </div>
  )
}

export default UserDetail