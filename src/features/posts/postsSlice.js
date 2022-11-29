import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "Learning RTK", content: "Lets do this" },
  { id: "2", title: "Slices", content: "Like an orange" },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: (state, action) => {
      state.push(action.payload); //immer JS makes the states to be mutated here. Acceptable here only!!!
    },
  },
});
export const selectAllPosts = (state) => state.posts;
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
