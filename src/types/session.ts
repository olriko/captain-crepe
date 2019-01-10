import { Menu } from '@/types/menu'

export interface Session {
    id?: string,
    menus: {[s: string]: Menu},
    owner: string,
    created_at: string,
}

export interface Sessions {
    [s: string]: Session
}
