import { AxiosResponse } from "axios";
import { api, apiRoutes } from "@/shared/api/api";
import { TAuthLoginData } from "../types";
//import { TMessageResponseDto, TMessagesResponseDto } from "types/typesApi";

export class UserService {

    authLogin(data: TAuthLoginData): Promise<AxiosResponse<any>> {
        return api.post(apiRoutes.auth.login, data);
    }

}

export const userApi = new UserService();