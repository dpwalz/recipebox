import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";

@NgModule({
    imports: [
        LoginRoutingModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
    ],
    exports: [],
    declarations: [
        LoginComponent,
        
    ],

})

export class LoginModule {}