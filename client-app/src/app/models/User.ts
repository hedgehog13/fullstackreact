export interface User {
    username: string
    displayName: string
    token: string
    image?: string
}

export interface UserFormValues {
    email: string
    displayName?: string
    password: string
    username?: string
}