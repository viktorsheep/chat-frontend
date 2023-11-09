<template>
  <div
    v-loading="!loaded.messages"
    element-loading-background="rgb(238, 238, 238)"
    style="margin-top: -10px"
  >
    <div class="filter" style="height: 50px">
      <div style="float: right; padding-right: 10px">
        <ElmDropdownFilterStatus :statuses="filterBy.statuses" @status="(param) => {filterBy.statuses = param; filter(false)}" />
      </div>
      <div style="float: right; padding-right: 10px">
        <ElmDropdownFilterResponder :responders="filterBy.responders" @responders="(param) => {filterBy.responders = param, filter(false)}" />
      </div>
    </div>
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
        :class="`wrap-fb-user ${c.unread !== undefined && c.unread !== '' ? 'unread' : ''}
        ${c.has_new_message !== undefined && c.has_new_message !== 0 ? 'unread' : ''}
         ${
          filtered ? c.mid === activeId ? 'active' : '' : c.id === activeId ? 'active' : ''
        } ${theme}`"
        @click="handleConversationClick(c)"
      >
        <span class="name" style="font-weight: bolder">
          <i v-if="c.status && c.status === 1" class="el-icon-user-solid" style="color: #67C23A" />
          <i v-if="c.status && c.status === 2" class="el-icon-user-solid" style="color: #E6A23C" />
          <i v-if="c.status && c.status === 3" class="el-icon-user-solid" style="color: #F56C6C" />
          <i v-if="!c.status" class="el-icon-user" />
          {{ c.senders ? c.senders.data[0].name : c.name ? c.name : '' }}
        </span>

        <div class="time" style="text-align: right">
          {{ c.updated_time ? convertRelativeTime(c.updated_time) : c.additional_information ? convertRelativeTime(JSON.parse(c.additional_information).updated_time) : '' }}
          <p>
            {{ c.responder ? c.responder.name : 'Please respond.' }}
          </p>
        </div>

        <span v-if="c.unread !== undefined && c.unread !== '' || c.has_new_message !== undefined && c.has_new_message !== 0" class="count">
          {{ c.unread ? c.unread : c.has_new_message ? c.has_new_message === 0 ? '' : '!' : '' }}
        </span>

        <div style="clear: both" />

        <div class="snippet">
          {{ c.snippet ? c.snippet : c.additional_information ? JSON.parse(c.additional_information).snippet : '' }}
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
      v-if="filtered"
      type="default"
      size="small"
      :class="`btn-back ${theme}`"
      @click="handleCancelFilter"
    >
      Cancel Filter
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
      filterBy: {
        statuses: [],
        responders: []
      },
      filtered: false,
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
        if (this.filtered) {
          this.clone.forEach((c, index) => {
            n.forEach((nData) => {
              if (c.mid && c.mid === nData.id) {
                this.clone[index] = nData
              }
              if (c.id && c.id === nData.id) {
                this.clone[index] = nData
              }
            })
          })
        } else {
          n.map((nData, index) => {
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
        }
        if (!this.filtered) {
          this.clone = n
        }
        this.key++
      }
      this.setClientData()
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
    this.$root.$on('set-status', (res) => { this.setStatus(res) })
    this.$root.$on('set-responder', (res) => { this.setResponder(res) })

    this.configSound()
  },

  methods: {
    ...mapActions({
      setCurrentConversation: 'settings/setCurrentConversation',
      unsetCurrentConversation: 'settings/unsetCurrentConversation',
      toggleNavCollapse: 'settings/toggleNavCollapse'
    }),

    handleCancelFilter () {
      this.filterBy.statuses = []
      this.filterBy.responders = []
      this.filtered = false
      this.getFbConversations(true)
    },

    async filter (loadMore = true) {
      this.filtered = true
      const payload = {
        statuses: this.filterBy.statuses,
        responders: this.filterBy.responders
      }
      const url = `client/${this.currentPage.page_id}/filter`
      await this.$sender({
        method: 'get',
        url: this.next && loadMore ? this.next : url,
        data: payload
      }).then((res) => {
        this.clone = this.next && loadMore ? [...this.clone, ...res.content.data.data] : res.content.data.data
        this.next = res.content.data.next_page_url
      })
    },

    setStatus (statusId) {
      this.clone = this.clone.map((c) => {
        if (c.id === this.$route.params.mid) {
          c.status = statusId
        }
        return c
      })
      console.log('status', this.clone)
    },

    setResponder (responder) {
      this.clone = this.clone.map((c) => {
        if (c.id === this.$route.params.mid) {
          c.responder = responder
        }
        return c
      })
      console.log('responder', this.clone)
    },

    async setClientData (newMessage = false, message = {}) {
      if (newMessage) {
        if (!message.message) {
          return
        }
        console.log('set client', this.clone)
        this.clone = this.clone.map((c) => {
          if (c.id === this.$route.params.mid) {
            c.snippet = message.message.text
          }
          return c
        })
        const inConversation = this.clone.find(c => c.id === this.$route.params.mid)

        const info = { participants: inConversation.participants, snippet: inConversation.snippet, updated_time: inConversation.updated_time }
        await this.$sender({
          method: 'put',
          url: `client/${inConversation.id}/update-additional-information`,
          data: {
            info
          }
        })
        this.key++
        return
      }
      this.clone.forEach(async (c) => {
        const info = { participants: c.participants, snippet: c.snippet, updated_time: c.updated_time }

        await this.$sender({
          method: 'get',
          url: `client/${c.id}/getData`,
          data: {
            name: c.senders.data[0].name,
            info
          }
        }).then((res) => {
          c.responder = res.content.data.responder
          c.status = res.content.data.status
          c.unread = res.content.data.has_new_message === 0 ? '' : '!'
          this.key++
        })
      })
    },

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
      const recipientId = message.entry[0].messaging[0].recipient.id
      if (this.$route.params.psid !== this.sender_id && this.$route.params.psid !== recipientId) {
        this.getFbConversations(true)
      } else {
        this.setClientData(true, message.entry[0].messaging[0])
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
        this.conversations = res.content.data.conversations

        if (!this.filtered) {
          this.next = res.content.data.next
        }
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
      if (this.filtered) {
        this.filter()
        return
      }
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

    async readNewMessage (c) {
      c.unread = ''
      await this.$sender({
        method: 'put',
        url: `client/${c.mid ? c.mid : c.id}/read-message`
      })
    },

    handleConversationClick (c) {
      this.readNewMessage(c)
      this.clone.map((cData) => {
        if (cData.id === c.id) {
          cData.unread = ''
          cData.has_new_message = 0
        }
        return this.clone
      })
      this.key++
      let p = []
      if (c.mid) {
        this.activeId = c.mid
        const info = JSON.parse(c.additional_information)
        p = info.participants.data
        this.setCurrentConversation(info.participants.data[0].name)
      } else {
        this.activeId = c.id
        p = c.participants.data
        this.setCurrentConversation(c.participants.data[0].name)
      }
      const x = p.filter(p => p.id !== this.currentPage.page_id + '')
      if (this.$route.params.psid === x[0].id) {
        const h = this.$createElement
        this.$notify({
          message: h('i', { style: 'color: teal' }, 'You click the same conversation.')
        })
      } else if (c.mid) {
        this.$router.replace('/pages/' + this.currentPage.id + '/' + c.mid + '/' + x[0].id)
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
    height: calc(100vh - 150px);
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
      width: 150px;
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
