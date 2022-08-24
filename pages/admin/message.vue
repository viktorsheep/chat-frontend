<template>
  <div>
    <h1>
      testing
      <el-button type="primary" size="default" @click="handleGetSomething">
        Get
      </el-button>
    </h1>
  </div>
</template>

<script>
import * as Facebook from 'fb-sdk-wrapper'
export default {
  layout: 'app',

  data () {
    return {
      something: ''
    }
  },

  mounted () {
    console.log('mounted')
    Facebook.load()
      .then(() => {
        console.log('fb loaded')
        Facebook.init({
          // appId: 981023695815288 // prohouse
          // appId: 1593537531031479 // ekballo
          appId: 1025874564725988 // demodemo
        })

        Facebook.api('/100614572669575', 'get', {
          fields: 'coonversations{unread_count,subject,snippet,senders,can_reply,message_count,participants}',
          // access_token: 'EAAOlBwkDvOQBAKWUXlcgrVdCZBIVZA5ZAuq6JPZCyOo381ym1G4tmcgvFsogVwIhpn3ygbb3U9ZCz9FUjQOb5Cw7oQ6OjZCff4VkZAHwaRV2DHFZAAgFDIgoODYE2TqRwlHE1sQeVgMbeoz9h1C1xtKdTdcBmB9kHUHs18jp3gvpHeXVUNI5hZCJy'
          // EAAOlBwkDvOQBAKWUXlcgrVdCZBIVZA5ZAuq6JPZCyOo381ym1G4tmcgvFsogVwIhpn3ygbb3U9ZCz9FUjQOb5Cw7oQ6OjZCff4VkZAHwaRV2DHFZAAgFDIgoODYE2TqRwlHE1sQeVgMbeoz9h1C1xtKdTdcBmB9kHUHs18jp3gvpHeXVUNI5hZCJy
          // access_token: 'EAAOlBwkDvOQBAEVwLZCFBJIgN2OxraZCZB9u69CZAMcFyAtGQ3HhATfgV8NR5eRgNkAsRZAfIpETkIusA6gjZBIynUbdrYOmrOwqfoHow3MsYH9nl7T8TM9nVgeeatHMYMtHVuUKSIVvBtDGidtipHYRZCMpZAhW3WMKMGt1Ew1IcNUdKsg16w4t'
          access_token: 'EAAOlBwkDvOQBAE2OyIXd9ULQ4JlmJmsapWJFWZBCoG9ZANEL2qtjElPhO3XZCcmHn45JBsZC5dXpyec69KMihhZAmSDlxLY1K6tdRTRpED9pwbuZCZBX8iumrL3ZBWKvcgDXHV5WY6bvY4Ddha96AnLLwZA3JKaRiZCQNffqGcIhf0JZCym5RRm1lZCP'
        })
          .then((response) => {
            console.log('ok')
            console.log(response)
          })
          .catch((error) => {
            console.log('error')
            console.log(error)
          })
      })
  },

  methods: {
    getLoginStatus () {
      Facebook.getLoginStatus()
        .then((response) => {
          if (response.status === 'connected') {
            // logged in
            console.log('logged in')
            console.log(response)
          } else {
            // not logged in
            console.log(response)
            Facebook.login()
              .then((response) => {
                if (response.status === 'connected') {
                  // logged in
                } else {
                  // not logged in
                }
              })
          }
        })
    },

    fbLogin () {
      Facebook.login()
        .then((res) => {
          console.log(res)
        })
    },

    async getSomething () {
      const x = await Facebook.api('/dewolfficial/posts')
      console.log(x)
      this.something = x
      /*
        .then((response) => {
          console.log(response)
          // data's here!
        })
        */
    },

    handleGetSomething () {
      this.getSomething()
    }
  }
}
</script>
