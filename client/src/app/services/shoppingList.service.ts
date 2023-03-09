import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { environment } from "src/assets/environments/environment";
import { ListCreationResponse, ListResponse } from "../models/shoppingList.interface";



@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    private readonly apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ){}
    
    getUserShoppingList(): Observable<ListResponse> {
        return this.http.get<ListResponse>(`${this.apiUrl}/lists/`)
    }

    createNewList(): Observable<ListCreationResponse> {
        return this.http.post<ListCreationResponse>(`${this.apiUrl}/lists/`, {});
    }

}