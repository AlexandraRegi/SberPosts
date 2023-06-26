import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { isError, isLoading } from "../utilsStore";
import { openNotification } from "../../components/Notification/Notification";


const initialState = {
    dataData: {},
    loading: false,
    token: '',
};

export const signInProfile = createAsyncThunk(
    "signInProfile", 
    async function (data, arg) {
        try {
            const signin = await api.signin(data);
            return arg.fulfillWithValue( signin );
        }catch (error) {
            return arg.rejectWithValue(error);
        }
});

export const registration = createAsyncThunk(
  "registration", 
  async function (data, arg) {
      try {
          const signup = await api.signup(data);
          return arg.fulfillWithValue( signup );
      }catch (error) {
          return arg.rejectWithValue(error);
      }
});

export const resetPass = createAsyncThunk(
  "resetPass", 
  async function (data, arg) {
      try {
          const resetPass = await api.resetPass(data);
          return arg.fulfillWithValue( resetPass );
      }catch (error) {
          return arg.rejectWithValue(error);
      }
});

export const resetPassWithToken = createAsyncThunk(
  "resetPassWithToken", 
  async function (data, arg) {
      try {
          const resetPassWithToken = await api.resetPassWithToken(data.token, {password: data.password});
          return arg.fulfillWithValue( resetPassWithToken );
      }catch (error) {
          return arg.rejectWithValue(error);
      }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(signInProfile.fulfilled, (state, action) => {
      state.dataData = action.payload;
      state.token = action.payload.token;
      localStorage.setItem('token', state.token);
      openNotification("success", "Успешно", "Вы вошли");
      state.loading = false;
    });

    builder.addCase(registration.fulfilled, (state, action) => {
      openNotification("success", "Успешно", "Вы зарегистрировались");
      state.loading = false;
    });

    builder.addCase(resetPass.fulfilled, (state, action) => {
      openNotification("success", action.payload.message);
      state.loading = false;
    });

    builder.addCase(resetPassWithToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', state.token);
      openNotification("success", 'Пароль изменен');
      state.loading = false;
    });

    builder.addMatcher(isError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      openNotification("error", "Error", action.payload.message);
    });

    builder.addMatcher(isLoading, (state) => {
      //state.loading = true;
    });
  },
});
  
export default authSlice.reducer;