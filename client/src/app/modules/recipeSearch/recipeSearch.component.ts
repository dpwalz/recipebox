import { Component } from "@angular/core";
import { RecipeResults } from "src/app/models/recipe.interface";
import { RecipeService } from "src/app/services/recipe.service";

// TODO: Angular15 image load from tutorial
// TODO: Pagination to add more search terms
// TODO: Add details 
// TODO: Save Recipe 

@Component({
    selector: 'app-recipe-search',
    templateUrl: './recipeSearch.component.html'
})
export class RecipeSearchComponent {

    searchTerm!: string;
    searchResults: RecipeResults[] = [];

    constructor(
        private recipeService: RecipeService
    ){}

    searchRecipes(){
        this.searchResults = [];
        this.recipeService.searchRecipes(this.searchTerm)
            .subscribe({next: (response) => this.searchResults = response.data,
                        error: (e) => console.log(e),
                        complete: () => this.searchTerm = ''})
    }

    getDetails(recipeIndex: number){
        if(!this.searchResults[recipeIndex].details){
            this.recipeService.getRecipeDetails(this.searchResults[recipeIndex])
                .subscribe({next: (response) => this.searchResults[recipeIndex].details = response.data,
                            error: (e) => console.log(e),
                            complete: () => {}});
        }
    }

}