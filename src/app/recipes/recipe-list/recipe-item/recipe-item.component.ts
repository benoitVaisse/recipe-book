import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingConstante } from 'src/app/constante/Route.constante';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input()recipe:Recipe = new Recipe(0, "", "", "",[]);
  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSelected(id:number){
    this.router.navigate([RoutingConstante.route_recipe_one.replace(":id", id.toString())])
  }

  isActive(id:number){
    return (this.router.url).indexOf("/"+RoutingConstante.route_recipe_one.replace(":id", id.toString()))> -1 ? "active":"";
  }
}
