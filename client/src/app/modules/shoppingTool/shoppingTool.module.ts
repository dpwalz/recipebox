import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TableModule } from "primeng/table";
import { ShoppingToolComponent } from "./shoppingTool.component";




@NgModule({
    imports:[
        CommonModule,
        TableModule
    ],
    exports:[
        ShoppingToolComponent
    ],
    declarations:[
        ShoppingToolComponent
    ],
})
export class ShoppingToolModule {

}