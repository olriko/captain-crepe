import cookie from 'js-cookie'
import { database } from '@/firebase'
import { currentUser$ } from '@/observables/user'
import moment from 'moment'


export const register = (name: string) => {
    const userRef = database.ref('users').push({
        name,
    })

    if (userRef.key) {
        cookie.set('token', userRef.key)
    }
}

export const getUser = async (userId: string) => {
   return (await database.ref(`users/${userId}`).once('value')).val()
}

export const logout = () => {
    cookie.remove('token')
}

setInterval(() => {
    const user = currentUser$.value
    if (user) {
        database.ref(`users/${user.id}/online_at`).set(moment().toISOString())
    }
}, 4000)
