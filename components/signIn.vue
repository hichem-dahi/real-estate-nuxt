<template>
  <div>
    <v-card height="270">
      <v-card-text>
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider v-slot="{ errors }" rules="email" name="Email">
              <v-text-field
                v-model="email"
                class="inputs"
                label="Email"
                type="text"
              />
              <span> {{ errors[0] }}</span>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="alphaNum"
              name="Password"
            >
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                class="inputs"
                label="Password"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              />
              <span> {{ errors[0] }}</span>
            </validation-provider>

            <v-btn
              class="btn"
              :disabled="invalid"
              raised
              color="#CFD8DC"
              @click="Submit"
              >Submit</v-btn
            >
          </form>
        </validation-observer>
      </v-card-text>
      <v-facebook-login
        class="mx-auto"
        app-id="453110369395561"
        @login="onLogin"
      >
      </v-facebook-login>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    show1: false,
  }),
  methods: {
    Submit() {
      this.$emit('dialog-false')
      const formData = {
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('auth/signIn', {
        email: formData.email,
        password: formData.password,
      })
      // eslint-disable-next-line no-console
      console.log(formData)
    },
    onLogin(res) {
      // eslint-disable-next-line no-console
      console.log(res.authResponse)
      this.$store.dispatch('socialLogin', res.authResponse.accessToken)
    },
  },
}
</script>

<style></style>
