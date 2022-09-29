/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  user_info: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 300,
  },
  name_user: {
    fontWeight: 'bold',
  },
  email_user: {
    fontStyle: 'italic',
  },
  list_actions: {
    flex: 1,
  },
  actions_item: {
    paddingVertical: 20,
    paddingHorizontal: 17,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 6,
    marginBottom: 15,
  },
  actions_text: {
    color: 'red',
  },
  info_detail_container: {
    paddingVertical: 20,
    paddingHorizontal: 17,
    backgroundColor: 'white',
    marginVertical: 8,
  },
  info_detail_item: {
    justifyContent: 'space-between',
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  info_detail_title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info_detail_desc: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default styles;
