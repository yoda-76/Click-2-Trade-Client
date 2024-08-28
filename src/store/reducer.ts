import { createSlice } from "@reduxjs/toolkit";
const initialState: any = {
  email: localStorage.getItem("email") || "",
  token: localStorage.getItem("token") || "",
  name: localStorage.getItem("name") || "",
  total_pnl:0,
  key: "",
  accounts: []
};

export const sessionSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    updateSessionReducer: (state, action) => {
      console.log("state:", state);
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.key = action.payload.key;
      state.total_pnl=action.payload.total_pnl;
      state.accounts= action.payload.accounts;

      console.log(action.payload);
    },
    deleteSessionReducer: (state) => {
      state.email = "";
      state.name = "";
      state.total_pnl=0;
      state.token = "";
      state.key= "";
      state.accounts=[];
    },
  },
});
export const { updateSessionReducer, deleteSessionReducer } =
  sessionSlice.actions;
export default sessionSlice.reducer;


// const payload = {
//   name: user.name,
//   email,
//   total_pnl: user.total_pnl,
//   accounts:updatedAccounts
// };