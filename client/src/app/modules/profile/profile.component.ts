import { Component, OnInit } from "@angular/core";
import { Recipe } from "src/app/models/recipe.interface";
import {ConfirmationService} from 'primeng/api';
import { RecipeService } from "src/app/services/recipe.service";
import { ShoppingListService } from "src/app/services/shoppingList.service";
import { ShoppingList, ShoppingLists } from "src/app/models/shoppingList.interface";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
    
    recipes: Recipe[] = [];
    selectedRecipe!: Recipe;
    shopping_lists: ShoppingLists[] = [];

    constructor( 
        private confirmationService: ConfirmationService,
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

    

    onRowSelect(event: any): void {
        this.confirmationService.confirm({
            message: `Add recipe: ${event.data.recipe_name} to shopping list?`,
            accept: () => {
                console.log("Add")
            }
        });
    }
    
}