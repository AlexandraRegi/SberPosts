import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { isError, isLoading } from "../utilsStore";
import { openNotification } from "../../components/Notification/Notification";


const initialState = {
  data: {},
  loading: false,
};

export const getMyUser = createAsyncThunk("getUser", async function () {
  const data = await api.getUserInfo();
  return data;
});

export const updateUser = createAsyncThunk("updateUser", async function (data) {
  if (data.avatar) {
    const res = await api.updateUserAvatar({avatar: data.avatar});
    return res;
  } else {
    const res = await api.updateUserInfo({name: data.name, about: data.about});
    return res;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getMyUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload;
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

export default userSlice.reducer;