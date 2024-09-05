import { AxiosResponse } from "axios";
import { api, apiRoutes } from "@/shared/api/api";
import { TMessageCard } from "../types/messagesTypes";
//import { TMessageResponseDto, TMessagesResponseDto } from "types/typesApi";

export class MessagesService {

    fetchAllMessages(): Promise<AxiosResponse<{ data: TMessageCard[] }>> {
        return api.get(apiRoutes.messages.baseRoute)
    }

    fetchMessage(id: number): Promise<AxiosResponse<{ data: TMessageCard[] }>> {
        const requestPath = `${apiRoutes.messages.baseRoute}/${id}`
        return api.get(requestPath);
    }

    createMessage(message: TMessageCard): Promise<AxiosResponse<{ data: TMessageCard }>> {
        const requestPath = `${apiRoutes.messages.baseRoute}`
        return api.post(requestPath, message);
    }

    updateMessage(message: TMessageCard): Promise<AxiosResponse<{ data: TMessageCard }>> {
        const requestPath = `${apiRoutes.messages.baseRoute}/${message.id}`
        return api.put(requestPath, message);
    }

    removeMessage(id: number): Promise<AxiosResponse<{ data: object }>> {
        const requestPath = `${apiRoutes.messages.baseRoute}/${id}`
        return api.delete(requestPath);
    }
}

export const messagesApi = new MessagesService();