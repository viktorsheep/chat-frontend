<template>
  <div>
    <div
      v-for="p in ap"
      :key="p.id"
      :class="`wrap-contacts ${p.id === parseInt($route.query.page) ? 'active' : ''}`"
      @click="handlePageClick(p)"
    >
      {{ p.name }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      ap: []
    }
  },

  fetch () {
    this.getPages()
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
        this.ap = this.pages.filter(p => p.is_active)
      },
      deep: true
    }
  },

  methods: {
    ...mapActions({
      getPages: 'pages/browse'
    }),

    handlePageClick (p) {
      if (p.id !== parseInt(this.$route.query.page)) {
        this.$router.replace({ query: { ...this.$route.query, page: p.id } })
      }

      this.$root.$emit('PageChanged', p)
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
    cursor: pointer;
    font-weight: bolder;
    transition: all 200ms ease-in-out;

    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    &:hover {
      background: rgba(0,0,0,0.1);
      padding-left: 20px;
      padding-right: 0px;
    }

    &.active {
      background: white;
      color: #1f91f2;
    }
  }
</style>
