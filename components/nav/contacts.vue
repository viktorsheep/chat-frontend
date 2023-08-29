<template>
  <div
    v-loading="!loaded.messages"
    element-loading-background="rgb(238, 238, 238)"
    style="margin-top: -10px"
  >
    <div v-if="magicLink" :key="key" class="wrap-conversations is-magiclink">
      <div
        :class="`wrap-fb-user ${conversation.unread_count > 0 ? 'unread' : ''} active ${theme}`"
      >
        <span class="name">
          {{ conversation.senders.data[0].name }}
        </span>

        <div class="time">
          {{ convertRelativeTime(conversation.updated_time) }}
        </div>
      </div>
    </div>
    <div v-else :key="key" class="wrap-conversations not-magiclink">
      <div
        v-for="c in clone"
        :key="c.id"
        :class="`wrap-fb-user ${c.unread_count > 0 ? 'unread' : ''} ${
          c.id === activeId ? 'active' : ''
        } ${theme}`"
        @click="handleConversationClick(c)"
      >
        <span class="name">
          {{ c.senders.data[0].name }}
        </span>

        <div class="time">
          {{ convertRelativeTime(c.updated_time) }}
        </div>

        <span v-if="c.unread !== undefined && c.unread !== ''" class="count">
          {{ c.unread }}
        </span>
        <!-- <span>
          {{c.snippet}}
        </span> -->

        <!-- <span v-if="sender_id === c.senders.data[0].id && $route.params.psid !== c.senders.data[0].id" class="count">
          {{ '!' }}
        </span> -->

        <div style="clear: both" />

        <div class="snippet">
          {{ c.snippet }}
        </div>
      </div>
      <el-button
        v-if="next"
        type="default"
        size="small"
        :loading="loadMoreLoading"
        :class="`btn-back ${theme}`"
        style="margin-top: 10px; margin-bottom: 10px"
        @click="handleLoadMore"
      >
        Load More
      </el-button>
    </div>

    <el-button
      v-if="magicLink"
      type="default"
      size="small"
      :class="`btn-back ${theme}`"
      @click="magicLink = false"
    >
      Show other conversations
    </el-button>

    <el-button
      v-else
      type="default"
      size="small"
      :class="`btn-back ${theme}`"
      @click="handleCloseNav"
    >
      Back
    </el-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      loaded: {
        messages: false
      },
      eventData: {},
      next: null,
      magicLink: false,
      loadMoreLoading: false,
      conversations: [],
      conversation: {},
      clone: [],
      activeId: 0,
      sender_id: 0,
      unread_message: 0,
      snippets: [],
      notification: {
        sound: '',
        audio: ''
      },
      key: 0
    }
  },

  computed: {
    ...mapGetters({
      pages: 'pages/pages',
      theme: 'settings/theme',
      navIsCollapsed: 'settings/navIsCollapsed'
    }),

    currentPage () {
      let x = {}
      const data = this.$route.params.id
      if (data !== undefined) {
        x = { ...this.pages.find(p => p.id === parseInt(data)) }
      }

      return x
    }

  },

  watch: {

    conversations (n, o) {
      if (this.clone.length === 0) {
        this.clone = n
      } else {
        n.map((nData) => {
          this.clone.forEach((oData) => {
            if (oData.unread !== undefined && nData.id === oData.id) {
              nData.unread = oData.unread
            }
            if (nData.snippet !== oData.snippet && nData.id === oData.id && this.$route.params.psid !== nData.senders.data[0].id) {
              nData.unread = '!'
            }
          })
          return n
        })
        this.clone = n
        this.key++
      }
    },

    currentPage (n, q) {
      if (n.id !== q.id) {
        this.getFbConversations()
      }
    }
  },

  mounted () {
    if ('magic_link' in this.$route.query) {
      const payload = {
        page_id: this.$route.query.page_id,
        mid: this.$route.query.mid
      }
      this.getConversation(payload)
    }

    if ('psid' in this.$route.params) { this.reloadConversation() }

    this.$root.$on('new-message', (res) => { this.getNewMessage(res) })

    this.configSound()
  },

  methods: {

    ...mapActions({
      setCurrentConversation: 'settings/setCurrentConversation',
      unsetCurrentConversation: 'settings/unsetCurrentConversation',
      toggleNavCollapse: 'settings/toggleNavCollapse'
    }),

    async getConversation (payload) {
      const conversation = await this.$sender({
        method: 'get',
        url: `${payload.page_id}/${payload.mid}/conversation`,
        data: {},
        headers: {
          contentType: 'application/json'
        }
      })
      this.conversation = conversation.content.data
      this.magicLink = true
    },

    async setClient () {
      // get page id
      if (typeof (this.currentPage.page_id) === 'undefined') { return }

      // get psid
      if (this.eventData.entry !== undefined) {
        const senderId = this.eventData.entry[0].messaging[0].sender.id

        if (senderId === this.currentPage.page_id.toString()) {
          return
        }
        // get mid
        let x = {}
        x = { ...this.conversations.find(c => c.participants.data.find(p => p.id !== this.currentPage.page_id).id === senderId) }
        //
        const payload = {
          page_index_id: this.$route.params.id,
          page_id: this.currentPage.page_id,
          psid: senderId,
          mid: x.id
        }
        await this.$sender({
          method: 'post',
          url: '/client/set',
          data: payload
        })
      }
    },

    configSound () {
      this.audio = new Audio('/notification-sound.wav')
    },

    handleCloseNav () {
      this.unsetCurrentConversation()
      this.conversations = []
      this.$router.push('/pages/')
      this.$emit('navClosed')
    },

    getNewMessage (res) {
      const message = JSON.parse(res)
      if (typeof (message) !== 'object') {
        return
      }

      this.eventData = message

      this.sender_id = message.entry[0].messaging[0].sender.id
      if (this.$route.params.psid !== this.sender_id) {
        this.getFbConversations(true)
        this.unread_message++
      }
    },

    async getFbConversations (silent = false) {
      if (!silent) {
        this.loaded.messages = false
      }

      await this.$sender({
        method: 'get',
        url: `${this.currentPage.page_id}/conversations`,
        data: {},
        headers: {
          contentType: 'application/json'
        }
      }).then((res) => {
        this.conversations = res.content.data.data
        this.next = res.content.data.next
        this.setClient()

        this.audio.play()
        this.loaded.messages = true
      }).catch((error) => {
        this.$cg({
          title: 'Facebook get conversations error',
          type: 'error',
          logs: error
        })
      })
    },

    async handleLoadMore () {
      this.loadMoreLoading = true
      await this.$sender({
        method: 'get',
        url: `${this.currentPage.page_id}/conversations?next=${this.next}`,
        data: {},
        headers: {
          contentType: 'application/json'
        }
      }).then((res) => {
        this.conversations = [...this.conversations, ...res.content.data.conversations]
        this.next = res.content.data.next
        this.setClient()
        this.loaded.messages = true
        this.loadMoreLoading = false
      }).catch((error) => {
        this.loadMoreLoading = false
        this.$cg({
          title: 'Facebook get conversations error',
          type: 'error',
          logs: error
        })
      })
    },

    reloadConversation () {
      const params = this.$route.params
      this.$router.push('/pages/' + params.id + '/' + params.mid + '/' + params.psid)

      this.clone.map((cData) => {
        if (cData.id === params.mid) {
          cData.unread = ''
        }
        return this.clone
      })
      this.activeId = params.mid
    },

    handleConversationClick (c) {
      c.unread = ''
      this.clone.map((cData) => {
        if (cData.id === c.id) {
          cData.unread = ''
        }
        return this.clone
      })
      this.key++
      this.activeId = c.id
      const p = c.participants.data
      const x = p.filter(p => p.id !== this.currentPage.page_id + '')
      this.setCurrentConversation(c.participants.data[0].name)
      if (this.$route.params.psid === x[0].id) {
        const h = this.$createElement
        this.$notify({
          message: h('i', { style: 'color: teal' }, 'You click the same conversation.')
        })
      } else {
        this.$router.replace('/pages/' + this.currentPage.id + '/' + c.id + '/' + x[0].id)
      }
    },

    convertRelativeTime (t) {
      const currentDate = new Date()
      const currentTimeInms = currentDate.getTime()
      const targetDate = new Date(t)
      const targetTimeInms = targetDate.getTime()
      const elapsed = Math.floor((currentTimeInms - targetTimeInms) / 1000)
      if (elapsed < 1) {
        return '0s'
      }
      if (elapsed < 60) { // < 60 sec
        return `${elapsed}s`
      }
      if (elapsed < 3600) { // < 60 minutes
        return `${Math.floor(elapsed / (60))}m`
      }
      if (elapsed < 86400) { // < 24 hours
        return `${Math.floor(elapsed / (3600))}h`
      }
      if (elapsed < 604800) { // <7 days
        return `${Math.floor(elapsed / (86400))}d`
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.wrap {
  &-conversations {
    height: calc(100vh - 100px);
  }

  &-fb-user {
    height: 80px;
    line-height: 80px;
    padding-left: 15px;
    padding-right: 10px;
    background: white;
    color: #999;
    border-bottom: 1px solid #f5f5f5;
    cursor: pointer;
    position: relative;
    transition: all 200ms ease-in-out;

    &:before {
      content: '';
      width: 5px;
      height: 60px;
      position: absolute;
      border-radius: 0 5px 5px 0;
      left: -5px;
      top: 10px;
      background: white;
      transition: all 200ms ease-in-out;
    }

    &:hover {
      background: #fafafa;
      padding-left: 20px;

      &:before {
        background: #ccc;
        left: 0px;
      }
    }

    &.unread {
      color: #777;
      font-weight: bolder;
    }

    &.active {
      background: #f5f5f5;
      padding-left: 20px;

      &:before {
        left: 0;
        background: rgb(31, 145, 242);
      }
    }

    .name {
      float: left;
      width: 100px;
      height: 26px;
      line-height: 26px;
      margin-top: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .count {
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      margin-top: 10px;
      float: right;
      color: white;
      background: #f56c6c;
      border-radius: 11px;
      font-size: 10px;
      font-weight: bolder;

      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    .time {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 10px;
      height: 26px;
      line-height: 26px;
      color: #ccc;
    }

    .snippet {
      width: calc(100% - 30px);
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      color: #999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &.dark {
      color: #777;
      background: #454545;
      border-bottom: 1px solid #777;

      .name {
        color: #ccc;
      }
    }
  }
}

.btn-back {
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-bottom: 7px;

  &.dark {
    background: #454545;
    border-color: #454545;
  }
}
</style>
