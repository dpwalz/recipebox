import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { ShoppingList } from "src/app/models/shoppingList.interface";
import { ItemsService } from "src/app/services/items.service";
import { ShoppingListService } from "src/app/services/shoppingList.service";


@Component({
    selector:'app-item-list',
    templateUrl: './itemList.component.html'
})
export class ItemListComponent implements OnInit{

    items_list: ShoppingList[] = [];
    units: String[] = ['tbsp', 'cup', 'bulk']
    first: number = 0;
    rows: number = 10;
    private _list_id: string = '';
    @Output() updateParent = new EventEmitter<String>();
    @Input()
    get list_id(): string {
        return this._list_id;
    }

    set list_id(id: string) {
        this._list_id = id;
    }

    constructor(
        private itemService: ItemsService,
        private listService: ShoppingListService
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

    onRowEditSubmit(item: ShoppingList) {
        item.list_id = this.list_id;
        this.listService.addNewIngredient(item)
            .subscribe({
                next: () => {
                    this.updateParent.next('');
                }
            })


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
