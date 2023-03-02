import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";
import {MenubarModule} from 'primeng/menubar';

const components = [
    MenuComponent
]


@NgModule({
    imports: [
        MenubarModule
    ],
    exports: [...components],
    declarations: [
        ...components
    ],

})


export class SharedModule {}