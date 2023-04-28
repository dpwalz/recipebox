import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

//TODOS: 
//TODO: SHOPPINGLISTCOMPONENT: selectedList exists after the shopping list is updated, and will point to the old reference. Need to change selected list when shoppinglists is updated. 
// potentially use index instead of the actualy list. 
// TODO: GENERAL: Use NGRX instead of inputs/outputs for state management. 
// TODO: GENERAL/RECIPELIST: Can you change the message prompt after adding a recipe to a list? seems like it happens 2x.
// TODO: RECIPESEARCH: Angular15 image load from tutorial
// TODO: RECIPESEARCH: Pagination to add more search terms
// TODO: TABLES - Make them the size of the screen so you can see the buttons. (adjust items, shopping lists are good now)
// TODO: ADD name to shopping list
// TODO: DO something with the recipe description!

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }

  
}
