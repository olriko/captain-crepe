import { database, auth, googleProvider } from '@/firebase'
import moment from 'moment'
import { User } from '@/types/user'

export const login = async () => {
    const result = await auth.signInWithPopup(googleProvider)
    const user = result.user
    if (user) {
        const userData = user.providerData[0]
        if (userData) {
            const userDb: User = {
                ...userData,
                online_at: moment().toISOString(),
            }
            database.ref(`users/${userDb.uid}`).set(userDb)
        }
    }
}

export const getUser = async (userId: string) => {
   return (await database.ref(`users/${userId}`).once('value')).val()
}

export const logout = () => {
    auth.signOut()
}
