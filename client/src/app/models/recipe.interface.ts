export interface RecipeResponse {
    status: string;
    data: Recipe[];
}

export interface DetailsResponse {
    status: string;
    data: RecipeDetails;
}

export interface Recipe {
    recipe_id?: string;
    recipe_name?: string;
    recipe_description?: string;
}


export interface SearchResults {
    status: string;
    data: RecipeResults[]
}

export interface RecipeResults {
    id: number;
    title: string;
    image: string;
    imageType: string;
    details?: RecipeDetails
}

export interface RecipeDetails {
    summary: string;
    readyInMinutes: number;
    servings: number;
    extendedIngredients: string[];
}
