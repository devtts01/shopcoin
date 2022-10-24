/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {AlertDialog, Button, Center} from 'native-base';
import React from 'react';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import styles from './ModalBankCss';

export default function ModalBank({
  modalVisible,
  handleModalBank,
  handleChange,
  dataBank,
}) {
  const cancelRef = React.useRef(null);
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={modalVisible}
        onClose={handleModalBank}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Select Bank</AlertDialog.Header>
          <AlertDialog.Body>
            <View style={[styles.bankList]}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {dataBank.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleChange('bank', item.name)}
                    activeOpacity={0.7}
                    style={[styles.bankItem]}>
                    <Text style={[stylesGeneral.fwbold]}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                onPress={handleModalBank}
                style={[stylesStatus.confirmbgcbold]}
                ref={cancelRef}>
                <Text style={[stylesStatus.white]}>Cancel</Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}
