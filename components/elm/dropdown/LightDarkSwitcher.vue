<template>
  <div :class="`comp ${settings.visualMode}`" @click="handleClick">
    <i :class="`el-icon-${settings.visualMode === 'light' ? 'sunny' : 'moon'}`" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      settings: 'settings/settings'
    })
  },

  methods: {
    ...mapActions({
      toggleVisualMode: 'settings/toggleVisualMode'
    }),

    handleClick () {
      this.toggleVisualMode()
    }
  }
}
</script>

<style lang="scss" scoped>
  .comp {
    display: inline-block;
    width: 50px;
    text-align: center;
    cursor: pointer;
    transition: all 300ms ease-in-out;

    &:hover {
      color: #1f91f2;
    }

    &.dark {
    }
  }
</style>
