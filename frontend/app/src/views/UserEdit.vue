<template>
  <div id="wall" class="wall">

    <form id="edit" @submit.prevent="editProfile">
      <div class="editText">
        <div class="edit_box">
          <p>Votre Avatar:</p>
          <input type="file" id="file" ref="file" name="avatar" placeholder="Avatar" @change="handleFileUpload()">

          <input type="text" name="username" placeholder="username" required v-model="username">
          <input type="email" name="email" placeholder="email" required v-model="email">
          <textarea rows="6" cols="20" name="message" placeholder="Biographie" v-model="bio"></textarea>
          <input class="button" type="submit" value="Valider" />

          <p><a href="../pass_wd_edit">[Changer de mot de passe]</a></p>

          <p> <a class="error" href="../remove_me">[supprimer mon compte]</a></p>
        </div>

      </div>

    </form>



  </div>

</template>


<script>
const axios = require('axios');
import VueJwtDecode from 'vue-jwt-decode'

export default {
  data: function () {
    return {
      token: null,
      profile: [],
      myUser: '', // utiliser l'id du token
      avatar: '',
      email: '',
      username: '',
      bio: '',
      file: ''
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    editProfile() {
      const router = this.$router;
      let formData = new FormData();

      formData.append('avatar', this.file);
      formData.append('email', this.email);
      formData.append('username', this.username);
      formData.append('bio', this.bio);
      axios.put('http://localhost:3000/edit/' + this.myUser.userId, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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

  mounted () {
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    this.myUser = VueJwtDecode.decode(this.token);
    axios.get('http://localhost:3000/users/' + this.myUser.userId)
    .then(response => (this.email = response.data.email, this.username = response.data.username, this.bio = response.data.bio, this.avatar = response.data.url_image));
  }
}
</script>

<style scoped lang="scss">
.wall {
  width: 100%;
  height: 100%;
  min-height: 52rem;
  background-color: #eee;
}
.editText {
  display: flex;
  flex-direction: column;
}
.profile {
  background-color: #ffffffdd;
  margin: 3em 0 -3em 0;
  padding: 1.5em;
  border-radius: 3em 3em 0 0;
  h4 {
    font-size: 3em;
    margin: 0;
    font-weight: bold;
  }
}
.edit_box {
  background-color: #ffffffdd;
  margin: 3em 0;
  padding: 6em 2em 2em 2em;
  border-radius: 3em;
  @media (min-width: 1280px) {
    display: flex;
    flex-direction: column;
    margin: 2em 20em;
  }
}

#edit {
  margin: 0 1em;
}
#file {
  font-size: 0.7rem;
}
input {
  font-size: 1em;
  background-color: #fff;
}
textarea {
  padding: 1em;
  border: none;
}
.button {
  margin: 1em;
  max-width: 200px;
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
