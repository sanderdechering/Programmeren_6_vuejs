<template>
  <div class="row grey-text">
    <div class="col s8 offset-s2">
      <h5>Add Contact</h5>
    </div>
    <div class="card col s8 offset-s2  grey darken-3">
      <p>Hier komen veldfen</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id:this.$route.params.contactId,
        contact: {}
      }
    },
    created() {
      this.$http.get('http://localhost:8081/api/contacts/'+this.id).then(function (data) {
        console.log(data);
        this.contact = data.body;
      })
    }
  }
</script>
