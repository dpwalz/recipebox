import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User, Login } from "src/app/models/login.interface";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    formGroup: FormGroup | undefined;
    user: Login | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService
    ) {

    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            "email_address": ["", [Validators.required, Validators.email]],
            "password": ["", [Validators.required, Validators.minLength(6)]]
        });
    }
    
    onSubmit(request: Login): void {
        console.log(request);
        this.loginService.login(request)
            .subscribe((test) => {
                console.log(test);
                console.log("User Logged In!");
            })
    }
    
}