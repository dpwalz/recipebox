export interface RegisterResponse {
    status: string;
    data: RegisterUser;
}

export interface RegisterUser {
    id: string;
    first_name: string;
    last_name: string;
    email_address: string;
    password: string;
}