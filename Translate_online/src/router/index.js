import Vue from 'vue'
import Router from 'vue-router'
import Translate from '@/components/Translate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Translate',
      component: Translate
    }
  ]
})
