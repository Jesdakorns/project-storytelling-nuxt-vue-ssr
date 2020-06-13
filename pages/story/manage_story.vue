<template>
  <v-container
    fluid
    class="px-sm-12"
  >
    <v-card
      class="mx-auto my-5"
    >
      <v-card-title class="headline">
        สร้างเรื่องราว
      </v-card-title>
      <v-divider class="mx-4" />
      <v-card-subtitle class="">
        <v-col cols="12">
          <v-text-field
            label="ชื่อเรื่อง"
            outlined
            dense
          />
          <v-textarea
            outlined
            name="input-7-4"
            label="เรื่องย่อ"
          />
          <v-row class="px-3">
            <v-col cols="10 px-0 py-0">
              <v-file-input label="ภาพหน้าปก" prepend-icon="mdi-camera" outlined dense />
            </v-col>
            <v-col cols="2 py-0">
              <v-btn depressed color="teal" width="100%" dark>
                อัปโหลด
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="12">
              <client-only>
                <ckeditor v-model="editorData" :config="editorConfig" data-sample-short />
              </client-only>
            </v-col>
          </v-row>
          <v-row class="px-3">
            <v-col cols="10  px-0">
              <v-file-input label="ภาพประกอบ" prepend-icon="mdi-camera" outlined dense />
            </v-col>
            <v-col cols="2">
              <v-btn depressed color="teal" width="100%" dark>
                อัปโหลด
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="desserts"
                :items-per-page="5"
                class="elevation-1"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-card-subtitle>
      {{ editorData }}
    </v-card>
  </v-container>
</template>

<script>

export default {
  middleware: 'authenticated',
  components: {

  },
  data: () => ({
    editorData: '<p>Content of the editor.</p>',
    editorConfig: {
      // extraPlugins: 'easyimage',
      // removePlugins: 'image'
      // cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
      // cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
    },
    headers: [
      {
        text: 'ลำดับ',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'ชื่อไฟล์', value: 'calories' },
      { text: 'ดำเนินการ', value: 'fat' }
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%'
      }
    ]
  }),
  created () {
    // if (this.$cookies.get('_Key')) {
    //   this.isLogin = true
    // } else {
    //   this.isLogin = false
    //   this.$router.push('/auth', () => {})
    // }
  },
  methods: {

  }
}
</script>

<style scoped>
.container{
   background: #e8e8e8;
}
</style>
