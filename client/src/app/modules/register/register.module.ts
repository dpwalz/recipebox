import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register.component";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { RegisterRoutingModule } from "./register-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@NgModule({
    imports: [
        ButtonModule,
        RippleModule,
        InputTextModule,
        RegisterRoutingModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    exports: [],
    declarations: [
        RegisterComponent
    ]
})

export class RegisterModule {};