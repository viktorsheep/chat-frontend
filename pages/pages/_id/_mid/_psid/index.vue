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

    <div v-else class="wrap-chat">
      <!-- Audio Player -->
      <!-- <div :class="`wrap-audio-player ${visibility.audioPlayer ? 'show' : ''}`">
        <audio controls autoplay :src="audioPlayer.source">
          <source type="audio/webm" />
          Your browser does not support the audio element.
        </audio>
        <el-progress :percentage="percentage" color="#409eff"></el-progress>
        <div class="wrap-timeline">
          <div class="timeline">
            <div
              class="current"
              :style="`width: ${audioPlayer.duration}%`"
            ></div>
          </div>
        </div>

        <div
          class="timelabel"
          :style="`color: ${theme === 'dark' ? 'white' : '#454545'};`"
        >
          {{ audioPlayer.timeLabel }}
        </div>

        <div
          class="close"
          :style="`color: ${theme === 'dark' ? 'white' : '#454545'};`"
          @click="stopAudio"
        >
          <i class="el-icon-close" />
        </div>
      </div> -->
      <!-- e.o Audio Player -->

      <!-- Message list -->
      <div
        :key="rerenderx"
        v-loading="!visibility.controls && $route.params.psid !== undefined"
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
              <div
                v-if="m.hasOwnProperty('attachment')"
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

  // fetch () {
  //   console.log(this.$route.params.id)
  //   if (this.$route.params.id !== undefined) {
  //     let x = {}
  //     x = { ...this.pages.find(p => p.id === parseInt(this.$route.params.id)) }

  //     this.getMessages(x)
  //   }
  // },
  fetch () {
    console.log('fr', this.$route)
  },

  computed: {
    ...mapGetters({
      messages: 'messages/messages',
      messageAll: 'messages/messageAll',
      pages: 'pages/pages',
      theme: 'settings/theme',
      notifications: 'notifications/notifications'
    }),

    audioDuration () {
      return 0
    },

    currentPage () {
      let x = {}
      const data = this.$route.params.id
      console.log('computed currentPage')
      if (data !== undefined) {
        x = { ...this.pages.find(p => p.id === parseInt(data)) }
      }

      console.log('x', this.$route.params.id, this.pages)

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
    },

    $route (nq, oq) {
      console.log('n', nq)
      // if (Object.prototype.hasOwnProperty.call(nq, 'page')) {
      let x = {}
      x = { ...this.pages.find(p => p.id === parseInt(this.$route.params.id)) }
      this.setPageOn(x.page_id)

      // if (this.eventSource === null) {
      // console.log('es null')
      this.setupStream()
      // }

      // if (Object.prototype.hasOwnProperty.call(nq, 'mid')) {
      this.fbmessages = []
      this.voiceMessages.list = []
      this.voiceMessages.loading = false
      this.getFBMessage()

      // if (Object.prototype.hasOwnProperty.call(nq, 'psid')) {
      this.visibility.controls = false
      // }
      // } else {
      // this.fbmessages = []
      // this.visibility.controls = false
      // }
      // } else {
      //   this.selectedPage = null
      //   console.log(this.eventSource)

      //   if (this.eventSource !== null) {
      //     this.eventSource.close()
      //     this.eventSource = null
      //   }

      //   console.log('close')
      // }
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
    // if (this.$route.query.page !== undefined) {
    // let x = {}
    // x = { ...this.pages.find(p => p.id === parseInt(this.$route.params.id)) }
    // console.log('mounted', this.$route.params.id)
    // if (this.$route.query.mid !== undefined) {
    // if (this.$route.query.psid === undefined) {
    // }
    // } else {
    // this.fbmessages = []
    // this.visibility.controls = false
    // }
    // } else {
    //   this.selectedPage = null
    //   this.loading.wrap = false
    // }
  },

  methods: {
    ...mapActions({
      getMessages: 'messages/browse',
      updateNotification: 'notifications/updateNotification'
    }),

    setupStream () {
      if (typeof (EventSource) !== 'undefined') {
        this.eventSource = new EventSource(`${this.$config.baseURL}noti/${this.currentPage.page_id}`)

        this.eventSource.addEventListener('message', (event) => {
          if (event.data === '') {
            return
          }
          if (event.data === this.notifications) {
            return
          }
          this.updateNotification(event.data)
          this.getFBMessage()
          console.log('vuex' + this.notifications)
        }, false)

        this.eventSource.addEventListener('error', (event) => {
          if (event.readyState === EventSource.CLOSED) {
            console.log('Event was closed')
            console.log(EventSource)
          }
        }, false)
      } else {
        console.log('Sorry, your browser does not support server-sent events...')
      }
    },

    async setAudio (m) {
      this.isPlaying = true
      console.log('au', m.attachment.file_url)
      await this.$sender({
        method: 'post',
        url: 'message/get-audio',
        data: { url: m.attachment.file_url }
      }).then((res) => {
        this.audioPlayer.src = m.attachment.file_url
        this.audioPlayer.source = new Audio('data:audio/webm;base64,' + res.content.data.blob)
        console.log(this.audioPlayer.source.duration)
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

    // updateTime () {
    //   this.audioPlayer.source.currentTime = parseFloat((this.audioPlayer.currentTime / 100) * this.audioPlayer.source.duration)
    // },

    playAudio () {
      console.log(this.audioPlayer.source.duration)

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
      // if (this.$route.query.psid !== undefined) {
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
            access_token: this.currentPage.access_token
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
        // }
      }
    },

    setPageOn (page) {
      console.log('page', page)
      this.checkIfPageExists(page)
    },

    async checkIfPageExists (pageId) {
      console.log(pageId)
      this.loading.wrap = true

      const payload = {
        method: 'get',
        url: `user/page/exists/${pageId}`
      }

      await this.$sender(payload).then((res) => {
        console.log('res', res)
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
      // let r = {}
      // r = { ...this.pages.find(p => p.id === parseInt(this.$route.params.id)) }

      // const pageId = r.page_id
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

    async getFBMessage (silent = false) {
      if (!silent) {
        this.fbmessages = []
        this.visibility.controls = false
      }
      this.fbmessages = []

      if (typeof (this.currentPage.page_id) === 'undefined') {
        return
      }

      console.log('it has started')

      await this.$sender({
        method: 'get',
        url: `${this.currentPage.page_id}/${this.$route.params.mid}/messages`,
        data: {},
        headers: {
          contentType: 'application/json'
        }
      }).then((res) => {
        console.log('it is done')
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
          }

          this.voiceMessages.list = this.voiceMessages.list.filter(l => l !== mid)

          if (this.voiceMessages.list.length === 0) {
            this.voiceMessages.loading = false
          }
        })
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
