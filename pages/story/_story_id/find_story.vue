<template>
  <!-- <story /> -->
  <div>
    <v-container fluid class="px-sm-12">
      <v-row>
        <v-col
          cols="12"
        >
          <cardFindStory :obj-data="objData" />
        </v-col>
      </v-row>
      <!-- <h1>{{ $route.params.story_id }}</h1> -->
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import cardFindStory from '@/components/cardFindStory'

export default {
  components: {
    cardFindStory
  },
  data () {
    return {
      objData: {
        idProfile: '',
        nameProfile: '',
        imageProfile: '',
        idStory: '',
        titleStory: '',
        descriptionStory: '',
        createdAtStory: '',
        contentStory: '',
        imageStorys: ''
      }
    }
  },
  created () {
    this.findStory()
  },
  mounted () {

  },
  methods: {
    findStory () {
      axios
        .get('/api/find_storys/' + this.$route.params.story_id)
        .then((result) => {
          const profile = result.data.additionalUserInfo.profile
          const story = result.data.additionalUserInfo.story

          this.objData.idProfile = profile.id
          this.objData.nameProfile = profile.name
          this.objData.imageProfile = profile.image
          this.objData.idStory = story.id
          this.objData.titleStory = story.title
          this.objData.descriptionStory = story.description
          this.objData.createdAtStory = story.created_at
          this.objData.contentStory = story.story
          this.objData.imageStorys = story.image
          // test git v2
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }
  }
}
</script>
