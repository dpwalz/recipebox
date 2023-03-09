import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { ShoppingList, ShoppingLists } from "src/app/models/shoppingList.interface";
import { ShoppingListService } from "src/app/services/shoppingList.service";


@Component({
    selector: 'app-shopping-list',
    templateUrl: './shoppingList.component.html'
})

export class ShoppingListComponent implements OnChanges {

    @Input() shopping_lists: ShoppingLists[] = [];
    @Output() updateShoppingList = new EventEmitter<String>();
    @Output() updateSelectedList = new EventEmitter<ShoppingLists>();
    selectedList!: ShoppingList;

    constructor(
        private listService: ShoppingListService
    ){}

    ngOnChanges(changes: SimpleChanges): void {
        this.shopping_lists = changes['shopping_lists'].currentValue;
    }

    onClick(){
        this.listService.createNewList().subscribe();
        this.updateShoppingList.emit('');
    }

    selectList(event: ShoppingLists): void {
        this.updateSelectedList.emit(event);
    }

}