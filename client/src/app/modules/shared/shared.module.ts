import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";
import {MenubarModule} from 'primeng/menubar';
import { ButtonModule } from "primeng/button";
import { DisplayDate } from "./pipes/displaydate.pipe";


const components = [
    MenuComponent
];

const pipes = [
    DisplayDate
]



@NgModule({
    imports: [
        MenubarModule,
        ButtonModule
    ],
    exports: [
        ...components,
        ...pipes
    ],
    declarations: [
        ...components,
        ...pipes
    ],

})


export class SharedModule {}