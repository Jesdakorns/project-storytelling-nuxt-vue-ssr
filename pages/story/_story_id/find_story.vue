<template>
  <!-- <story /> -->
  <div>
    <v-container class="px-sm-12">
      <v-row>
        <v-col
          cols="12"
        >
          <cardFindStory :obj-data="objData" />
        </v-col>
      </v-row>
      <!-- <h1>{{ idProfile }}</h1> -->
      <!-- {{ objData }} -->
    </v-container>
  </div>
</template>

<script>
// import axios from 'axios'
import cardFindStory from '@/components/cardFindStory'

export default {
  components: {
    cardFindStory
  },
  async asyncData (context) {
    return await context.$axios.get('/api/story/' + context.params.story_id)
      .then((res) => {
        return {
          objData: {
            idProfile: res.data.data.profile.id,
            nameProfile: res.data.data.profile.name,
            imageProfile: res.data.data.profile.image,
            idStory: res.data.data.id,
            titleStory: res.data.data.title,
            descriptionStory: res.data.data.description,
            createdAtStory: res.data.data.created_at,
            contentStory: res.data.data.story,
            imageStorys: res.data.data.images
          }
        }
      })
  },
  created () {
    console.log(this.$route.params.story_id)
  },
  mounted () {

  },
  methods: {

  }
}
</script>
