'use strict'

self.addEventListener('push', (event) => {
    const title = 'Captain Haddock'

    const options = {
        icon: '/img/haddock.png',
        body: '',
    }

    event.waitUntil(self.registration.showNotification(title, options));
})