import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        RouterModule,
        ButtonModule,
        RippleModule
    ],
    exports: [],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule {
    
}