export type TMessageCard = {
    id: number;
    save_confirmation: boolean;
    name: string;
    text: string;
    type: string,
    first_message: boolean;
    wait_input: any;
    need_confirmation: boolean;
    next_message_id: number | null;
    image: string | null;
    buttons: TMessageButton[];
}

export type TMessageButton = {
    id: number;
    text: string;
    callback_data: string | null;
}