<!-- eslint-disable vue/html-self-closing -->
<template>
  <div
    v-loading="loading.wrap"
    element-loading-text="Retrieving Information..."
    :element-loading-background="
      theme === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0, 0, 0, 0.5)'
    "
    style="min-width: 300px;"
    @click="handleNavCollapse()"
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'app',
  data () {
    return {
      loading: {
        wrap: true,
        messages: false
      },
      selectedPage: null
    }
  },

  computed: {
    ...mapGetters({
      theme: 'settings/theme',
      navIsCollapsed: 'settings/navIsCollapsed',
      isMobile: 'settings/isMobile'
    })

  },

  mounted () {
    if (this.$route.params.id !== undefined) {
      this.setPageOn(this.$route.params.id)
    } else {
      this.selectedPage = null
      this.loading.wrap = false
    }
  },

  methods: {
    ...mapActions({
      toggleNavCollapse: 'settings/toggleNavCollapse'
    }),

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

    handleNavCollapse () {
      if (this.isMobile && !this.navIsCollapsed) {
        this.toggleNavCollapse()
      }
    }
  }
}
</script>
