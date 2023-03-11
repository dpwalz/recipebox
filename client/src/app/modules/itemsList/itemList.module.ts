import { NgModule } from "@angular/core";
import { ItemListComponent } from "./itemList.component";
import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";

@NgModule({
    imports: [
        ButtonModule,
        CommonModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        RippleModule,
        TableModule,
        ToastModule
        
    ],
    exports: [
        ItemListComponent
    ],
    declarations: [
        ItemListComponent
    ]
})

export class ItemListModule {
    
    
}