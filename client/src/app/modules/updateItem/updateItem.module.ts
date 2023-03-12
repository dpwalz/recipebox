import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { UpdateItemComponent } from "./updateItem.component";



@NgModule({
    imports: [
        ButtonModule,
        CommonModule,
        DropdownModule,
        FormsModule,
        InputNumberModule,
        RippleModule,
        TableModule
    ],
    exports: [
        UpdateItemComponent
    ],
    declarations: [
        UpdateItemComponent
    ]
})
export class UpdateItemModule {

}