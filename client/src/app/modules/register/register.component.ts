import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { RegisterService } from "../../services/register.service";
import { RegisterUser } from "src/app/models/register.interface";
import { Router } from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

    formGroup: FormGroup | undefined;
    formSubscription: Subscription | undefined;
    user: RegisterUser | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private registerService: RegisterService,
        private router: Router
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
        console.log(request);
        this.registerService.registerUser(request)
            .subscribe((test) => {
                console.log("User is Registered!");
                this.router.navigate(['/login']);
            });      
    }

}