<template>
  <v-card class="mx-auto my-5" max-width="374">
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          icon
          v-bind="attrs"
          class="btn-menu-dots-vertical"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
          @click="actions(item.actions)"
        >
          <v-icon :class="['mr-3' , item.color]" style="font-size: 15px">
            {{ item.icon }}
          </v-icon>

          <v-list-item-title :class="item.color">
            {{ item.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
      >
        read
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
  data () {
    return {
      items: [
        { icon: 'fas fa-edit', text: 'Edit', color: 'yellow--text text--darken-3', actions: 'edit' },
        { icon: 'fas fa-trash-alt', text: 'Delete', color: 'red--text text--darken-2', actions: 'delete' }
      ]
    }
  },
  created () {
    // console.log(this.path + this.image)
  },
  mounted () {

  },
  methods: {
    actions (actions) {
      console.log(this.id)
      if (actions === 'edit') {
        this.editStory()
      } else if (actions === 'delete') {
        this.deleteStory()
      }
    },
    editStory () {
      console.log('edit')
    },
    deleteStory () {
      console.log('delete')
      this.$axios.defaults.headers.common.Authorization = `${this.$cookies.get('_Key')}`
      this.$axios.delete('/api/story/' + this.id)
        .then((res) => {
          this.$axios.get('/api/story/all/my').then((res) => {
            console.log(res)

            this.$emit('update-storys', res.data.data)
          }).catch((err) => {
            console.log(err)
          })
        }).catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
  .btn-menu-dots-vertical{
    position: absolute;
    z-index: 1;
    left: 85%;
    top: 2%;
    background:#000000a8;
  }
</style>
