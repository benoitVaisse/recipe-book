import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { RoutingConstante } from "../constante/Route.constante";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderComponent implements OnInit{

    ngOnInit(){

    }
    constructor(private router:Router){
    }

    getPageRecipe(){
        this.router.navigate([RoutingConstante.route_recipe]);
    }
    getPageShoppingList(){
        this.router.navigate([RoutingConstante.route_shopping_list]);
    }

    getPageHome(){
        this.router.navigate([RoutingConstante.route_home])
    }
    
}