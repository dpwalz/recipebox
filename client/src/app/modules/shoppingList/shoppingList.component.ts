import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { ConfirmationService } from "primeng/api";
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
    display: boolean = false;
    selectedItem!: ShoppingList;

    constructor(
        private listService: ShoppingListService,
        private confirmationService: ConfirmationService
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

    itemClick(list_item: ShoppingList) {
        this.selectedItem = list_item;
        this.showDisplay(true);
    }

    showDisplay(flag: boolean) {
        this.display = flag;
    }

    removeItem(){
        this.listService.deleteItemFromList(this.selectedItem)
            .subscribe({
                next: () =>  this.updateShoppingList.emit(''),                    
                error: (e) => console.log(e),
                complete: () => this.showDisplay(false)
        });
    }

    editItem(){
        console.log(this.selectedItem.ingredient_id);
    }

}