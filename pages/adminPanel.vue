<template>
  <v-sheet>
    <v-container>
      <v-row>
        <v-col><p class="display-1 text--secondary">Houses created</p></v-col>
        <v-col>
          <v-sheet style="overflow-x: auto">
            <v-row>
              <v-col class="d-inline-flex">
                <card-admin
                  v-for="(house, i) in houses"
                  :key="i"
                  class="mr-5"
                  :house="house"
                >
                </card-admin>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="$vuetify.breakpoint.xs ? 12 : 10">
          <house-form></house-form>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import cardAdmin from '../components/cardAdmin'
import houseForm from '../components/houseForm'
import axiosServices from '../services/axiosServices'
export default {
  components: {
    'card-admin': cardAdmin,
    'house-form': houseForm,
  },
  async asyncData(context) {
    const { data } = await axiosServices.getUserHouses(
      context.store.state.auth.userId
    )
    return {
      houses: data,
    }
  },
  data() {
    return {
      tab: null,
      houses: [],
    }
  },
}
</script>

<style></style>
