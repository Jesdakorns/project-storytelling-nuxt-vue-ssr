<template>
  <v-container fluid class="px-sm-12">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="10" lg="8">
        <v-card class="mx-lg-12 my-5">
          <v-card-title class="headline">
            สร้างเรื่องราว
          </v-card-title>
          <v-divider class="mx-4" />
          <v-card-subtitle class>
            <v-col cols="12">
              <v-text-field v-model="title" label="ชื่อเรื่อง" outlined dense />
              <v-text-field v-model="description" label="ประเภทเรื่องราว" outlined dense />
              <v-textarea v-model="abstract" outlined label="เรื่องย่อ" />
              <v-row class="px-3">
                <v-col cols="12 px-0 py-0">
                  <!-- <v-file-input multiple label="File input" /> -->
                  <v-file-input
                    name="cover_image"
                    label="ภาพหน้าปก"
                    prepend-icon="mdi-camera"
                    outlined
                    dense
                    @change="onCoverImageChange"
                  />
                </v-col>
              </v-row>
              <v-row class>
                <v-col cols="12">
                  <client-only>
                    <ckeditor v-model="story" :config="editorConfig" data-sample-short />
                  </client-only>
                </v-col>
              </v-row>
              <!-- <v-row class>
                <v-col cols="1">
                  <v-btn large depressed color="teal" dark @click="addRow">
                    เพิ่ม
                  </v-btn>
                </v-col>
              </v-row> -->
              <v-row class="px-3">
                <v-col cols="8" sm="10" md="10">
                  <v-file-input
                    id="file"
                    label="ภาพประกอบ"
                    prepend-icon="mdi-camera"
                    outlined
                    dense
                    multiple
                    @change="onIllustrationChange"
                  />
                </v-col>
                <v-col cols="4" sm="2" md="2">
                  <v-btn depressed color="teal" width="100%" dark @click="addRow">
                    อัปโหลด
                  </v-btn>
                </v-col>
              </v-row>
              <v-row />
              <v-row>
                <v-col cols="12">
                  <v-btn
                    large
                    depressed
                    color="blue darken-1"
                    width="100%"
                    dark
                    @click="postStory"
                  >
                    <h3>โพสต์</h3>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'authenticated',
  layout: 'manage',
  components: {},
  data () {
    return {
      title: '',
      description: '',
      abstract: '',
      cover_image: '',
      inputIllustration: '',
      inputNameIllustration: '',
      nameIllustration: [],
      illustration: [],
      illustrationTE: '',
      story: '<p>Content of the editor.</p>',
      editorConfig: {
        removePlugins: 'image'
      },
      rows: [],
      file: null

    }
  },
  computed: {
    getUserName1 () {
      return this.$store.getters.getName
    }
  },
  methods: {
    onCoverImageChange (e) {
      this.createImage(e)
    },
    createImage (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.cover_image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    onIllustrationChange (e) {
      // console.log(e)
      this.illustration.splice(0)
      e.forEach((element) => {
        // console.log(element)
        this.createImages(element)
      })
    },
    createImages (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        console.log(e)
        this.illustration.push(e.target.result)
        // this.illustrationTE = e.target.result
      }
      reader.readAsDataURL(file)
    },
    addRow () {
      // this.nameIllustration.push(this.inputNameIllustration)
      // this.illustration.push(this.illustrationTE)
      console.log(this.illustration)
      // console.log(this.nameIllustration)
      // console.log(event)
      // document.getElementsByClassName('v-file-input__text').html = ''
      // if (this.illustration[this.count] !== undefined) {
      //   this.row.push({
      //     doTaskMLR: this.messageMLR,
      //     completedMLR: false
      //   })

      //   console.log(this.illustration[this.count])
      //   this.disabled1 = false
      //   this.count++
      //   this.rows.push({})
      // }

      // console.log(this.count)
      // console.log(this.disabled)
    },
    removeRow (key) {
      console.log(key)
      // if (this.rows.length !== 1) {
      // const myBody = document.getElementsByClassName('file-input ' + key).remove()

      // console.log(myBody)

      this.count--
      this.disabled.splice(key, 1)
      this.rows.splice(key, 1)
      this.illustration.splice(key, 1)
      console.log(this.disabled)
      console.log(this.illustration)
      console.log(this.rows)
      // }
    },
    postStory () {
      console.log(this.illustration)

      this.$axios.defaults.headers.common.Authorization = `${this.$cookies.get('_Key')}`
      this.$axios
        .post('/api/story', {
          title: this.title,
          description: this.description,
          abstract: this.abstract,
          coverImage: this.cover_image,
          illustration: this.illustration,
          story: this.story
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
.container {
  background: #e8e8e8;
}
</style>
