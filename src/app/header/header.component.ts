import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { RoutingConstante } from "../constante/Route.constante";
import { DataStorageServie } from "../shared/data-storage.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderComponent implements OnInit{

    constructor(private router:Router,private dsService:DataStorageServie){}

    ngOnInit(){}

    getPageHome(){
        this.router.navigate([RoutingConstante.route_home])
    }

    onSaveData(){
        this.dsService.storeDataRecipe();
    }

    onFetchData(){
        this.dsService.fetDataRecipe();
    }
    
}