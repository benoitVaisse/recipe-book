import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingConstante } from 'src/app/constante/Route.constante';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes:Recipe[] = [];

  constructor(private recipeService:RecipeService, private router:Router) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  createRecipe(){
    this.router.navigate([RoutingConstante.route_recipe_new]);
  }

}
