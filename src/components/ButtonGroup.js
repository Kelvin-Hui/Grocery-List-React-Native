import React from 'react';
import {Icon} from 'native-base';

import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {useDispatch} from 'react-redux';
import {
  changeQuantity_L,
  toggleChecked,
  deleteItem_L,
} from '../features/ShoppingListSlice';
import {changeQuantity_I, deleteItem_I} from '../features/InventorySlice';
import {toggleModal} from '../features/ModalSlice';

export default function CustomButtonGroup({Inventory = false, item, idx}) {
  const dispatch = useDispatch();
  return (
    <View style={styles.btn_gp}>
      <TouchableOpacity
        onPress={() =>
          dispatch(
            Inventory
              ? changeQuantity_I({id: item.id, quant: 1})
              : changeQuantity_L({id: item.id, quant: 1}),
          )
        }>
        <Icon type="AntDesign" style={styles.btn} name="plus" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          dispatch(
            Inventory
              ? changeQuantity_I({id: item.id, quant: -1})
              : changeQuantity_L({id: item.id, quant: -1}),
          )
        }>
        <Icon type="AntDesign" style={styles.btn} name="minus" />
      </TouchableOpacity>

      {!Inventory && (
        <TouchableOpacity onPress={() => dispatch(toggleChecked(item.id))}>
          <Icon
            type="AntDesign"
            style={styles.btn}
            name={item.checked ? 'checksquare' : 'checksquareo'}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() =>
          dispatch(Inventory ? deleteItem_I(idx) : deleteItem_L(idx))
        }>
        <Icon type="AntDesign" style={styles.delete_btn} name="delete" />
      </TouchableOpacity>

      {!Inventory && (
        <TouchableOpacity
          onPress={() =>
            dispatch(
              toggleModal({
                type: 'send',
                item: {name: item.name, quantity: item.quantity, idx: idx},
              }),
            )
          }>
          <Icon type="MaterialIcons" style={styles.btn} name="send" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btn_gp: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    fontSize: 20,
    marginRight: 15,
  },
  delete_btn: {
    fontSize: 20,
    marginRight: 15,
    color: 'red',
  },
});
