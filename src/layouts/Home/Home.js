/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, Text, View} from 'react-native';
import styles from './HomeCss';

const Home = ({navigation}) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.mb10]}>Home Page</Text>
      <Button
        title="Profile URL"
        onPress={() =>
          navigation.navigate('Profile', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />
    </View>
  );
};

export default Home;
