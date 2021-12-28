import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { DataStorageServie } from "../shared/data-storage.service";



@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dsService:DataStorageServie){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        
    }

}