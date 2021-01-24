import {createSlice} from '@reduxjs/toolkit';

let InventoryId = 0;

const sort_func = {
  index: (a, b) => (a.id > b.id ? 1 : -1),
  alpha: (a, b) => (a.name > b.name ? 1 : -1),
  quant: (a, b) => b.quantity - a.quantity,
  check: (a, b) => a.checked - b.checked,
  label: (a, b) => (a.labels > b.labels ? 1 : -1),
  expdate: (a, b) =>
    new Date(a.expiration).setHours(0, 0, 0, 0) >
    new Date(b.expiration).setHours(0, 0, 0, 0)
      ? 1
      : -1,
};

const InventorySlice = createSlice({
  name: 'Inventory',
  initialState: {sort: 'index', data: []},
  reducers: {
    addInventory(state, action) {
      const {name, quantity, expiration, label} = action.payload;
      const item = state.data.find((item) => item.name === name);
      if (item) {
        item.quantity += quantity;
      } else {
        state.data.push({
          name: name,
          quantity: quantity,
          expiration: expiration,
          label: label,
          id: InventoryId++,
        });
      }
    },
    changeQuantity_I(state, action) {
      const {id, quant} = action.payload;
      const item = state.data.find((item) => item.id === id);
      if (item) {
        if (item.quantity + quant > 0) {
          item.quantity += quant;
        }
      }
    },
    deleteItem_I(state, action) {
      state.data.splice(action.payload, 1);
    },
    empty_I(state) {
      state.data.splice(0, state.data.length);
    },
    updateSort_I(state, action) {
      const {sortBy} = action.payload;
      state.sort = sortBy;
      state.data.sort(sort_func[sortBy]);
    },
  },
});

export const {
  addInventory,
  changeQuantity_I,
  deleteItem_I,
  empty_I,
  updateSort_I,
} = InventorySlice.actions;

export default InventorySlice.reducer;
