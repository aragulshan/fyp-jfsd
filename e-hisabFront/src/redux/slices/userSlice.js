import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      console.log('djdfs')
      const response = await axios.get(
        "http://localhost:8080/api/auth/getallusers"
      ); 
      console.log(response.data,'usersss')
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    products: [],
    currentUser:null,
    error: null,
    isLoading: false,
    users:null
  },
  reducers: {
    login: (state,action) => {
      state.currentUser =  action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload; // Check if action.payload is the array of users
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.users = [];
        state.error = action.error.message;
      });
  },
});

export const  {login} = userSlice.actions

  export default userSlice.reducer;

