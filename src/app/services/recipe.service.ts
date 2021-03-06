import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
@Injectable()
export class RecipeService {

    recipeSelected = new Subject<Recipe>();
    recipesList = new Subject<Recipe[]>();


    private recipes:Recipe[]= [
        new Recipe(1,"Pâte Carbonarra", "Un très bon plat de pâte .",
         "https://sf2.viepratique.fr/wp-content/uploads/sites/2/2015/03/Tagliatelles-au-bacon-Recette-TagliatelleChampignon-750x410.jpg",
         [
             new Ingredient("Pâte", 1),
             new Ingredient("Lardon", 2),
             new Ingredient("Crème épaisse", 1),
         ]),
        new Recipe(2,"Burger Géant", "Un super gros burger pour ceux qui ont les yeux plus gros que le ventre", 
        "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2Fc7847cc3-6028-4609-ab50-065c275277fa.2Ejpeg/750x562/quality/80/crop-from/center/cr/wqkgQXViZXJnaW5lIHN0dWRpby9TdWNyw6kgc2Fsw6kgLyBDdWlzaW5lIEFjdHVlbGxl/burger-maison.jpeg",
        [
            new Ingredient("Pain a Burger", 1),
            new Ingredient("Steack Hachée", 2),
            new Ingredient("Tomate", 1),
            new Ingredient("Fromage", 2),
        ])
    ];

    constructor(private slService:ShoppingListService){}

    /**
     * get all recipes
     * @returns 
     */
    public getRecipes():Recipe[]{
        return this.recipes.slice();
    }

    public AddIngredientToShoppingList(ingrediens:Ingredient[]){
        this.slService.addIngredients(ingrediens);
    }

    /**
     * get recipe by id
     * @param id 
     * @returns 
     */
    public getRecipe(id:number):Recipe|any{
        let recipe:Recipe|any = this.recipes.find((e)=>{
            return e.id == id;
        })
        if(recipe){
            return recipe;
        }
        return new Recipe(0,"","","",[]);
    }

    /**
     * add recipe
     * @param recipe 
     */
    public addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesList.next(this.recipes.slice());
        
    }

    /**
     * update recipe
     * @param recipe
     */
    public updateRecipe(recipe:Recipe){
        this.recipes.find((e, index)=>{
            if(e.id == recipe.id){
                this.recipes[index] = recipe;
            }
        })
        this.recipesList.next(this.recipes.slice());
    }

    /**
     * delete recipe
     * @param recipe 
     */
    public async deleteRecipe(recipe:Recipe){
        this.recipes.find((e, index)=>{
            if(e.id == recipe.id){
                this.recipes.splice(index, 1);
            }
        })
        this.recipesList.next(this.recipes.slice());
    }

}