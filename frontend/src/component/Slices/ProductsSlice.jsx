import { createSlice } from "@reduxjs/toolkit";

const ProductsSlice = createSlice({
  name: "products",

  initialState: {
    loading: false,
  },

  reducers: {
    productsRequest(state, action) {
      return {
        loading: true,
      };
    },
    productsSuccess(state, action) {
      return {
        loading: false,
        products: action.payload.products,
        count: action.payload.count,
        resPerPage: action.payload.resPerPage,
      };
    },
    productsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },

    adminProductsRequest(state, action) {
      return {
        loading: true,
      };
    },
    adminProductsSuccess(state, action) {
      return {
        loading: false,
        products: action.payload.products,
      };
    },
    adminProductsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        loading: false,
        error: null,
      };
    },
  },
});

const { actions, reducer } = ProductsSlice;

export const {
  productsRequest,
  productsSuccess,
  productsFail,
  adminProductsFail,
  adminProductsRequest,
  adminProductsSuccess,
  clearError,
} = actions;

export default reducer;
