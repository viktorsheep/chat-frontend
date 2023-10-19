<template>
  <div class="comp" @click="handleClick">
    <i class="el-icon-switch-button" />
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$auth.logout().then((res) => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .comp {
    display: inline-block;
    width: 50px;
    text-align: center;
    transition: all 300ms ease-in-out;
    cursor: pointer;

    &:hover {
      color: #F56C6C;
    }
  }
</style>
