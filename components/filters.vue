<template>
  <v-container>
    <v-row>
      <!-- Rooms -->
      <v-col :cols="$vuetify.breakpoint.xs ? 12 : 4">
        <v-btn color="#455A64" small rounded outlined
          >Rooms
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>

        <!-- Price -->
        <v-menu nudge-width="50" :close-on-content-click="false" offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              class="ml-2"
              color="#455A64"
              small
              rounded
              outlined
              v-bind="attrs"
              v-on="on"
              >Price
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list subheader>
            <v-subheader style="height: 30px" class="py-0 my-0"
              >mil /mois</v-subheader
            >
            <v-list-item>
              <v-list-item-content class="pt-1 pb-0"
                ><v-list-item-action class="mb-0">
                  <v-range-slider
                    v-model="price"
                    :min="minPr"
                    :max="maxPr"
                    thumb-label="always"
                    :thumb-size="14"
                  ></v-range-slider></v-list-item-action
              ></v-list-item-content> </v-list-item
          ></v-list>
        </v-menu>

        <!-- Prepayment -->
        <v-menu :nudge-width="30" :close-on-content-click="false" offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              class="ml-2"
              color="#455A64"
              small
              rounded
              outlined
              v-bind="attrs"
              v-on="on"
              >Prepayment
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list subheader>
            <v-subheader style="height: 30px" class="py-0 my-0"
              >Months</v-subheader
            >
            <v-list-item class="py-0 my-0">
              <v-list-item-content class="pt-1 pb-0"
                ><v-list-item-action class="mb-0">
                  <v-slider
                    v-model="prep"
                    max="6"
                    thumb-label="always"
                    :thumb-size="14"
                  ></v-slider></v-list-item-action
              ></v-list-item-content> </v-list-item
          ></v-list>
        </v-menu>
      </v-col>
      <!-- Search Button -->
      <v-col class="py-0">
        <v-btn
          class="white--text"
          height="40"
          width="55"
          elevation="1"
          rounded
          x-large
          color="primary"
          @click="filterState"
        >
          Filter
          <v-icon color="white">mdi-sync</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    tags: [],
    roomsNum: [],
    rooms: [],
    minPr: 0,
    maxPr: 8,
    price: [0, 10],
    disableRooms: false,
    enableCross: false,
    loading: false,
    search: '',
    selected: [],
    prep: 0,
    maxPrep: 6,
  }),
  computed: {
    searchStr() {
      return this.$store.getters.searchComp
    },
    allSelected() {
      return this.selected.length === this.items.length
    },
    categories() {
      const search = this.search.toLowerCase()

      if (!search) return this.items

      return this.items.filter((item) => {
        const text = item.text.toLowerCase()

        return text.includes(search)
      })
    },
    selections() {
      const selections = []

      for (const selection of this.selected) {
        selections.push(selection)
      }

      return selections
    },
    ...mapState({
      searchStr: (state) => state.search.search,
    }),
  },
  watch: {
    searchStr() {
      if (this.searchStr.includes('Appartement')) {
        this.roomsNum = ['2', '3', '+4']
      } else if (this.searchStr.includes('Villa')) {
        this.roomsNum = ['3', '+4']
      }
    },
  },
  created() {
    if (this.searchStr.includes('Appartement')) {
      this.roomsNum = ['2', '3', '+4']
    } else if (this.searchStr.includes('Villa')) {
      this.roomsNum = ['3', '+4']
    }
  },
  methods: {
    filterState() {
      const filtersArr = []
      for (let i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i] === '+4') {
          filtersArr.push('rooms=4')
        }
        filtersArr.push('rooms=' + this.rooms[i])
      }
      filtersArr.push('max_price=' + this.price + '000')
      this.$store.dispatch('filterSearch', filtersArr)
    },
  },
}
</script>
<style scoped>
.v-btn {
  text-transform: none;
}
</style>
