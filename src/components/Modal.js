import React from 'react';

import {
  View,
  Text,
  Modal as M,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Icon} from 'native-base';

import {useSelector, useDispatch} from 'react-redux';
import {addInventory} from '../features/InventorySlice';
import {addList, deleteItem_L} from '../features/ShoppingListSlice';
import {toggleModal} from '../features/ModalSlice';

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    marginTop: '20%',
  },
  modal: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    elevation: 2,
  },
  input: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textTransform: 'uppercase',
    borderWidth: 1,
    marginBottom: 20,
  },
  btn_view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input_datepicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date_icon: {fontSize: 20},
});

const type_text = {
  addList: 'Add to Shopping List',
  addInventory: 'Add to Inventory',
  send: 'Send to Inventory',
};

export default function Modal({type}) {
  const [name, setName] = React.useState();
  const [quant, setQuant] = React.useState(1);
  const [label, setLabel] = React.useState('');
  const [date, setDate] = React.useState(new Date().toLocaleDateString());

  const open = useSelector((state) => state.Modal[type]);
  const send_item = useSelector((state) => state.Modal['item']);
  const dispatch = useDispatch();

  const handleSubmit = (type) => {
    if (type == 'addList') {
      dispatch(addList({name: name, quantity: parseInt(quant)}));
    } else if (type == 'addInventory') {
      dispatch(
        addInventory({
          name: name,
          quantity: parseInt(quant),
          label: label,
          expiration: date,
        }),
      );
    } else {
      dispatch(
        addInventory({
          name: send_item.name,
          quantity: parseInt(send_item.quantity),
          label: label,
          expiration: date,
        }),
      );
      dispatch(deleteItem_L(send_item.idx));
    }

    setName('');
    setQuant(1);
    setLabel('');
    dispatch(toggleModal({type: type}));
  };

  return (
    <>
      <View>
        <M
          animationType="fade"
          transparent={true}
          onRequestClose={() => dispatch(toggleModal({type: type}))}
          visible={open}>
          <View style={styles.center}>
            <View style={styles.modal}>
              <View style={styles.input}>
                <Text style={styles.title}>{type_text[type]}</Text>

                {type !== 'send' && (
                  <>
                    <Text>Name:</Text>
                    <TextInput
                      placeholder="Enter Here"
                      textAlign="center"
                      onChangeText={setName}
                      autoCapitalize="characters"></TextInput>
                    <Text>Quantity:</Text>
                    <TextInput
                      onChangeText={setQuant}
                      defaultValue="1"
                      textAlign="center"
                      keyboardType="numeric"></TextInput>
                  </>
                )}

                {type !== 'addList' && (
                  <>
                    <Text>Labels:</Text>
                    <TextInput
                      onChangeText={setLabel}
                      placeholder="Leave Blank If None"
                      textAlign="center"></TextInput>

                    <Text>Expiration Date:</Text>
                    <View style={styles.input_datepicker}>
                      <TextInput
                        value={date}
                        textAlign="center"
                        onChangeText={setDate}
                      />
                      <TouchableOpacity>
                        <Icon
                          style={styles.date_icon}
                          type="AntDesign"
                          name="calendar"
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>

              <View style={styles.btn_view}>
                <TouchableOpacity
                  onPress={() => dispatch(toggleModal({type: type}))}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubmit(type)}>
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </M>
      </View>
    </>
  );
}
