import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  HostBinding,
} from "@angular/core";

@Directive({
  selector: "[directiveMouseEvent]",
})
export class DirectiveMouseEventDirective {

  private backgroundColor: string;
  
  constructor( 
    private _elementRef: ElementRef,
  // private _renderer: Renderer2
  ){}

  @HostListener("mouseenter") onMouseOver() {
    console.log(this._elementRef.nativeElement);
    
    // this._renderer.setStyle(
    //   this._elementRef.nativeElement,
    //   "background-color",
    //   "yellow"
    // );
    this.backgroundColor = "yellow";
  }
  @HostListener("mouseleave") onMouseLeave() {
    // this._renderer.setStyle(
    //   this._elementRef.nativeElement,
    //   "background-color",
    //   "white"
    // );
    this.backgroundColor = "white";
  }

  // @HostBinding("style.backgroundColor") backgroundColor: string;
  @HostBinding('style.backgroundColor') get setColor(){
    // pode add function here
    return this.backgroundColor
  }
}
