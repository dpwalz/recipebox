import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";
import {MenubarModule} from 'primeng/menubar';
import { ButtonModule } from "primeng/button";


const components = [
    MenuComponent
]


@NgModule({
    imports: [
        MenubarModule,
        ButtonModule
    ],
    exports: [...components],
    declarations: [
        ...components
    ],

})


export class SharedModule {}