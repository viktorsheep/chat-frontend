<template>
  <el-container>
    <el-main height="400" style="padding: 0;">
      <!-- Nav -->
      <div class="nav">
        <el-row>
          <el-col :span="12" :offset="0" style="padding: 0 10px;">
            <div class="logo">
              <span class="text-ekballo">
                EKBALLO
              </span>
              <span class="text-chat">
                CHAT
              </span>
            </div>
          </el-col>
          <el-col :span="12" :offset="0" style="padding: 0 10px; text-align: right;">
            <NuxtLink to="auth/login">
              Login
            </NuxtLink>

            <!-- <NuxtLink to="auth/register"> -->
            <!-- Register -->
            <!-- </NuxtLink> -->
          </el-col>
        </el-row>
      </div> <!-- e.o Nav -->

      <div
        :class="`image ${isMobile ? 'mobile' : ''}`"
      >
        <!-- :style="`${isMobile ? 'background-image: url(/images/cross.jpg)' : ''}`" -->
        <div class="text">
          Ekballo Chat
        </div>

        <div class="attribution">
          Photo by <a
            target="_blank"
            href="https://unsplash.com/@greg_rosenke?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >Greg
            Rosenke</a> on <a
            target="_blank"
            href="https://unsplash.com/photos/black-cross-statue-jBI220z-cU4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >Unsplash</a>
        </div>

        <img
          v-if="!isMobile"
          src="~/static/images/cross.jpg"
          alt="https://unsplash.com/photos/black-cross-statue-jBI220z-cU4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash"
        >
      </div>

      <!-- Foot -->
      <div class="foot">
        Ekballo Chat &copy; 2023 &nbsp;&nbsp; By Ekballo University
        <div>
          <NuxtLink to="privacy">
            Privacy Policy
          </NuxtLink>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  auth: 'guest',
  computed: {
    ...mapGetters({
      isMobile: 'settings/isMobile'
    })
  },
  mounted () {
    this.$cg({
      title: 'Index : Auth',
      type: 'log',
      logs: [
        this.$auth.loggedIn,
        this.$auth.user
      ]
    })

    this.setDeviceType()
  },

  methods: {
    ...mapActions({
      setDeviceType: 'settings/setDeviceType'
    })
  }
}
</script>

<style lang="scss" scoped>
.nav {
  background: #1f91f2;
  color: white;
  height: 40px;
  line-height: 40px;
  width: 100%;

  a {
    color: white;
    text-decoration: none;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    padding: 0 10px;
    margin-top: 5px;
    margin-left: 5px;
    transition: all 200ms ease-in-out;

    &:hover {
      color: #1f91f2;
      background: white;
    }
  }
}

.logo {
  .text {
    &-ekballo {
      font-weight: 900;
    }

    &-chat {
      font-weight: 300;
    }
  }
}

.image {
  width: 100vw;
  height: calc(100vh - 140px);
  overflow: hidden;
  position: relative;

  .text {
    position: absolute;
    width: 100vw;
    height: calc(100vh - 140px);
    line-height: calc(100vh - 140px);
    font-size: 48px;
    font-weight: 900;
    color: white;
    text-align: center;
    z-index: 99999;
  }

  .attribution {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: white;
    font-size: 12px;
    z-index: 99999;

    a {
      color: #1f91f2;
    }
  }

  img {
    width: 100%;
    filter: brightness(0.8);
  }

  &.mobile {
    background-image: url('/images/cross.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

.foot {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 100px;
  line-height: 50px;
  color: #999;
  background: #f5f5f5;
  text-align: center;
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.2);
  ;

  a {
    color: #1f91f2;
    text-decoration: none;
  }
}
</style>
