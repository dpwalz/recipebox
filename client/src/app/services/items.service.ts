import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/assets/environments/environment";
import { ItemResponse } from "../models/shoppingList.interface";



@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    private readonly apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ){}

    getItems(): Observable<ItemResponse>{
        return this.http.get<ItemResponse>(`${this.apiUrl}/items/`);
    }


}