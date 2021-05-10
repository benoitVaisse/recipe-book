import { Component,  OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  ingredientForm:FormGroup = new FormGroup({});
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      "name": new FormControl(null,[
        Validators.required,
        Validators.minLength(2)
      ]),
      "amount": new FormControl(null, [
        Validators.required,
        Validators.pattern(/\d+/)
      ])
    })
  }

  onAddItem(){
      if(this.ingredientForm.valid){
        this.shoppingListService.addIngredient(new Ingredient( this.name?.value, this.amount?.value));
      }
  }

  get name(){
    return this.ingredientForm.get("name");
  }
  get amount(){
    return this.ingredientForm.get("amount");
  }
}
