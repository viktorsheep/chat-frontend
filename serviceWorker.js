self.addEventListener('push', function (e) {
  const data = e.data.json()
  // eslint-disable-next-line no-unused-vars
  const options = {
    body: data.notification.body,
    icon: data.notification.icon,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    }
  }
})

self.addEventListener('notificationclick', function (event) {
  console.log('test', event)
  event.notification.close()
  const url = 'home'
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i]
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus()
        }
      }
      if (self.clients.openWindow) {
        console.log('open window')
      }
    })
  )
}, false)
