import {createSlice} from '@reduxjs/toolkit';

const ModalSlice = createSlice({
  name: 'Modal',
  initialState: {addList: false, addInventory: false, send: false, item: {}},
  reducers: {
    toggleModal(state, action) {
      const {type, item} = action.payload;
      state[type] = !state[type];
      if (type == 'send') {
        state.item = item;
      }
    },
  },
});

export const {toggleModal} = ModalSlice.actions;

export default ModalSlice.reducer;
