import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output() sendRecipeEmit = new EventEmitter<Recipe>();

  recipes:Recipe[]= [
    new Recipe("a test recipe", "this is my desciption of my recipe", "https://sf2.viepratique.fr/wp-content/uploads/sites/2/2015/03/Tagliatelles-au-bacon-Recette-TagliatelleChampignon-750x410.jpg"),
    new Recipe("a test recipe 2", "this is my desciption of my recipe 2", "https://sf2.viepratique.fr/wp-content/uploads/sites/2/2015/03/Tagliatelles-au-bacon-Recette-TagliatelleChampignon-750x410.jpg")
  ];

  @Output() getRecipe = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit(): void {
  }

  sendRecipe(recipe:Recipe){
    this.sendRecipeEmit.emit(recipe);
  }

}
