import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, tap } from "rxjs/operators";
import { IProduct } from "../components/product/product.model";
import {
  IAppState,
  loadProducts,
  setProducts,
  successLoadProducts,
} from "./app.state";

@Injectable({
  providedIn: "root",
})
export class ProductsEffectsService {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<{ app: IAppState }>
  ) {}

  loadActionsOfProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.http.get<IProduct[]>("http://localhost:3000/products")
      ),
      tap((products) =>
        this.store.dispatch(setProducts({ payload: products }))
      ),
      map(() => successLoadProducts())
    )
  );
}
