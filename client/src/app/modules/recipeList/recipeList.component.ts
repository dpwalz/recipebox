import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { ShoppingLists } from "src/app/models/shoppingList.interface";
import { RecipeService } from "src/app/services/recipe.service";
import { Recipe } from "../../models/recipe.interface";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipeList.component.html'
})
export class RecipeListComponent implements OnChanges {
    @Input() selectedList: ShoppingLists | undefined;
    @Input() recipes: Recipe[] = [];
    @Output() updateShoppingList = new EventEmitter<String>();
    @Output() updateRecipes = new EventEmitter<Event>();
    selectedRecipe: Recipe | undefined;
    sidebarVisible: boolean = false;

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private datepipe: DatePipe,
        private recipeService: RecipeService
    ){}

    ngOnChanges(changes: SimpleChanges): void {
        for (let changeName in changes){
            if(changeName === "recipes"){
                this.recipes = changes[changeName].currentValue;
            } else if (changeName === "selectedList"){
                this.selectedList = changes[changeName].currentValue;
            }
        }
    }

    onRowSelect(event: any): void {
        if(this.selectedList === undefined) {
            this.messageService.add({severity:"error",
                            summary: "Please select a Shopping List"
            });
            this.selectedRecipe = undefined;
        } else {
            this.confirmationService.confirm({
                message: `Add recipe: ${event.data.recipe_name} to shopping list: ${this.datepipe.transform(this.selectedList?.creation_date, 'short')}?`,
                accept: () => {
                    this.addRecipe();

                },
                reject: () => {
                    this.selectedRecipe = undefined;
                }
            });
        }
    }

    addRecipe(): void {
        this.recipeService.addRecipeToList(this.selectedList!, this.selectedRecipe!)
                        .subscribe({
                            next: (response) => {
                                this.messageService.add({severity:"success",
                                                            summary: response.data
                                                        })
                            },
                            error: (e) => console.log(e),
                            complete: () =>  this.updateShoppingList.emit('')
                        })
    }

    refreshRecipes(): void {
        this.updateRecipes.emit();
    }
}