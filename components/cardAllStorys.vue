<template>
  <v-card :loading="loading" class="mx-auto my-5" max-width="374">
    <v-img height="250" :src="image" />
    <v-card-title>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <div class="text-truncate" v-on="on">
            {{ title }}
          </div>
        </template>
        <div cols="6">
          <span>{{ title }}</span>
        </div>
      </v-tooltip>
    </v-card-title>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        />
        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>
      <div class="my-4 subtitle-1">
        <v-chip :ripple="false">
          {{ description }}
        </v-chip>
      </div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <div class="text-truncate" v-on="on">
            {{ abstract }}
          </div>
        </template>
        <div cols="6">
          <span>{{ abstract }}</span>
        </div>
      </v-tooltip>
    </v-card-text>
    <v-divider class="mx-4" />
    <v-card-actions>
      <v-btn
        color="#33691E"
        outlined
        class="subtitle-1"
        :to="'/story/'+id+'/find_story'"
        @click="reserve"
      >
        อ่าน
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    abstract: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false
  }),
  created () {
  },
  mounted () {

  },
  methods: {
    reserve () {
      this.loading = true
      setTimeout(() => (this.loading = false), 100000)
    }
  }
}
</script>

<style>

</style>
