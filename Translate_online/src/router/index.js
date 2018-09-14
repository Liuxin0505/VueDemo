import Vue from 'vue'
import Router from 'vue-router'
import Translate from '@/components/Translate'
import axios from 'axios'

Vue.use(Router)
Vue.prototype.$axios = axios

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Translate',
      component: Translate
    }
  ]
})
