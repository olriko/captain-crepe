import { database } from '@/firebase'
import { Menu } from '@/types/menu'
import { currentUser$ } from '@/observables/user'

export const synchronyseMenu = (sessionId: string, menu: Menu): string | undefined => {
    const user = currentUser$.getValue()
    if (user) {
        const menuRef = database.ref(`sessions/${sessionId}/menus/${user.id}`)
        menuRef.set(menu)
        return menuRef.key || undefined
    }
    return undefined
}
