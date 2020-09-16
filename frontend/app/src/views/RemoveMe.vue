<template>
  <div id="wall" class="wall">
    <h3>Vous voulez supprimer définitivement votre compte ?</h3>
    <div class="remove_box">
      <form id="remove" action="index.html" method="post" @submit.prevent="removeMe">
        <p><input type="password" name="password" id="password" placeholder="Entrez votre mot de passe ici" size="40" maxlength="255" required v-model="password"/></p>

        <p><input type="text" name="magicPhrase" id="magicPhrase" placeholder="Recopiez la phrase ci-dessous" size="40" maxlength="255" required v-model="magicPhrase"/></p>
        <p>"Je souhaite supprimer mon compte {{ profile.username }}."</p>
        <input class="button" type="submit" value="Envoyer" />
      </form>
    </div>

  </div>

</template>


<script>
//import Wall from '@/components/public_wall.vue'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data: function () {
    return {
      token: null,
      profile: [],
      myUser: '', // utiliser l'id du token
      password: '',
      magicPhrase: ''
    }
  },
  mounted () {
    const axios = require('axios');
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    this.myUser = VueJwtDecode.decode(this.token);
    axios.get('http://localhost:3000/users/' + this.myUser.userId)
    .then(response => (this.profile = response.data))

  },
  methods: {
    removeMe: function() {
      const router = this.$router;
      const axios = require('axios');
      this.token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
      this.myUser = VueJwtDecode.decode(this.token);
      axios.post('http://localhost:3000/rm/' + this.myUser.userId, {
        password: this.password,
        magicPhrase: this.magicPhrase
      })
      .then(response => {
        console.log(response);
        localStorage.removeItem("token");
        router.push("/")

      })
      .catch(error => {
        console.error(error.response.data.errors[0]);
      })

    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  text-align: center;
}
.wall {
  width: 100%;
  height: 100%;
  min-height: 52rem;
  background-color: #eee;
}
.remove_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  form {
    max-width: 800px;
    background-color: #ffffffdd;
    margin: 3em;
    padding: 1.5em;
    border-radius: 3em;

  }
}

</style>
