import Vue from 'vue'
import App from './App.vue'
import 'typeface-montserrat/index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faHome, faUsers, faPlus, faCaretUp, faCaretDown, faBars, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueRouter from 'vue-router'
import Dashboard from './components/Contents/Dashboard'
import StaffDetails from './components/Contents/StaffDetails/StaffDetails'
import AddStaff from './components/Contents/StaffDetails/AddStaff'
import ViewStaff from './components/Contents/StaffDetails/ViewStaff/ViewStaff'
import { store } from './components/store/store'
import capitalize from './filters/capitalize'

library.add(faUserCircle, faHome, faUsers, faPlus, faCaretUp, faCaretDown, faBars, faEye)

Vue.component('font-awesome', FontAwesomeIcon)

Vue.use(VueRouter)
const routes = [
  { path: "/", component: Dashboard },
  {
    path: "/staff-details",
    component: StaffDetails,
    children: [
      { path: "", component: ViewStaff },
      { path: "add", component: AddStaff }
    ]
  },
  { path: '*', redirect: '/' }]
const router = new VueRouter({
  routes, mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  filter: {
    capitalize
  },
  render: h => h(App),
}).$mount('#app')
