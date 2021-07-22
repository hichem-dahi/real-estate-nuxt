<template>
  <v-sheet
    id="search"
    width="51"
    color="white"
    height="52"
    class="rounded-pill"
  >
    <div class="d-flex flex-row">
      <validation-provider>
        <v-autocomplete
          v-show="expand"
          v-model="type"
          height="52"
          dense
          class="fields"
          label="Type"
          filled
          rounded
          multiple
          :items="types"
        >
          <template #selection="{ item, index }">
            <v-chip v-if="index === 0" small>
              <span>{{ item }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text caption">
              (+{{ type.length - 1 }} others)
            </span>
          </template>
        </v-autocomplete>
      </validation-provider>
      <validation-provider>
        <v-autocomplete
          v-show="expand"
          v-model="city"
          height="52"
          dense
          class="fields"
          label="City, street"
          small-chips
          filled
          rounded
          :loading="loading"
          :disabled="loading"
          :multiple="multiStreet"
          :items="multiStreet ? streets : cities"
        ></v-autocomplete>
      </validation-provider>

      <v-btn
        height="52"
        width="52"
        fab
        icon
        color="blue"
        @click="
          expand = !expand
          searchState()
        "
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import gsap from 'gsap'
export default {
  props: {
    appBar: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    types: ['House', 'Appartement', 'Villa', 'Studio', 'Chambre colocation'],
    cities: ['Sidi bel abbes', 'Oran', 'Alger'],
    streets: ['Oran', 'Sidi bel abbes', 'Alger', 'Zeralda', 'Hydra'],
    city: '',
    type: [],
    multiStreet: false,
    expand: false,
  }),

  computed: {
    loading() {
      return this.$store.state.loading
    },
  },
  watch: {
    city(val) {
      if (!Array.isArray(val)) {
        this.multiStreet = true
        this.city = [val]
      }
      if (val.length === 0) {
        this.multiStreet = false
        this.city = ''
      }
    },
    expand(val) {
      if (val === true) {
        gsap.to('#search', {
          duration: 0.3,
          ease: 'expo',
          width: '100%',
        })
        gsap.fromTo(
          '.fields',
          {
            duration: 0.3,
            ease: 'expo',
            width: 0,
          },
          {
            duration: 0.3,
            ease: 'expo',
            width: '100%',
          }
        )
      } else {
        gsap.to('#search', {
          duration: 0.3,
          ease: 'expo',
          width: 49,
        })
        gsap.fromTo(
          '.fields',
          {
            duration: 0.3,
            ease: 'expo',
            width: '100%',
          },
          {
            duration: 0.3,
            ease: 'expo',
            width: 0,
          }
        )
      }
    },
  },
  methods: {
    searchState() {
      const searchArr = []
      for (let i = 0; i < this.type.length; i++) {
        searchArr.push('type=' + this.type[i])
      }
      if (searchArr.length !== 0) {
        this.$store.dispatch('search', searchArr)
        const url = this.$route.path
        if (url !== '/list') this.$router.push('/list')
      }
    },
  },
}
</script>

<style></style>
