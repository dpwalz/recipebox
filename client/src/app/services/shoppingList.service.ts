import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { environment } from "src/assets/environments/environment";
import { DefaultResponse } from "../models/default.interface";
import { ListCreationResponse, ListResponse, ShoppingList, ShoppingLists } from "../models/shoppingList.interface";



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

    deleteItemFromList(item: ShoppingList): Observable<DefaultResponse> {
        return this.http.delete<DefaultResponse>(`${this.apiUrl}/lists/${item.list_id}/ingredient/${item.ingredient_id}`);
    }

    deleteShoppingList(list: ShoppingLists): Observable<DefaultResponse> {
        return this.http.delete<DefaultResponse>(`${this.apiUrl}/lists/${list.list_id}`);
    }

}