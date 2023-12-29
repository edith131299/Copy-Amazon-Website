import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "order",

  initialState: {
    orderDetails: {},
    userOrders: [],
    singleOrder: [],
    adminOrders: [],
    isOrderUpadted: false,
    isOrderDeleted: false,
    loading: false,
  },

  reducers: {
    createOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createOrderSuccess(state, action) {
      return {
        ...state,
        loading: true,
        orderDetails: action.payload.order,
      };
    },
    createOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearOrderError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    userOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    userOrderSuccess(state, action) {
      return {
        ...state,
        loading: true,
        userOrders: action.payload.orders,
      };
    },
    userOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    singleUserOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    singleUserOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        singleOrder: action.payload.order,
      };
    },
    singleUserOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    adminOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    adminOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        adminOrders: action.payload.orders,
      };
    },
    adminOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearAdminOrder(state, action) {
      return {
        ...state,
        adminOrders: [],
      };
    },
    updateOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderUpdated: true,
      };
    },
    updateOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearUpdateOrder(state, action) {
      return {
        ...state,
        loading: false,
        isOrderUpdated: false,
      };
    },
    deleteOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderDeleted: true,
      };
    },
    deleteOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearDeleteOrder(state, action) {
      return {
        ...state,
        loading: false,
        isOrderDeleted: false,
      };
    },
  },
});

const { actions, reducer } = OrderSlice;

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearOrderError,
  userOrderRequest,
  userOrderFail,
  userOrderSuccess,
  singleUserOrderRequest,
  singleUserOrderSuccess,
  singleUserOrderFail,
  adminOrderRequest,
  adminOrderSuccess,
  adminOrderFail,
  clearAdminOrder,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
  clearUpdateOrder,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  clearDeleteOrder,
} = actions;

export default reducer;
