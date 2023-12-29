import axios from "axios";
import {
  productFail,
  productSuccess,
  productRequest,
  reviewSubmitRequest,
  reviewSubmitSuccess,
  reviewSubmitFail,
  newProductRequest,
  newProductSuccess,
  newProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  reviewRequest,
  reviewSuccess,
  reviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
} from "../Slices/ProductSlice";

import {
  productsFail,
  productsSuccess,
  productsRequest,
  adminProductsRequest,
  adminProductsFail,
  adminProductsSuccess,
} from "../Slices/ProductsSlice";

export const GetProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest());
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFail(error.response.data.message));
  }
};

export const ReviewProductAction = (formdata) => async (dispatch) => {
  try {
    dispatch(reviewSubmitRequest());
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/review`, formdata, config);
    dispatch(reviewSubmitSuccess(data));
  } catch (error) {
    dispatch(reviewSubmitFail(error.response.data.message));
  }
};

export const createNewProductAction = (productData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());
    const { data } = await axios.post(`/api/v1/admin/product/new`, productData);
    dispatch(newProductSuccess(data));
  } catch (error) {
    dispatch(newProductFail(error.response.data.message));
  }
};

export const deleteProductAction = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch(deleteProductSuccess());
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
  }
};

export const updateProductAction = (id, formdata) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
    const { data } = await axios.put(`/api/v1/admin/product/${id}`, formdata);
    dispatch(updateProductSuccess(data));
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message));
  }
};
export const getReviewAction = (id) => async (dispatch) => {
  try {
    dispatch(reviewRequest());
    const { data } = await axios.get(`/api/v1/admin/reviews`, {
      params: { id },
    });
    dispatch(reviewSuccess(data));
  } catch (error) {
    dispatch(reviewFail(error.response.data.message));
  }
};

export const deleteReviewAction = (productId, id) => async (dispatch) => {
  try {
    dispatch(deleteReviewRequest());
    await axios.delete(`/api/v1/admin/review`, { params: { productId, id } });
    dispatch(deleteReviewSuccess());
  } catch (error) {
    dispatch(deleteReviewFail(error.response.data.message));
  }
};

/*** Products Action*****/
export const GetProducts =
  (keyword, price, category, rating, pageno) => async (dispatch) => {
    let link = `/api/v1/products?page=${pageno}`;

    try {
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (price) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      if (category) {
        link = `/api/v1/products?page=${pageno}&category=${category}`;
      }
      if (rating) {
        link += `&ratings=${rating}`;
      }
      dispatch(productsRequest());
      const { data } = await axios.get(link);
      dispatch(productsSuccess(data));
    } catch (error) {
      dispatch(productsFail(error.response.data.message));
    }
  };
export const getAdminProducts = async (dispatch) => {
  try {
    dispatch(adminProductsRequest());
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch(adminProductsSuccess(data));
  } catch (error) {
    dispatch(adminProductsFail(error.response.data.message));
  }
};
