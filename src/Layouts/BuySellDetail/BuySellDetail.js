/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import {
    getBuySellById,
} from '../../services/buy';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppContext } from '../../utils';
import { actions } from '../../app/';
import styles from './BuySellDetail.module.css';

const cx = className.bind(styles);

function BuySellDetail() {
    const { idBuy, idSell } = useParams();
    const { state, dispatch } = useAppContext();
    const {
        edit,
        // currentUser,
        data: { dataUser },
        // pagination: { page, show },
    } = state.set;
    // const [feeValue, setFeeValue] = useState(
    //     edit?.itemData && edit?.itemData.fee
    // );
    useEffect(() => {
        document.title = 'Detail | Shop Coin';
        getBuySellById({ idBuy, idSell, dispatch, state, actions });
    }, []);
    function ItemRender({ title, info, feeCustom }) {
        return (
            <div className={`${cx('detail-item')}`}>
                <div className={`${cx('detail-title')}`}>{title}</div>
                <div className={`${cx('detail-status')}`}>
                    <span className={`${cx('info')}`}>
                        {info ? info : <Skeleton width={50} />}
                    </span>
                </div>
            </div>
        );
    }
    // const changeFee = (e) => {
    //     setFeeValue(e.target.value);
    // };
    // const handleUpdateFee = async (data, id) => {
    //     if (idBuy) {
    //         await handleUpdateStatusFeeBuy({
    //             data,
    //             id,
    //             dispatch,
    //             state,
    //             actions,
    //             page,
    //             show,
    //             fee: parseFloat(feeValue),
    //         });
    //     } else if (idSell) {
    //         await handleUpdateStatusFeeSell({
    //             data,
    //             id,
    //             dispatch,
    //             state,
    //             actions,
    //             page,
    //             show,
    //             fee: parseFloat(feeValue),
    //         });
    //     }
    // };
    // const updateFee = async (id) => {
    //     try {
    //         console.log(parseFloat(feeValue));
    //         requestRefreshToken(
    //             currentUser,
    //             handleUpdateFee,
    //             state,
    //             dispatch,
    //             actions,
    //             id
    //         );
    //     } catch (err) {
    //         checkErrorBuys(err, dispatch, state, actions);
    //     }
    // };
    const username = dataUser?.dataUser?.find(
        (x) => x.payment.email === edit?.itemData?.buyer.gmailUSer
    )?.payment?.username;
    return (
        <div className={`${cx('buySellDetail-container')}`}>
            <div className={`${cx('detail-container')}`}>
                <div className={`${cx('detail-item')}`}>
                    <div className={`${cx('detail-title')}`}>Status</div>
                    <div className={`${cx('detail-status')}`}>
                        {edit?.itemData ? (
                            <>
                                <span
                                    className={`status fwb ${edit.itemData.status
                                        .toLowerCase()
                                        .replace(' ', '')}`}
                                >
                                    {edit.itemData.status}
                                </span>
                            </>
                        ) : (
                            <Skeleton width={50} />
                        )}
                    </div>
                </div>
                <ItemRender
                    title='Username'
                    info={edit?.itemData && username}
                />
                <ItemRender
                    title='Email'
                    info={edit?.itemData && edit?.itemData.buyer.gmailUSer}
                />
                <ItemRender title='Code' />
                <ItemRender
                    title='Created'
                    info={
                        edit?.itemData &&
                        moment(edit?.itemData.createAt).format('DD/MM/YYYY')
                    }
                />
                <ItemRender
                    title='Symbol'
                    info={edit?.itemData && edit?.itemData.symbol}
                />
                <ItemRender title='Sent' />
                <ItemRender
                    title='Buy price'
                    info={edit?.itemData && edit?.itemData.price}
                />
                <ItemRender title='Received' />
                <ItemRender
                    title='Fee'
                    info={edit?.itemData && edit?.itemData.fee}
                    feeCustom
                />
                <ItemRender title='Document' />
            </div>
            {/* <div className={`${cx('detail-container')}`}>
                <div className={`${cx('detail-item')}`}>
                    <FormInput
                        type='text'
                        name='fee'
                        placeholder='Fee'
                        className={`${cx('fee-input')}`}
                        label='Change fee'
                        value={feeValue}
                        onChange={changeFee}
                    />
                </div>
                <div className={`${cx('detail-item', 'left')}`}>
                    <Button onClick={() => updateFee(idBuy || idSell)}>
                        Update
                    </Button>
                </div>
            </div> */}
        </div>
    );
}

export default BuySellDetail;
