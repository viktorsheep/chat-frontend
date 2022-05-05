<template>
  <div
    v-loading="loading.wrap"
    element-loading-text="Retrieving Information..."
  >
    <!-- {{ selectedPage }} -->
    <!-- {{ messageAll }} -->
    <!-- {{ messages($route.query.page !== undefined ? $route.query.page : 0) }} -->
    <el-empty v-if="selectedPage === null" description="Select one of the page at the right side to get started." />
    <el-empty v-else-if="selectedPage === 'Does not exists.'" description="You are not joined to this page. Join now to send prayers.">
      <el-button
        type="primary"
        size="mini"
        :disabled="disabled.btnJoin"
        @click="handleJoinClick"
      >
        Join
      </el-button>
    </el-empty>
    <div v-else>
      <div class="wrap-messages">
        <div
          v-for="m in messages($route.query.page)"
          :key="m.id"
          :class="`message ${m.message_type_id === 1 ? 'sent' : 'received'}`"
        >
          <div class="text">
            {{ m.message }}

            <div class="time">
              {{ m.created_at }}
            </div>
          </div>

          <div style="clear: both;" />
        </div>
      </div>
      <div
        v-if="selectedPage === 'Left.'"
        class="wrap-rejoin"
      >
        You left this page chat.
        <el-button type="primary" size="small" @click="handleRejoinClick">
          Rejoin Now
        </el-button>
      </div>
      <div class="wrap-control">
        <el-input
          v-model="message"
          :placeholder="selectedPage === 'Left.' ? 'You cannot send messages because you have left the page. Join again to be able to send messages again.' : 'Press enter to send ...'"
          size="small"
          clearable
          style="width: calc(100% - 50px);"
          :disabled="selectedPage === 'Left.' ? true : false"
          @keyup.enter.native="sendMessage"
        />

        <el-popover
          v-if="msgControl.empty"
          placement="top"
          width="400"
          trigger="click"
        >
          <div class="wrap-recorder">
            <div class="time">
              01:00
            </div>
            <el-button icon="el-icon-microphone" type="primary" circle />
          </div>

          <!-- <el-button slot="reference">Click to activate</el-button> -->

          <el-button
            slot="reference"
            type="text"
            style="width: 40px;"
            :disabled="selectedPage === 'Left.' ? true : false"
          >
            <i class="el-icon-microphone" />
          </el-button>
        </el-popover>

        <el-button
          v-else
          type="text"
          style="width: 40px;"
          @click="sendMessage"
        >
          <i class="el-icon-s-promotion" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'app',
  data () {
    return {
      message: '',
      selectedPage: null,
      msgControl: {
        empty: true
      },
      disabled: {
        btnJoin: false
      },
      loading: {
        wrap: true
      }
    }
  },

  fetch () {
    if (this.$route.query.page !== undefined) {
      this.getMessages(this.$route.query.page)
    }
  },

  computed: {
    ...mapGetters({
      messages: 'messages/messages',
      messageAll: 'messages/messageAll'
    })
  },

  watch: {
    '$route.query' (nq, oq) {
      /*
      nq.page !== undefined
        ? this.setPageOn(nq.page)
        : this.selectedPage = null
      */

      if (nq.page !== undefined) {
        this.setPageOn(nq.page)
        this.getMessages(nq.page)
      } else {
        this.selectedPage = null
      }
    },

    message (nv, ov) {
      nv !== ''
        ? this.msgControl.empty = false
        : this.msgControl.empty = true
    }
  },

  mounted () {
    if (this.$route.query.page !== undefined) {
      this.setPageOn(this.$route.query.page)
    } else {
      this.selectedPage = null
      this.loading.wrap = false
    }

    console.log(this.selectedPage)
  },

  methods: {
    ...mapActions({
      getMessages: 'messages/browse'
    }),

    sendMessage () {
      const payload = {
        method: 'post',
        url: `message/add/${this.$route.query.page}`,
        data: {
          message: this.message
        }
      }

      this.$sender(payload).then((res) => {
        this.message = ''
      })
    },

    setPageOn (page) {
      // page ? this.selectedPage = page : this.selectedPage = null
      this.getPageData(page)
    },

    async getPageData (pageId) {
      // TODO: Set Loading True
      this.loading.wrap = true

      const payload = {
        method: 'get',
        url: `user/page/exists/${pageId}`
      }

      await this.$sender(payload).then((res) => {
        this.selectedPage = res.content.data
        this.loading.wrap = false
      })
    },

    handleJoinClick () {
      this.initAddEdit('add')
    },

    handleRejoinClick () {
      this.initAddEdit('edit')
      // this.selectPage = 'Exists.'
    },

    async initAddEdit (reqType) {
      const pageId = this.$route.query.page
      const payload = {
        method: reqType === 'add' ? 'post' : 'put',
        url: `user/page/${reqType}/${pageId}`
      }

      if (reqType === 'edit') {
        payload.message = {
          success: 'You rejoined chat to this page.'
        }
      }

      const x = await this.$sender(payload).then((res) => {
        console.log(res)
        this.selectedPage = 'Exits.'
        this.$root.$emit('PageJoined', res.content.data)
        // TODO : reqType = add ? GET MESSAGES
      })

      return x
    }

  }
}
</script>

<style lang="scss" scoped>
  .wrap {

    &-rejoin {
      background: #D8EDFF;
      height: 50px;
      line-height: 50px;
      margin-top: -91px;
      margin-bottom: 40px;
      padding: 0 20px;
      text-align: center;
      color: #777;
      border: 1px solid #1F91F2;
      border-radius: 8px;
    }

    &-messages {
      height: calc(100vh - 164px);
      margin-bottom: 20px;
      margin-right: -20px;
      margin-left: -20px;
      padding: 0 10px;
      user-select: none; /* Standard */

      .message {

        .text {
          background: #eee;
          color: #999;
          position: relative;
        }

        &.sent {

          .text {
            float: right;
            background: #1F91F2;
            color: white;
            padding: 10px;
            border-radius: 12px 12px 0 12px;
            margin-bottom: 40px;

            .time {
              width: 200px;
              height: 30px;
              line-height: 30px;
              position: absolute;
              bottom: -30px;
              right: 0;
              text-align: right;
              font-size: 12px;
              color: #ddd;
              display: block;

              &:hover {
                color: #999;
              }
            }
          }

          &:hover {
            .text {
              .time {
                color: #999;
              }
            }
          }
        }

      }

    }

    &-control {
      height: 63px;
      line-height: 63px;
      padding: 0 10px;
      background: #eee;
      overflow: hidden;
      margin-bottom: -20px;
      margin-left: -20px;
      margin-right: -20px;
    }

    &-recorder {
      text-align: center;

      .time {
        font-size: 18px;
        color: #999;
        height: 50px;
        line-height: 50px;
      }
    }
  }
</style>
