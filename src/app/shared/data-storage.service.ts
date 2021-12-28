import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../services/recipe.service";

@Injectable({providedIn:'root'})
export class DataStorageServie {

    constructor(private recipeService: RecipeService, private http:HttpClient){}

    storeDataRecipe(){
        const recipes = this.recipeService.getRecipes();
        this.http.put("https://recipe-book-6aad6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",recipes)
        .subscribe(response => {
            console.log(response);
        });
    }


    fetDataRecipe(){
        this.http.get<Recipe[]>("https://recipe-book-6aad6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json")
        .subscribe(recipes=> {
            this.recipeService.setRecipes(recipes)
        })
    }

}