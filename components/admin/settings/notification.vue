<template>
  <div v-loading="loading.comp">
    <el-input
      v-model="data.form.firebase.token"
      placeholder="Please input"
      class="input-with-select"
      :readonly="true"
    >
      <template slot="prepend">
        Firebase Token
      </template>
      <el-button
        slot="append"
        type="success"
        style="background: #409EFF; border-radius: 0 4px 4px 0; color: white;"
        @click="handle().btnGenerateClick()"
      >
        Generate
      </el-button>
    </el-input>

    <el-button
      type="primary"
      @click="firebase().try()"
    >
      fire
    </el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visibility: {

      },
      loading: {
        comp: false
      },
      data: {
        loading: '',
        firebaseToken: {},
        form: {
          firebase: {
            token: ''
          }
        }
      }
    }
  },
  mounted () {
    this.getFirebaseToken()
  },
  methods: {
    async getFirebaseToken () {
      this.data.loading = 'loading'
      this.loading.comp = true

      const payload = {
        method: 'get',
        url: 'setting/firebase_token/view'
      }

      await this.$sender(payload).then((res) => {
        console.log(res)
        this.data.firebaseToken = res.content.data
        this.data.form.firebase.token = res.content.data.value

        this.data.loading = 'loaded'
        this.loading.comp = false
      })
    },

    handle () {
      const self = this

      return {
        async btnGenerateClick () {
          const token = await self.$fire.messaging.getToken()

          const res = await self.utils().contact({
            method: 'put',
            url: 'setting/firebase_token/edit',
            data: {
              value: token
            }
          })

          // eslint-disable-next-line no-console
          console.log(res)

          self.data.form.firebase.token = res.content.data.value
          self.firebase().startOnMessageListener()
        }
      }
    },

    async handleBtnGenerateClick () {
      console.log('hi generate clicked')
      this.utils().turnLoading(true)
      const token = await this.$fire.messaging.getToken()
      console.log(token)

      await this.$sender({
        method: 'put',
        url: 'setting/firebase_token/edit',
        data: {
          value: token
        }
      }).then((res) => {
        console.log('completed')
        this.data.form.firebase.token = token
        this.firebase().startOnMessageListener()
        this.utils().turnLoading(false)
      })

      // workflow
      // update data.
      // save to backend.
    },

    firebase () {
      const self = this
      return {
        try () {
          console.log(self.loading.comp)
        },

        async getToken () {
          return await this.$fire.messaging.getToken()
        },

        startOnMessageListener () {
          self.$fire.messaging.onMessage((payload) => {
            console.info('Message received : ', payload)
            console.log(payload.notification.body)
            // TODO: Notification.
            self.notify({
              title: payload.notification.title,
              message: payload.notification.body
            })
          })
        },

        startOnTokenChangedListener () {
          // this.$fire.messaging.onTokenChanged()
        }
      }
    },

    utils () {
      const self = this
      return {
        turnLoading (state) {
          if (state) {
            self.data.loading = 'loading'
            self.loading.comp = true
          } else {
            self.data.loading = 'loaded'
            self.loading.comp = false
          }
        },

        async contact (payload) {
          this.turnLoading(true)
          const c = await self.$sender(payload)
          this.turnLoading(false)
          console.info(c)
          // self.utils().turnLoading(false)
          return c
        }
      }
    },

    notify (p) {
      this.$notify.info({
        title: p.title,
        body: p.body
      })
    }
  }
}
</script>
