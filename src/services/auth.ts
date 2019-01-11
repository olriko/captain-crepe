import { database, auth, googleProvider } from '@/firebase'
import moment from 'moment'
import { User } from '@/types/user'

export const login = async () => {
    const result = await auth.signInWithPopup(googleProvider)
    const user = result.user
    if (user) {
        const userData = user.providerData[0]
        if (userData) {
            const userFetch = await getUser(userData.uid)
            const userDb: User = {
                ...userFetch,
                ...userData,
                online_at: moment().toISOString(),
            }
            database.ref(`users/${userDb.uid}`).set(userDb)
        }
    }
}

export const getUser = async (userId: string): Promise<User | undefined> => {
   const user = await database.ref(`users/${userId}`).once('value')
   if (user) {
       return user.val()
   }
   return undefined
}

export const logout = () => {
    auth.signOut()
}
