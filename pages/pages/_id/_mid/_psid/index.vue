<!-- eslint-disable vue/html-self-closing -->
<template>
  <div
    v-loading="loading.wrap"
    element-loading-text="Retrieving Information..."
    :element-loading-background="
      theme === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0, 0, 0, 0.5)'
    "
    style="min-width: 300px"
    @click="handleMessageWrapClick"
  >
    <el-empty
      v-if="selectedPage === null"
      description="Select one of the page at the right side to get started."
      style="min-width: 300px;"
    />

    <el-empty
      v-else-if="selectedPage === 'Does not exists.'"
      description="You are not joined to this page. Join now to send prayers."
      style="min-width: 300px;"
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

    <div v-else class="wrap-chat">
      <div v-if="loadMore === true" class="scroll-loading">
        Loading...
      </div>
      <!-- Message list -->
      <div
        id="messages"
        ref="messages"
        :key="rerenderx"
        v-loading="!visibility.controls && $route.params.psid !== undefined"
        element-loading-text="Getting Messages"
        :element-loading-background="
          theme === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0, 0, 0, 0.5)'
        "
        class="wrap-messages"
        @scroll="handleScroll"
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
              <div v-if="m.hasOwnProperty('attachment') && m.attachment === false">
                Attachment cannot be shown
              </div>
              <div
                v-else-if="m.hasOwnProperty('attachment') && m.attachment !== false && m.attachment.mime_type.startsWith('image/')"
                style="min-width: 54px; text-align: center"
              >
                <img :src="m.attachment.image_data.url" alt="Attachment Image" style="width: 200px; height: auto;" />
              </div>
              <div
                v-else-if="m.hasOwnProperty('attachment') && m.attachment !== false"
                style="min-width: 54px; text-align: center"
              >
                <div
                  v-if="m.attachment.mime_type.startsWith('audio/')"
                  style="height: 54px; line-height: 54px"
                >
                  <!-- Audio Play -->
                  <button
                    v-if="isPlaying === false"
                    class="el-icon-video-play btn-play"
                    @click="setAudio(m)"
                  ></button>
                  <button v-else class="btn-play" @click="handlePause">
                    <i
                      :class="
                        audioPlayer.src === m.attachment.file_url
                          ? audioPlayer.icon
                          : 'el-icon-video-play'
                      "
                    />
                  </button>
                </div>
              </div>
              <!-- Else -->
              <div
                v-else
                v-loading="true"
                element-loading-background="rgba(0, 0, 0, 0)"
                style="width: 54px; height: 54px; color: white"
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

export default {
  layout: 'app',
  data () {
    return {
      next: null,
      previousScrollTop: 0,
      scrollTime: 0,
      loadMore: false,
      percentage: 0,
      isPlaying: false,
      eventSource: null,
      audioPlayer: {
        source: null,
        src: '',
        currentTime: 0,
        timeLabel: '00:00:00',
        duration: 0,
        icon: 'el-icon-video-play'
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
        recPop: false,
        audioPlayer: false
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
  },

  computed: {
    ...mapGetters({
      messages: 'messages/messages',
      messageAll: 'messages/messageAll',
      pages: 'pages/pages',
      theme: 'settings/theme',
      notifications: 'notifications/notifications',
      navIsCollapsed: 'settings/navIsCollapsed',
      isMobile: 'settings/isMobile'
    }),

    audioDuration () {
      return 0
    },

    currentPage () {
      let x = {}
      const data = this.$route.params.id
      if (data !== undefined) {
        x = { ...this.pages.find(p => p.id === parseInt(data)) }
      }

      return x
    },

    renderMessage () {
      return this.fbmessages
    }
  },

  watch: {
    pages (n) {
      if (this.$route.params.id !== undefined) {
        let x = {}
        x = { ...this.pages.find(p => p.id === parseInt(this.$route.params.id)) }

        this.getMessages(x.page_id)
      }
      console.log('watch')
      this.getFBMessage(false, false)
      console.log('watch pages')
    },

    message (nv, ov) {
      nv !== ''
        ? this.msgControl.empty = false
        : this.msgControl.empty = true
    },

    recorder: {
      handler (nv, ov) {
        this.recorder.blob !== ''
          ? this.recorder.hasBlob = true
          : this.recorder.hasBlob = false

        if (nv.is.initiated && nv.is.waitingToRecord) {
          this.startRecording()
        }
      },
      deep: true
    },

    fbmessages: {
      handler (n, o) {
        if (typeof (n) !== 'undefined') {
          if (n.length > 0) {
            this.voiceMessages.list = []

            n.forEach((m) => {
              if (m.message === '') {
                this.voiceMessages.list.push(m.id)
              }
            })
          }
        }
      },
      deep: true
    },

    'voiceMessages.list' (n, o) {
      if (n.length > 0 && o.length === 0 && !this.voiceMessages.loading) {
        if (!this.voiceMessages.loading) { this.voiceMessages.loading = true }

        n.forEach((mid) => {
          this.getAttachments(mid)
        })
      }
    },

    'visibility.audioPlayer' (n) {
      if (n === false) {
        this.audioPlayer.duration = 0
      }
    }
  },

  mounted () {
    this.visibility.controls = false
    this.setPageOn(this.$route.params.id)
    this.getFBMessage()
    console.log('mounted')

    if (this.isMobile) {
      this.toggleNavCollapse()
    }
    // this.$root.$on('get-fb-message', res => this.getFBMessage())

    this.$root.$on('new-message', (res) => {
      if (this.$route.params.mid) {
        this.getFBMessage(true)
      };
      console.log('event on')
    })
  },

  methods: {
    ...mapActions({
      getMessages: 'messages/browse',
      updateNotification: 'notifications/updateNotification',
      toggleNavCollapse: 'settings/toggleNavCollapse'
    }),

    async handleScroll (event) {
      const scrollContainer = this.$refs.messages
      const difference = scrollContainer.scrollHeight + scrollContainer.scrollTop
      this.previousScrollTop = scrollContainer.scrollTop

      if (difference - this.scrollTime <= scrollContainer.clientHeight + 1) {
        this.loadMore = true
        this.scrollTime++

        if (this.next) {
          await this.$sender({
            method: 'get',
            url: `${this.currentPage.page_id}/${this.$route.params.mid}/messages?next=${this.next}`,
            data: {},
            headers: {
              contentType: 'application/json'
            }
          }).then((res) => {
            this.next = res.content.data.next
            this.fbmessages = [...this.fbmessages, ...res.content.data.messages]
            this.visibility.controls = true
          }).catch((error) => {
            this.$notify.error({
              title: 'Sorry, something went wrong.',
              message: 'There was an error while getting the messages. Please try again later.'
            })

            this.$cg({
              type: 'error',
              title: 'Facebook Get Message Error',
              logs: error
            })
          })
        }

        this.$nextTick(() => {
          this.loadMore = false
          this.scrollToTop()
        })
      }
    },

    scrollToTop () {
      const scrollContainer = this.$refs.messages
      scrollContainer.scrollTop = this.previousScrollTop - 1
    },

    async setAudio (m) {
      this.isPlaying = true
      await this.$sender({
        method: 'post',
        url: 'message/get-audio',
        data: { url: m.attachment.file_url }
      }).then((res) => {
        this.audioPlayer.src = m.attachment.file_url
        this.audioPlayer.source = new Audio('data:audio/webm;base64,' + res.content.data.blob)
        this.audioPlayer.source.addEventListener('timeupdate', this.timeupdate, false)
        this.audioPlayer.source.addEventListener('pause', (e) => {
          this.audioPlayer.icon = 'el-icon-video-play'
        })
        this.audioPlayer.source.addEventListener('ended', (e) => {
          this.audioPlayer.icon = 'el-icon-video-play'
        })
        this.playAudio()
        this.visibility.audioPlayer = true
      })
    },

    stopAudio () {
      this.visibility.audioPlayer = false
      this.audioPlayer.source.pause()
    },

    timeupdate () {
      if (this.audioPlayer.source.duration !== Infinity) {
        this.audioPlayer.duration = parseFloat((100 * this.audioPlayer.source.currentTime) / this.audioPlayer.source.duration).toFixed(2)
      }
      this.audioPlayer.currentTime = this.audioPlayer.source.currentTime

      const hr = Math.floor(this.audioPlayer.currentTime / 3600)
      const min = Math.floor((this.audioPlayer.currentTime - (hr * 3600)) / 60)
      const sec = Math.floor(this.audioPlayer.currentTime - (hr * 3600) - (min * 60))
      this.audioPlayer.timeLabel = `${hr.toString()
        .padStart(2, '0')}:${min.toString()
        .padStart(2, '0')}:${sec.toString()
        .padStart(2, '0')}`
    },

    playAudio () {
      const ap = this.audioPlayer
      if (ap.source.paused) {
        ap.source.play()
        ap.duration = 0
        ap.icon = 'el-icon-video-pause'
      } else {
        ap.source.pause()
      }
    },

    handlePause () {
      this.audioPlayer.source.pause()
      this.isPlaying = false
    },

    async sendMessage (mType = 'text') {
      console.log('send message')
      const lastMessage = this.renderMessage.slice().find(m => this.isSent(m.tags) === false)
      let lastDate = ''

      // close audio recorder popup if the message type is 'audio'
      if (mType === 'audio') { this.visibility.recPop = false }

      if (lastMessage) {
        lastDate = lastMessage.created_time
      }

      if (this.message !== '') {
        mType = 'text'
      }

      const m = this.message + ''
      this.message = ''

      this.sending = {
        status: true,
        text: mType === 'text' ? m : 'Voice Message.'
      }
      const payload = mType === 'text'
        ? {
            recipient_id: this.$route.params.psid,
            message: {},
            access_token: this.currentPage.access_token,
            last_date: lastDate
          }
        : new FormData()

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
        payload.append('recipient', JSON.stringify({ id: this.$route.params.psid }))
        payload.append('access_token', this.currentPage.access_token)
        payload.append('last_date', lastDate)
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

      // set responder
      await this.$sender({
        method: 'put',
        url: `client/${this.$route.params.psid}/${this.$auth.user.id}/set-responder`,
        data: ''
      }).then((res) => {
        this.$root.$emit('set-responder', res.content.data.responder)
      })
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
    },

    async initAddEdit (reqType) {
      const payload = {
        method: reqType === 'add' ? 'post' : 'put',
        url: `user/page/${reqType}/${this.$route.params.id}`
      }

      if (reqType === 'edit') {
        payload.message = {
          success: 'You rejoined chat to this page.'
        }
      }

      const x = await this.$sender(payload).then((res) => {
        this.selectedPage = 'Exits.'
        this.$root.$emit('PageJoined', res.content.data)
      })

      return x
    },

    async getFBMessage (silent = false, callStream = true) {
      if (!silent) {
        this.visibility.controls = true
      }

      if (typeof (this.currentPage.page_id) === 'undefined') {
        return
      }

      console.log('get fb messages')

      await this.$sender({
        method: 'get',
        url: `${this.currentPage.page_id}/${this.$route.params.mid}/messages`,
        data: {},
        headers: {
          contentType: 'application/json'
        }
      }).then((res) => {
        this.next = res.content.data.next

        this.fbmessages = res.content.data.messages
        this.visibility.controls = true
        this.sending = {
          status: false,
          text: ''
        }
        this.$root.$emit('restart-stream', callStream)
      }).catch((error) => {
        this.$notify.error({
          title: 'Sorry, something went wrong.',
          message: 'There was an error while getting the messages. Please try again later.'
        })

        this.$cg({
          type: 'error',
          title: 'Facebook Get Message Error',
          logs: error
        })
      })
    },

    async getAttachments (mid) {
      const fmwa = this.fbmessages.find(fm => fm.id === mid)

      if (typeof (fmwa) !== 'undefined') {
        const p = {
          method: 'get',
          url: `${this.currentPage.page_id}/${mid}/attachments`,
          data: {},
          headers: {
            contentType: 'application/json'
          }
        }

        await this.$sender(p).then((res) => {
          const r = res.content.data.data
          if (r.length === 1) {
            fmwa.attachment = r[0]
            this.fbmessages[this.fbmessages.findIndex(m => m.id === mid)] = fmwa
            this.rerenderx += 1
          } else {
            fmwa.attachment = false
            this.fbmessages[this.fbmessages.findIndex(m => m.id === mid)] = fmwa
            this.rerenderx += 1
          }

          this.voiceMessages.list = this.voiceMessages.list.filter(l => l !== mid)

          if (this.voiceMessages.list.length === 0) {
            this.voiceMessages.loading = false
          }
        })
      }

      this.$nextTick(() => {
        if (this.scrollTime !== 0) {
          this.scrollToTop()
        }
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
            this.timer.time = 60
          }
          this.timer.time--
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

      await this.$sender(payload)
    },

    async deleteBlob () {
      await this.$sender({
        method: 'delete',
        url: 'file/delete'
      })
    },

    handleMessageWrapClick () {
      if (this.isMobile && !this.navIsCollapsed) { this.toggleNavCollapse() }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-loading {
  width: calc(100% - 324px);
  text-align: center;
  background-color: #1f91f2;
  color: white;
  padding: 5px;
  position: fixed;
  z-index: 2;
}

.wrap {
  &-chat {
    height: calc(100vh - 60px);
    margin: -20px;
    margin-bottom: -20px;
    overflow: hidden;
    position: relative;
  }

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
    min-width: 300px;
    padding: 0 10px;
    padding-top: 10px;
    user-select: none;
    overflow-y: auto;
    overflow-x: hidden;
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

        .btn-play {
          background: transparent;
          border: 0px solid transparent;
          width: 40px;
          height: 40px;
          line-height: 39px;
          border-radius: 20px;
          color: white;
          font-size: 20px;
          transition: all 200ms ease-in-out;
          cursor: pointer;

          &:hover {
            background: rgba(0, 0, 0, 0.1);
          }
        }

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
    min-width: 300px;

    .input {
      display: inline-block;
      outline: none;
      padding: 10px;
      border: 0px solid transparent;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.1);
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

  &-audio {
    &-player {
      background: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(15px);
      position: absolute;
      top: -60px;
      height: 60px;
      width: 100%;
      z-index: 999;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0);
      transition: all 200ms ease-in-out;

      audio {
        background-color: blue;
        width: calc(100% - 60px);
        background: transparent;
      }

      .close {
        position: absolute;
        height: 60px;
        width: 60px;
        line-height: 60px;
        text-align: center;
        color: #454545;
        top: 0;
        right: 0;
        cursor: pointer;
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }
      }

      .timelabel {
        position: absolute;
        top: 0;
        right: 60px;
        width: 100px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }

      .wrap-timeline {
        position: relative;
        width: calc(100% - 180px);
        height: 60px;

        .timeline {
          height: 5px;
          width: 100%;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 2.5px;
          position: absolute;
          top: calc((60px / 2) - 2.5px);
          left: 20px;

          .current {
            position: absolute;
            height: 5px;
            top: 0;
            left: 0;
            border-radius: 2.5px;
            background: linear-gradient(
              135deg,
              rgba(31, 145, 242, 1) 0%,
              rgba(0, 84, 156, 1) 100%
            );
            transition: all 300ms;
          }
        }
      }

      &.show {
        top: 0;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
      }

      &.dark {
        background: rgba(0, 0, 0, 0.5);

        .close {
          color: red;
        }
      }
    }
  }

}
</style>
