import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  oderbook: [],
  count: 0,
};
export const orderbookSlice = createSlice({
  name: "orderbook",
  initialState: initialState,
  reducers: {
    updateOrderBookReducer: (state, action) => {
      console.log("OrderBookpdated");
      state.count += 1;
      state.oderbook = action.payload;
    },
    deleteOrderBookReducer: (state) => {
      console.log("OrderBookDeleted");
      state.oderbook = [];
      state.count += 1;
    },
  },
});
export const { updateOrderBookReducer,deleteOrderBookReducer } = orderbookSlice.actions;
export default orderbookSlice.reducer;
