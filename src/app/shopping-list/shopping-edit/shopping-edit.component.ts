import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("inputAmount")inputAmout:ElementRef = new ElementRef("input");
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }

  AddItem(name:string){
    if(name !== "")
      this.shoppingListService.addIngredient(new Ingredient(name, this.inputAmout.nativeElement.value));
  }
}
