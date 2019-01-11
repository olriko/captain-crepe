import { database } from '@/firebase'
import { Observable } from 'rxjs'
import { Observer } from 'firebase'
import { Sessions, Session } from '@/types/session'


export const sessionList$: Observable<Sessions> = Observable.create(async (observer: Observer<Sessions>) => {
    const ref = database.ref(`sessions`).orderByChild('locked').equalTo(false)

    const first = await ref.once('value')
    observer.next(first.val())

    ref.on('value',  (snap) => {
        if (snap) {
            observer.next(snap.val())
        }
    })
})

export const session$ = (sessionId: string): Observable<Session> =>
    Observable.create(async (observer: Observer<Sessions>) => {
        const ref = database.ref(`sessions/${sessionId}`)
        ref.on('value',  (snap) => {
            if (snap) {
                observer.next({
                    ...snap.val(),
                    id: snap.key,
                })
            }
        })
    },
)

