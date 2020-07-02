<template>
  <div>
    <v-container class="px-sm-12">
      <v-row>
        <v-col
          v-for="(story, i) in storys"
          :key="i"
          cols="12"
          sm="6"
          md="6"
          lg="4"
        >
          <cardAllStory
            :id="story.sr_id"
            :title="story.sr_title"
            :image="story.sr_image"
            :description="story.sr_description"
            :abstract="story.sr_abstract"
            @update-storys="updateStorys"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import cardAllStory from '@/components/manage/cardAllStorys'

export default {
  middleware: 'authenticated',
  layout: 'manage',
  components: {
    cardAllStory
  },
  asyncData (context) {
    console.log(context)

    context.$axios.defaults.headers.common.Authorization = `${context.app.$cookies.get('_Key')}`
    return context.$axios.get('/api/story/all/my')
      .then((res) => {
      //   const data = []
        //   res.data.data.forEach((element) => {
        //     data.push(element)
        //   })
        console.log(res)

        return {
          storys: res.data.data
        }
      })
  },
  methods: {
    updateStorys (e) {
      console.log(e)

      this.storys = e
    }
  }
//   data () {
//     return {
//       storys: [],
//       stret: 0
//     }
//   },
//   created () {
//     if (!this.$cookies.get('stret')) {
//       this.$cookies.set('stret', 1)
//       this.$axios.defaults.headers.common.Authorization = `${this.$cookies.get('_Key')}`
//       this.$axios.get('/api/story/all/my')
//         .then((res) => {
//           const data = []
//           res.data.data.forEach((element) => {
//             data.push(element)
//           })
//           this.storys = data
//           this.stret = 1
//         })
//     }
//   }
}
</script>

<style>

</style>
