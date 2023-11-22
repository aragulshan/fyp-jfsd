import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const searchByPriceRange = createAsyncThunk(
  "price/searchByPriceRange",
  async (minPrice, maxPrice, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}` // to replace it with my own api
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const priceSlice = createSlice({
  name: "price",
  initialState: {
    products: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchByPriceRange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchByPriceRange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(searchByPriceRange.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action.error.message;
      });
  },
});

export default priceSlice.reducer;
