import { Component, Input } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { Recipe } from "../../models/recipe.interface";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipeList.component.html'
})
export class RecipeListComponent {
    
    @Input() recipes: Recipe[] = [];
    selectedRecipe!: Recipe;

    constructor(
        private confirmationService: ConfirmationService
    ){}

    onRowSelect(event: any): void {
        this.confirmationService.confirm({
            message: `Add recipe: ${event.data.recipe_name} to shopping list?`,
            accept: () => {
                console.log("Add")
            }
        });
    }
}