import React from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';

const styles = StyleSheet.create({
  input_datepicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date_icon: {fontSize: 20},
});

export default function ExpDatePicker({date, setDate}) {
  const [show, setShow] = React.useState(false);
  const [date2, setDate2] = React.useState(new Date().toLocaleDateString());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDate2(currentDate);
  };

  return (
    <>
      <View>
        <Text>Expiration Date:</Text>
        <View style={styles.input_datepicker}>
          <TextInput placeholder={date} value={date} textAlign="center" />
          <TouchableOpacity onPress={() => setShow(true)}>
            <Icon style={styles.date_icon} type="AntDesign" name="calendar" />
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date2}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
          )}
        </View>
      </View>
    </>
  );
}
