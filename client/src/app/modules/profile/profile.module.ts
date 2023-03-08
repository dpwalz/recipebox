import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { PanelModule } from 'primeng/panel';
import { ProfileRoutingModule } from "./profile-routing.module";
import { SharedModule } from "../shared/shared.module";
import { CardModule } from 'primeng/card';
import { ShoppingListModule } from "../shoppingList/shoppingList.module";
import { RecipeListModule } from "../recipeList/recipeList.module";


@NgModule({
    imports: [
        CardModule,
        PanelModule,
        ProfileRoutingModule,
        RecipeListModule,
        SharedModule,
        ShoppingListModule,
    ],
    exports: [],
    declarations: [
        ProfileComponent,
    ],
})
export class ProfileModule {}