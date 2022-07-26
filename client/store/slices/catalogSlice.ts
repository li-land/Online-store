import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICatalog } from "../../interfaces";

export interface CatalogState {
  catalogList: ICatalog[];
  isLoading: boolean;
}

const initialState: CatalogState = {
  catalogList: [],
  isLoading: true,
};

export const catalogSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<ICatalog[]>) => {
      state.catalogList = action.payload;
      state.isLoading = false;
    },
    addCatalog: (state, action: PayloadAction<ICatalog>) => {
      state.catalogList.push(action.payload);
    },
  },
});

export const { setList, addCatalog } = catalogSlice.actions;

export default catalogSlice.reducer;
