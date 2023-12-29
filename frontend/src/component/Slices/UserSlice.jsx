import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    user: [],
    isUserUpdated: false,
    isUserDeleted: false,
  },

  reducers: {
    usersRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    usersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    },
    usersFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },

    userRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    userSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    },
    userFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    updateUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isUserUpdated: true,
      };
    },
    updateUserFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    clearUpdateUser(state, action) {
      return {
        ...state,
        isUserUpdated: false,
      };
    },
    deleteUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isUserDeleted: true,
      };
    },
    deleteUserFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    clearDeleteUser(state, action) {
      return {
        ...state,
        isUserDeleted: false,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

const { actions, reducer } = UserSlice;

export const {
  userRequest,
  userSuccess,
  userFail,
  usersRequest,
  usersSuccess,
  usersFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  clearUpdateUser,
  clearDeleteUser,
  clearError,
} = actions;

export default reducer;
