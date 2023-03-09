import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { RecipeListComponent } from "./recipeList.component";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ToastModule } from "primeng/toast";

@NgModule({
    imports: [
        CardModule,
        CommonModule,
        ConfirmDialogModule,
        TableModule,
        ToastModule
    ],
    exports: [RecipeListComponent],
    declarations: [RecipeListComponent]
})
export class RecipeListModule {

}