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

const parseTime = (time: string): Date => {
    const date =  new Date()
    const timeSplit = time.split(':')

    date.setHours(Number(timeSplit[0]))
    date.setMinutes(Number(timeSplit[1]))
    return date
}

export const session$ = (sessionId: string): Observable<Session> =>
    Observable.create(async (observer: Observer<Sessions>) => {
        const ref = database.ref(`sessions/${sessionId}`)
        ref.on('value',  (snap) => {
            if (snap) {
                const values = snap.val()
                observer.next({
                    ...values,
                    id: snap.key,
                    delivery_at: parseTime(values.delivery_at || '12:15'),
                    created_at: new Date(values.created_at),
                })
            }
        })
    },
)

