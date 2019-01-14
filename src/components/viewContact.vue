<template>
  <div class="row grey-text">

    <div class="col s8 offset-s2">
      <h5>Contact Details</h5>
    </div>
    <div class="card col s8 offset-s2 grey darken-3">
      <table>
        <tbody>
        <tr>
          <td>Id</td>
          <td>{{contact._id}}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{{contact.gender}}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{contact.email}}</td>
        </tr>
        <tr>
          <td>Number</td>
          <td>{{contact.phone}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col s8 offset-s2">
      <h5>Contact Update</h5>
    </div>
    <div class="card col s8 offset-s2 grey darken-3 ">
      <div class="row margin">
        <div class="col s2">
          <a class="waves-effect waves-light red lighten-1 btn">Delete</a>
        </div>
        <div class="col s2">
          <a class="waves-effect waves-light teal lighten-1 btn">Update</a>
        </div>
      </div>
    </div>
    <div class="col s8 offset-s2 margin">
      <router-link :to="{ name: 'viewContacts'}"><a class="waves-effect waves-light teal lighten-1 btn "><i class="large material-icons">keyboard_arrow_left</i></a></router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

    export default {
      name: "viewContact",
      data(){
        return{
          contact: [],
        }
      },
      mounted() {
        axios.get('http://localhost:8081/api/contacts/'+this.$route.params.contactId, {
          headers: {
            'Accept': 'application/json',
          }
        }).then(( response) => {
          this.contact = response.data

        }).catch( function (error) {
          console.log('Error', error)
        })
      },
      created() {
        console.log();
      },
    }
</script>

<style scoped>
  tr:hover{
    color: white;
    transition: 0.3s;
  }
  .margin{
    margin-top: 20px;
  }
</style>
