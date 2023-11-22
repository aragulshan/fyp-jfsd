import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrderedUserProduct = createAsyncThunk(
  "product/saveuserdata",
  async (orderedUserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/product/create-ordered-data",
        orderedUserData
      );
console.log(response,'api response')
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsOrderedUserData = createSlice({
  name: "orderedUserData",
  initialState: {
    orderedData: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderedUserProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrderedUserProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.data) {
          state.orderedData = action.payload.data;
          state.error = null;
        } else {
          console.error("Invalid response format:", action.payload);
          state.orderedData = null;
          state.error = "Invalid response format"; 
        }
      })
      .addCase(createOrderedUserProduct.rejected, (state, action) => {
        console.error("Product creation rejected:", action);
        state.isLoading = false;
        state.orderedData = null;
        state.error = action.error.message;
      });
  },
});

export default productsOrderedUserData.reducer;
