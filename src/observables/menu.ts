import { database } from '@/firebase'
import { Observable } from 'rxjs'
import { Observer } from 'firebase'
import { Menu } from '@/types/menu'
import { map, filter, tap } from 'rxjs/operators'


export const menusFromSession$ = (sessionId: string): Observable<{[s: string]: Menu}> => {
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

export const menuSessionUser$ = (sessionId: string, userId: string): Observable<Menu | undefined> => {
    return menusFromSession$(sessionId).pipe(
        map((menus) => menus ? (menus[userId] || undefined) : undefined),
    )
}
