import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[]= [
    new Ingredient("patte", 1),
    new Ingredient("tomatoes", 5)
  ];
  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
  }

}
