import { IUser } from "@/models/IUser";

export interface ISignInForm {
    email: string;
    password: string;
}

export interface IAuthResponse {
    user: IUser;
    access_token: string;
}
