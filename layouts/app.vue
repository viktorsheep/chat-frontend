<template>
  <div :class="`${ isMobile ? 'wrap-mobile-layout' : ''}`">
    <el-container style="height: 100vh">
      <el-aside :width="`${navIsCollapsed ? '0' : '300'}px`" style="background-color: #1f91f2" :class="`aside ${ navIsCollapsed ? 'collapsed' : ''}`">
        <div
          style="
            background: #0003;
            height: 50px;
            line-height: 50px;
            padding-top: 10px;
            position: relative;
          "
        >
          <Logo v-if="!isMobile" />

          <div v-else>
            <span :class="`txt-section ${ navIsCollapsed ? 'hide' : ''}`">
              {{ $route.params.id !== undefined ? 'Conversations' : 'Pages' }}
            </span>

            <button type="button" class="btn-profile" @click="visibility.profile = !visibility.profile">
              <i :class="`${visibility.profile ? 'el-icon-close' : 'el-icon-user-solid'}`" />
            </button>

            <div :class="`wrap-profile ${ visibility.profile ? 'shown' : ''}`">
              <div class="item">
                <div class="txt-username">
                  {{ $auth.user.name }}
                </div>
              </div>

              <div class="item">
                <button type="button" class="btn-logout" :disabled="disabled.btn.logout" @click="handleLogout">
                  <i :class="` ${ disabled.btn.logout ? 'el-icon-loading' : 'el-icon-switch-button'}`" /> &nbsp; {{ disabled.btn.logout ? 'Logging out.' : 'Logout' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <NavUser v-if="$auth.user.user_role_id === 3" />
        <NavAdmin v-else />
      </el-aside>

      <el-container>
        <el-header
          :class="`header ${settings.visualMode === 'light' ? '' : 'dark'}`"
        >
          <div v-if="isMobile" class="mobile-header">
            <div :class="`txt-conversation ${ !navIsCollapsed ? 'hide' : ''}`">
              {{ currentConversation }}
            </div>
            <button type="button" class="btn-mobile" @click="toggleNavCollapse()">
              <i :class="`${navIsCollapsed ? 'el-icon-s-unfold' : 'el-icon-arrow-left'}`" />
            </button>
            <span v-if="$route.params.psid" style="float: right">
              <ElmDropdownStatus />
            </span>
          </div>

          <div v-else>
            <span
              v-if="$auth.user.user_role_id === 1"
              style="color: #e6a23c; float: left"
            >Super Admin &nbsp;</span>
            <ElmDropdownTopBarPage />

            <span v-if="$route.params.psid" style="float: left">
              <ElmDropdownStatus />
            </span>

            {{ $auth.user.name }}
            <!-- <ElmDropdownLightDarkSwitcher /> -->
            <ElmDropdownLogout />
          </div>
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
      eventSource: null,
      visibility: {
        profile: false
      },
      disabled: {
        btn: {
          logout: false
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      settings: 'settings/settings',
      theme: 'settings/theme',
      pages: 'pages/pages',
      notifications: 'notifications/notifications',
      isMobile: 'settings/isMobile',
      navIsCollapsed: 'settings/navIsCollapsed',
      currentConversation: 'settings/currentConversation'
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
    this.setDeviceType()
    this.getClientStatuses()
    this.getUsers()

    this.$root.$on('restart-stream', (callStream) => {
      if (this.eventSource !== null) {
        this.eventSource.close()
      }
      if ('psid' in this.$route.params) {
        const x = { ...this.pages.find(p => p.id === parseInt(this.$route.params.id)) }
        this.setupStream(x.page_id, callStream)
      }
    })
  },

  methods: {
    ...mapActions({
      getUsers: 'users/users',
      getClientStatuses: 'statuses/get',
      updateNotification: 'notifications/updateNotification',
      setDeviceType: 'settings/setDeviceType',
      toggleNavCollapse: 'settings/toggleNavCollapse'
    }),

    handleDropdownCommand (command) {
      if (command === 'logout') {
        this.$auth.logout().then((res) => {
          this.$router.push('/')
        })
      }
    },

    setupStream (pageId, callStream = true) {
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

          if (callStream === false) {
            return
          }

          this.updateNotification(event.data)
          this.$root.$emit('new-message', event.data)

          console.group('Event')
          console.log('Event', event)
          console.log('Event data', JSON.parse(event.data))
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
    },

    handleLogout () {
      this.disabled.btn.logout = true
      this.$auth.logout().then((res) => {
        this.disabled.btn.logout = false
        this.$router.push('/')
      })
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
  width: 60px;
  transition: all 400ms ease-in-out;

  &.collapsed {
    width: 250px;
  }
}

.header {
  position: relative;
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

  .btn-mobile {
    width: 60px;
    height: 60px;
    line-height: 60px;
    color: rgb(31, 145, 242);
    padding: 0 10px;
    font-size: 22px;
    text-align: center;
    background: none;
    border-width: 0;
    position: absolute;
    top: 0;
    left: 0;

    &:active {
      background: #ffffff50;
    }
  }

  .txt-conversation {
    position: absolute;
    left: 60px;
    top: 0;
    text-align: left;
    visibility: visible;
    opacity: 1;

    &.hide {
      visibility: hidden;
      opacity: 0;
      width: 0;
    }

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

.txt-section {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  line-height: 60px;
  padding-left: 10px;
  color: white;
  visibility: visible;
  opacity: 1;
  transition: all 500ms ease-in-out;
  font-weight: 900;

  &.hide {
    visibility: hidden;
    opacity: 0;
  }
}

.mobile-header {
  width: 100%;
  min-width: 300px;
  overflow: hidden;
}

.wrap-mobile-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.btn-profile {
  position: absolute;
  top: 0;
  right: 0;
  height: 60px;
  width: 60px;
  border-width: 0;
  background: none;
  font-size: 18px;
  color: white;

  &:active {
    background: #ffffff50;
  }
}

.wrap-profile {
  background: rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  visibility: hidden;
  opacity: 0;
  transition: all 400ms ease-in-out;
  height: calc(100vh - 60px);
  z-index: 99999999999999;

  &.shown {
    visibility: visible;
    opacity: 1;
  }

  .item {
    padding: 10px;
    background: #1f91f2;
    color: white;

    .txt-username {
      text-align: center;
      border-bottom: 1px solid #ffffff20;
    }
  }
}

.btn-logout {
  border: 0;
  background: none;
  color: white;
  width: 100%;
  text-align: left;
  height: 50px;
  line-height: 50px;

  &:active, &:disabled {
    background: #ffffff50;
  }
}
</style>
