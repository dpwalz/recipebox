import { NgModule } from "@angular/core";
import { ItemListComponent } from "./itemList.component";
import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import {InputNumberModule} from 'primeng/inputnumber';
import { InputTextModule } from "primeng/inputtext";
import { DialogModule } from "primeng/dialog";


@NgModule({
    imports: [
        ButtonModule,
        CommonModule,
        DialogModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        InputNumberModule,
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