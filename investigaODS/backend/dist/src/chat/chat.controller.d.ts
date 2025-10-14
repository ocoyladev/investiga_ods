export declare class ChatController {
    sendMessage(body: {
        message: string;
    }): Promise<{
        status: string;
        echo: string;
    }>;
}
