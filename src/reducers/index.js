import {combineReducers} from 'redux';
import ShoppingListReducer from '../features/ShoppingListSlice';
import InventoryReducer from '../features/InventorySlice';
import ModalSliceReducer from '../features/ModalSlice';
import SearchSliceReducer from '../features/SearchSlice';

const rootReducers = combineReducers({
  ShoppingList: ShoppingListReducer,
  Inventory: InventoryReducer,
  Modal: ModalSliceReducer,
  Search: SearchSliceReducer,
});

export default rootReducers;
