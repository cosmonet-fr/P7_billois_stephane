<template>
  <div id="wall" class="wall">

    <div class="profile">
      <div class="profile_head">
        <img :src="profile.url_image" alt="">
        <h4>{{ profile.username }}</h4>
      </div>
      <p>{{ profile.bio }}</p>
    </div>

    <div class="wall_of_box">
      <div class="post" v-for="message in messages" :key="message.content">

        <div class="post_text">
          <h5>{{ message.title }} | <span>{{ message.updatedAt }}</span></h5>
          <p>{{ message.content }}</p>
          <hr>
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
      myUser: null, // utiliser l'id du token
    }
  },
  mounted () {
    const axios = require('axios');
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    this.myUser = VueJwtDecode.decode(this.token);

    axios.get('http://localhost:3000/users/' + this.myUser.userId)
    .then(response => (this.profile = response.data))

    axios.get('http://localhost:3000/message/wall_of/' + this.myUser.userId)
    .then(response => (this.messages = response.data))
  }

}

</script>

<style scoped lang="scss">
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
.profile_head {
  text-align: center;
  img { // A obtimiser
    margin: 1em;
    border-radius: 50%;
    width: 50%;
    height: 50%;
  }
}

.wall_of_box {
  background-color: #ffffffdd;
  margin: 3em 0;
  padding: 2em;
  border-radius: 0 0 3em 3em;
}

</style>
