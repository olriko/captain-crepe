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
    })
    return sessionRef.key || undefined
}
