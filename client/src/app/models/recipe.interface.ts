export interface RecipeResponse {
    status: string;
    data: Recipe[];
}

export interface Recipe {
    recipe_id?: string;
    recipe_name?: string;
    recipe_description?: string;
}

