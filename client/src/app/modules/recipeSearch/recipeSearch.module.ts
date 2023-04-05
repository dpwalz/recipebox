import { NgModule } from "@angular/core";
import { RecipeSearchComponent } from "./recipeSearch.component";
import { CommonModule } from "@angular/common";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { DataViewModule } from 'primeng/dataview';



@NgModule({
    imports: [
        ButtonModule, 
        CommonModule,
        DataViewModule,
        FormsModule,
        InputTextModule,
        RippleModule
    ],
    exports: [ RecipeSearchComponent ],
    declarations: [ RecipeSearchComponent ]
})

export class RecipeSearchModule {

}