import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
    numberOfItems: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // Add a new item to the cart
    addToCart: (state, action) => {
      if (state.numberOfItems === 0) {
        state.cartItems.push(action.payload);
        state.total += action.payload.price;
        state.numberOfItems += 1;
      } else {
        const item = state.cartItems.find(
          (item) => item.course_id === action.payload.course_id
        );
        if (!item) {
          state.cartItems.push(action.payload);
          state.total += action.payload.price;
          state.numberOfItems += 1;
        }
      }
    },
    // Remove an item from the cart
    removeFromCart: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.course_id === action.payload
      );
      state.cartItems = state.cartItems.filter(
        (item) => item.course_id !== action.payload
      );
      state.total -= item.price;
      state.numberOfItems -= 1;
    },
    // Clear the cart
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
    // Increase the quantity of the cart
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.course_id === action.payload
      );
      item.quantity++;
      state.total += item.price;
    },
    // Decrease the quantity of the cart
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.course_id === action.payload
      );
      item.quantity--;
      state.total -= item.price;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
