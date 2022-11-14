/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text, RefreshControl, FlatList} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {useAppContext} from '../../utils';
import {formatUSDT, formatVND} from '../../utils/format/Money';
import {getAllDeposits} from '../../app/payloads/getAll';
import {Header, NodataText, RowDetail} from '../../components';
import {SVgetDepositsByEmailUser} from '../../services/deposits';
import {dateFormat} from '../../utils/format/Date';
import {textLower} from '../../utils/format/textLowercase';
import {routersMain} from '../../routers/Main';
import styles from './DepositsCss';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';

const Deposits = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    data: {dataDeposits},
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    SVgetDepositsByEmailUser({
      email: currentUser?.email,
      dispatch,
      getAllDeposits,
    });
  }, []);
  const data = dataDeposits || [];
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    SVgetDepositsByEmailUser({
      email: currentUser?.email,
      dispatch,
      getAllDeposits,
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const renderItem = ({item}) => {
    return (
      <View style={[styles.item]}>
        <RowDetail
          noneBorderBottom
          title="Created At"
          text={dateFormat(item?.createdAt, 'DD/MM/YYYY HH:mm:ss')}
        />
        <RowDetail
          noneBorderBottom
          title="Status"
          text={item?.status}
          styleDesc={[
            styles.row_desc,
            stylesStatus.status,
            textLower(item?.status) === 'onhold'
              ? stylesStatus.vipbgc
              : textLower(item?.status) === 'completed' ||
                textLower(item?.status) === 'complete'
              ? stylesStatus.completebgc
              : textLower(item?.status) === 'canceled' ||
                textLower(item?.status) === 'cancel'
              ? stylesStatus.cancelbgc
              : textLower(item?.status) === 'confirmed' ||
                textLower(item?.status) === 'confirm'
              ? stylesStatus.confirmbgc
              : stylesStatus.demobgc,
          ]}
        />
        <RowDetail
          title="Amount USD"
          text={formatUSDT(item?.amount)}
          noneBorderBottom
        />
        <RowDetail
          title="Amount VND"
          text={formatVND(item?.amountVnd)}
          noneBorderBottom
        />
      </View>
    );
  };
  return (
    <View style={[styles.container]}>
      <Header />
      <View
        style={[styles.container_btn, stylesStatus.vipbgcbold]}
        onTouchStart={() => navigation.navigate(routersMain.CreateDeposits)}>
        <Text style={[styles.btn, stylesStatus.white]}>Create</Text>
      </View>
      <View style={[styles.listDeposits, stylesGeneral.mt10]}>
        {data.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReachedThreshold={0.5}
            contentContainerStyle={{flex: 1}}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <NodataText
            text=" No Deposits"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </View>
  );
};

export default Deposits;
