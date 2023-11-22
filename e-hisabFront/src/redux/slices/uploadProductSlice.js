import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProduct = createAsyncThunk('product/createProduct', async (productData, { rejectWithValue }) => {
  try {
    // Fetch the category based on the category name
    const categoryResponse = await axios.get(
      `http://localhost:8080/api/category/get-category?q=${productData.category}`
    );

    // Extract the categoryId from the response
    const categoryId = categoryResponse.data.categories._id;

    // Update the productData with the categoryId
    const updatedProductData = { ...productData, category: categoryId };

    // make the request to create the product with the updated data
    const response = await axios.post(
      "http://localhost:8080/api/product/create-product",
      updatedProductData
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const productCreationSlice = createSlice({
  name: 'productCreation',
  initialState: {
    product: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.data) {
          state.product = action.payload.data;
          state.error = null;
        } else {
          console.error("Invalid response format:", action.payload);
          state.product = null;
          state.error = "Invalid response format"; 
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        console.error("Product creation rejected:", action);
        state.isLoading = false;
        state.product = null;
        state.error = action.error.message;
      });
  },
});

export default productCreationSlice.reducer;

