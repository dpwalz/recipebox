import { Injectable } from "@angular/core";
import { environment } from "src/assets/environments/environment";
import { User, LoginResponse, Login } from "../models/login.interface";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    login(credentials: Login): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, credentials)
        .pipe(
            tap((response) => this.saveToken(response.data))
        );
    }

    private saveToken(user: User): void {
        localStorage.setItem('id_token', user.jsontoken);
    }

    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate([''])
    }

}