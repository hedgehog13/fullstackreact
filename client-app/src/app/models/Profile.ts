import { User } from "./User";



export interface IProfile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    photos?: Photo[];
    followersCount: number;
    followingCount: number;
    following: boolean;

}

export class Profile implements IProfile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    photos?: Photo[];
    followersCount = 0;
    followingCount = 0;
    following = false;

    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;

    }
}

export interface Photo {
    id: string
    url: string,
    isMain: boolean
}