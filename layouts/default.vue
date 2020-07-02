<template>
  <v-app v-if="isLogin == false || this.$cookies.get('_Key')">
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list v-if="isLogin === false" shaped>
        <v-list-item
          v-for="(item, i) in menusNotLogin"
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
      </v-list>

      <v-list v-else-if="isLogin === true" shaped>
        <v-list-group
          color=""
          no-action
          class="hidden-sm-and-up"
        >
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon color="rgb(117, 117, 117) !important">
                account_circle
              </v-icon>
            </v-list-item-action>
            <v-list-item-title>{{ name }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="(admin, i) in menusProfile"
            :key="i"
            v-model="admin.active"
            color="lighten-1"
            @click="actionsMenusProfile(admin.key)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="admin.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-for="(item, i) in menusLogin"
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
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" app>
      <div class="bt-menu d-flex d-lg-none">
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

      <div class="hidden-md-and-down">
        <div
          v-if="isLogin === false"
          class="row align-center ml-2"
        >
          <v-btn
            v-for="(item, i) in menusNotLogin"
            :key="i"
            text
            :class="item.class"
            :to="item.to"
          >
            <span class="v-btn__content" v-text="item.title" />
          </v-btn>
        </div>
        <div
          v-if="isLogin === true"
          class="row align-center ml-2"
        >
          <v-btn
            v-for="(item, i) in menusLogin"
            :key="i"
            text
            :class="item.class"
            :to="item.to"
          >
            <span class="v-btn__content" v-text="item.title" />
          </v-btn>
        </div>
      </div>

      <v-col cols="col">
        <v-toolbar-title class="text-center" dark>
          <nuxt-link to="/" class="black--text text-uppercase">
            {{ title }}
          </nuxt-link>
        </v-toolbar-title>
      </v-col>
      <div class="text-center">
        <v-btn
          v-if="isLogin === false"
          :to="'/auth'"
          :class="'ma-2 d-none d-sm-flex'"
          outlined
          color="#43A047"
        >
          Login / Regiter
        </v-btn>

        <div
          v-if="isLogin === true"
          class="d-flex justify-center align-center"
        >
          <v-menu
            rounded="lg"
            offset-y
          >
            <template v-slot:activator="{ attrs, on }">
              <v-list-item
                link
                v-bind="attrs"
                :class="'ma-2 d-none d-sm-flex'"
                v-on="on"
              >
                <v-list-item-content>
                  <v-list-item-title class="">
                    {{ name }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-menu-down</v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>

            <v-list>
              <v-list-item
                v-for="(admin, i) in menusProfile"
                :key="i"
                v-model="admin.active"
                link
                color="lighten-1"
              >
                <v-list-item-title

                  @click="actionsMenusProfile(admin.key)"
                >
                  {{ admin.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  components: { },
  data () {
    return {
      name: '',
      title: 'Storytelling',
      clipped: true,
      drawer: false,
      isLogin: false,
      menusNotLogin: [
        {
          icon: 'fas fa-sign-in-alt',
          title: 'Login / Regiter',
          to: '/auth',
          class: 'hidden-sm-and-up'
        },
        {
          icon: 'fas fa-home',
          title: 'Home',
          to: '/',
          class: ''
        }
      ],
      menusLogin: [
        {
          icon: 'fas fa-home',
          title: 'Home',
          to: '/',
          class: ''
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Manage story',
          to: '/manage/story/dashboard',
          class: ''
        }
      ],
      menusProfile: [
        {
          icon: 'fas fa-sign-in-alt',
          title: 'Setting',
          to: '',
          class: '',
          key: 'profile'
        },
        {
          icon: 'fas fa-sign-in-alt',
          title: 'Logout',
          to: '',
          class: '',
          key: 'logout'
        }
      ]
    }
  },
  created () {
    // if (this.$router.currentRoute.path === '/') {
    if (this.$cookies.get('_Key')) {
      this.$axios.defaults.headers.common.Authorization = `${this.$cookies.get('_Key')}`
      this.$axios.get('/api/user').then((res) => {
        const result = res.data.data
        this.name = result.name
      }).catch((err) => {
        console.error(err)
      })
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  mounted () {

  },
  methods: {
    actionsMenusProfile (key) {
      console.log(key)

      if (key === 'logout') {
        this.$cookies.remove('_Key')
        this.isLogin = false
        this.$router.push('/', () => {})
      } else if (key === 'profile') {
        this.$router.push('/profile', () => {})
      }
    }
  },
  head () {
    return {
      title: 'Storytelling',
      meta: [
        { hid: 'description', name: 'description', content: 'การเล่าเรื่องราวต่างๆ ให้ผู้คนได้รับประสบการณ์ใหม่ๆ' }
      ]
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
.v-btn--active {
   color: #43A047!important;
}
.v-input__icon.v-input__icon--clear{
  display: none !important;
}
</style>
