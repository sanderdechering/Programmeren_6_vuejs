<template>
  <div class="container ">
    <router-view></router-view>
  </div>
</template>

<script>
  import addContact from './components/addContact.vue';
  import viewContacts from './components/viewContacts.vue';
export default {
  components:{
    'add-contact':addContact,
    'view-contacts':viewContacts,
  }
}
</script>

<style>
  ::selection {
    background: deepskyblue !important; /* WebKit/Blink Browsers */
  }
  ::-moz-selection {
    background: deepskyblue !important; /* Gecko Browsers */
  }
  a{
    color: grey !important;
    text-decoration: none!important;
  }
  a:hover{
    color: white !important;
  }
  .btn{
    color: white !important;
  }
  tr a:hover{
    color: white !important;
    transition: 0.3s;
  }
  input{
    color: ghostwhite;
  }
</style>

