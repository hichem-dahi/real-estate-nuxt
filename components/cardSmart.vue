<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card height="250" shaped :elevation="hover ? 12 : 2">
        <v-container fluid class="pa-0">
          <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-0" cols="5">
              <v-carousel height="250" hide-delimiters>
                <v-carousel-item
                  :to="{ name: 'house-id', params: { id: house.id } }"
                  src="https://nipponpaint.co.in/wp-content/uploads/2019/03/10-new-interior-colour-combinations-that-you-should-try-in-2019-for-your-home-walls-1024x640.jpg"
                ></v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col class="pb-0">
              <v-container>
                <v-row>
                  <v-col>
                    <div class="d-flex green--text text--darken-4">
                      <v-icon>mdi-currency-usd </v-icon>
                      <div class="title grey--text">•</div>
                      <div class="title ml-2">30 000</div>
                      <div class="title">DZD/</div>
                      <div class="caption mt-3">mois</div>
                    </div>
                    <v-divider></v-divider>
                    <div class="font-weight-normal ml-3 mt-3">
                      <v-icon class="pb-1 mr-1 ml-1">mdi-map-marker</v-icon
                      >{{ address }}
                    </div>

                    <div class="text--secondary ml-10">
                      • {{ house.rooms }} Chambres
                    </div>
                  </v-col>
                </v-row>
                <!-- heart icon, price -->
                <v-row>
                  <v-col> <v-spacer></v-spacer> </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-chip> Prepayment: 3 mois </v-chip>
                  </v-col>
                  <v-col align="end">
                    <v-btn color="alert" icon @click="addHouse">
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-hover>
  </div>
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
  }),
  computed: {
    title() {
      return (
        this.house.title.charAt(0).toUpperCase() +
        this.house.title.substr(1).toLowerCase()
      )
    },
    type() {
      return (
        this.house.type.charAt(0).toUpperCase() +
        this.house.type.substr(1).toLowerCase()
      )
    },
    city() {
      return (
        this.house.city.charAt(0).toUpperCase() +
        this.house.city.substr(1).toLowerCase()
      )
    },
    address() {
      return (
        this.house.address.charAt(0).toUpperCase() +
        this.house.address.substr(1).toLowerCase()
      )
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
      this.$store.commit('saveHouse', this.id)
    },
  },
}
</script>
