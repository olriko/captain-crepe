import { database } from '@/firebase'
import { Observable } from 'rxjs'
import { Observer } from 'firebase'
import { Sessions } from '@/types/session'


export const session$: Observable<Sessions> = Observable.create(async (observer: Observer<Sessions>) => {
    const ref = database.ref(`sessions`).limitToLast(3)

    const first = await ref.once('value')
    observer.next(first.val())

    ref.on('value',  (snap) => {
        if (snap) {
            observer.next(snap.val())
        }
    })
})

