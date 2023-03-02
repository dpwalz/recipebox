import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
    

    items!: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label:'Quit',
                icon:'pi pi-fw pi-power-off'
            }
        ];
    }
}