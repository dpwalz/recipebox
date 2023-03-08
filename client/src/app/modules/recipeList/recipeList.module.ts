import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { RecipeListComponent } from "./recipeList.component";
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
    imports: [
        CardModule,
        CommonModule,
        ConfirmDialogModule,
        TableModule
    ],
    exports: [RecipeListComponent],
    declarations: [RecipeListComponent]
})
export class RecipeListModule {

}