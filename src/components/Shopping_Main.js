import React from 'react';

import {useSelector} from 'react-redux';

import CustomButtonGroup from './ButtonGroup';
import SearchBar from './SearchBar';
import Fab from './Fab';
import Modal from './Modal';

import {ListItem, List, Icon} from 'native-base';

import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  name: {
    alignSelf: 'flex-start',
  },
  quantity: {
    fontSize: 12,
    alignSelf: 'flex-start',
    opacity: 0.5,
  },
  empty: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '50%',
  },
  empty_icon: {
    alignSelf: 'center',
  },
});

const ShoppingListItem = (item, idx, key) => (
  <ListItem>
    <View>
      <Text
        style={{
          ...styles.name,
          textDecorationLine: item.checked ? 'line-through' : null,
        }}>
        {item.name}
      </Text>
      <Text
        style={{
          ...styles.quantity,
          textDecorationLine: item.checked ? 'line-through' : null,
        }}>
        Quantity : {item.quantity}
      </Text>
    </View>
    <CustomButtonGroup item={item} idx={key} />
  </ListItem>
);

export default function ShoppingList() {
  const [fab, setFab] = React.useState(true);
  const ListData = useSelector((state) => state.ShoppingList.data);
  const SearchValue = useSelector((state) => state.Search.text);

  return (
    <>
      <SearchBar />

      <List
        dataArray={
          ListData ? ListData.filter((x) => x.name.includes(SearchValue)) : []
        }
        onScrollBeginDrag={() => setFab(false)}
        onScrollEndDrag={() => setFab(true)}
        renderRow={(item, index, key) => ShoppingListItem(item, index, key)}
        keyExtractor={(item) => ListData.indexOf(item).toString()}
      />
      {ListData.length == 0 ? (
        <View style={styles.empty}>
          <Text>Add Some Item to Start !</Text>
          <Icon style={styles.empty_icon} type="AntDesign" name="plus" />
        </View>
      ) : null}
      {fab && <Fab />}
      <Modal type="addList" />
      <Modal type="send" />
    </>
  );
}
