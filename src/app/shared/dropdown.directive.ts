import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding("class.open") isOpen = false;
  @HostListener("click") click(event:Event){
    this.isOpen = !this.isOpen;
  }
}
