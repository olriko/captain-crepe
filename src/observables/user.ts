import { interval, BehaviorSubject, Observable, Observer } from 'rxjs'
import { map, distinctUntilChanged, scan, tap, filter } from 'rxjs/operators'
import { database } from '@/firebase'
import { User } from '@/types/user'
import cookie from 'js-cookie'
import moment from 'moment'

export const currentUser$ = new BehaviorSubject<User | undefined>(undefined)

export const isAuth$ = currentUser$.pipe(
    map((user) => !!user),
)

interval(300).pipe(
    map(() => cookie.get('token')),
    distinctUntilChanged(),
    scan((acc: Array<string | undefined>, token: string | undefined) => [token, acc[0] || undefined], []),
).subscribe((tokens) => {
    if (tokens[0]) {
        database.ref(`users/${tokens[0]}`).on('value', (snap) => {
            if (snap) {
                currentUser$.next({
                    ...snap.val(),
                    id: snap.key,
                })
            }
        })
    } else {
        /**
         * If cookie is deleted -> logout
         */
        currentUser$.next(undefined)
    }

    /**
     * Unsubscribe from the last user
     */
    if (tokens[1]) {
        database.ref(`users/${tokens[1]}`).off()
    }
})

/**
 * get users
 */
export const user$ = Observable.create((observer: Observer<{[s: string]: User}>) => {
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
    map((users: any) => Object.values(users)),
    map((users: any[]) => users.filter(
        (user: any) => user.online_at && moment(user.online_at).isSameOrAfter(moment().subtract(5, 'seconds'))),
    ),
)
