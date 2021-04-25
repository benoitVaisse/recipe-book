import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients:Ingredient[]= [
        new Ingredient("patte", 1),
        new Ingredient("tomatoes", 5)
    ];

    public getIngredients(){
        return this.ingredients.slice();
    }

    public addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());

    }
}