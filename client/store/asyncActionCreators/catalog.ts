import { AppDispatch } from "..";
import { CatalogAPI } from "../../http/api/catalog";
import { catalogSlice } from "../slices/catalogSlice";

export const CatalogAsyncActionCreators = {
  fetchAll: (): any => async (dispatch: AppDispatch) => {
    try {
      const response = await CatalogAPI.getAll();
      dispatch(catalogSlice.actions.setList(response.data));
    } catch (e: any) {
      console.log(e.response?.data?.massage);
    }
  },
  createCatalog:
    (name: string): any =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await CatalogAPI.createCatalog(name);
        dispatch(catalogSlice.actions.addCatalog(response.data));
        alert(`Каталог ${response.data.name} успешно добавлен`);
      } catch (e: any) {
        alert(e.response?.data?.massage);
      }
    },
};
