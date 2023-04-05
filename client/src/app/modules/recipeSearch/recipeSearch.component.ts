import { Component, Input } from "@angular/core";
import { RecipeResults } from "src/app/models/recipe.interface";
import { RecipeService } from "src/app/services/recipe.service";


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

}