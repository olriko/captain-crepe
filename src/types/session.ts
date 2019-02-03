import { Menu } from '@/types/menu'

export interface Session {
    id: string,
    menus?: {[s: string]: Menu},
    owner: string,
    created_at: Date,
    locked: boolean,
    delivery_at: Date,
}

export interface Sessions {
    [s: string]: Session
}
