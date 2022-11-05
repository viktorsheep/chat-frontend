<template>
  <div
    v-loading="!loaded.messages"
    element-loading-background="rgb(238, 238, 238)"
    style="margin-top: -10px"
  >
    <div class="wrap-conversations">
      <div
        v-for="c in conversations"
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

        <span v-if="c.unread_count > 0" class="count">
          {{ c.unread_count }}
        </span>

        <div style="clear: both" />

        <div class="snippet">
          {{ c.snippet }}
        </div>
      </div>
    </div>

    <el-button
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
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loaded: {
        messages: false
      },
      conversations: [],
      activeId: 0
    }
  },

  computed: {
    ...mapGetters({
      pages: 'pages/pages',
      theme: 'settings/theme'
    }),

    currentPage () {
      let x = {}
      if (this.$route.query.page !== undefined) {
        x = { ...this.pages.find(p => p.id === parseInt(this.$route.query.page)) }
      }

      console.log(x)

      return x
    }

  },

  watch: {
    /*
    '$route.query' (nq, oq) {
      this.getFbConversations()
    },
    */

    currentPage (n, q) {
      if (n.id !== q.id) {
        this.getFbConversations()
      }
    }
  },

  mounted () {
    this.getFbConversations()
  },

  methods: {
    handleCloseNav () {
      this.conversations = []

      const r = this.$route.query
      delete r.mid
      console.log(r)

      this.$router.replace({
        query: {
          // page: this.$route.query.page
        }
      })

      this.$emit('navClosed')
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
        console.log(res.content.data.data)
        this.conversations = []
        this.conversations = res.content.data.data
        this.loaded.messages = true
      }).catch((error) => {
        this.$cg({
          title: 'Facebook get conversations error',
          type: 'error',
          logs: error
        })
      })
    },

    // for what ??
    async userProfile () {
      await this.$sender({
        method: 'get',
        url: `${this.currentPage.page_id}`,
        data: {},
        headers: {
          contentType: 'application/json'
        }
      }).then((res) => {
        console.log(res)
      })
    },

    handleConversationClick (c) {
      this.activeId = c.id
      const p = c.participants.data
      const x = p.filter(p => p.id !== this.currentPage.page_id + '')

      if (this.$route.query.mid === undefined || this.$route.query.mid !== c.id) {
        this.$router.replace({ query: { ...this.$route.query, mid: c.id, psid: x[0].id } })
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
      /*
      if (elapsed < 2628000) { // <1 month
        return `${targetDate.getDate()} ${MonthNames[targetDate.getMonth()]}`
      }
      */

      // return `${targetDate.getDate()} ${MonthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}`
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
        // font-weight: normal;
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
