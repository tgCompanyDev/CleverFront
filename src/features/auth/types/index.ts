export type TAuthLoginData = {
    email: string;
    password: string;
}

export type TAuthDataDTO = {
    errors: object;
    data: {
        token: string;
    }
}