<template>
  <v-app v-if="isLogin == false || this.$cookies.get('_Key')">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list shaped>
        <v-list-item
          v-for="(item, i) in menus"
          :key="i"
          :class="item.class"
          :to="item.to"
          color="#2E7D32"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          color=""
          no-action
        >
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon color="rgb(117, 117, 117) !important">
                account_circle
              </v-icon>
            </v-list-item-action>
            <v-list-item-title>จัดการเรื่องราว</v-list-item-title>
          </template>

          <v-list-item
            v-for="(admin, i) in admins"
            :key="i"
            v-model="admin.active"
            :to="admin.to"
            color="deep-orange lighten-1"
          >
            <v-list-item-content>
              <v-list-item-title v-text="admin.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <div class="bt-menu">
        <v-btn
          text
          large
          @click.stop="drawer = !drawer"
        >
          <v-icon class="pr-1">
            dehaze
          </v-icon>
          MENU
        </v-btn>
      </div>
      <v-col cols="col">
        <v-toolbar-title class="text-center" dark>
          <nuxt-link to="/" class="black--text text-uppercase">
            {{ title }}
          </nuxt-link>
        </v-toolbar-title>
      </v-col>
      <!-- <v-spacer /> -->
      <div class="text-center">
        <v-btn
          :to="'auth'"
          :class="'ma-2 d-none d-sm-flex'+ isLoginClass"
          outlined
          color="#43A047"
        >
          Login / Regiter
        </v-btn>
      </div>
    </v-app-bar>

    <v-content class="bd-content">
      <nuxt />
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      dialog: false,
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      title: 'Storytelling ',
      isLoginClass: '',
      isLogin: false,
      menus: [
        {
          icon: 'fas fa-sign-in-alt',
          title: 'Login / Regiter',
          to: '/auth',
          class: 'd-flex d-sm-none'
        },
        {
          icon: 'fas fa-home',
          title: 'Home',
          to: '/',
          class: ''
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Manage story',
          to: '/story/manage_story',
          class: ''
        }
      ],
      admins: [
        {
          icon: 'fas fa-sign-in-alt',
          title: 'เพิ่มเรื่องราว',
          to: '/inspire',
          class: ''
        },
        {
          icon: 'fas fa-sign-in-alt',
          title: 'Login / Regiter',
          to: '/inspire2',
          class: ''
        }
      ]
    }
  },
  created () {
    if (this.$router.currentRoute.path === '/') {
      if (this.$cookies.get('_Key')) {
        this.isLogin = true
      } else {
        this.isLogin = false
        // this.$router.push('/auth', () => {})
      }
    }
  }
}
</script>

<style scoped>
.bt-menu {
    min-width: 115px;
    height: auto;
    border-right: 1px solid #E6EAEA;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
}
.v-list-group__header.v-list-item.v-list-item--active.v-list-item--link.theme--light{
  height: 48px;
}
</style>

<style>
.v-application--is-ltr .v-list--shaped .v-list-item, .v-application--is-ltr .v-list--shaped .v-list-item::before, .v-application--is-ltr .v-list--shaped .v-list-item > .v-ripple__container{
  border-radius: 32px !important;
}
.v-application--is-ltr .v-list--shaped{
  padding: 8px !important;
}
a {
  text-decoration: none;
}
</style>
