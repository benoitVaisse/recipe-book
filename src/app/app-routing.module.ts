import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { RoutingConstante } from "./constante/Route.constante";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRouter:Routes = [
    { path:RoutingConstante.route_home, component:RecipesComponent},
    { path:RoutingConstante.route_recipe, component:RecipesComponent, children:[
        {path:'', component: RecipeStartComponent},
        {path:RoutingConstante.route_recipe_new_children, component: RecipeEditComponent},
        {path:RoutingConstante.route_recipe_one_children, component: RecipeDetailComponent},
        {path:RoutingConstante.route_recipe_edit_children, component: RecipeEditComponent},
    ]},
    { path:RoutingConstante.route_shopping_list, component:ShoppingListComponent},
    { path:RoutingConstante.route_auth, component:AuthComponent}
  ]
@NgModule({
    imports: [RouterModule.forRoot(appRouter)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}