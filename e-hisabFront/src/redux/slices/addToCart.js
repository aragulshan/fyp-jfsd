import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);

      // if (newItem && newItem.item && newItem.item.id) {
      //   const existingItemIndex = state.items.findIndex(
      //     (item) => item?.item.id === newItem?.item.id
      //   );

      //   if (existingItemIndex !== -1) {
      //     state.items[existingItemIndex].quantity += newItem.quantity;
      //   } else {
      //     state.items.push(newItem);
      //   }
      // } else {
      //   // Handle the case where newItem is not in the expected format
      //   console.error("Invalid newItem:", newItem);
      // }
    },
    removeFromCart: (state, action) => {
      console.log(state.items,'itemss')
      const itemIdToRemove = action.payload;
      state.items = state.items.filter((item) => item?._id !== itemIdToRemove);
    },  
    // removeFromCart: (state, action) => {
    //   state.items = state.items.filter((e) => e?.item.id !== action.payload);
    // },
    increaseQuantity: (state, action) => {
      state.items = state.items.map((item) => {
        if (item?._id === action.payload) {
        // if (item?.id === action.payload) {
          return {
            ...item,
            quantity:
              item?.stock > item.quantity ? item.quantity + 1 : item.quantity,
          };
        }
        return item;
      });
    },
    decreaseQuantity: (state, action) => {
      state.items = state.items.map((item) => {
        if (item?._id === action.payload) {
        // if (item?.id === action.payload) {
          return {
            ...item,
            quantity: item?.stock > 0 ? item.quantity - 1 : item.quantity,
          };
        }
        return item;
      });
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

