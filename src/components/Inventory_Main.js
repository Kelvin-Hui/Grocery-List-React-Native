import React from 'react';

import {useSelector} from 'react-redux';

import CustomButtonGroup from './ButtonGroup';
import SearchBar from './SearchBar';
import Fab from './Fab';
import Modal from './Modal';

import {ListItem, List, Icon, ScrollView} from 'native-base';

import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  name: {
    alignSelf: 'flex-start',
  },
  quantity: {
    fontSize: 12,
    alignSelf: 'flex-start',
    opacity: 0.5,
  },
  chips_view: {
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  chips: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    fontSize: 10,
    margin: 1,
    paddingHorizontal: 4,
    opacity: 0.75,
  },
  expiration: {
    alignSelf: 'center',
    left: '50%',
  },
  expired: {
    color: 'red',
    alignSelf: 'center',
    left: '60%',
    textDecorationLine: 'line-through',
  },
  empty: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '50%',
  },
  empty_icon: {
    alignSelf: 'center',
    margin: 10,
  },
});

const InventoryListItem = (item, idx, key) => (
  <ListItem>
    <View>
      <Text style={styles.name}>{item.name}</Text>

      {item.label === '' ? null : (
        <View style={styles.chips_view}>
          <Text style={styles.chips}>{item.label}</Text>
        </View>
      )}

      <Text style={styles.quantity}> Quantity : {item.quantity}</Text>
    </View>
    <View>
      <Text style={styles.expiration}>Expiration Date:</Text>
      <Text
        style={
          new Date().setHours(0, 0, 0, 0) >=
          new Date(item.expiration).setHours(0, 0, 0, 0)
            ? styles.expired
            : styles.expiration
        }>
        {item.expiration}
      </Text>
    </View>
    <CustomButtonGroup Inventory item={item} idx={key} />
  </ListItem>
);

export default function InventoryList() {
  const InventoryData = useSelector((state) => state.Inventory.data);
  const SearchValue = useSelector((state) => state.Search.text);
  return (
    <>
      <SearchBar Inventory />
      <List
        dataArray={InventoryData.filter((x) => x.name.includes(SearchValue))}
        renderRow={(item, index, key) => InventoryListItem(item, index, key)}
        keyExtractor={(item) => InventoryData.indexOf(item).toString()}
      />
      {InventoryData.length == 0 ? (
        <View style={styles.empty}>
          <Text>Add Some Item to Start !</Text>
          <Icon style={styles.empty_icon} type="AntDesign" name="plus" />
        </View>
      ) : null}
      <Fab Inventory />
      <Modal type="addInventory" />
    </>
  );
}
