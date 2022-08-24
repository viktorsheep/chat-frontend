<template>
  <div>
    {{ d }}
    <br>
    <br>

    <el-select
      v-model="selval"
      placeholder=""
      @change="doLanguageChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-input
      v-model="videoId"
      placeholder="Youtube Video ID"
      size="normal"
      clearable
    />

    <el-button
      type="primary"
      size="default"
      :disabled="videoId === '' ? true : false"
      @click="getComments"
    >
      Get Comments
    </el-button>
  </div>
</template>

<script>
// import { google } from 'googleapis'
// import { Client } from 'youtubei'
export default {
  layout: 'app',
  data () {
    return {
      d: [],
      videoId: 'QOq_4SYzCmA',
      options: [
        { value: 'asdf', label: 'asdfasdf' },
        { value: 'asdf 1', label: 'asdfasdf e' },
        { value: 'asdf 3', label: 'asdfasdf f' }
      ],
      selval: 'something'
    }
  },

  methods: {
    getComments () {
      try {
        // this.$google.isInit = true
        // console.log(this.$google.isInit)
        // console.log(this.$google)
        /*
        const youtube = new Client()
        const video = await youtube.getVideo(this.videoId)
        const comments = await video.nextComments()

        console.log(comments)
        */

        // const https = require('https')
        // const options = {...};
        // const agent = new https.Agent(options);
        // const agent = new https.Agent()

        // AIzaSyC8FRGRgOI77jUvhs5IilHHkWtgfK-P7eE
        // GET https://youtube.googleapis.com/youtube/v3/commentThreads?key=[YOUR_API_KEY] HTTP/1.1
        // GET https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=QOq_4SYzCmA&key=[YOUR_API_KEY] HTTP/1.1
        // const apikey = 'AIzaSyC8FRGRgOI77jUvhs5IilHHkWtgfK-P7eE'

        // Authorization: Bearer [YOUR_ACCESS_TOKEN]
        // Accept: application/json
        /*
        await this.$axios.get(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${this.videoId}&key=${apikey}`)
          .then((res) => {
            this.d = res
            console.log(res)
          })
          .catch((err) => {
            console.log(err.response)
          })
        console.log(this.d)
        */
        // const x = await this.$google.api.client.youtube.playlists.list({ mine: true, part: 'snippet' })
        /*
        const x = await this.$google.api.client.request({
          path: 'youtube/v3/playlists',
          method: 'GET',
          params: {
            mine: true, part: 'snippet'
          }
        })

        console.log(x)
        const yt = google.youtube({
          version: 'v3',
          auth: 'AIzaSyC8FRGRgOI77jUvhs5IilHHkWtgfK-P7eE'
        })

        const x = await yt.commentThreads.list({
          part: [
            'snippet,replies'
          ],
          videoId: 'QOq_4SYzCmA'
        })

        console.log(x)
        */
        console.log('hi')
      } catch (err) {
        console.log(err)
        this.$notify.error(err)
      }
    }
  }
}
</script>
