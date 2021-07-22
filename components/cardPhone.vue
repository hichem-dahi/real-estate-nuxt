<template>
  <v-card elevation="1">
    <v-carousel height="350" hide-delimiters>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        src="https://cf.bstatic.com/images/hotel/max1024x768/208/208480857.jpg"
        class="text-right"
      >
        <v-btn large icon dark @click="addHouse">
          <v-icon>
            {{ saved ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{ name: 'house-id', params: { id: id } }"
        >
          <v-container fill-height align-end pl-0>
            <v-card-title class="pl-0">
              <v-sheet id="price" min-width="350" class="pb-4">
                <v-row no-gutters>
                  <v-icon>mdi-currency-usd </v-icon>
                  <div class="title font-weight-bold">• 30 000DZD/</div>

                  <div class="caption">mois</div>
                </v-row>
              </v-sheet>
            </v-card-title>
          </v-container>
        </router-link>
      </v-carousel-item>
    </v-carousel>

    <v-card-text class="text--primary pb-0">
      <div class="body-1 font-weight-medium">
        <v-icon>mdi-map-marker</v-icon>{{ address }}
      </div>
      <div class="body-2 text--secondary ml-6">
        • {{ house.rooms }} chambres
      </div>
    </v-card-text>

    <v-card-actions class="py-0">
      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ house.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    house: Object,
  },
  data: () => ({
    show: false,
    items: [],
    saved: false,
  }),
  computed: {
    id() {
      return this.house.id
    },
    title() {
      return (
        this.house.title.charAt(0).toUpperCase() +
        this.house.title.substr(1).toLowerCase()
      )
    },
    type() {
      return this.house.type.toLowerCase()
    },
    city() {
      return this.house.city.toLowerCase()
    },
    address() {
      return (
        this.house.address.charAt(0).toUpperCase() +
        this.house.address.substr(1).toLowerCase()
      )
    },
    homeMdi() {
      if (this.house.type === 'Appartement') return 'mdi-home-modern'
      else if (this.house.type === 'Villa') return 'mdi-home'
      else return ''
    },
  },
  created() {
    this.items.push(this.house.image1)
    this.items.push(this.house.image2)
    this.items.push(this.house.image3)
    this.items.push(this.house.image4)
    this.items.push(this.house.image5)
  },
  methods: {
    addHouse() {
      if (this.saved === false) {
        this.$store.dispatch('savedHouses/getHouse', this.id)
        this.saved = true
      } else {
        this.$store.commit('savedHouses/REM_SAVED_HOUSE', this.id)
        this.saved = false
      }
    },
  },
}
</script>

<style>
#price {
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
}
</style>
