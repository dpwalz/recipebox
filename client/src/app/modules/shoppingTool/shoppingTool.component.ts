import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ShoppingList } from "src/app/models/shoppingList.interface";
import { ShoppingListService } from "src/app/services/shoppingList.service";

@Component({
    selector: 'app-shopping-tool',
    templateUrl: './shoppingTool.component.html',
    styleUrls: ['./shoppingTool.component.scss']
})
export class ShoppingToolComponent implements OnChanges{

    @Input() selectedList!: string;
    @Input() panelFlag!: boolean;
    currentList!: ShoppingList[];

    constructor(
        private listService: ShoppingListService
    ){}

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['selectedList']){
            this.selectedList = changes['selectedList'].currentValue;
        }
        this.listService.getShoppingListDetails(this.selectedList)
            .subscribe({
                next: (response) => {
                    this.currentList = response.data;
                },
                error: (e) => console.log(e)
            })
    }

    itemInCart(event: ShoppingList){
        event.found ? event.found = false : event.found = true;
    }


    
}