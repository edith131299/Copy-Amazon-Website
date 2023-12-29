import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "products",

  initialState: {
    loading: false,
    product: {},
    reviews: [],
    isReviewSubmitted: false,
    isProductSubmitted: false,
    isProductDeleted: false,
    isProductUpdated: false,
    isReviewDeleted: false,
  },

  reducers: {
    productRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    productSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    },
    productFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    reviewSubmitRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    reviewSubmitSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewSubmitted: true,
      };
    },
    reviewSubmitFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearReview(state, action) {
      return {
        ...state,
        isReviewSubmitted: false,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        loading: false,
        error: null,
      };
    },
    clearProduct(state, action) {
      return {
        ...state,
        loading: false,
        product: {},
      };
    },
    newProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    newProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        newProduct: action.payload.product,
        isProductSubmitted: true,
      };
    },
    newProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isProductSubmitted: false,
      };
    },

    clearNewProduct(state, action) {
      return {
        ...state,
        loading: false,
        newProduct: {},
        isProductSubmitted: false,
      };
    },
    deleteProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteProductSuccess(state, action) {
      return {
        ...state,
        loading: false,

        isProductDeleted: true,
      };
    },
    deleteProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isProductDeleted: false,
      };
    },

    clearDeleteProduct(state, action) {
      return {
        ...state,
        loading: false,

        isProductDeleted: false,
      };
    },
    updateProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        updateProduct: action.payload.product,
        isProductUpdated: true,
      };
    },
    updateProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isProductUpdated: false,
      };
    },

    clearUpdateProduct(state, action) {
      return {
        ...state,
        loading: false,
        updateProduct: {},
        isProductUpdated: false,
      };
    },
    reviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    reviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews,
      };
    },
    reviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewDeleted: true,
      };
    },
    deleteReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearReviewDeleted(state, action) {
      return {
        ...state,
        loading: false,
        isReviewDeleted: false,
      };
    },
  },
});

const { actions, reducer } = ProductSlice;

export const {
  productRequest,
  productSuccess,
  productFail,
  reviewSubmitRequest,
  reviewSubmitSuccess,
  reviewSubmitFail,
  clearError,
  clearReview,
  clearProduct,
  newProductRequest,
  newProductSuccess,
  newProductFail,
  clearNewProduct,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  clearDeleteProduct,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  clearUpdateProduct,
  reviewSuccess,
  reviewRequest,
  reviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
  clearReviewDeleted,
} = actions;

export default reducer;
