<template>
  <div id="wall" class="wall">

    <div class="allPosts">
      <div class="post">

        <div class="post_text">
          <p class="error a" v-if="youAreModerator" v-on:click="removeMsgByModerator()" >[SUPPRIMER CE MESSAGE]</p>
          <h4>{{ message.title }}</h4>
          <div class="bubble">
            <div class="media" v-if="message.attachement">
              <img :src="message.attachement" alt="media">
            </div>
            <p>{{ message.content }}</p>
            <div  v-if="myUser.userId === message.user_id" class="upload">
              <p><a href="#" v-on:click="removeMsg()">[Supprimer]</a> <a :href="'../update_message/'+myUser.userId+'&'+this.$route.params.id">[Modifier]</a></p>
            </div>
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
      myUser: null,
      message: [],
      youAreModerator: 0

    }
  },
  mounted () {
    const axios = require('axios');
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    this.myUser = VueJwtDecode.decode(this.token);
    axios.get('http://localhost:3000/message/post/' + this.$route.params.id)
    .then(response => (this.message = response.data))

    //Le visiteur est-il admin ?
    axios.get('http://localhost:3000/users/' + this.myUser.userId)
    .then(response => (this.youAreModerator = response.data.moderator))

    //Format date


  },
  methods: {
    removeMsg: function() {
      const router = this.$router;
      const axios = require('axios');
      axios.post('http://localhost:3000/message/rm/'+this.myUser.userId+'&'+this.$route.params.id);
      router.push("../Wall")

    },
    removeMsgByModerator: function() {
      const router = this.$router;
      const axios = require('axios');
      axios.post('http://localhost:3000/admin_panel/postRm/'+this.$route.params.id);
      router.push("../Wall")

    }
  }

}

</script>

<style scoped lang="scss">
$backgrounColor1: white;

h4 {
  font-size: 1em;
}
.wall {
  width: 100%;
  height: 100%;
  min-height: 52rem;
  background-color: #eee;
}
.allPosts {
display: flex;
flex-direction: column-reverse;
justify-content: flex-start;
}
.post {
margin: 1em;
display: flex;
justify-content: space-around;
}
.user_post {
width: 30%;
img {
  border-radius: 50%;
  width: 95%;
}
}
.post_text {
width: 70%;

}
.bubble {
padding: 1.8em;
background-color: rgba(255, 255, 255, 0.8);
border-radius: 0 5em 5em 5em;
}
.username {
text-align: center;
font-weight: bold;
}

.newPost {
margin: 3em;
padding: 2em;
background-color: $backgrounColor1;
border-radius: 3em 0;
input[type="submit"] {
  font-size: 1em;
}

}

.newPostText {
  input{
    font-size: 1em;
    margin: .5em;
    width: 90%;
  }
  textarea {
    border-top: none;
    border-left: none;
    border-right: none;

  }
}
</style>
