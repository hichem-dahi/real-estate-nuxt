import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required,
  email,
  alpha,
  alpha_num as alphaNum,
  confirmed,
  numeric,
  alpha_spaces as alphaSpaces,
  regex,
} from 'vee-validate/dist/rules'
extend('required', required)
extend('email', email)
extend('alpha', alpha)
extend('alphaNum', alphaNum)
extend('confirmed', confirmed)
extend('numeric', numeric)
extend('alpha_spaces', alphaSpaces)
extend('regex', regex)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
