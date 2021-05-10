import { Component,  OnDestroy,  OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  ingredientForm:FormGroup = new FormGroup({});
  editMode:boolean = false;
  indexIngredient:number = 0;
  editSubcription:Subscription = new Subscription();
  ingredientEditing:Ingredient = new Ingredient("",0);
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {

    this.SetForm();
    this.editSubcription = this.shoppingListService.ingredientIndexEdit.subscribe((index:number)=>{
      this.editMode = true;
      this.indexIngredient = index;
      this.ingredientEditing = this.shoppingListService.getIngredient(this.indexIngredient);
      if(this.ingredientEditing.name){
        this.SetForm(this.ingredientEditing.name, this.ingredientEditing.amount);
      }
    })
    
  }

  onAddItem(){
      if(this.ingredientForm.valid){
        const ingredient = new Ingredient( this.name?.value, this.amount?.value);
        if(!this.editMode){
          this.shoppingListService.addIngredient(ingredient);
        }else{
          this.shoppingListService.updateIngredient(this.indexIngredient, ingredient)
        }
      }
  }

  get name(){
    return this.ingredientForm.get("name");
  }
  get amount(){
    return this.ingredientForm.get("amount");
  }

  ngOnDestroy(){
    this.editSubcription.unsubscribe();
  }

  private SetForm(name:string|null = null, amount:number|null = null){
    this.ingredientForm = new FormGroup({
      "name": new FormControl(name,[
        Validators.required,
        Validators.minLength(2)
      ]),
      "amount": new FormControl(amount, [
        Validators.required,
        Validators.pattern(/\d+/),
        Validators.min(1),
      ])
    })
  }
}
