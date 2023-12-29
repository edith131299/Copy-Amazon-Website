import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFail,
  clearError,
  registerRequest,
  registerSuccess,
  registerFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} from "../Slices/AuthSlice";

export const LoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`/api/v1/login`, { email, password });
    dispatch(loginSuccess(data));
    localStorage.setItem("isAuth", true);
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
    localStorage.setItem("isAuth", false);
  }
};

export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

export const registerAction = (userdata) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const config = {
      headers: { "Content-type": "multipart/form-data" },
    };
    const { data } = await axios.post(`/api/v1/register`, userdata, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};
export const loadUserAction = async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`/api/v1/myprofile`);
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};
export const logoutAction = async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch(logoutSuccess());
    localStorage.setItem("isAuth", false);
  } catch (error) {
    dispatch(logoutFail());
    localStorage.setItem("isAuth", true);
  }
};


export const updateProfileAction = (userdata) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const config = {
      headers: { "Content-type": "multipart/form-data" },
    };
    const { data } = await axios.put(`/api/v1/update`, userdata, config);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};
export const updatePasswordAction = (formdata) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());

    const config = {
      headers: { "Content-type": "application/json" },
    };
    const { data } = await axios.put(
      `/api/v1/password/change`,
      formdata,
      config
    );
    dispatch(updatePasswordSuccess(data));
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};
export const forgotPasswordAction = (formdata) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const config = {
      headers: { "Content-type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/password/forgot`,
      formdata,
      config
    );
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};
export const resetPasswordAction = (formdata, token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const config = {
      headers: { "Content-type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/password/reset/${token}`,
      formdata,
      config
    );
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};
