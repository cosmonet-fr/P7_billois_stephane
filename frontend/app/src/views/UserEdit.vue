<template>
  <div id="wall" class="wall">

    <form id="edit" @submit.prevent="editProfile">
      <div class="editText">
        <div class="edit_box">
          <div v-if="!avatar">
            <img :src="avatar" />
            <input type="file" name="avatar" placeholder="Avatar" @change="avatarChange">
          </div>
          <div class="avatar" v-else>
            <div class="">
              <button class="button" @click="removeImage">Changer d'image</button>
            </div>
            <img :src="avatar" />

          </div>
          <input type="text" name="username" placeholder="username" required v-model="username">
          <input type="email" name="email" placeholder="email" required v-model="email">
          <textarea rows="6" cols="20" name="message" placeholder="Biographie" v-model="bio"></textarea>
          <input class="button" type="submit" value="Valider" />

          <p class="a" v-if="!boxNewPassWd" v-on:click="boxNewPassWd = 1">[Changer de mot de passe]</p>

          <p> <a class="error" href="../remove_me">[supprimer mon compte]</a></p>
        </div>
        <div class="edit_box" v-if="boxNewPassWd" >
          <NewPassWd/>
        </div>
      </div>

    </form>



  </div>

</template>


<script>
const axios = require('axios');
//import Wall from '@/components/public_wall.vue'
import NewPassWd from '@/components/NewPassWd.vue'
import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'Password',
  components: { NewPassWd },
  data: function () {
    return {
      token: null,
      profile: [],
      myUser: '', // utiliser l'id du token
      avatar: '',
      email: '',
      username: '',
      bio: '',
      boxNewPassWd: '',
    }
  },
  methods: {
    avatarChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
        this.createImage(files[0]);
    },
    createImage(file) {
      let avatar = new Image
      console.log(avatar);
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        vm.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.avatar = '';
      console.log(e);
    },
    editProfile() {
      console.log(this.myUser);
      axios.put('http://localhost:3000/edit/' + this.myUser.userId, {
        //avatar: this.avatar,
        email: this.email,
        username: this.username,
        bio: this.bio
      })
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
    margin: 0em 20em -3em 20em;
  }
}
.avatar {
  display:flex;
  flex-direction: column-reverse;
  img { // A obtimiser
    margin: 1em;
    border-radius: 50% 10%;
    width: 50%;
    height: 50%;
    border: solid .5em #ffffffdd;
  }
  @media (min-width: 1280px) {
    img {
      width: 19%;
    }
  }
}
.profile_head {
  padding: 4em 1em 1em 1em;
  text-align: center;
}
#edit {
  margin: 0 1em;
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
