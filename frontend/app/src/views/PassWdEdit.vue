<template>
  <div class="newPassWd">

    <div >
      <form id="newPost" @submit.prevent="editPass">
          <!--<input type="file" name="avatar" v-model="avatar">-->
          <input type="password" name="password" placeholder="Votre mot de passe actuel" required v-model="password">
          <input type="password" name="newPassword" placeholder="Votre nouveau mot de passe" required v-model="newPassword">
          <input type="password" name="newPassword" placeholder="Confirmez votre nouveau mot de passe" required >

        <input class="button" type="submit" value="Changer" />
      </form>
    </div>

  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data: function () {
    return {
      password: '',
      newPassword: '',
      token: '',
      myUser: '', // utiliser l'id du token

    }
  },
  mounted () {
    this.token = localStorage.getItem('token');
    this.myUser = VueJwtDecode.decode(this.token);

  },
  methods: {
    editPass() {
      const router = this.$router;
      const axios = require('axios');
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
      axios.put('http://localhost:3000/new_passwd/' + this.myUser.userId, {
        password: this.password,
        newPassword: this.newPassword
      })
      .then(function(){
        console.log('SUCCESS');
        router.push("../Wall")
      })
      .catch(function(){
        console.error('FAILURE');
      });

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
form {
  display: flex;
  flex-direction: column;
}
input {
  font-size: 1em;
  background-color: #fff;
}
.button {
  max-width: 200px;
  margin: 1em;
  width: 50%;
  border-radius: 50% 20% / 10% 40%;
  padding: 1.5em;
  font-size: 1em;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: #3498db;
  border-width: 0;
}
</style>
