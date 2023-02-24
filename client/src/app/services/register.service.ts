import { Injectable } from "@angular/core";
import { environment } from "src/assets/environments/environment";
import { RegisterResponse, RegisterUser } from "../models/register.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private readonly apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {}

    registerUser(user: RegisterUser): Observable<RegisterResponse> {

        return this.http.post<RegisterResponse>(`${this.apiUrl}/users/`, user);
        
    }
}