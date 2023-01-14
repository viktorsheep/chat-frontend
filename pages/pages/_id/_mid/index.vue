<template>
  <div>MID</div>
</template>

<script>
export default {
  mounted () {
    this.$router.push('pages/' + this.$route.params.id)
  }
}
</script>
