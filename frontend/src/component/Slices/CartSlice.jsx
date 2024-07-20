import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",

  initialState: {
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},

    loading: false,
  },

  reducers: {
    cartRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },

    cartSuccess(state, action) {
      const item = action.payload;
      const itemIndex = state.items.findIndex(
        (i) => i.product === item.product
      );

      if (itemIndex !== -1) {
        // Update the quantity of the existing item
        state.items[itemIndex].quantity = item.quantity;
      } else {
        // Add new item to the cart
        state.items.push(item);
      }

      state.loading = false;

      localStorage.setItem("cartItems", JSON.stringify(state.items));

      return state; // No need to spread state again
    },

    cartFail(state, action) {
      console.log(action);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    increaseCartQuantity(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decreaseCartQuantity(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          item.quantity = item.quantity - 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItemFromCart(state, action) {
      const filter = state.items.filter((item) => {
        return item.product !== action.payload;
      });
      localStorage.setItem("cartItems", JSON.stringify(filter));
      return {
        ...state,
        items: filter,
      };
    },

    shippingRequest(state, action) {
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));

      return {
        ...state,
        shippingInfo: action.payload,
      };
    },

    orderCompleted(state, action) {
      localStorage.removeItem("shippingInfo");
      localStorage.removeItem("cartItems");
      sessionStorage.removeItem("orderInfo");

      return {
        items: [],
        loading: false,
        shippingInfo: {},
      };
    },
  },
});

const { actions, reducer } = CartSlice;

export const {
  cartRequest,
  cartSuccess,
  cartFail,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeItemFromCart,
  shippingRequest,
  orderCompleted,
} = actions;

export default reducer;
