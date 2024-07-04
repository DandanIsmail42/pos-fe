import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    selectedCategory: "",
    selectedTag: "",
    search: "",
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedTag(state, action) {
      state.selectedTag = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setData, setSelectedCategory, setSelectedTag, setSearch } =
  productSlice.actions;
export default productSlice.reducer;
