<template>
  <v-app v-if="isLogin == false">
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-col cols="col">
        <v-toolbar-title class="text-center" dark>
          <nuxt-link to="/" class="black--text text-uppercase">
            {{ title }}
          </nuxt-link>
        </v-toolbar-title>
      </v-col>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {

  data () {
    return {
      isLogin: false,
      clipped: true,
      fixed: false,
      title: 'Storytelling '
    }
  },
  created () {
    // if (this.$cookies.get('_Key')) {
    //   this.isLogin = true
    //   this.$router.push('/', () => {})
    // } else {
    //   this.isLogin = false
    // }
  }
}
</script>

<style  scoped>
a{
    text-decoration:none;
}
</style>
