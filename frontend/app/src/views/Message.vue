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

        <div class="button">
          <p> <a :href="'../comment/' + myUser.userId + '&' + $route.params.id">Commenter</a></p>
        </div>
        <div class="post_comment">
          <div class="box_comment" v-for="comment in comments" :key="comment.content">
            <div class="post_text">
              <h4><a :href="'../message/'+comment.id">{{ comment.title }}</a> <!--| <span>{{ message.updatedAt }}</span>--></h4>
              <div class="bubble_comment">
                <div class="media" v-if="comment.attachement">
                  <a :href="'../message/'+comment.id">
                    <img :src="comment.attachement" alt="media">
                  </a>
                </div>
                <p>{{ comment.content }}</p>
              </div>
            </div>
            <div class="user_post">
              <img :src="comment.url_image" alt="avatar">
              <p class="username"><a :href="'user/'+comment.user_id">{{ comment.username }}</a></p>
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
      comments: [],
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

    //Comments ok this post
    axios.get('http://localhost:3000/message/comments/' + this.$route.params.id)
    .then(response => (this.comments = response.data))

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
  flex-direction: column;
  @media (max-width: 1280px) {
    margin: 1em 0;
  }
}
.box_comment {
  width: 70%;
  margin: 1em;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  @media (max-width: 1280px) {
    margin: 1em 0;
    width: 95%;
  }
}
.user_post {
  width: 12%;
  img {
    border-radius: 50%;
    width: 95%;
  }
}
.post_text {
  width: 85%;
  @media (max-width: 1280px) {
    width: 100%;
  }
}
//.post_comment {
//  display: flex;
//  flex-direction: row;
//}
.bubble, .bubble_comment {
  padding: 1.8em;
  background-color: rgba(255, 255, 255, 0.8);
}
.bubble {
  border-radius: 0 5em 5em 5em;
}
.bubble_comment {
  border-radius: 5em 0 5em 5em;
}
.button {
  * {
    text-align: center;
  }
  a {
    color: #fff;
  }
  margin: 1em;
  max-width: 200px;
  width: 50%;
  border-radius: 50% 20% / 10% 40%;
  padding: .8em;
  font-size: 1em;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: #3498db;
  border-width: 0;
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
