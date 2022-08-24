// src/main.js
import Vue from 'vue'
import Gapi from 'vue-googleapis'

Vue.use(Gapi, {
  // apiKey: 'AIzaSyC8FRGRgOI77jUvhs5IilHHkWtgfK-P7eE',
  clientId: '491462074033-cuqnpd3u6p1mo6bnu2onct8vn97icma0.apps.googleusercontent.com',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apisyoutube/v3/rest'],
  scope: 'https://www.googleapis.com/auth/youtube'
})
