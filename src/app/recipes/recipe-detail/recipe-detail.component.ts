import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail:Recipe= new Recipe("","","",[]);
  constructor(private recipeService:RecipeService) {
   
   }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe:Recipe)=>{
      this.recipeDetail = recipe
    })
  }

  AddIngredientToShoppingList(){
      this.recipeService.AddIngredientToShoppingList(this.recipeDetail.ingredients);
  }

}
