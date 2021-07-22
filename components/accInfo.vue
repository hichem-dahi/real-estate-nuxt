<template>
  <div class="accInfo">
    <v-card>
      <v-card-text>
        <validation-provider
          v-slot="{ errors }"
          name="Name"
          rules="required|alpha"
        >
          <v-text-field
            v-model="fname"
            class="inputs"
            label="First name"
            type="text"
          />
          <span> {{ errors[0] }}</span>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          name="Name"
          rules="required|alpha"
        >
          <v-text-field
            v-model="lname"
            class="inputs"
            label="Last name"
            type="text"
          />
          <span> {{ errors[0] }}</span>
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="Email">
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
          rules="numeric"
          name="Phone number"
        >
          <v-text-field
            v-model="phoneNum"
            class="inputs"
            label="Phone N°"
            type="text"
          />
          <span> {{ errors[0] }}</span>
        </validation-provider>
        <router-link :to="{ name: 'admin-panel' }">
          <v-btn class="btn" raised color="#CFD8DC">Resubmit</v-btn>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    fname: '',
    lname: '',
    email: '',
    password: '',
    passwordconf: '',
    phoneNum: '',
    show1: false,
    show2: false,
  }),
  mounted() {
    axios
      .get('/users/users/me', {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log('AccInfoGet', res)
        this.fname = res.data.first_name
        this.lname = res.data.last_name
        this.email = res.data.email
        this.phoneNum = res.data.phone
      })
  },
}
</script>

<style>
.accInfo {
  height: 500px;
  width: 500px;
}
</style>
