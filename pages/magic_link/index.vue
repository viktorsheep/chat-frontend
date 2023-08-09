<template>
  <div>
    <div style="margin-bottom: 100px;">
      Redirecting from magic link
    </div>

    <div v-loading="true" />
  </div>
</template>

<script>
export default {
  layout: 'redirects',
  data () {
    return {
      client: {}
    }
  },
  mounted () {
    this.checkClient()
  },
  methods: {
    async checkClient () {
      if (this.$route.query.psid !== undefined) {
        const client = await this.$sender({
          method: 'get',
          url: `client/${this.$route.query.psid}/${this.$route.query.page_id}/get`,
          data: {}
        })
        this.client = client.content.data

        const payload = {
          page_id: this.$route.query.page_id,
          mid: this.client.mid
        }
        this.$root.$emit('magic-link', payload)

        this.$router.push(typeof this.client.page_index_id !== 'undefined' ? `/pages/${this.client.page_index_id}/${this.client.mid}/${this.client.psid}` : 'magic_link/no_conversation')
      } else {
        return false
      }
    }
  }
}
</script>
