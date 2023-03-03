import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User, Login } from "src/app/models/login.interface";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    formGroup!: FormGroup;
    user!: Login;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
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
        this.authService.login(request)
            .subscribe({next: () => console.log("log in succeed"),
                        error: (e) => {
                            this.messageService.add({severity:"error",
                            summary: "Login Failed",
                            detail: e.error
                        });
                        },
                        complete: () => this.router.navigate(['/profile'])});
    }
    
}