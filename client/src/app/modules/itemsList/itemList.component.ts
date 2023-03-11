import { Component, OnInit } from "@angular/core";
import { ShoppingList } from "src/app/models/shoppingList.interface";
import { ItemsService } from "src/app/services/items.service";


@Component({
    selector:'app-item-list',
    templateUrl: './itemList.component.html'
})
export class ItemListComponent implements OnInit {

    items_list: ShoppingList[] = [];
    units: String[] = ['tbsp', 'cup', 'bulk']
    first: number = 0;
    rows: number = 10;

    constructor(
        private itemService: ItemsService
    ){}

    ngOnInit(): void {

        this.itemService.getItems().subscribe({
            next: (response) => {
                response.data.forEach( (item) => {
                    this.items_list.push(item);
                });
            },
            error: (e) => console.log(e)
        })
    }

    onRowEditInit(item: ShoppingList){

    }

    onRowEditSave(item: ShoppingList) {

    }

    onRowEditCancel(item: ShoppingList, index: Number) {

    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.items_list ? this.first === (this.items_list.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.items_list ? this.first === 0 : true;
    }

}
