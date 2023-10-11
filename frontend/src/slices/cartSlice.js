import { createSlice } from "@reduxjs/toolkit";

// items in the cart will be stored in local storage so when you leave and come back they are still in the cart
// We check to see if something is in there and then parse the local storage (local storage can only hold data as strings)
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      // This checks whether or not the item exists and if not then x is returned but if it does then it gets mapped into a new array
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems];
      }

      // Calc items prices
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // Calc shipping price (If the order is over £100 then free, else £5 shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      // Calc tax price
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );
      // Calc total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
