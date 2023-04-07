import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListComponent } from "./shoppingList.component";
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { ToastModule } from "primeng/toast";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ItemListModule } from "../itemsList/itemList.module";
import { UpdateItemModule } from "../updateItem/updateItem.module";
import { ShoppingToolModule } from "../shoppingTool/shoppingTool.module";
import { SidebarModule } from "primeng/sidebar";


@NgModule({
    exports: [
        ShoppingListComponent
    ],
    declarations: [
        ShoppingListComponent
    ],
    imports: [
        ButtonModule,
        CardModule,
        CommonModule,
        ConfirmDialogModule,
        DialogModule,
        DropdownModule,
        FormsModule,
        ItemListModule,
        OverlayPanelModule,
        RippleModule,
        SharedModule,
        ShoppingToolModule,
        SidebarModule,
        TableModule,
        ToastModule,
        UpdateItemModule,
    ]
})
export class ShoppingListModule {}
