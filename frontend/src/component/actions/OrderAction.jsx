import axios from "axios";
import {
  adminOrderFail,
  adminOrderRequest,
  adminOrderSuccess,
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  singleUserOrderFail,
  singleUserOrderRequest,
  singleUserOrderSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  userOrderFail,
  userOrderRequest,
  userOrderSuccess,
} from "../Slices/OrderSlice";

export const OrderAction = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await axios.post("/api/v1/order/new", order);
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message));
  }
};

export const userOrderAction = async (dispatch) => {
  try {
    dispatch(userOrderRequest());
    const { data } = await axios.get("/api/v1/myorders");
    dispatch(userOrderSuccess(data));
  } catch (error) {
    dispatch(userOrderFail(error.response.data.message));
  }
};

export const singleUserOrderAction = (id) => async (dispatch) => {
  try {
    dispatch(singleUserOrderRequest());
    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch(singleUserOrderSuccess(data));
  } catch (error) {
    dispatch(singleUserOrderFail(error.response.data.message));
  }
};

export const adminOrderAction = () => async (dispatch) => {
  try {
    dispatch(adminOrderRequest());
    const { data } = await axios.get(`/api/v1/admin/orders`);
    dispatch(adminOrderSuccess(data));
  } catch (error) {
    dispatch(adminOrderFail(error.response.data.message));
  }
};
export const updateAdminOrderAction = (id, orderStatus) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderStatus);
    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};

export const deleteAdminOrderAction = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch(deleteOrderSuccess());
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};
