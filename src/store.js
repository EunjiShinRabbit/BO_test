import { configureStore } from "@reduxjs/toolkit";

//방금 전 counter.js에서 export default한 counterSlice.reducer
import searchRuducer from "./searchSlice";


//redux store
const store = configureStore({
  reducer: {
    searchInfo: searchRuducer
  },
});

export { store };