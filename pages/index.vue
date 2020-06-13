<template>
  <div>
    <v-parallax
      dark
      src="https://cdn.pixabay.com/photo/2018/10/15/07/33/background-3748311_1280.jpg"
    >
      <v-row
        align="center"
        justify="center"
      >
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
    <v-container class="">
      <v-row>
        <v-col
          v-for="(story, i) in storys"
          :key="i"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <cardAllStory :id="story.id" :title="story.title" :image="story.image" :description="story.description" :abstract="story.short_story" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import cardAllStory from '@/components/cardAllStorys'

export default {
  components: {
    cardAllStory
  },
  data () {
    return {
      storys: []
    }
  },
  created () {
    this.allStory()
  },
  mounted () {

  },
  methods: {
    allStory () {
      axios
        .get('/api/all_storys')
        .then((result) => {
          const data = result.data.additionalUserInfo.story
          data.forEach((element) => {
            this.storys.push(element)
          })
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
      // console.log(this.storys)
    }
  }
}
</script>
