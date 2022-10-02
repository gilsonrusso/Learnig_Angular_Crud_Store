import { map, takeUntil } from "rxjs/operators";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState, loadProducts } from "src/app/store/app.state";
import { ProductService } from "../product.service";
import { interval, Subject, BehaviorSubject } from "rxjs";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent implements OnInit {
  displayedColumns = ["id", "name", "price", "statusProduct"];

  @Output() mudouValor = new EventEmitter();

  @Input() valor: number;

  idProduct: string = "d10279cd-abb1-436b-a496-ad1d1cdce027"
  loading: boolean = false;

  sub: Subject<boolean> = new Subject();
  requestInterval$ = interval(10000).pipe(takeUntil(this.sub));

  constructor(private store: Store<{ app: IAppState }>, private productService: ProductService) {}

  products$ = this.store.select("app").pipe(map((app) => app.products));

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  // aumentar() {
  //   this.valor++;
  //   this.mudouValor.emit({ novoValor: this.valor });
  // }
  // diminuir() {
  //   this.valor--;
  //   this.mudouValor.emit({ novoValor: this.valor });
  // }

  private requestSomeTimes() {
    this.requestInterval$.subscribe(() => {
      this.findProduct();
    })
  }

  findProduct() {
    this.loading = true;
    this.productService.findOne(this.idProduct).subscribe((res) => {
      if (res?.statusProduct === 'REQUESTED') {
        this.requestSomeTimes();
        return
      }
      this.sub.next(true);
      this.loading = false;
    })
  }
}
