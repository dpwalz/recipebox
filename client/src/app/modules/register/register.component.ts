import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { RegisterService } from "../../services/register.service";
import { RegisterUser } from "src/app/models/register.interface";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{

    formGroup!: FormGroup;
    user!: RegisterUser;

    constructor(
        private formBuilder: FormBuilder,
        private registerService: RegisterService,
        private router: Router,
        private messageService: MessageService
    ) {

    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            "first_name": ["", [Validators.required, Validators.minLength(2)]],
            "last_name": ["", [Validators.required, Validators.minLength(2)]],
            "email_address": ["", [Validators.required, Validators.email]],
            "password": ["", [Validators.required, Validators.minLength(6)]], 
        })     
    }

    onSubmit(request: RegisterUser): void {
        this.registerService.registerUser(request) 
            .subscribe({next: () => console.log("User Registered successfully")
                        ,
                        error: (e) => {
                            this.messageService.add({severity:"error",
                            summary: "Registration Failed",
                            detail: e.error
                        });
                        },
                        complete: () => this.router.navigate(['/login'])});
    }

}