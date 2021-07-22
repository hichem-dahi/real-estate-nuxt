<template>
  <v-app>
    <!--66636F-->
    <v-app-bar color="#ECEFF1" height="80" app fixed>
      <v-container>
        <v-row>
          <!-- Logo -->
          <v-col v-if="!$vuetify.breakpoint.xs" class="pr-0" cols="1">
            <v-img class="mt-5" width="70" height="50" :src="logo"></v-img>
          </v-col>

          <!-- Title -->
          <v-col class="pl-0 mt-5" cols="2" @click="goHome">
            <span class="display-1 brown--text text--lighten-2">Immo</span>
            <span class="display-1 blue--text text--lighten-2 mx-auto"
              >Bit</span
            >
          </v-col>
          <!-- save,sign in/up section -->
          <v-col align="end" cols="9">
            <!-- 
            <v-btn class="mt-6" large icon>
              <v-icon>mdi-heart</v-icon>
              <v-badge
                v-if="savedHouses.length"
                dot
                bottom
                color="red"
                :content="savedHouses.length"
              >
              </v-badge
            ></v-btn>
            -->
            <v-menu v-if="authenticated == 'null'" offset-y>
              <template #activator="{ on, attrs }">
                <v-btn class="mt-6" icon large v-bind="attrs" v-on="on">
                  <v-icon>mdi-account-circle</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-dialog v-model="dialog1" max-width="350">
                    <template #activator="{ on, attrs }">
                      <v-list-item-title v-bind="attrs" v-on="on">
                        Sign up
                      </v-list-item-title>
                    </template>
                    <sign-up @dialog-false="dialog1 = false"></sign-up>
                  </v-dialog>
                </v-list-item>

                <v-list-item>
                  <v-dialog v-model="dialog2" max-width="350">
                    <template #activator="{ on, attrs }">
                      <v-list-item-title v-bind="attrs" v-on="on">
                        Sign in
                      </v-list-item-title>
                    </template>
                    <v-card>
                      <sign-in></sign-in>
                    </v-card>
                  </v-dialog>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu v-if="authenticated != 'null'" offset-y>
              <template #activator="{ on, attrs }">
                <v-btn class="mt-6" icon large v-bind="attrs" v-on="on">
                  <v-icon>mdi-account-circle</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <nuxt-link
                    style="text-decoration: none; color: inherit"
                    :to="{ name: 'adminPanel' }"
                  >
                    <v-list-item-title>
                      <v-btn small outlined color="primary">Admin</v-btn>
                    </v-list-item-title>
                  </nuxt-link>
                </v-list-item>
                <!--
                <v-list-item>
                  <v-list-item-title>
                    <v-dialog v-model="dialog3" max-width="450">
                      <template #activator="{ on, attrs }">
                        <v-btn
                          small
                          v-bind="attrs"
                          dark
                          outlined
                          color="brown"
                          v-on="on"
                          >Add house
                        </v-btn>
                      </template>
                      <house-form></house-form>
                    </v-dialog>
                  </v-list-item-title>
                </v-list-item>
                 -->
                <v-divider class="mx-3"></v-divider>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn small text @click="logout">logout</v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>

    <v-bottom-sheet v-model="saved">
      <saved-houses :saved-houses="savedHouses"></saved-houses>
    </v-bottom-sheet>

    <v-bottom-navigation v-if="$vuetify.breakpoint.xs" fixed color="indigo">
      <v-btn @click="goHome">
        <span>Recherche</span>

        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn @click="saved = !saved">
        <span>Enregistré</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn @click="goList">
        <span>Navigation</span>

        <v-icon> mdi-format-list-bulleted </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import signIn from '@/components/signIn'
import signUp from '@/components/signup'
// import houseForm from '@/components/houseForm'
import savedHouses from '@/components/savedHouses'
import { mapState } from 'vuex'
export default {
  components: {
    'sign-in': signIn,
    'sign-up': signUp,
    // 'house-form': houseForm,
    'saved-houses': savedHouses,
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
    homePage() {
      if (this.$route.path === '/list' || this.$route.path === '/') {
        return true
      } else return false
    },
    route() {
      return this.$route.path
    },
    ...mapState({
      savedHouses: (state) => state.savedHouses.savedHouses,
      authenticated: (state) => state.auth.token,
    }),
  },
  /* created() {
    this.$store.dispatch('auth/refreshLogin')
  }, */
  methods: {
    goHome() {
      if (this.$route.path !== '/') this.$router.push('/')
    },
    goList() {
      if (this.$route.path !== '/list') this.$router.push('/list')
    },
    // eslint-disable-next-line no-unused-vars
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = entries[0].isIntersecting
    },
    logout() {
      this.$store.dispatch('auth/logout')
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
