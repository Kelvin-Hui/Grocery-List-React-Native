import React from 'react';
import {Icon} from 'native-base';

import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateSort_L} from '../features/ShoppingListSlice';
import {updateSort_I} from '../features/InventorySlice';

const styles = StyleSheet.create({
  btn_gp: {
    flexDirection: 'row',
    borderWidth: 1,
    marginRight: 2,
  },
  btn: {
    fontSize: 17.5,
  },
  btn_active: {
    borderWidth: 1,
    backgroundColor: 'lightgray',
  },
});

export default function SortButtonGroup({Inventory}) {
  const [value, setValue] = React.useState('index');
  const dispatch = useDispatch();

  const handlePress = (method) => {
    if (Inventory) {
      dispatch(updateSort_I({sortBy: method}));
    } else {
      dispatch(updateSort_L({sortBy: method}));
    }
    setValue(method);
  };

  return (
    <View style={styles.btn_gp}>
      <TouchableOpacity
        style={value == 'index' ? styles.btn_active : null}
        onPress={() => handlePress('index')}>
        <Icon type="FontAwesome" style={styles.btn} name="sort-amount-asc" />
      </TouchableOpacity>

      <TouchableOpacity
        style={value == 'alpha' ? styles.btn_active : null}
        onPress={() => handlePress('alpha')}>
        <Icon type="FontAwesome" style={styles.btn} name="sort-alpha-asc" />
      </TouchableOpacity>

      <TouchableOpacity
        style={value == 'quant' ? styles.btn_active : null}
        onPress={() => handlePress('quant')}>
        <Icon type="FontAwesome" style={styles.btn} name="sort-numeric-desc" />
      </TouchableOpacity>

      {!Inventory && (
        <TouchableOpacity
          style={value == 'check' ? styles.btn_active : null}
          onPress={() => handlePress('check')}>
          <Icon type="FontAwesome" style={styles.btn} name="check-square-o" />
        </TouchableOpacity>
      )}

      {Inventory && (
        <TouchableOpacity
          style={value == 'label' ? styles.btn_active : null}
          onPress={() => handlePress('label')}>
          <Icon type="MaterialIcons" style={styles.btn} name="label-outline" />
        </TouchableOpacity>
      )}

      {Inventory && (
        <TouchableOpacity
          style={value == 'expdate' ? styles.btn_active : null}
          onPress={() => handlePress('expdate')}>
          <Icon type="FontAwesome" style={styles.btn} name="calendar-times-o" />
        </TouchableOpacity>
      )}
    </View>
  );
}
