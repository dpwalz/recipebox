import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register.component";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { RegisterRoutingModule } from "./register-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ToastModule } from "primeng/toast";
import { PasswordModule } from "primeng/password";


@NgModule({
    imports: [
        ButtonModule,
        CommonModule,
        InputTextModule,
        PasswordModule,
        ReactiveFormsModule,
        RegisterRoutingModule,
        RippleModule,
        RouterModule,
        ToastModule,
    ],
    exports: [],
    declarations: [
        RegisterComponent
    ]
})

export class RegisterModule {};