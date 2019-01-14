<template>
  <div class="row grey-text">
    <div class="col s8 offset-s2" v-on:click="toast">
      <h5>Contacts</h5>
    </div>
    <div class="card col s8 offset-s2  grey darken-3">
      <table>
        <tbody v-for="contact in contacts">
          <tr>
            <td><router-link :to="{ name: 'viewContact', params: { contactId: contact._id }}">{{contact.name}}</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col s8 offset-s2">
      <h5>Add Contact</h5>
    </div>
    <div class="card col s8 offset-s2  grey darken-3 addContact">
      <form class="formSelect" id="app" @submit="checkForm">
        <table>
          <tbody>
            <tr>
              <td>
                <div class="input-field">
                  <input id="first_name" type="text" class="validate" name="first_name" v-model="first_name">
                  <label for="first_name">First Name</label>
                </div>
              </td>
              <td>
                <div class="input-field">
                  <input id="last_name" type="text" class="validate" name="last_name" v-model="last_name">
                  <label for="last_name">Last Name</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="input-field">
                  <input id="email" type="email" class="validate" name="email" v-model="email">
                  <label for="email">Email</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <input type="radio" class="filled-in"  name="gender" v-model="gender" value="male">
                  <span>Male</span>
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <input type="radio" class="filled-in" name="gender" v-model="gender" value="female"/>
                  <span>Female</span>
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <div class="input-field">
                  <input id="number" type="number" class="validate" v-on:keypress="isNumber(event)" name="number" v-model="phonenumber">
                  <label for="number">Phonenumber</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="col s2">
                  <input type="button" v-on:click="checkForm" name="submit" class="waves-effect waves-light teal lighten-1 btn" value="Create Contact">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    <div class="col s8 offset-s2 rounded card" v-if="formStatus !== null">

    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "viewContacts",
    methods: {
      isNumber: function (evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();
          ;
        } else {
          return true;
        }
      },
      toast: function(){
        this.errors.forEach(function(entry){
          M.toast({html: entry})
        });
      },
      postForm: function(){
        axios.post('http://localhost:8081/api/contacts/', {
          name: this.first_name + this.last_name,
          email: this.email,
          gender: this.gender,
          phone: this.phone,
          headers: {
            'Accept': 'application/json',
          }
        })
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            this.errors.push(e)
            this.toast(this.errors)
          })
      },
      checkForm: function(e){
        this.errors = [];

        if (!this.first_name) {
          this.errors.push("Firstname required.");
        }
        if (!this.last_name) {
          this.errors.push("Lastname required.");
        }
        if (!this.email) {
          this.errors.push('Email required.');
        } else if (!this.validEmail(this.email)) {
          this.errors.push('Valid email required.');
        }

        if (!this.gender) {
          this.errors.push("Gender required.");
        }
        if(!this.phonenumber){
          this.errors.push('Phonenumber required');
        }else if(this.phonenumber.length > 10){
          this.errors.push('Phonenumber max lentgh of 10');
        }
        if (!this.errors.length) {
          this.postForm()
          this.toast("Added Contact")
        }else{
          this.toast(this.errors)
        }
        e.preventDefault();
      },
      validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    },
    data(){
      return{
        contacts: [],
        formStatus: null,
        message: "Success!",
        messageColor: null,
        errors: [],
        first_name: null,
        last_name: null,
        gender: null,
        email: null,
        phonenumber: null
      }
    },
    mounted() {
      axios.get('http://localhost:8081/api/contacts/', {
        headers: {
          'Accept': 'application/json',
        }
      }).then(( response) => {
        this.contacts = response.data.items
      }).catch( function (error) {
        console.log('Error', error)
      })
    },

  }
</script>

<style scoped>
  .addContact tr{
    border: none;
  }
</style>
