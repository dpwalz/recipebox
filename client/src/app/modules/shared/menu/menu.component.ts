import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
    

    items!: MenuItem[];

    constructor(
        private authService: AuthService
    ){}

    ngOnInit() {
        this.items = [
        ];
    }

    logout() {
        this.authService.logout();
    }

}