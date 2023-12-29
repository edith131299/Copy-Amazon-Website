import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ProductsReducer from "./component/Slices/ProductsSlice";
import ProductReducer from "./component/Slices/ProductSlice";
import AuthReducer from "./component/Slices/AuthSlice";
import CartReducer from "./component/Slices/CartSlice";
import OrderReducer from "./component/Slices/OrderSlice";
import UserReducer from "./component/Slices/UserSlice";

const reducer = combineReducers({
  productsState: ProductsReducer,
  productState: ProductReducer,
  authState: AuthReducer,
  cartState: CartReducer,
  orderState: OrderReducer,
  userState: UserReducer,
});

const Store = configureStore({
  reducer,
  middleware: [thunk],
});

export default Store;
