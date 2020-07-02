<template>
  <v-app v-if="isLogin == false || this.$cookies.get('_Key')">
    <v-navigation-drawer
      id="style-1"
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-right"
            >
              <v-btn
                small
                text
              >
                edit
              </v-btn>
            </v-col>
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          />
          <v-list-item
            v-else
            :key="i"
            link
            :class="[item.to === $route.path?'v-list-item--active': '', item.display]"
            @click="actionsMenus(item.to)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-col cols="auto" class="d-flex justify-start">
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </v-col>

      <v-col cols="auto" class="pl-0 d-flex justify-start align-center">
        <span class="title ml-3 mr-5">Storytelling&nbsp;<span class="font-weight-light">Manage</span></span>
      </v-col>

      <v-col cols="col" class="d-flex justify-end">
        <div class="text-center ">
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

            <v-list width="250px">
              <v-list-item
                v-for="(item, i) in menusProfile"
                :key="i"
                link
                color="lighten-1"
                @click="actionsMenus(item.to)"
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="grey--text">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
                <!-- <v-list-item-title

                  @click="actionsMenusProfile(admin.key)"
                >
                  {{ admin.title }}
                </v-list-item-title> -->
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
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
      drawer: null,
      isLogin: false,
      items: [
        { icon: 'fas fa-home', text: 'Home', to: '/' },
        { icon: 'fa fa-tachometer', text: 'Dashboard', to: '/manage/story/dashboard' },
        { icon: 'fa fa-book', text: 'My storys', to: '/manage/story/my' },
        { divider: true },
        { heading: 'fa fa-tachometer', to: '#' },
        { icon: 'add', text: 'Create new story', to: '/manage/story/store' },
        { divider: true },
        { icon: 'archive', text: 'Archive', to: '#' },
        { icon: 'delete', text: 'Trash', to: '#' },
        { divider: true },
        { icon: 'settings', text: 'Settings', to: '/manage/profile/setting' },
        { icon: 'chat_bubble', text: 'Trash', to: '#' },
        { icon: 'help', text: 'Help', to: '#' },
        { icon: 'phonelink', text: 'App downloads', to: '#' },
        { icon: 'fas fa-sign-in-alt', text: 'Logout', to: '/logout', display: 'hidden-sm-and-up' }
      ],
      menusProfile: [
        { icon: 'fas fa-sign-in-alt', text: 'Logout', to: '/logout' }
      ]
    }
  },
  created () {
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
    actionsMenus (to) {
      console.log(to)

      if (to === '/logout') {
        this.$router.push('/', () => {})
        this.$cookies.remove('_Key')
        this.isLogin = false
      } else if (to === '#') {

      } else {
        this.$router.push(`${to}`, () => {})
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
.v-content{
      background: #e8e8e8;
}
#style-1 ::-webkit-scrollbar {
  width: 6px;

  background-color: none;
}
#style-1 ::-webkit-scrollbar-thumb {
  background-color: #5f5f5f9f;
  border-radius: 25px;
  margin-right: 5px;
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
* ::-webkit-scrollbar {
  width: 8px;

  background-color: none;
}
* ::-webkit-scrollbar-thumb {
  background-color: #5f5f5f9f;
  border-radius: 25px;
  margin-right: 5px;
}
</style>
