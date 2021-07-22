<template>
  <v-container>
    <v-sheet style="border-radius: 25px" elevation="2" color="white">
      <v-row>
        <v-container class="px-7">
          <v-row>
            <v-col :cols="isPhone ? 12 : 6">
              <v-select
                v-model="wilaya"
                prepend-inner-icon="mdi-map-marker"
                full-width
                height="50"
                label="Wilaya"
                hide-details
                disable-lookup
                filled
                dense
                rounded
                :items="wilNames"
              >
              </v-select>
            </v-col>
            <v-col :cols="isPhone ? 12 : 6">
              <v-select
                v-model="daira"
                prepend-inner-icon="mdi-map-marker-plus"
                full-width
                height="50"
                label="Daira"
                small-chips
                hide-details
                disable-lookup
                dense
                filled
                rounded
                :disabled="!dairas.length"
                multiple
                :items="dairas"
              ></v-select>
            </v-col>
            <v-col class="mx-auto" :cols="isPhone ? 12 : 6">
              <v-select
                v-model="type"
                prepend-inner-icon="mdi-home-modern"
                full-width
                height="50"
                label="Type"
                hide-details
                disable-lookup
                filled
                dense
                rounded
                small-chips
                multiple
                :items="types"
              >
                <template #selection="{ item, index }">
                  <v-chip v-if="index === 0" x-small>
                    <span>{{ item }}</span>
                  </v-chip>
                  <span v-if="index === 1" class="grey--text caption">
                    (+{{ type.length - 1 }})
                  </span>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <v-row>
        <v-col class="py-0" align="center">
          <v-radio-group v-model="radioGroup" class="mt-0" hide-details>
            <v-radio
              v-for="(typ, i) in ['Location', 'Achat']"
              :key="i"
              :class="i == 0 ? 'mx-auto' : 'pr-5 mx-auto'"
              :label="typ"
              :value="typ"
            ></v-radio> </v-radio-group
        ></v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col align="center">
          <v-btn
            class="white--text"
            x-large
            height="40"
            width="180"
            rounded
            color="primary"
            :loading="loader"
            @click="searchState"
          >
            Recherchez
            <v-icon class="ml-2 pr-0">mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import algeriaCities from '../assets/algeria-cities.json'
export default {
  data: () => ({
    types: ['House', 'Appartement', 'Villa', 'Studio', 'Chambre colocation'],
    type: [],
    wilObj: algeriaCities.wilayas,
    wilNames: [],
    wilaya: '',
    dairas: [],
    daira: [],
    multiComm: false,
    swlocation: true,
    radioGroup: 'Location',
    loader: false,
  }),

  computed: {
    loading() {
      return this.$store.getters['housesLoad/GET_LOAD']
    },
    fontSize() {
      if (this.$vuetify.breakpoint.xs) {
        return '12px'
      } else {
        return '14px'
      }
    },
    isPhone() {
      return this.$vuetify.breakpoint.xs
    },
  },
  watch: {
    wilaya(val) {
      //  dirha ki ykhayar mdina
      if (val == null) {
        this.dairas = []
        this.daira = ''
      } else {
        // eslint-disable-next-line no-unused-vars
        const indexFun = (element) => element === this.wilaya
        const indexWil = this.wilNames.findIndex(indexFun)
        console.log(indexWil)
        const dairas = this.wilObj[indexWil].dairas
        this.dairas = []
        for (let index = 0; index < dairas.length; index++) {
          this.dairas.push(dairas[index].name)
        }
      }
    },
    loading(val) {
      this.loader = val
    },
  },
  created() {
    for (let i = 0; i < this.wilObj.length; i++) {
      this.wilNames.push(i + 1 + ' - ' + this.wilObj[i].name)
    }
  },
  methods: {
    searchState() {
      this.loader = true
      this.$store.commit('housesLoad/LOAD_START')
      const searchArr = []
      for (let i = 0; i < this.type.length; i++) {
        searchArr.push('type=' + this.type[i])
      }
      this.$store.dispatch('search/search', searchArr)
      const url = this.$route.path
      if (url !== '/list') this.$router.push('/list')
    },
  },
}
</script>

<style></style>
