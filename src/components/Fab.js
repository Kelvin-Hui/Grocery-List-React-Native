import React from 'react';

import {Fab as FAB, Icon} from 'native-base';
import {TouchableOpacity, StyleSheet, Alert} from 'react-native';

import {useDispatch} from 'react-redux';
import {toggleModal} from '../features/ModalSlice';
import {empty_L} from '../features/ShoppingListSlice';
import {empty_I} from '../features/InventorySlice';

const styles = StyleSheet.create({
  Fab: {
    backgroundColor: 'white',
  },
  Fab_Icon: {
    color: 'black',
  },
  add_Icon: {
    color: 'green',
  },
  empty_Icon: {
    color: 'red',
  },
});

export default function Fab({Inventory}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const createConfirmAlert = (Inventory) => {
    Alert.alert(
      'Deleting Everything',
      'Are you sure to delete everything?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () =>
            Inventory ? dispatch(empty_I()) : dispatch(empty_L()),
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <>
      <FAB
        active={open}
        style={styles.Fab}
        direction="up"
        containerStyle={{}}
        onPress={() => setOpen(!open)}
        position="bottomRight">
        <Icon type="Entypo" style={styles.Fab_Icon} name="menu" />

        {!Inventory && (
          <TouchableOpacity
            style={styles.Fab}
            onPress={() => {
              dispatch(toggleModal({type: 'addList'})), setOpen(false);
            }}>
            <Icon
              type="MaterialIcons"
              style={styles.add_Icon}
              name="add-shopping-cart"
            />
          </TouchableOpacity>
        )}
        {!Inventory && (
          <TouchableOpacity
            style={styles.Fab}
            onPress={() => {
              createConfirmAlert(), setOpen(false);
            }}>
            <Icon
              type="MaterialIcons"
              style={styles.empty_Icon}
              name="remove-shopping-cart"
            />
          </TouchableOpacity>
        )}

        {Inventory && (
          <TouchableOpacity
            style={styles.Fab}
            onPress={() => {
              dispatch(toggleModal({type: 'addInventory'}), setOpen(false));
            }}>
            <Icon type="MaterialIcons" style={styles.add_Icon} name="add" />
          </TouchableOpacity>
        )}
        {Inventory && (
          <TouchableOpacity
            style={styles.Fab}
            onPress={() => {
              createConfirmAlert((Inventory = {Inventory})), setOpen(false);
            }}>
            <Icon
              type="MaterialIcons"
              style={styles.empty_Icon}
              name="delete"
            />
          </TouchableOpacity>
        )}
      </FAB>
    </>
  );
}
