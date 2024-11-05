import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[styledInput]',
  standalone: true,
})
export class InputStyleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.applyStyles();
  }

  private applyStyles() {
    this.renderer.addClass(this.el.nativeElement, 'w-full');
    this.renderer.addClass(this.el.nativeElement, 'px-3');
    this.renderer.addClass(this.el.nativeElement, 'py-2');
    this.renderer.addClass(this.el.nativeElement, 'placeholder-gray-300');
    this.renderer.addClass(this.el.nativeElement, 'border');
    this.renderer.addClass(this.el.nativeElement, 'border-gray-300');
    this.renderer.addClass(this.el.nativeElement, 'rounded-md');
    this.renderer.addClass(this.el.nativeElement, 'focus:outline-none');
    this.renderer.addClass(this.el.nativeElement, 'focus:border-zinc-800');
    this.renderer.addClass(this.el.nativeElement, 'transition');
    this.renderer.addClass(this.el.nativeElement, 'duration-300');
    this.renderer.addClass(this.el.nativeElement, 'disabled:bg-gray-100');
    this.renderer.addClass(this.el.nativeElement, 'disabled:border-gray-200');
    this.renderer.addClass(this.el.nativeElement, 'disabled:text-gray-400');
  }
}
