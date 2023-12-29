import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",

  initialState: {
    loading: true,
    isAuthenticated: false,
    user: {},
  },

  reducers: {
    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    registerRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    registerSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    registerFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    loadUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loadUserSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loadUserFail(state, action) {
      return {
        ...state,
        loading: false,
      };
    },
    logoutSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: false,
      };
    },
    logoutFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    updateProfileRequest(state, action) {
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };
    },
    updateProfileSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        isUpdated: true,
      };
    },
    updateProfileFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updatePasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };
    },
    updatePasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };
    },
    updatePasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearUpdateError(state, action) {
      return {
        ...state,
        isUpdated: false,
      };
    },
    forgotPasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
        message: null,
      };
    },
    forgotPasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    },
    forgotPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    resetPasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    },
    resetPasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
      };
    },
    resetPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = AuthSlice;

export const {
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
  clearUpdateError,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = actions;

export default reducer;
