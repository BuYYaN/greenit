import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../../api/reddit";

const fetchPosts = createAsyncThunk("posts/fetchPosts", async (query) => {
  let data = null;

  if (query) {
    data = await Reddit.searchPostsByQuery(query);
  } else {
    data = await Reddit.getPopularPosts();
  }

  return data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.posts = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        console.log("Rejected");
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchPosts.pending, (state) => {
        console.log("Pending");
        state.posts = [];
        state.isLoading = true;
        state.hasError = false;
      });
  },
});

export { fetchPosts };
export default postsSlice.reducer;
