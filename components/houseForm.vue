<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-container>
              <v-row>
                <v-col class="my-0 py-0" cols="6">
                  <validation-provider class="ma-0 pa-0">
                    <v-select
                      v-model="type"
                      :items="types"
                      label="Type"
                      prepend-icon="mdi-home-city"
                    >
                    </v-select>
                  </validation-provider>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="my-0 py-0">
                  <validation-provider class="ma-0 pa-0">
                    <v-select
                      v-model="rooms"
                      :items="roomsItems"
                      label="Chambres"
                      prepend-icon="mdi-bed"
                    >
                    </v-select>
                  </validation-provider>
                </v-col>
                <v-col class="my-0 py-0">
                  <validation-provider class="ma-0 pa-0">
                    <v-select
                      v-model="piece"
                      :items="pieceItems"
                      multiple
                      small-chips
                      label="Autres piéces"
                    ></v-select>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="my-0 py-0">
                  <validation-provider class="ma-0 pa-0">
                    <v-select
                      v-model="wilaya"
                      :items="wilayaItems"
                      label="Wilaya"
                      prepend-icon="mdi-map-marker"
                    ></v-select>
                  </validation-provider>
                </v-col>
                <v-col class="my-0 py-0">
                  <validation-provider name="daira">
                    <v-select
                      v-model="daira"
                      :items="dairaItems"
                      label="Daira"
                      prepend-icon="mdi-map-marker"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="my-0 py-0 pr-0">
                  <validation-provider v-slot="{ errors }" name="address">
                    <v-text-field
                      v-model="address"
                      class="inputs"
                      label="address"
                      type="text"
                      prepend-icon="mdi-map-marker-plus"
                    />
                    <span> {{ errors[0] }}</span>
                  </validation-provider>
                </v-col>
                <v-col cols="5" class="my-0 py-0 pl-0"
                  ><v-select v-model="paytype" :items="paytypeItems"></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" class="my-0 py-0 pr-0">
                  <validation-provider
                    v-slot="{ errors }"
                    name="price"
                    rules="required|numeric"
                  >
                    <v-text-field
                      v-model="price"
                      class="inputs"
                      label="price"
                      type="text"
                      prepend-icon="mdi-currency-usd"
                      @input="formatPrice"
                    />
                    <span> {{ errors[0] }}</span>
                  </validation-provider>
                </v-col>
                <v-col cols="5" class="my-0 py-0 pl-0"
                  ><v-select v-model="paytype" :items="paytypeItems"></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col>
            <validation-provider
              v-slot="{ errors }"
              name="Description"
              :rules="{
                required: true,
                regex: /^(?![\s.]+$)[a-zA-Z0-9àÀéèâ',/°\s.]*$/,
              }"
            >
              <v-textarea
                v-model="description"
                outlined
                class="inputs"
                label="Description"
                type="text"
                height="50"
              />
              <span> {{ errors[0] }}</span>
            </validation-provider>
            <v-file-input
              v-model="files"
              accept="image/png, image/jpeg, image/bmp"
              color="deep-purple accent-4"
              counter
              label="Images"
              multiple
              placeholder="Select your images"
              prepend-icon="mdi-camera"
              outlined
              :show-size="1000"
              @change="onFile"
            >
              <template #selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple accent-4"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn class="btn" raised color="#CFD8DC" @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'
function chunk(str) {
  let ret = []
  const i = str.length % 3
  const str1 = str.substring(i, str.length)
  ret = str1.match(/.{1,3}/g)

  return ret.push(str.substring(i)).reverse()
}

export default {
  data: () => ({
    multiple: true,
    title: '',
    types: ['Appartement', 'Villa'],
    type: '',
    wilayaItems: ['Sidi bel abbes', 'Oran', 'Alger', 'Setif', 'Annaba'],
    wilaya: '',
    roomsItems: ['1', '2', '3', '4', '5', '6', '7', '8'],
    rooms: null,
    pieceItems: ['cuisine', 'douche'],
    piece: null,
    dairaItems: ['hajot', 'campo'],
    daira: '',
    address: null,
    price: null,
    fmtPrice: null,
    paytype: null,
    paytypeItems: ['DZD/jour', 'DZD/mois'],
    description: null,
    files: [],
  }),
  computed: {
    userId() {
      return this.$store.state.userId
    },
  },
  methods: {
    formatPrice() {
      this.fmtPrice = chunk(this.price).join(' ').trim()
      // eslint-disable-next-line no-console
      console.log(this.fmtPrice)
    },
    submit() {
      const houseForm = new FormData()
      houseForm.append('title', this.title)
      houseForm.append('type', this.type)
      houseForm.append('city', this.city)
      houseForm.append('rooms', this.rooms)
      houseForm.append('beds', this.beds)
      houseForm.append('address', this.address)
      houseForm.append('user', this.userId)
      houseForm.append('price', this.price)
      houseForm.append('description', this.description)
      houseForm.append('image1', this.files[0], this.files[0].name)
      houseForm.append('image2', this.files[1], this.files[1].name)
      houseForm.append('image3', this.files[2], this.files[2].name)
      houseForm.append('image4', this.files[3], this.files[3].name)
      houseForm.append('image5', this.files[4], this.files[4].name)
      for (const pair of houseForm.entries()) {
        // eslint-disable-next-line no-console
        console.log(pair[0] + ', ' + pair[1])
      }
      axios
        .post('/house-create/', houseForm)
        // eslint-disable-next-line no-console
        .then((res) => console.log(res))
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error))
    },
    onFile(event) {
      // eslint-disable-next-line no-console
      console.log(event)
    },
  },
}
</script>
