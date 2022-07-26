import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ICatalog, ICatalogProductsResponse } from "../../interfaces";

export interface ProductState {
  productsList: ICatalogProductsResponse;
  removedProductsList: IProduct[];
  limit: number;
  newProductsList: IProduct[];
  popularProductsList: IProduct[];
  isLoading: boolean;
}

const initialState: ProductState = {
  isLoading: false,
  limit: 8,
  productsList: {
    count: 0,
    rows: [],
  },
  removedProductsList: [],
  newProductsList: [],
  popularProductsList: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setProductsList: (
      state,
      action: PayloadAction<ICatalogProductsResponse>
    ) => {
      state.productsList = action.payload;
      state.isLoading = false;
    },
    setRemovedProductsList: (state, action: PayloadAction<IProduct[]>) => {
      state.removedProductsList = action.payload;
    },
    removeProduct: (state, action: PayloadAction<{ id: number }>) => {
      state.removedProductsList = state.removedProductsList.filter(
        (product) => product.id !== action.payload.id
      );
    },
    setNewProductsList: (state, action: PayloadAction<IProduct[]>) => {
      state.newProductsList = action.payload;
    },
    setPopularProductsList: (state, action: PayloadAction<IProduct[]>) => {
      state.popularProductsList = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setLoading,
  setProductsList,
  removeProduct,
  setNewProductsList,
  setPopularProductsList,
  setRemovedProductsList,
} = productSlice.actions;

export default productSlice.reducer;
