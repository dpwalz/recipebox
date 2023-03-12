import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { ShoppingList } from "src/app/models/shoppingList.interface";
import { ItemsService } from "src/app/services/items.service";
import { ShoppingListService } from "src/app/services/shoppingList.service";


@Component({
    selector:'app-item-list',
    templateUrl: './itemList.component.html'
})
export class ItemListComponent implements OnInit{
    
    itemInput!: string;
    display: boolean = false;
    items_list: ShoppingList[] = [];
    // Have option for dry, bulk, or wet products. 
    units: String[] = ['pinch', 'tsp', 'tbsp', 'cup', 'bulk', 'oz']
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
        this.updateItems();
    }

    updateItems(): void {
        this.itemService.getItems().subscribe({
            next: (response) => {
                let dummy_items_list: ShoppingList[] = [];
                response.data.forEach( (item) => {
                    dummy_items_list.push(item);
                });
                this.items_list = dummy_items_list;
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
                },
                error: (e) => console.log(e)
            })
    }

    toggle(): void {
        this.display = true;
    }

    resetInput(): void {
        this.itemInput = "";
    }

    addNewItem(input: string): void {
        this.itemService.addItem(input)
            .subscribe({
                next: () => {
                    this.updateItems();
                },
                error: (e) => console.log(e),
                complete: () => this.display = false
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
