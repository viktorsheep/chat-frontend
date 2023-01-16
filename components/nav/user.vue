<template>
  <div style="margin-top: 10px">
    <div
      v-if="!visibility.contactNav"
      v-loading="loading.userPages"
      element-loading-text="Loading pages..."
      element-loading-background="rgba(0, 0, 0, 0.5)"
      style="min-height: calc(100vh - 80px)"
    >
      <div
        v-for="p in data.userPages"
        :key="p.id"
        :class="`wrap-contacts ${
          p.page_id === parseInt($route.query.page) ? 'active' : ''
        }`"
        @click="handlePageClick(p.page_id)"
      >
        {{
          helper().getPageName(p.page_id)
            ? helper().getPageName(p.page_id).name
            : ''
        }}
      </div>
    </div>
    <!-- Page User Chats -->
    <NavContacts v-if="visibility.contactNav" @navClosed="handleNavClosed()" />
  </div>
</template>

<script>
// import * as Facebook from 'fb-sdk-wrapper'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      ap: [],
      visibility: {
        contactNav: false
      },

      loading: {
        userPages: false
      },

      data: {
        userPages: []
      }
    }
  },

  fetch () {
    this.getPages()
    this.api().getUserPages(this.$auth.user.id)
  },

  computed: {
    ...mapGetters({
      pages: 'pages/pages'
    }),

    activePages () {
      return this.pages.filter(p => p.is_active)
    }
  },

  watch: {
    pages: {
      handler (n, o) {
        this.ap = this.pages.filter(p => p.is_active && p.access_token !== null)
      },
      deep: true
    }
  },

  mounted () {
    // this.page_id = this.currentPage.page_id
    console.log('mp', this.$route.params)
    if ('id' in this.$route.params) {
      this.handlePageClick(this.$route.params.id)
    }
  },

  methods: {
    ...mapActions({
      getPages: 'pages/browse'
    }),

    handlePageClick (p) {
      this.visibility.contactNav = true
      this.$router.push('/pages/' + p)
      // if (p.page_id !== parseInt(this.$route.query.page)) {
      //   this.$router.replace({ query: { ...this.$route.query, page: p.page_id } })
      // }

      // const pageDetails = this.helper().getPageName(p.page_id)

      // this.$root.$emit('PageChanged', pageDetails)
    },

    handleNavClosed () {
      this.visibility.contactNav = false
    },

    api () {
      const self = this

      return {

        async getUserPages (id) {
          self.loading.userPages = true
          const payload = {
            method: 'get',
            url: 'user/page/get/' + id
          }

          await self.$sender(payload).then((res) => {
            self.loading.userPages = false
            self.data.userPages = res.content.data
          })
        }
      }
    },

    helper () {
      const self = this
      return {
        getPageName (id) {
          const x = self.pages.find(p => p.id === id)
          return x !== 'undefined' ? x : { name: 'Page' }
        }
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.wrap-contacts {
  height: 40px;
  line-height: 40px;
  color: white;
  width: calc(100% - 40px);
  margin-left: 10px;
  padding: 0 10px;
  border-radius: 8px;
  margin-bottom: 5px;
  margin-top: 10px;
  cursor: pointer;
  font-weight: bolder;
  transition: all 200ms ease-in-out;

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    padding-left: 20px;
    padding-right: 0px;
  }

  &:first-of-type {
    margin-top: 20px;
  }

  &.active {
    background: white;
    color: #1f91f2;
  }
}
</style>
