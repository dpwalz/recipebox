export interface LoginResponse {
    status: string;
    data: User;
}

export interface Login {
    email_address: string;
    password: string;
}

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email_address: string;
    jsontoken: string;
}