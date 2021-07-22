<template>
  <div>
    <v-container v-if="homePage">
      <v-row class="mt-12">
        <v-col class="mx-auto" :cols="$vuetify.breakpoint.xs ? 11 : 7">
          <transition name="slide-fade" mode="out-in">
            <search-bar v-intersect="onIntersect"></search-bar>
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import searchBar from '@/components/searchBar'
export default {
  components: {
    'search-bar': searchBar,
  },
  data: () => ({
    logo: require('@/assets/logo.jpg'),
    dialog1: false,
    dialog2: false,
    dialog3: false,
    saved: false,
    value: 1,
    isIntersecting: false,
  }),
  computed: {
    savingIds() {
      return this.$store.state.savedHousesId
    },
    authenticated() {
      return this.$store.getters['auth/GET_TOKEN']
    },
    homePage() {
      if (this.$route.path === '/list' || this.$route.path === '/') {
        return true
      } else return false
    },
  },

  created() {
    this.$store.dispatch('auth/refreshLogin')
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = entries[0].isIntersecting
    },
  },
}
</script>
<style>
.slide-fade-enter {
  transform: translateX(15px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}
.slide-fade-leave-to {
  transform: translateX(-15px);
  opacity: 0;
}
.v-btn {
  text-transform: none;
}
</style>
