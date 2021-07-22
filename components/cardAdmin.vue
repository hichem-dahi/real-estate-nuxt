/* eslint-disable no-console */
<template>
  <v-card max-width="350">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="300px"
      width="350px"
    >
      <v-card-title>{{ house.title }}</v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>
      <!--

      <v-dialog scrollable max-width="600px">
        <template #activator="{ on }">
          <v-btn tile text color="#4E342E" v-on="on">
            <v-icon>mdi-pencil</v-icon>Edit dates</v-btn
          >
        </template>
        <v-card>
          <v-row>
            <v-col cols="12" sm="6">
              <v-date-picker
                :allowed-dates="allowedDates"
                readonly
              ></v-date-picker>
            </v-col>
            <v-col cols="12" sm="6">
              <v-container
                ><v-row v-for="(namesDate, index) in namesDates" :key="index">
                  <v-text-field
                    :value="namesDate.dates"
                    :label="namesDate.user"
                    prepend-icon="mdi-calendar"
                    readonly
                  ></v-text-field></v-row
              ></v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      -->
      <v-dialog scrollable max-width="400px">
        <template #activator="{ on }">
          <v-btn tile text color="#4E342E" v-on="on">
            <v-icon>mdi-pencil</v-icon>Edit</v-btn
          >
        </template>
        <house-form></house-form>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>
<script>
import houseForm from '@/components/houseForm'
export default {
  components: { 'house-form': houseForm },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    house: Object,
  },
}
</script>
<style>
.px-0 {
  padding: 0px;
}
</style>
