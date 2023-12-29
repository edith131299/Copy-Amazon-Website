import axios from "axios";

import {
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  updateUserFail,
  updateUserRequest,
  updateUserSuccess,
  userFail,
  userRequest,
  userSuccess,
  usersFail,
  usersRequest,
  usersSuccess,
} from "../Slices/UserSlice";

export const getUsersAction = () => async (dispatch) => {
  try {
    dispatch(usersRequest());
    const { data } = await axios.get("/api/v1/admin/users");
    dispatch(usersSuccess(data));
  } catch (error) {
    dispatch(usersFail(error.response.data.message));
  }
};
export const getUserAction = (id) => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data.message));
  }
};

export const updateUserAction = (id, userdata) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const congfig = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios.put(`/api/v1/admin/user/${id}`, userdata, congfig);
    dispatch(updateUserSuccess());
  } catch (error) {
    dispatch(updateUserFail(error.response.data.message));
  }
};

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    await axios.delete(`/api/v1/admin/user/${id}`);
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};
