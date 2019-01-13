
export const browserNotification = (body: string) => {
    const notification = new Notification('Captain Haddock', {
        body,
        icon: '/img/haddock.png',
    })
}
