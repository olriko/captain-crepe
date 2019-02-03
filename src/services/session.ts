import { database } from '@/firebase'
import { currentUser } from '@/observables/user'
import { now } from 'moment'

export const createSession = () => {
    const owner = currentUser.getValue()
    if (!owner) {
        return undefined
    }
    const sessionRef = database.ref('sessions').push({
        owner: owner.uid,
        created_at: now(),
        locked: false,
        delivery_at: '12:15',
    })
    return sessionRef.key || undefined
}

export const lockToggle = async (sessionId: string): Promise<boolean> => {
    const ref = database.ref(`sessions/${sessionId}/locked`)
    const current = await ref.once('value')

    if (current) {
        await ref.set(!(current.val() || false))
    }
    return !(current.val() || false)
}

export const setTime = async (time: Date, sessionId: string) => {
    const ref = database.ref(`sessions/${sessionId}/delivery_at`)
    ref.set(`${time.getHours()}:${time.getMinutes()}`)
}
