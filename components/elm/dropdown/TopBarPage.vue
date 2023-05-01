<template>
  <span style="float: left">
    {{ page.name }}
  </span>
  <!--
  <el-dropdown
    v-if="retrieved"
    v-loading="loading"
    style="cursor:pointer; float: left;"
    trigger="click"
    size="small"
    :disabled="userPage === 'Exists.' ? false : true"
    @command="handlePageDropdownCommand"
  >
    <span class="el-dropdown-link">
      <span>{{ page.name }}</span>
      <i class="el-icon-arrow-down el-icon--right" />
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="leavePage">
        Leave Page Chat
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  */
  -->
</template>

<script>
export default {
  data () {
    return {
      retrieved: false,
      page: {},
      userPage: {},
      loading: false
    }
  },

  watch: {
    '$route.query' (nq, oq) {
      if (nq.page !== undefined) {
        this.getPageName()
      }
    }
  },

  mounted () {
    if (this.$route.query.page !== undefined) {
      this.getPageName()
    }

    this.$root.$on('PageJoined', (data) => {
      this.getPageName()
    })

    this.$root.$on('PageChanged', (p) => {
      this.userPage = p
    })
  },

  methods: {
    async getPageName () {
      const payload = {
        method: 'get',
        url: `page/${this.$route.query.page}/view`
      }

      await this.$sender(payload).then((res) => {
        this.page = res.content.data
        this.checkUserPageExists(this.page.id)
      })
    },

    async checkUserPageExists (pageId) {
      const payload = {
        method: 'get',
        url: `user/page/exists/${pageId}`
      }

      await this.$sender(payload).then((res) => {
        this.userPage = res.content.data
        this.retrieved = true
      })
    },

    handlePageDropdownCommand (cmd) {
      if (cmd === 'leavePage') {
        this.leavePage()
      }
    },

    async leavePage () {
      const payload = {
        method: 'put',
        url: `user/page/edit/${this.$route.query.page}`,
        message: {
          success: `You have left ${this.page.name}`
        }
      }

      await this.$sender(payload).then((res) => {
        this.$router.push('/pages')
      })
    }
  }
}
</script>
