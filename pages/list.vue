<template>
  <v-container ref="card" :class="$vuetify.breakpoint.xs ? 'pa-0 ma-0' : ''">
    <v-row no-gutters>
      <v-col cols="12">
        <filters-card></filters-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card-title>
      annonces trouvées in Sidi bel abbes, Sidi bel abbes
    </v-card-title>
    <v-row no-gutters>
      <v-col v-if="!$vuetify.breakpoint.xs" cols="7" align="start">
        <card
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
          class="mb-6"
        ></card>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.xs">
        <card-phone
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
          style="margin-bottom: 70px"
        ></card-phone>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import filtersCard from '../components/filters'
import Card from '../components/cardSmart'
import cardPhone from '../components/cardPhone'
export default {
  components: {
    card: Card,
    'filters-card': filtersCard,
    'card-phone': cardPhone,
  },
  data: () => ({
    duration: 300,
    offset: 0,
    easing: 'easeInOutCubic',
  }),
  async fetch({ store, error }) {
    try {
      await store.dispatch('search/getHouses')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch houses',
      })
    }
  },
  computed: {
    searchStr() {
      return this.$store.getters['search/GET_SEARCH']
    },
    target() {
      return this.$refs.card
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      }
    },
    houses() {
      return this.$store.state.search.houses
    },
  },
  watch: {
    searchStr() {
      axios.get('/houses-list/?' + this.searchStr).then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
        this.houses = res.data
      })
    },
    houses() {
      this.$store.commit('housesLoad/LOAD_END')
    },
  },
}
</script>

<style></style>
