import { database } from '@/firebase'
import { Observable } from 'rxjs'
import { Observer } from 'firebase'
import { Menu } from '@/types/menu'
import { from } from 'rxjs'
import { filter, map, switchMap } from 'rxjs/operators'
import { currentUser$ } from '@/observables/user'


export const menusFromSession$ = (sessionId: string) => {
    return Observable.create(async (observer: Observer<{[s: string]: Menu}>) => {
        const ref = database.ref(`sessions/${sessionId}/menus`)

        const first = await ref.once('value')
        observer.next(first.val())

        ref.on('value',  (snap) => {
            if (snap) {
                observer.next(snap.val())
            }
        })
    })
}

export const fetchUserCurrentMenu$ = (sessionId: string) => {
    return currentUser$.pipe(
        filter((user) => user !== undefined),
        map((user) => user ? user.id : undefined),
        switchMap((userId) => from(database.ref(`sessions/${sessionId}/menus/${userId}`).once('value'))),
        filter((snap) => !!snap),
        map((snap) => snap.val()),
    )
}
