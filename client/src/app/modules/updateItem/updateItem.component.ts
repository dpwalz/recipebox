import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ShoppingList } from "src/app/models/shoppingList.interface";
import { ShoppingListService } from "src/app/services/shoppingList.service";

@Component({
    selector: 'app-update-item',
    templateUrl: './updateItem.component.html'
})
export class UpdateItemComponent {
    private _item!: ShoppingList;
    units: String[] = ['pinch', 'tsp', 'tbsp', 'cup', 'bulk', 'oz']
    @Output() updateParent = new EventEmitter<String>();
    @Input()
        get item(){
            return this._item;
        }
        set item(new_item: ShoppingList){
            this._item = new_item;
        }
    
    constructor(
        private listService: ShoppingListService
    ){}
    
    onRowEditSubmit(item: ShoppingList){
        this.listService.updateIngredient(item)
            .subscribe({
                next: () => this.updateParent.next(''),
                error: (e) => console.log(e),
            })
    }
    
    
}