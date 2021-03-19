import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @Output() saveIngredient = new EventEmitter<Ingredient>();
  @ViewChild("inputAmount")inputAmout:ElementRef = new ElementRef("input");
  constructor() { }

  ngOnInit(): void {
  }

  AddItem(name:HTMLInputElement){
    this.saveIngredient.emit(new Ingredient(name.value, this.inputAmout.nativeElement.value));
  }
}
