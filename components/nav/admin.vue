<template>
  <div class="wrap-admin-nav">
    <NuxtLink
      v-for="nav in navs"
      :key="nav.index"
      :to="nav.to"
    >
      {{ nav.name }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navs: [
        {
          index: 1,
          name: 'dashboard',
          to: '/admin/dashboard'
        },
        {
          index: 2,
          name: 'users',
          to: '/admin/users'
        },
        {
          index: 3,
          name: 'pages',
          to: '/admin/pages'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-admin-nav {
  padding: 10px;

  a {
    display: block;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    transition: all 300ms ease-in-out;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border-radius: 8px;
    margin-bottom: 2px;
    font-size: 12px;

    &:hover {
      padding-left: 15px;
      color: #1f91f2;
      background: white;
      letter-spacing: 3px;
      font-size: 14px;
    }
  }
}
</style>
