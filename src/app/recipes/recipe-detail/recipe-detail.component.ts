import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoutingConstante } from 'src/app/constante/Route.constante';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  private id : number = 0;
  recipeDetail:Recipe|any= new Recipe(0,"","","",[]);
  constructor(private recipeService:RecipeService, private activeRoute:ActivatedRoute, private router:Router) {
   
   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params:Params)=>{
      this.id = +params["id"];
      this.recipeDetail = this.recipeService.getRecipe(this.id);
    })
  }

  AddIngredientToShoppingList(){
      this.recipeService.AddIngredientToShoppingList(this.recipeDetail.ingredients);
  }

  editRecipe(){
    this.router.navigate([RoutingConstante.route_recipe_edit.replace(":id", this.id.toString())])
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeDetail);
    this.router.navigate([RoutingConstante.route_recipe]);
  }

}
