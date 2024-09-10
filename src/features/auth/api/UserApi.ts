import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { api, apiRoutes } from "@/shared/api/api";
import { TAuthDataDTO, TAuthLoginData } from "../types";
//import { TMessageResponseDto, TMessagesResponseDto } from "types/typesApi";

export class UserService {

    async authLogin(data: TAuthLoginData): Promise<TAuthDataDTO> {
        try {
            const response: AxiosResponse<TAuthDataDTO> = await api.post(apiRoutes.auth.login, data)
            return response.data
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    console.error(`Error: ${axiosError.response.data}`);
                    throw new Error(`API Error: ${(axiosError.response.data as any).message || 'Unknown error'}`);
                } else if (axiosError.request) {
                    console.error('No response received from API.');
                    throw new Error('No response from API.');
                }
            } else {
                console.error(`Request setup error: ${(error as Error).message}`);
                throw new Error(`Request setup error: ${(error as Error).message}`);
            }
            throw new Error('Unknown error occurred.');
        }
    }

    // authLogin(data: TAuthLoginData): Promise<TAuthDataDTO> {
    //     return api.post(apiRoutes.auth.login, data).then(data => data.)
    // }

}

export const userApi = new UserService();