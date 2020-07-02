<template>
  <div>
    <v-parallax
      dark
      src="https://cdn.pixabay.com/photo/2018/10/15/07/33/background-3748311_1280.jpg"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center black--text" cols="12">
          <h1 class="display-2 font-weight-thin mb-4">
            Storytelling
          </h1>
          <h4 class="subheading">
            Build your application today!
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-row>
        <v-col
          v-for="(story, i) in storys"
          :key="i"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <cardAllStory
            :id="story.sr_id"
            :title="story.sr_title"
            :image="story.sr_image"
            :description="story.sr_description"
            :abstract="story.sr_abstract"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import axios from 'axios'
import cardAllStory from '@/components/cardAllStorys'

export default {
  layout: '',
  components: {
    cardAllStory
  },
  asyncData (context) {
    return context.$axios.get('api/story')
      .then((res) => {
        const data = []
        res.data.data.forEach((element) => {
          data.push(element)
        })
        // console.log(data)

        return {
          storys: data
        }
      })
  },
  computed: {
    // storyss () {
    //   return { storys: this.$store.getters.getStorys }
    // }
  },
  created () {
    this.$store.dispatch('setStorys')
  },
  mounted () {},
  methods: {

  }
}
</script>
