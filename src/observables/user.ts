import { Observable, Observer, of, BehaviorSubject } from 'rxjs'
import { map, distinctUntilChanged, switchMap, tap } from 'rxjs/operators'
import { database, auth } from '@/firebase'
import { UserInfo } from 'firebase'
import { User, Users } from '@/types/user'
import moment from 'moment'

export const currentUser = new BehaviorSubject<User|undefined>(undefined)

export const authUser$: Observable<UserInfo | undefined> = Observable.create(
    (observer: Observer<UserInfo | undefined>) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const userData = user.providerData
                if (userData) {
                    observer.next(userData[0] || undefined)
                }
            } else {
                observer.next(undefined)
            }
        })
    },
)

export const isAuth$ = authUser$.pipe(
    map((user) => !!user),
)

export const isAuth = () => !!currentUser.getValue()

export const currentUser$: Observable<User | undefined> = authUser$.pipe(
    distinctUntilChanged(),
    switchMap((user) => user ? getUser(user.uid) : of(undefined)),
    tap((user) => currentUser.next(user)),
)

/**
 * get user
 */
export const getUser = (uid: string): Observable<User> => Observable.create((observer: Observer<User>) => {
    database.ref(`users/${uid}`).on('value', (snap) => {
        if (snap) {
            observer.next(snap.val())
        }
    })
})


/**
 * get users
 */
export const user$: Observable<Users> = Observable.create((observer: Observer<Users>) => {
    database.ref('users').on('value', (snap) => {
        if (snap) {
            observer.next(snap.val())
        }
    })
})

/**
 * get online user
 */
export const onlineUser$ = user$.pipe(
    map((users) => Object.values(users)),
    map((users) => users.filter(
        (user: User) => user.online_at && moment(user.online_at).isSameOrAfter(moment().subtract(5, 'seconds'))),
    ),
)


setInterval(() => {
    const user = currentUser.value
    if (user) {
        database.ref(`users/${user.uid}/online_at`).set(moment().toISOString())
    }
}, 4000)
