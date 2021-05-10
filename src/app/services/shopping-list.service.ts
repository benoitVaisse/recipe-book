import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientIndexEdit = new Subject<number>();
    private ingredients:Ingredient[]= [
        new Ingredient("patte", 1),
        new Ingredient("tomatoes", 5)
    ];

    public getIngredients(){
        return this.ingredients.slice();
    }

    public getIngredient(index:number):Ingredient{
        return this.ingredients[index];
    }

    public addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());

    }

    public updateIngredient(index:number, ingredient:Ingredient){
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}