import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ShoppingList, ShoppingLists } from "src/app/models/shoppingList.interface";

@Component({
    selector: 'app-shopping-tool',
    templateUrl: './shoppingTool.component.html',
    styleUrls: ['./shoppingTool.component.scss']
})
export class ShoppingToolComponent implements OnChanges{

    @Input() selectedList!: ShoppingLists;
    currentList: ShoppingList[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        this.selectedList = changes['selectedList'].currentValue;
        this.currentList = this.selectedList?.items;
        
    }

    itemInCart(event: ShoppingList){
        event.found ? event.found = false : event.found = true;
    }


    
}