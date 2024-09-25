import { createSlice } from "@reduxjs/toolkit";

const loadersSlice = createSlice({
  name: "loaders",
  initialState: {
    loading: false,
  },
  reducers: {
    SetLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { SetLoading } = loadersSlice.actions;
export default loadersSlice.reducer;
// You can dispatch the generated actions to update the loading state as needed, such as setting it to true when starting a process and false when the process ends.