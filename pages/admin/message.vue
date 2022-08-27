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
          appId: process.env.FACEBOOK_APP_ID
        })

        Facebook.api('/100614572669575', 'get', {
          fields: 'coonversations{unread_count,subject,snippet,senders,can_reply,message_count,participants}',
          access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN
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
