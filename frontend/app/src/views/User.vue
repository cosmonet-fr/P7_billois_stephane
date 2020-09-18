<template>
  <div id="wall" class="wall">

    <div class="avatar">
      <img :src="profile.url_image" alt="">
    </div>
    <div class="profile">
      <div class="profile_head">
        <h4>{{ profile.username }}</h4>
        <a href="../user_edit" v-if="myUser.userId == $route.params.id"> <img class="edit_btn" src="../assets/pen-solid.svg" alt="Modifier mon profil"> </a>
      </div>
      <p>{{ profile.bio }}</p>
    </div>

    <div class="wall_of_box">
      <h4>Messages de {{ profile.username }}:</h4>
      <div class="post" v-for="message in messages" :key="message.content">

        <div class="post_text">
          <div class="bubble">
            <h5> <a :href="'../message/'+message.id">{{ message.title }}</a> </h5>
            <p>{{ message.content }}</p>
          </div>
        </div>
      </div>
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
      messages: [],
      myUser: '', // utiliser l'id du token
    }
  },
  mounted () {
    const axios = require('axios');
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    this.myUser = VueJwtDecode.decode(this.token);
    axios.get('http://localhost:3000/users/' + this.$route.params.id)
    .then(response => (this.profile = response.data))
    axios.get('http://localhost:3000/message/wall_of/' + this.$route.params.id)
    .then(response => (this.messages = response.data))
  }
}
</script>

<style scoped lang="scss">
.edit_btn {
  width: 2rem;
}

.wall {
  width: 100%;
  height: 100%;
  min-height: 52rem;
  background-color: #eee;

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
  @media (min-width: 1280px) {
    margin: 3em 20em -3em 20em;
  }
}
.avatar {
  display:flex;
  justify-content: center;
  img { // A obtimiser
    margin: 1em 1em -8em 1em;
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
.wall_of_box {
  background-color: #ffffffdd;
  margin: 0;
  padding: 2em;
  border-radius: 0 0 3em 3em;
  @media (min-width: 1280px) {
    margin: 0 20em;
  }
}
.bubble {
  margin: .8em;
  padding: 1.8em;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1em;
}
</style>
