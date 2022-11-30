import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Vishnu Sekhar" },
  { id: "1", name: "Aaron Mankhe" },
  { id: "2", name: "Irene Adler" },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});
export const selectAllUsers = (state) => state.users;
export default userSlice.reducer;
