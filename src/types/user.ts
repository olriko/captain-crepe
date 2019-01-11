import { UserInfo } from 'firebase'

export interface User extends UserInfo {
    online_at: string,
    admin?: boolean,
}

export interface Users {
    [s: string]: User
}
