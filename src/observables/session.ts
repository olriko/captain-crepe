import { database } from '@/firebase'
import { Observable } from 'rxjs'
import { Observer } from 'firebase'
import { Session } from '@/types/session'


export const session$ = Observable.create(async (observer: Observer<{[s: string]: Session}>) => {
    const ref = database.ref(`sessions`).limitToLast(3)

    const first = await ref.once('value')
    observer.next(first.val())

    ref.on('value',  (snap) => {
        if (snap) {
            observer.next(snap.val())
        }
    })
})

