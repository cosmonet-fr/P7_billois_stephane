<template>
  <div class="newPassWd">

    <div class="newPost">
      <form id="newPost" @submit.prevent="editProfile">
        <div class="newPostText">
          <!--<input type="file" name="avatar" v-model="avatar">-->
          <input type="password" name="password" placeholder="Votre mot de passe actuel" required v-model="password">
          <input type="password" name="newPassword" placeholder="Votre nouveau mot de passe" required v-model="newPassword">
          <input type="password" name="newPassword" placeholder="Confirmez votre nouveau mot de passe" required >
        </div>
        <input class="button" type="submit" value="Changer" />
      </form>
    </div>

  </div>
</template>

<script>
//import VueJwtDecode from 'vue-jwt-decode'
export default {
  data: function () {
    return {
      password: '',
      newPassword: '',
      token: null,
      myUser: 2, // utiliser l'id du token

    }
  },
  methods: {
    editProfile() {
      const axios = require('axios');
      //this.myUser = VueJwtDecode.decode(this.token);
      //this.token = localStorage.getItem('token');
      //axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
      axios.put('http://localhost:3000/new_passwd/' + this.myUser, {
        password: this.password,
        newPassword: this.newPassword
      })

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
input {
  font-size: 1em;
  background-color: #fff;
}
.button {
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
