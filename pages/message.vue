<!-- eslint-disable vue/html-self-closing -->
<template>
  <div
    v-loading="loading.wrap"
    element-loading-text="Retrieving Information..."
    :element-loading-background="
      theme === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0, 0, 0, 0.5)'
    "
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

    <div v-else>
      <!-- Audio -->
      <audio :key="audio.src" controls autoplay>
        <source :src="audio.src" :type="audio.type" />
      </audio>
      <div
        :key="rerenderx"
        v-loading="!visibility.controls && $route.query.psid !== undefined"
        element-loading-text="Getting Messages"
        :element-loading-background="
          theme === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0, 0, 0, 0.5)'
        "
        class="wrap-messages"
      >
        <div v-if="sending.status" class="message sent sending">
          <div class="text">
            <i class="el-icon-loading" />
            {{ sending.text }}

            <div class="time" />
          </div>
        </div>
        <div
          v-for="m in renderMessage"
          :key="m.id"
          :class="`message ${isSent(m.tags) === true ? 'sent' : 'received'}`"
        >
          <div class="text">
            <div v-if="m.message === ''">
              <!-- If Message is attachment -->
              <div v-if="m.hasOwnProperty('attachment')">
                <div
                  v-if="m.attachment.mime_type.startsWith('audio/')"
                  style="height: 54px; line-height: 54px"
                >
                  <!-- Audio Play -->
                  <button @click="playAudio(m)">Play</button>
                </div>
              </div>
              <!-- Else -->
              <div
                v-else
                v-loading="true"
                element-loading-background="rgba(0, 0, 0, 0)"
                style="width: 300px; height: 54px; color: white"
              />
            </div>
            <div v-else>
              {{ m.message }}
            </div>

            <!-- Sent Time -->
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
            <!-- e.o Sent Time -->
          </div>

          <div style="clear: both" />
        </div>
      </div>
      <!-- Rejoin -->
      <div v-if="selectedPage === 'Left.'" class="wrap-rejoin">
        You left this page chat.
        <el-button type="primary" size="small" @click="handleRejoinClick">
          Rejoin Now
        </el-button>
      </div>
      <!-- e.o Rejoin -->

      <!-- Input Controls -->
      <div v-if="visibility.controls" :class="`wrap-control ${theme}`">
        <input
          v-model="message"
          type="text"
          class="input"
          :placeholder="
            selectedPage === 'Left.'
              ? 'You cannot send messages because you have left the page. Join again to be able to send messages again.'
              : 'Press enter to send...'
          "
          :disabled="
            selectedPage === 'Left.' ? true : false || visibility.recPop
          "
          @keyup.enter="sendMessage"
        />
        <el-input
          v-model="message"
          :placeholder="
            selectedPage === 'Left.'
              ? 'You cannot send messages because you have left the page. Join again to be able to send messages again.'
              : 'Press enter to send ...'
          "
          size="small"
          clearable
          style="display: none; width: calc(100% - 50px)"
          class="blue"
          :disabled="
            selectedPage === 'Left.' ? true : false || visibility.recPop
          "
          @keyup.enter.native="sendMessage"
        />

        <el-popover
          v-if="msgControl.empty"
          v-model="visibility.recPop"
          placement="top"
          width="400"
          trigger="manual"
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

            <div v-if="recorder.hasBlob">
              <audio
                id="recordedAudio"
                :controls="recorder.player.controls"
                :src="recorder.player.src"
                autoplay="false"
              />

              <div style="margin-top: 10px">
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
            :style="`width: 40px; color: #${
              visibility.recPop ? 'F56C6C' : '409EFF'
            };`"
            :disabled="selectedPage === 'Left.' ? true : false"
            @click="visibility.recPop = !visibility.recPop"
          >
            <i
              :class="
                visibility.recPop ? 'el-icon-close' : 'el-icon-microphone'
              "
            />
          </el-button>
        </el-popover>

        <el-button
          v-else
          type="text"
          style="width: 40px"
          @click="sendMessage('text')"
        >
          <i class="el-icon-s-promotion" />
        </el-button>
      </div>
      <!-- e.o Input Controls -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import Recorder from 'audio-recorder-js'

export default {
  layout: 'app',
  data () {
    return {
      audio: {
        src: '',
        type: ''
      },
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
        recorder: false,
        recPop: false
      },
      sending: {
        text: '',
        status: false
      },
      fbmessages: [],
      voiceMessages: {
        list: [],
        loading: false
      },
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
      },
      rerenderx: 0
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
      pages: 'pages/pages',
      theme: 'settings/theme'
    }),

    currentPage () {
      let x = {}

      if (this.$route.query.page !== undefined) {
        x = { ...this.pages.find(p => p.id === parseInt(this.$route.query.page)) }
      }
      return x
    },

    renderMessage () {
      return this.fbmessages
    }
  },

  watch: {
    '$route.query' (nq, oq) {
      if (nq.page !== undefined) {
        this.setPageOn(nq.page)

        if (nq.mid !== undefined) {
          this.fbmessages = []
          this.voiceMessages.list = []
          this.voiceMessages.loading = false
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
    },

    fbmessages: {
      handler (n, o) {
        if (n.length > 0) {
          console.group('watcher : fbmessages')
          this.voiceMessages.list = []

          n.forEach((m) => {
            if (m.message === '') {
              console.log('emty')
              this.voiceMessages.list.push(m.id)
            }
          })

          console.log(this.voiceMessages.list)

          console.groupEnd()
        }
      },
      deep: true
    },

    'voiceMessages.list' (n, o) {
      console.log('n', n.length)
      console.log('o', o.length)
      console.log('loading', this.voiceMessages.loading)

      if (n.length > 0 && o.length === 0 && !this.voiceMessages.loading) {
        if (!this.voiceMessages.loading) { this.voiceMessages.loading = true }
        console.log('loading', this.voiceMessages.loading)

        n.forEach((mid) => {
          this.getAttachments(mid)
        })
      }
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

    playAudio (m) {
      this.audio = m
      this.audio.src = m.attachment.file_url
      this.audio.type = m.attachment.mime_type
      console.log(this.audio)
    },

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
              recipient_id: this.$route.query.psid,
              message: {},
              access_token: this.currentPage.access_token
            }
          : new FormData()

        // TODO: if voice , send blob to backend and get response of voice file path.
        // i.e. const x = await ( upload to be and get file path)
        // then : add url to message.payload.url

        if (mType === 'text') {
          payload.message = mType === 'text' ? m : 'Voice Message.'
          await this.$sender({
            method: 'post',
            url: 'me/send-messages',
            data: payload
          }).then((res) => {
            this.resetRecorder(true)
            this.getFBMessage(true)
          }).catch((error) => {
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
          payload.append('access_token', this.currentPage.access_token)
          payload.append('message', JSON.stringify({
            attachment: {
              type: 'audio',
              payload: { is_reusable: true }
            }
          }))
          payload.append('filedata', this.recorder.blob)

          await this.$sender({
            method: 'post',
            url: 'me/send-voice',
            data: payload,
            headers: {
              contentType: 'formData'
            }
          }).then((res) => {
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
      this.fbmessages = []

      // await Facebook.api(`/${this.$route.query.mid}/messages`, 'get', {
      await this.$sender({
        method: 'get',
        url: `${this.$route.query.mid}/messages/${this.currentPage.access_token}`,
        data: {},
        headers: {
          contentType: 'application/json'
        }
      }).then((res) => {
        this.fbmessages = res.content.data.data
        this.visibility.controls = true
        this.sending = {
          status: false,
          text: ''
        }
      }).catch((error) => {
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

      /*
      await Facebook.api(`/${this.$route.query.mid}/messages`, 'get', {
        fields: 'created_time,id,message,from,to,tags',
        access_token: this.currentPage.access_token
      })
        .then((res) => {
          this.fbmessages = res.data
          console.log('getFbMessage')
          console.log(this.fbmessages)
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
        */
    },

    async getAttachments (mid) {
      const fmwa = this.fbmessages.find(fm => fm.id === mid)

      if (typeof (fmwa) !== 'undefined') {
        const p = {
          method: 'get',
          url: `${mid}/attachments/${this.currentPage.access_token}`,
          data: {},
          headers: {
            contentType: 'application/json'
          }
        }

        await this.$sender(p).then((res) => {
          console.group('showing')
          console.log(fmwa)
          const r = res.content.data.data
          if (r.length === 1) {
          // fb message with attachment
          // console.log(fmwa)
            fmwa.attachment = r[0]
            this.fbmessages[this.fbmessages.findIndex(m => m.id === mid)] = fmwa
            console.log(this.fbmessages[this.fbmessages.findIndex(m => m.id === mid)])
            this.rerenderx += 1
          }

          this.voiceMessages.list = this.voiceMessages.list.filter(l => l !== mid)

          if (this.voiceMessages.list.length === 0) {
            this.voiceMessages.loading = false
          }

          console.log(this.voiceMessages.list)
          console.groupEnd()
        })
      } else {
        console.group('else')
        console.log('not showing')
        console.groupEnd()
      }
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
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then((stream) => {
          const mime = ['audio/wav', 'audio/mpeg', 'audio/webm', 'audio/ogg'].filter(MediaRecorder.isTypeSupported)[0]
          this.recorder.fn = new MediaRecorder(stream, { mimeType: mime })
          this.recorder.is.initiated = true

          this.recorder.fn.ondataavailable = (e) => {
            this.recorder.chunks.push(e.data)
            if (this.recorder.fn.state === 'inactive') {
              const blob = new Blob(this.recorder.chunks, { type: this.recorder.chunks[0].type })
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
      background: #d8edff;
      height: 50px;
      line-height: 50px;
      margin-top: -91px;
      margin-bottom: 40px;
      padding: 0 20px;
      text-align: center;
      color: #777;
      border: 1px solid #1f91f2;
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
              opacity: 0.6;
            }
          }

          .text {
            float: right;
            background: #1f91f2;
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
      // transition: all 300ms ease-in-out;

      .input {
        display: inline-block;
        outline: none;
        padding: 10px;
        border: 0px solid transparent;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.1);
        // background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%);
        color: #454545;
        width: calc(100% - 66px);
      }

      &.dark {
        background: #454545;
        box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.1);

        .input {
          background: rgba(255, 255, 255, 0.08);
          color: #ddd;

          &::placeholder {
            color: #999;
          }

          &:focus {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        .blue {
          input {
            background: blue;
          }
        }

        .el-input--small .el-input__inner {
          background: blue;
        }
      }

      .el-input--small .el-input__inner {
        background: blue;
      }

      .el-input {
        // background: blue;

        &__innner {
          background: blue;
        }

        &--small {
          .el-input__inner {
            background: blue;
          }
        }

        .el-input__inner {
          background: blue !important;
        }
      }
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
