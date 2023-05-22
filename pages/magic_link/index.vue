<template>
  <div>
    Magic link
  </div>
</template>

<script>
export default {
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
          url: `client/${this.$route.query.psid}/get`,
          data: {}
        })
        this.client = client.content.data

        this.$router.push(`/pages/${this.client.page_index_id}/${this.client.mid}/${this.client.psid}`)
      } else {
        return false
      }
    }
  }
}
</script>
