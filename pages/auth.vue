<template>
  <v-container
    v-if="isLogin == false"
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="5"
        md="4"
        class="text-center d-none d-sm-flex"
      >
        <img v-if="step==0" src="https://auth.jobthai.com/image/Login_Jobseeker.svg" alt="" width="90%">
        <img v-if="step==1" src="https://auth.jobthai.com/image/login/search-candidate.svg" alt="" width="90%">
      </v-col>
      <v-col
        cols="12"
        sm="5"
        md="4"
      >
        <v-card v-if="step==0" class="elevation-7">
          <v-toolbar
            color="deep-orange darken-1"
            dark
            flat
          >
            <v-toolbar-title>เข้าสู่ระบบ</v-toolbar-title>
            <v-spacer />
            <v-btn rounded outlined frak @click="step=1">
              สมัครสมาชิก
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="emailLogin"
                label="อีเมล"
                name="emailLogin"
                prepend-icon="fas fa-envelope"
                type="text"
                color="deep-orange darken-1"
              />

              <v-text-field
                id="passwordLogin"
                v-model="passwordLogin"
                label="รหัสผ่าน"
                name="passwordLogin"
                prepend-icon="mdi-lock"
                type="password"
                color="deep-orange darken-1"
              />
              <v-card-actions class="justify-center">
                <v-btn color="deep-orange darken-1 justify-center" width="95%" dark @click="btnLogin">
                  เข้าสู่ระบบ
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card v-if="step==1" class="elevation-7">
          <v-toolbar
            color="deep-orange darken-1"
            dark
            flat
          >
            <v-toolbar-title>
              สมัครสมาชิก
            </v-toolbar-title>
            <v-spacer />
            <v-btn rounded outlined frak @click="step=0">
              เข้าสู่ระบบ
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="nameRegister"
                label="ชื่อ-นามสกุล"
                name="nameRegister"
                prepend-icon="mdi-account"
                type="text"
                color="deep-orange darken-1"
              />
              <v-text-field
                v-model="emailRegister"
                label="อีเมล"
                name="emailRegister"
                prepend-icon="fas fa-envelope"
                type="text"
                color="deep-orange darken-1"
              />

              <v-text-field
                id="passwordRegister"
                v-model="passwordRegister"
                label="รหัสผ่าน"
                name="passwordRegister"
                prepend-icon="mdi-lock"
                type="password"
                color="deep-orange darken-1"
              />
              <v-card-actions class="justify-center">
                <v-btn color="deep-orange darken-1 justify-center" width="95%" dark @click="btnRegister">
                  สมัคร
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn icon dark @click="snackbar = false">
        <v-icon>far fa-times-circle</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'auth',
  data () {
    return {
      isLogin: false,
      step: 0,
      color: '',
      mode: '',
      snackbar: false,
      text: '',
      timeout: 6000,
      x: 'right',
      y: 'top',
      nameRegister: '',
      emailRegister: '',
      passwordRegister: '',
      emailLogin: '',
      passwordLogin: ''
    }
  },
  created () {
    if (this.$cookies.get('_Key')) {
      this.isLogin = true
      this.$router.push('/', () => {})
    } else {
      this.isLogin = false
    }
  },
  methods: {
    btnLogin () {
      axios
        .post('/api/login', {
          email: this.emailLogin,
          password: this.passwordLogin
        })
        .then((result) => {
          if (this.$cookies.get('_Key') && result.data.additionalUserInfo.success === true) {
            this.$router.push('/', () => {})
          } else if (!this.$cookies.get('_Key') && result.data.additionalUserInfo.success === false) {
            this.text = 'บัญชีนี้มีการเข้าสู่ระบบอยู่ กรุณารองใหม่อีกครั้ง'
            this.snackbar = true
            this.color = '#E53935'
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    btnRegister () {
      axios
        .post('/api/register', {
          name: this.nameRegister,
          email: this.emailRegister,
          password: this.passwordRegister
        })
        .then((result) => {
          this.text = 'ลงทะเบียนเป็นสมาชิกสำเร็จ'
          this.snackbar = true
          this.color = '#11a903'
          this.step = 0
          this.nameRegister = ''
          this.emailRegister = ''
          this.passwordRegister = ''
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
