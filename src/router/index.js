import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import addLicence from "../views/addLicence";
import editLicence from "../views/editLicence";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addLicence',
    name: 'addLicence',
    component: addLicence
  },
  {
    path: '/licences/:id',
    name: 'editLicence',
    component: editLicence,
    props:true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
