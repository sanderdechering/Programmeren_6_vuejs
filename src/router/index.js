import Vue from 'vue'
import Router from 'vue-router'
import viewContacts from '../components/viewContacts.vue';
import viewContact from '../components/viewContact.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'viewContacts',
      component: viewContacts
    },
    {
      path: '/contacten',
      name: 'viewContacts',
      component: viewContacts
    },
    {
      path: '/contacten/:contactId',
      name: 'viewContact',
      component: viewContact,
      props: true,
    }
  ]
})
