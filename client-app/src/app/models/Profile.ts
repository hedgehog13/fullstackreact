import { User } from "./User";

export interface IProfile {
    username: string
    displayName: string
    image?: string
    bio?: string
}

export class Profile implements IProfile {
    username: string
    displayName: string
    image?: string
    bio?: string

    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;

    }
}