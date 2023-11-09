<template>
  <div>
    <el-dropdown :key="key" @command="handleClick">
      <el-button type="primary">
        {{ client.client_status ? client.client_status.name : 'Status unset' }}
        <i class="el-icon-arrow-down el-icon--right" />
      </el-button>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="status in client_status"
          :key="status.id"
          :command="status.id"
        >
          {{ status.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      client: {},
      key: 0
    }
  },
  computed: {
    ...mapGetters({
      client_status: 'statuses/statuses'
    })
  },
  watch: {
    '$route.params' (n, o) {
      if (n && this.$route.params.mid) {
        this.getClient()
      }
    }
  },
  mounted () {
    this.getClient()
  },
  methods: {
    async getClient () {
      await this.$sender({
        method: 'get',
        url: `client/${this.$route.params.mid}/getClient`,
        data: {}
      }).then((res) => {
        this.client = res.content.data
        this.key++
      })
    },
    async handleClick (param) {
      await this.$sender({
        method: 'put',
        url: `client/${this.$route.params.mid}/${param}/set-status`,
        data: {}
      }).then((res) => {
        this.client = res.content.data
        console.log(this.client)
        this.$root.$emit('set-status', this.client.status)
        this.key++
      })
    }
  }
}
</script>
