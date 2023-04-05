import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { RecipeListComponent } from "./recipeList.component";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ToastModule } from "primeng/toast";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { SidebarModule } from "primeng/sidebar";
import { RecipeSearchModule } from "../recipeSearch/recipeSearch.module";

@NgModule({
    imports: [
        ButtonModule,
        CardModule,
        CommonModule,
        ConfirmDialogModule,
        RippleModule,
        RecipeSearchModule,
        SidebarModule,
        TableModule,
        ToastModule
    ],
    exports: [RecipeListComponent],
    declarations: [RecipeListComponent]
})
export class RecipeListModule {

}