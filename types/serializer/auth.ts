export declare namespace AuthSerializer {
    type Role = {
        id: string;
        name: string;
    }

    type User = {
        id: string;
        name: string;
        username: string;
        roles?: Role[];
    }

    type AuthData = {
        bearer_token: string;
        expired_at: string;
        user: User;
    }
}
