import { Injectable } from "@angular/core";
import { environment } from "src/assets/environments/environment";
import { RecipeResponse } from "../models/recipe.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private readonly apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {}

    getUserRecipes(): Observable<RecipeResponse> {
        return this.http.get<RecipeResponse>(`${this.apiUrl}/users/${localStorage.getItem('rb_user_id')}/recipes`)
    }

}