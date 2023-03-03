import { Component } from "@angular/core";
import { Recipe } from "src/app/models/recipe.interface";
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent {
    recipes: Recipe[] = [
        { name: "Test1" },
        { name: "Test2" }
    ]

    selectedRecipe!: Recipe;

    constructor( 
        private confirmationService: ConfirmationService
    ){}

    

    onRowSelect(event: any): void {
        this.confirmationService.confirm({
            message: `Add recipe: ${event.data.name} to shopping list?`,
            accept: () => {
                console.log("Add")
            }
        });
    }
    
}