export interface RecipeResponse {
    status: string;
    data: Recipe[];
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
}

