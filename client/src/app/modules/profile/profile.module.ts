import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { PanelModule } from 'primeng/panel';
import { ProfileRoutingModule } from "./profile-routing.module";


@NgModule({
    imports: [
        ProfileRoutingModule,
        PanelModule,

    ],
    exports: [],
    declarations: [
        ProfileComponent,
        
    ]
})
export class ProfileModule {}