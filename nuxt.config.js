export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'chat',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  googleFonts: {
    display: 'auto',
    download: true,
    families: {
      Nunito: true
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    // '@nuxtjs/axios',
    // '@nuxtjs/auth-next',
    { src: '@nuxtjs/axios', mode: 'client' },
    { src: '@nuxtjs/auth-next', mode: 'client' }
    // '@nuxtjs/proxy'
  ],

  auth: {
    strategies: {
      backend: {
        provider: 'laravel/jwt',
        url: process.env.APP_ENV === 'production'
          ? process.env.PUBLIC_URL + process.env.BASE_URL
          : process.env.LOCAL_URL + process.env.BASE_URL,
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'token' },
          refresh: { url: 'auth/refresh', method: 'post', propertyName: 'token' },
          user: { url: 'auth/me', method: 'get', propertyName: false },
          logout: { url: 'auth/logout', method: 'get', propertyName: false }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          // maxAge: 525600 * 60
          maxAge: 20160 * 60
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/'
      // callback: '/',
      // home: '/message'
    },
    plugins: [
      '@/plugins/sender',
      '@/plugins/cg'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.APP_ENV === 'production'
      ? process.env.PUBLIC_URL + process.env.BASE_URL
      : process.env.LOCAL_URL + process.env.BASE_URL
  },

  /*
  router: {
    middleware: ['auth']
  },
  */

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  }
}
