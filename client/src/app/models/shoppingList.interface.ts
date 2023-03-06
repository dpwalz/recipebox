export interface ListResponse {
    status: string;
    data: ShoppingLists[];
}

export interface ShoppingLists {
    list_id: string;
    creation_date: Date;
    items: ShoppingList[];
}


export interface ShoppingList {
    ingredient_id: string;
    list_id?: string;
    ingredient_name: string;
    quantity: number;
    unit: string;
}