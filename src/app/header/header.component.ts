import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderComponent implements OnInit{

    @Output() pageEvent = new EventEmitter<string>();

    ngOnInit(){

    }
    constructor(){
    }
    getPage(page:string){
        this.pageEvent.emit(page);
    }
}