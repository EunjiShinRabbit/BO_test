import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limit : !!sessionStorage.getItem("limit")? sessionStorage.getItem("limit") : 10,
  page : !!sessionStorage.getItem("page")? sessionStorage.getItem("page") : 1,
  pageStart : !!sessionStorage.getItem("pageStart")? sessionStorage.getItem("pageStart") : 0,
  searchType : !!sessionStorage.getItem("searchType")? sessionStorage.getItem("searchType") : "all",
  searchInput : !!sessionStorage.getItem("searchInput")? sessionStorage.getItem("searchInput") : ""
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setLimit(state, action) {
      const limit = action.payload;
      state.limit = limit;
      sessionStorage.setItem("limit", limit);
    },
    setPage(state, action) {
      const page = action.payload;
      state.page = page;
      sessionStorage.setItem("page", page);
    },
    setPageStart(state, action) {
      const pageStart = action.payload;
      state.pageStart = pageStart;
      sessionStorage.setItem("pageStart", pageStart);
    },
    setSearchType(state, action) {
      const searchType = action.payload;
      state.searchType = searchType;
      sessionStorage.setItem("searchType", searchType);
    },
    setSearchInput(state, action) {
      const searchInput = action.payload;
      state.searchInput = searchInput;
      sessionStorage.setItem("searchInput", searchInput);
    }
  },
});

export const { setLimit, setPage, setPageStart, setSearchType, setSearchInput } = searchSlice.actions;

export default searchSlice.reducer;