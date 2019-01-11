import { Menu } from '@/types/menu'

export interface Session {
    id: string,
    menus?: {[s: string]: Menu},
    owner: string,
    created_at: string,
    locked: boolean,
}

export interface Sessions {
    [s: string]: Session
}
