import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBook: {},
  filterType: "all",
  searchKeyword: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    selectBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    filterBook: (state, action) => {
      state.filterType = action.payload;
    },
    searchBook: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
});

export const { selectBook, filterBook, searchBook } = bookSlice.actions;

export default bookSlice.reducer;
