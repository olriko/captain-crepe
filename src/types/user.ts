import { UserInfo } from 'firebase'

export interface User extends UserInfo {
    online_at: string,
}

export interface Users {
    [s: string]: User
}
