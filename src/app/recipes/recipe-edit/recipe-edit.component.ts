import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  private id:number|null= null;
  public editMode:boolean = false;
  public formRecipe:FormGroup = new FormGroup({});
  private recipeEdit = new Recipe(0,"","","",[]);
  public imagePreview:string="";
  constructor(private route:ActivatedRoute, private recipeService:RecipeService ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=> {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      if(this.id){
        this.recipeEdit = this.recipeService.getRecipe(this.id);
      }
      this.initForm(this.recipeEdit.name, this.recipeEdit.description, this.recipeEdit.imagePath, this.recipeEdit.ingredients);
    })
  }

  initForm(name:string|null = null, description:string|null=null, image:string|null=null, ingredients:[]|Ingredient[]){
    const ings = new FormArray([]);
    if(ingredients){
      for(let i of ingredients){
        ings.push(new FormGroup({
          "name": new FormControl(i.name, [
            Validators.required
          ]),
          "amount": new FormControl(i.amount, [
            Validators.required,
            Validators.pattern(/\d+/),
            Validators.min(1),
          ]),
        }))
      }
    }
    this.formRecipe = new FormGroup({
      "name":new FormControl(name, [Validators.required]),
      "description": new FormControl(description, [Validators.required]),
      "image": new FormControl(image, [Validators.required]),
      "ingredients": ings,
    })
  }

  onSubmit(){
    
    if(this.formRecipe.valid){
      this.setRecipeAfterSubmit();
      if(!this.editMode){
        this.recipeService.addRecipe(this.recipeEdit);
      }else{
        this.recipeService.updateRecipe(this.recipeEdit);
      }
    }
  }

  setRecipeAfterSubmit(){
    if(!this.recipeEdit.id){
      this.recipeEdit.id= Math.floor(Math.random() *1000000000);
    }
    this.recipeEdit.name = this.name?.value;
    this.recipeEdit.description = this.description?.value;
    this.recipeEdit.imagePath = this.image?.value;
    // let ingredientsArray:Ingredient[] = [];
    // for(let ing of this.ingredientsRecipe){
    //     ingredientsArray.push(new Ingredient(ing.get("name")?.value, ing.get("amount")?.value))
    // }

    this.recipeEdit.ingredients = this.formRecipe.value["ingredients"];
  }

  get name(){
    return this.formRecipe.get("name");
  }
  get description(){
    return this.formRecipe.get("description");
  }
  get image(){
    return this.formRecipe.get("image");
  }

  get ingredientsRecipe(){
    return (<FormArray>this.formRecipe.get("ingredients")).controls;
  }

  onAddIngredientToRecipe(){
    (<FormArray>this.formRecipe.get("ingredients")).push(
      new FormGroup({
        "name": new FormControl(null, [
          Validators.required
        ]),
        "amount": new FormControl(null, [
          Validators.required,
          Validators.pattern(/\d+/),
          Validators.min(1),
        ])
      })
    )
    
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.formRecipe.get("ingredients")).removeAt(index);
  }

  clear(){
    this.formRecipe.reset();
  }

}
