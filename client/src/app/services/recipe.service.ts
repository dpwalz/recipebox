import { Injectable } from "@angular/core";
import { environment } from "src/assets/environments/environment";
import { RecipeResponse, SearchResults } from "../models/recipe.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DefaultResponse } from "../models/default.interface";
import { ShoppingLists } from "../models/shoppingList.interface";
import { Recipe } from "../models/recipe.interface";

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

    addRecipeToList(list: ShoppingLists, recipe: Recipe): Observable<DefaultResponse> {
        return this.http.post<DefaultResponse>(`${this.apiUrl}/lists/${list.list_id}/recipe/${recipe.recipe_id}`, {});
    }

    searchRecipes(searchTerm: string): Observable<SearchResults> {
        return this.http.get<SearchResults>(`${this.apiUrl}/recipes/complexSearch/${searchTerm}`);
    }

}