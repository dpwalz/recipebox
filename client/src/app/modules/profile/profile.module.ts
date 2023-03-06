import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { PanelModule } from 'primeng/panel';
import { ProfileRoutingModule } from "./profile-routing.module";
import { SharedModule } from "../shared/shared.module";
import {TableModule} from 'primeng/table';
import { CardModule } from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { CommonModule } from "@angular/common";


@NgModule({
    imports: [
        ProfileRoutingModule,
        PanelModule,
        SharedModule,
        TableModule,
        CardModule,
        ConfirmDialogModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        ProfileComponent,
    ],
})
export class ProfileModule {}