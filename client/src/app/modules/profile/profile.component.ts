import { Component, OnInit } from "@angular/core";
import { Recipe } from "src/app/models/recipe.interface";
import { RecipeService } from "src/app/services/recipe.service";
import { ShoppingListService } from "src/app/services/shoppingList.service";
import { ShoppingList, ShoppingLists } from "src/app/models/shoppingList.interface";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
    
    recipes: Recipe[] = [];
    shopping_lists: ShoppingLists[] = [];
    selectedList!: ShoppingLists;

    constructor( 
        private recipeService: RecipeService,
        private listService: ShoppingListService,
    ){}

    ngOnInit(): void {
        this.recipeService.getUserRecipes()
            .subscribe({next: (items) => {
                            items.data.forEach(element => {
                                this.recipes.push(element);
                            });
                        },
                        error: (e) => {
                            console.log(e);
                        },
            });
        
        this.listService.getUserShoppingList()
            .subscribe({next: (items) => {
                            items.data.forEach(element => {
                                this.shopping_lists.push(element);
                            })
                        },
                        error: (e) => {
                            console.log(e);
                        },
        });    
    }

    updateShoppingList(test: String): void{
        this.listService.getUserShoppingList()
            .subscribe({next: (items) => {
                            let new_lists: ShoppingLists[] = [];
                            items.data.forEach(element => {
                                new_lists.push(element);
                            })
                            this.shopping_lists = new_lists;
                        },
                        error: (e) => {
                            console.log(e);
                        }       
            });
    }

    updateSelectedList(event: ShoppingLists): void {
        this.selectedList = event;
    }

    
    
}