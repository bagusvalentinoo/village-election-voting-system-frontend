export declare namespace Responser {
    type MessageResponse<T> = {
        message: string;
        data: T;
        error: unknown;
    }
}
