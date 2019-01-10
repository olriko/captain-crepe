import { database } from '@/firebase'
import { Menu } from '@/types/menu'
import { currentUser } from '@/observables/user'

export const synchronyseMenu = async (sessionId: string, menu: Menu): Promise<string | undefined> => {
    const user = currentUser.getValue()
    if (user) {
        const menuRef = database.ref(`sessions/${sessionId}/menus/${user.uid}`)
        await menuRef.set(menu)
        return menuRef.key || undefined
    }
    return undefined
}
