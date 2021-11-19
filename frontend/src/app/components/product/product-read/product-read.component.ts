import { map } from "rxjs/operators";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState, loadProducts } from "src/app/store/app.state";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent implements OnInit {
  displayedColumns = ["id", "name", "price"];

  @Output() mudouValor = new EventEmitter();

  @Input() valor: number;

  constructor(private store: Store<{ app: IAppState }>) {}

  products$ = this.store.select("app").pipe(map((app) => app.products));

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  aumentar() {
    this.valor++;
    this.mudouValor.emit({ novoValor: this.valor });
  }
  diminuir() {
    this.valor--;
    this.mudouValor.emit({ novoValor: this.valor });
  }
}
