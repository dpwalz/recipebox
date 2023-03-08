import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ShoppingLists } from "src/app/models/shoppingList.interface";


@Component({
    selector: 'app-shopping-list',
    templateUrl: './shoppingList.component.html'
})

export class ShoppingListComponent implements OnChanges {

    @Input() shopping_lists: ShoppingLists[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        this.shopping_lists = changes['shopping_lists'].currentValue;
    }

}