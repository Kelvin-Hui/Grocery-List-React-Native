import {createSlice} from '@reduxjs/toolkit';

let ShoppingListId = 0;

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

const ShoppingListSlice = createSlice({
  name: 'ShoppingList',
  initialState: {
    sort: 'index',
    data: [],
  },
  reducers: {
    addList(state, action) {
      const {name, quantity} = action.payload;
      const item = state.data.find((item) => item.name === name);
      if (item) {
        item.quantity += quantity;
      } else {
        state.data.push({
          name: name,
          quantity: quantity,
          checked: false,
          id: ShoppingListId++,
        });
      }
    },
    changeQuantity_L(state, action) {
      const {id, quant} = action.payload;
      const item = state.data.find((item) => item.id === id);
      if (item) {
        if (item.quantity + quant > 0) {
          item.quantity += quant;
        }
      }
    },
    toggleChecked(state, action) {
      const item = state.data.find((item) => item.id === action.payload);
      if (item) {
        item.checked = !item.checked;
      }
    },
    deleteItem_L(state, action) {
      state.data.splice(action.payload, 1);
    },
    empty_L(state) {
      state.data.splice(0, state.data.length);
    },
    updateSort_L(state, action) {
      const {sortBy} = action.payload;
      state.sort = sortBy;
      state.data.sort(sort_func[sortBy]);
    },
  },
});

export const {
  addList,
  changeQuantity_L,
  toggleChecked,
  deleteItem_L,
  empty_L,
  updateSort_L,
} = ShoppingListSlice.actions;

export default ShoppingListSlice.reducer;
