<template>
  <div
    v-loading="loading.wrap"
    element-loading-text="Retrieving Information..."
  >
    <el-empty
      v-if="selectedPage === null"
      description="Select one of the page at the right side to get started."
    />

    <el-empty
      v-else-if="selectedPage === 'Does not exists.'"
      description="You are not joined to this page. Join now to send prayers."
    >
      <el-button
        type="primary"
        size="mini"
        :disabled="disabled.btnJoin"
        @click="handleJoinClick"
      >
        Join
      </el-button>
    </el-empty>

    <div v-else style="background: white;">
      <div
        v-loading="!visibility.controls && $route.query.psid !== undefined"
        element-loading-text="Getting Messages"
        class="wrap-messages"
      >
        <div
          v-if="sending.status"
          class="message sent sending"
        >
          <div class="text">
            <i class="el-icon-loading" />
            {{ sending.text }}

            <div class="time" />
          </div>
        </div>
        <div
          v-for="m in fbmessages"
          :key="m.id"
          :class="`message ${isSent(m.tags) === true ? 'sent' : 'received'}`"
        >
          <div class="text">
            {{ m.message }}

            <div class="time">
              <el-tooltip
                class="item"
                effect="light"
                :content="parseDate(m.created_time).fullDate"
                :placement="isSent(m.tags) === true ? 'left' : 'right'"
              >
                <span>
                  {{ parseDate(m.created_time).date }}
                </span>
              </el-tooltip>
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
      <div v-if="visibility.controls" class="wrap-control">
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
          :value="visibility.recorder"
          @after-leave="handlePopOverAfterLeave"
        >
          <div class="wrap-recorder">
            <div v-if="!recorder.hasBlob">
              <div class="time">
                {{ timer.time }}
              </div>
              <el-button
                :icon="timer.status ? 'el-icon-check' : 'el-icon-microphone'"
                :type="timer.status ? 'danger' : 'primary'"
                circle
                @click="timer.status ? stopRecording() : initRecording()"
              />

              <el-button
                v-if="timer.status"
                icon="el-icon-close"
                size="small"
                circle
                @click="handleRecorderCancel()"
              />
            </div>

            <div
              v-if="recorder.hasBlob"
            >
              <audio
                id="recordedAudio"
                :controls="recorder.player.controls"
                :src="recorder.player.src"
                autoplay="false"
              />

              <div
                style="margin-top: 10px;"
              >
                <!-- TODO : Change back @click to sendMessage('audio') -->
                <!-- @click="sendMessage('audio')" -->
                <!-- @click="uploadBlob()" -->
                <el-button
                  icon="el-icon-s-promotion"
                  type="primary"
                  circle
                  @click="sendMessage('audio')"
                />

                <el-button
                  icon="el-icon-refresh"
                  type="default"
                  size="small"
                  circle
                  @click="resetRecorder(true)"
                />
              </div>
            </div>
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
          @click="sendMessage('text')"
        >
          <i class="el-icon-s-promotion" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as Facebook from 'fb-sdk-wrapper'
// import Recorder from 'audio-recorder-js'

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
        wrap: true,
        messages: false
      },
      visibility: {
        controls: false,
        recorder: false
      },
      sending: {
        text: '',
        status: false
      },
      fbmessages: [],
      timer: {
        time: '01:00',
        status: false,
        interval: '01:00'
      },
      recorder: {
        fn: '',
        is: {
          initiated: false,
          recording: false,
          waitingToRecord: false,
          cancelled: false
        },
        blob: '',
        visual: [],
        hasBlob: false,
        chunks: [],
        player: {
          controls: false,
          src: ''
        }
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
      messageAll: 'messages/messageAll',
      pages: 'pages/pages'
    }),

    currentPage () {
      let x = {}

      if (this.$route.query.page !== undefined) {
        x = { ...this.pages.find(p => p.id === parseInt(this.$route.query.page)) }
      }
      return x
    }
  },

  watch: {
    '$route.query' (nq, oq) {
      if (nq.page !== undefined) {
        this.setPageOn(nq.page)

        if (nq.mid !== undefined) {
          this.getFBMessage()

          if (nq.psid === undefined) {
            this.visibility.controls = false
          }
        } else {
          this.fbmessages = []
          this.visibility.controls = false
        }
      } else {
        this.selectedPage = null
      }
    },

    message (nv, ov) {
      nv !== ''
        ? this.msgControl.empty = false
        : this.msgControl.empty = true
    },

    recorder: {
      handler (nv, ov) {
        console.log('watch ')
        this.recorder.blob !== ''
          ? this.recorder.hasBlob = true
          : this.recorder.hasBlob = false

        if (nv.is.initiated && nv.is.waitingToRecord) {
          this.startRecording()
        }

        console.log(this.recorder.blob)
      },
      deep: true
    }
  },

  mounted () {
    if (this.$route.query.page !== undefined) {
      this.setPageOn(this.$route.query.page)
      if (this.$route.query.mid !== undefined) {
        this.getFBMessage()
        if (this.$route.query.psid === undefined) {
          this.visibility.controls = false
        }
      } else {
        this.fbmessages = []
        this.visibility.controls = false
      }
    } else {
      this.selectedPage = null
      this.loading.wrap = false
    }

    // this.initRecorder()
  },

  methods: {
    ...mapActions({
      getMessages: 'messages/browse'
    }),

    async sendMessage (mType = 'text') {
      if (this.$route.query.psid !== undefined) {
        console.log(mType)
        const m = this.message + ''
        this.message = ''

        this.sending = {
          status: true,
          text: mType === 'text' ? m : 'Voice Message.'
        }

        const payload = mType === 'text'
          ? {
              recipient: {
                id: this.$route.query.psid
              },
              message: {}
            }
          : new FormData()

        // TODO: if voice , send blob to backend and get response of voice file path.
        // i.e. const x = await ( upload to be and get file path)
        // then : add url to message.payload.url

        if (mType === 'text') {
          payload.message.text = mType === 'text' ? m : 'Voice Message.'

          await Facebook.api(`/me/messages?access_token=${this.currentPage.access_token}`, 'post', payload)
            .then((res) => {
              this.resetRecorder(true)
              this.getFBMessage(true)
            })
            .catch((error) => {
              this.$notify.error({
                title: 'Sorry, something went wrong.',
                message: 'There was an error while sending the message. Please try again later.'
              })

              this.$cg({
                type: 'error',
                title: 'Facebook Send Message Error',
                logs: error
              })
            })
        } else {
          payload.append('recipient', JSON.stringify({ id: this.$route.query.psid }))
          payload.append('message', JSON.stringify({
            attachment: {
              type: 'audio',
              payload: { is_reusable: true }
            }
          }))
          payload.append('filedata', this.recorder.blob)

          const p = {
            method: 'post',
            url: `/me/messages?access_token=${this.currentPage.access_token}`,
            baseURL: 'https://graph.facebook.com/v14.0',
            data: payload,
            headers: {
              contentType: 'formData'
            }
          }

          await this.$sender(p)
            .then((res) => {
              this.resetRecorder(true)
              this.getFBMessage(true)
            })
        }
      }
    },

    setPageOn (page) {
      this.checkIfPageExists(page)
    },

    async checkIfPageExists (pageId) {
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
    },

    async getFBMessage (silent = false) {
      if (!silent) {
        this.fbmessages = []
        this.visibility.controls = false
      }

      await Facebook.api(`/${this.$route.query.mid}/messages`, 'get', {
        fields: 'created_time,id,message,from,to,tags',
        access_token: this.currentPage.access_token
      })
        .then((res) => {
          this.fbmessages = res.data
          this.visibility.controls = true
          this.sending = {
            status: false,
            text: ''
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: 'Sorry, something went wrong.',
            message: 'There was an error while getting the messages. Please try again later.'
          })

          this.$cg({
            type: 'error',
            title: 'Facebook Send Message Error',
            logs: error
          })
        })
    },

    isSent (tags) {
      return tags.data.find(t => t.name === 'sent') !== undefined
    },

    parseDate (d) {
      const x = new Date(d)

      return {
        fullDate: this.$moment(d).format('D MMM YY hh:mm A'),
        date: this.$moment(x.getTime()).fromNow()
      }
    },

    handleStartTimer () {
      this.timer.interval = setInterval(() => {
        if (this.timer.time === 0) {
          this.stopRecording()
          this.handleStopTimer()
          this.resetTimer()
        } else {
          this.timer.status = true

          if (this.timer.time === '01:00') {
            this.timer.time = 10
          }
          console.log(this.timer.time--)
        }
      }, 1000)
    },

    handleStopTimer () {
      this.timer.status = false
      clearInterval(this.timer.interval)
    },

    handleRecorderCancel () {
      this.stopRecording(true)
    },

    resetTimer () {
      this.timer.time = '01:00'
      this.timer.status = false
    },

    initRecorder () {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          this.recorder.fn = new MediaRecorder(stream)
          this.recorder.is.initiated = true

          this.recorder.fn.ondataavailable = (e) => {
            this.recorder.chunks.push(e.data)
            if (this.recorder.fn.state === 'inactive') {
              const blob = new Blob(this.recorder.chunks, { type: 'audio/wav' })
              this.recorder.player.src = URL.createObjectURL(blob)
              this.recorder.player.controls = true

              if (!this.recorder.is.cancelled) {
                this.recorder.blob = blob
              }
              // sendData(blob) // might need this
              this.recorder.is.cancelled = false
            }
          }

          this.recorder.fn.onstop = (e) => {
            stream.getTracks().forEach(function (track) {
              track.stop()
            })
            this.resetRecorder()
          }
        })
    },

    initRecording () {
      if (!this.recorder.is.initiated) {
        this.recorder.is.waitingToRecord = true
        this.initRecorder()
      } else {
        this.startRecording()
      }
    },

    startRecording () {
      this.recorder.chunks = []
      this.recorder.fn.start()
      this.handleStartTimer()
      this.recorder.is.waitingToRecord = false
    },

    stopRecording (cancelled = false) {
      if (cancelled) {
        this.recorder.is.cancelled = true
      }

      this.recorder.fn.stop()
      this.handleStopTimer()
    },

    resetRecorder (recorderClosed = false) {
      this.resetTimer()
      this.recorder.is.initiated = false

      if (recorderClosed) {
        this.recorder.blob = ''
      }
    },

    handlePopOverAfterLeave () {
      this.resetRecorder(true)
    },

    async uploadBlob () {
      const fd = new FormData()
      fd.append('file', this.recorder.blob)

      const payload = {
        method: 'post',
        url: 'file/upload',
        headers: {
          contentType: 'formData'
        },
        data: fd
      }

      console.log(this.recorder.blob)

      const r = await this.$sender(payload)
      console.log(r)

      // this.deleteBlob(r.data.file_name)
    },

    async deleteBlob () {
      const r = await this.$sender({
        method: 'delete',
        url: 'file/delete'
      })

      console.log(r)
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
      height: calc(100vh - 134px);
      margin-top: -20px;
      margin-right: -20px;
      margin-left: -20px;
      padding: 0 10px;
      padding-top: 10px;
      user-select: none; /* Standard */
      overflow-y: auto;
      display: flex;
      flex-direction: column-reverse;

      .message {
        margin-bottom: 10px;

        .text {
          background: #eee;
          color: #999;
          position: relative;
          border-radius: 14px 14px 14px 14px;
          padding: 10px;
          transition: all 200ms ease-in-out;
          margin-bottom: 25px;

          .time {
            width: 200px;
            height: 25px;
            line-height: 25px;
            position: absolute;
            bottom: -25px;
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
            opacity: 0.8;
          }
        }

        .time {
          transition: all 200ms ease-in-out;
        }

        &.sent {

          &.sending {

            .text {
              opacity: .6;
            }
          }

          .text {
            float: right;
            background: #1F91F2;
            color: white;
            margin-bottom: 40px;

            .time {
              right: 0;
              text-align: right;
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

        &.received {

          .text {
            float: left;
            color: #777;

            .time {
              left: 0;
              text-align: left;
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
