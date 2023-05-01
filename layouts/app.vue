<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside width="250px" style="background-color: #1f91f2" class="aside">
        <div
          style="
            background: #0003;
            height: 50px;
            line-height: 50px;
            padding-top: 10px;
          "
        >
          <Logo />
        </div>
        <NavUser v-if="$auth.user.user_role_id === 3" />
        <NavAdmin v-else />
      </el-aside>

      <el-container>
        <el-header
          :class="`header ${settings.visualMode === 'light' ? '' : 'dark'}`"
        >
          <span
            v-if="$auth.user.user_role_id === 1"
            style="color: #e6a23c; float: left"
          >Super Admin &nbsp;</span>
          <ElmDropdownTopBarPage />

          {{ $auth.user.name }}
          <!-- <ElmDropdownLightDarkSwitcher /> -->
          <ElmDropdownLogout />
        </el-header>

        <el-main :class="`main ${theme}`">
          <Nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  data () {
    return {
      eventSource: null
    }
  },

  computed: {
    ...mapGetters({
      settings: 'settings/settings',
      theme: 'settings/theme',
      pages: 'pages/pages',
      notifications: 'notifications/notifications'
    })
  },

  watch: {
    '$route.params': {
      handler (n, o) {
        if (this.eventSource !== null) {
          this.eventSource.close()
          console.log('Event closed')
        }
        if ('id' in n && this.pages.length !== 0) {
          const x = { ...this.pages.find(p => p.id === parseInt(n.id)) }
          this.setupStream(x.page_id)
          console.log('Event started', x.page_id)
        }
      },
      deep: true
    }
  },

  mounted () {
  },

  methods: {
    ...mapActions({
      updateNotification: 'notifications/updateNotification'
    }),

    handleDropdownCommand (command) {
      if (command === 'logout') {
        this.$auth.logout().then((res) => {
          this.$router.push('/')
        })
      }
    },

    setupStream (pageId) {
      if (EventSource !== null) {
        this.eventSource = new EventSource(`${this.$config.baseURL}noti/${pageId}`)
        this.eventSource.addEventListener('message', (event) => {
          if (event.data === '') {
            return
          }
          if (event.data === this.notifications) {
            return
          }
          if (event.data === 'undefined') {
            return
          }

          this.updateNotification(event.data)
          this.$root.$emit('new-message', event.data)

          console.group('Event')
          console.log('Event', event)
          console.log('Event data', event.data)
          console.log('Event notifications', this.notifications)
          console.groupEnd()
        }, false)

        this.eventSource.addEventListener('error', (event) => {
          if (event.readyState === EventSource.CLOSED) {
            console.log('Event was closed')
            console.log(EventSource)
          }
        }, false)
      } else {
        this.$notify({
          title: 'SSE Error',
          message: 'Sorry, your browser dose not support server-sent events...'
        })
      }
    }
  }
}
</script>

<style>
body {
  font-family: Nunito, sans-serif;
  color: #454545;
  font-size: 16px;
  margin: 0;
}
</style>

<style lang="scss">
$brandColor: #1f91f2;
</style>

<style lang="scss" scoped>
.aside {
  background: rgb(31, 145, 242);
  background: linear-gradient(
    135deg,
    rgba(31, 145, 242, 1) 0%,
    rgba(0, 84, 156, 1) 100%
  );
}

.header {
  line-height: 60px;
  text-align: right;
  background: #eee;
  transition: all 300ms ease-in-out;
  color: #777;

  &.dark {
    background: #454545;
    background: linear-gradient(135deg, #454545 0%, #333333 100%);
    color: #ccc;
  }
}

.main {
  background: #fff;
  transition: all 300ms ease-in-out;
  max-height: calc(100vh - 60px);
  overflow-y: auto;

  &.dark {
    background: linear-gradient(
      135deg,
      rgba(119, 119, 119, 1) 0%,
      rgb(59, 59, 59) 100%
    );
    box-shadow: inset 10px 0 20px rgba(0, 0, 0, 0.15);
  }
}
</style>
