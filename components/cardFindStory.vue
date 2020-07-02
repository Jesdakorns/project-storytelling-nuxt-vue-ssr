<template>
  <v-card
    class="mx-sm-12"
  >
    <v-list-item>
      <v-list-item-avatar color="grey">
        <!-- {{ objData.imageProfile }} -->
        <v-img v-if="objData.imageProfile != null" :src="objData.imageProfile" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ objData.titleStory }}
        </v-list-item-title>
        <v-list-item-subtitle>by {{ objData.nameProfile }} | {{ objData.descriptionStory }} | แพร่โพสต์เมื่อวัน: {{ objData.createdAtStory }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div
      class="mx-5"
      align="center"
      justify="center"
    >
      <v-carousel
        cycle
        height="400"
      >
        <v-carousel-item
          v-for="(imageStory, i) in objData.imageStorys"
          :key="i"
        >
          <v-sheet
            height="100%"
          >
            <v-img
              :src="imageStory.image"
              height="100%"
              contain
              class="grey darken-4"
            />
            <v-row
              align="center"
              justify="center"
            >
              <div class="display-3" />
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="px-sm-12 py-12">
      <v-card-text v-html="objData.contentStory" />
    </div>
    <v-divider class="mx-4" />
    <v-card-actions>
      <v-btn
        text
        color="#007b05"
        to="/"
      >
        ย้อนกลับ
      </v-btn>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    objData: {
      type: Object,
      required: true
    }
  },
  created () {

  }
}
</script>

<style>

</style>
