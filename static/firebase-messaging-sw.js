
    importScripts(
      'https://www.gstatic.com/firebasejs/9.8.4/firebase-app-compat.js'
    )
    importScripts(
      'https://www.gstatic.com/firebasejs/9.8.4/firebase-messaging-compat.js'
    )
    firebase.initializeApp({"apiKey":"AIzaSyDJ6gApAnRTcriv2P9xxiBXw2Epl0rBZmM","authDomain":"chat-test-e7d6f.firebaseapp.com","projectId":"chat-test-e7d6f","storageBucket":"chat-test-e7d6f.appspot.com","messagingSenderId":"627817364736","appId":"1:627817364736:web:2138f30080b69cdede47e5","measurementId":"G-DG45FCGP3H"})

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging()

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

    