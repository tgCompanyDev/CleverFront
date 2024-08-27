import { AxiosResponse } from "axios";
import { api, apiRoutes } from "src/shared/api/api";
import { TMessageCard } from "src/shared/types/cardMessages";
//import { TMessageResponseDto, TMessagesResponseDto } from "types/typesApi";

export class MessagesService {

    fetchAllMessages(): Promise<AxiosResponse<{data: TMessageCard[]}>> {
        return api.get(apiRoutes.messages.fetchAllMessages)
    }

    fetchMessage(id: number): Promise<AxiosResponse<{data: TMessageCard[]}>> {
        const requestPath = `${apiRoutes.messages.fetchMessage}/search?query=${id}`
        return api.get(requestPath);
    }
}

export const messagesApi = new MessagesService();