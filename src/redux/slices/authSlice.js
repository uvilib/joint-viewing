import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../utils/auth";

const initialState = {
  userId: null,
  token: null,
  isActualToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserToStore: (state, action) => {
      state.userId = action?.payload?.user?.userId;
      state.token = action?.payload?.user?.token;
      state.isActualToken = action?.payload?.isActualToken;
    },
  },
});

export const { setUserToStore } = authSlice.actions;

export const fetchUserFromFirebase = () => async (dispatch) => {
  const nameField = localStorage.getItem("nameField");

  const emptyUser = {
    user: {
      userId: "",
      token: {},
    },
    isActualToken: null,
  };

  if (nameField) {
    const user = await getUser(nameField);
    const isActualToken = Date.now() < new Date(user?.token?.expired);
    dispatch(setUserToStore({ user, isActualToken }));
  } else {
    dispatch(setUserToStore(emptyUser));
  }
};

export default authSlice.reducer;
