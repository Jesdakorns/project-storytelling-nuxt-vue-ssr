<template>
  <v-container class="px-sm-12">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="10" lg="10">
        <v-card class="mx-lg-12 my-5">
          <v-card-title class="headline">
            สร้างเรื่องราว
          </v-card-title>
          <v-divider class="mx-4" />
          <v-card-subtitle class>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                label="ชื่อเรื่อง"
                outlined
                dense
              />
              <v-text-field v-model="description" label="ประเภทเรื่องราว" outlined dense />
              <v-textarea v-model="abstract" outlined label="เรื่องย่อ" />
              <v-row class="px-3">
                <v-col cols="12 px-0 py-0">
                  <v-file-input
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
              <v-row class="px-3">
                <v-col cols="12 px-0 py-0">
                  <v-file-input
                    label="ภาพประกอบ"
                    prepend-icon="mdi-camera"
                    outlined
                    dense
                    multiple
                    @change="onIllustrationChange"
                  />
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
    <!-- <v-snackbar
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
    </v-snackbar> -->
  </v-container>
</template>

<script>
export default {
  middleware: 'authenticated',
  layout: 'manage',
  data () {
    return {
      title: '',
      description: '',
      abstract: '',
      cover_image: '',
      illustration: [],
      story: '<p>Content of the editor.</p>',
      editorConfig: {
        removePlugins: 'image'
      }
    }
  },
  methods: {
    onCoverTitle () {
      console.log(this.story)
    },
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
      }
      reader.readAsDataURL(file)
    },
    postStory () {
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
          this.$router.push('/manage/story/my', () => {})
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style>

</style>
