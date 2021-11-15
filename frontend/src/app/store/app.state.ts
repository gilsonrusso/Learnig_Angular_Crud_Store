import { createAction, createReducer, on, props } from "@ngrx/store";

interface IProduct {
  id?: number;
  name: string;
  price: number | null;
}

export interface IAppState {
  products: IProduct[];
}

export const appInitialState: IAppState = {
  products: [],
};

export const loadProducts = createAction('[App] Load All Products')
export const successLoadProducts = createAction('[App] Success load Products')

export const setProducts = createAction(
  "[App] Add All Products from API",
  props<{ payload: IProduct[] }>()
);

export const appReducer = createReducer(
  appInitialState,
  on(setProducts, (state, { payload }) => state = {
    ...state,
    products: payload,
  })
);
