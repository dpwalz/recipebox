import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";


@NgModule({
    imports: [
        LoginRoutingModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        ReactiveFormsModule,
        RouterModule, 
        CommonModule,
        ToastModule
    ],
    exports: [],
    declarations: [
        LoginComponent,
        
    ],

})

export class LoginModule {}