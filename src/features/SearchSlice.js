import {createSlice} from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'Search',
  initialState: {text: ''},
  reducers: {
    toggleSearch(state, action) {
      const {value} = action.payload;
      state.text = value;
    },
    resetSearch(state) {
      state.text = '';
    },
  },
});

export const {toggleSearch, resetSearch} = SearchSlice.actions;

export default SearchSlice.reducer;
