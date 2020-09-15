<template>
  <div id="wall" class="wall">

    <div class="page_wall">
      <!--<div class="newPost">
        <form id="newPost" @submit.prevent="submitPost">
          <div class="newPostText">
            <input type="text" name="title" placeholder="Titre" required v-model="newTitle">
            <textarea rows="6" cols="16" name="message" placeholder="Nouveau message" required v-model="newPost"></textarea>
          </div>
          <input class="button" type="submit" value="Envoyer" />
        </form>
      </div>-->

      <div class="allPosts">
        <div class="post" v-for="message in messages" :key="message.content">
          <div class="user_post">
            <img :src="message.url_image" alt="avatar">
            <p class="username"><a :href="'user/'+message.user_id">{{ message.username }}</a></p>
          </div>
          <div class="post_text">
            <h4><a :href="'message/'+message.id">{{ message.title }}</a> <!--| <span>{{ message.updatedAt }}</span>--></h4>
            <div class="bubble">
              <p>{{ message.content }}</p>
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
      messages: [],
      myUser: null, // utiliser l'id du token
      newTitle: null,
      newPost: null,

    }
  },
  methods: {
    submitPost: function() {
      const axios = require('axios');
      axios.post('http://localhost:3000/message/new/' + this.myUser.userId, {
        title: this.newTitle,
        message: this.newPost
      });
      this.newTitle = null;
      this.newPost = null;
      //vm.$forceUpdate();

    }
  },
  mounted () {
    // Identifier l'utilisateur
    const axios = require('axios');
    this.token = localStorage.getItem('token');
    this.myUser = VueJwtDecode.decode(this.token);
    console.log(this.myUser.userId);
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;

    axios.get('http://localhost:3000/message/public_wall/')
    .then(response => (this.messages = response.data))


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
  margin-top: -3rem;
  background-color: #eee;

}

.allPosts {
  margin-top: 3rem;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  @media (min-width: 1280px) {
    width: 60%;
  }
}
.post {
  margin: .5em;
  padding: .5em;
  display: flex;
  justify-content: space-around;
  transition: all .4s ease-out;
  &:hover {
    //border-radius: 1em;
    transform: scale(1.1);

  }
}
.user_post {
  width: 30%;
  img {
    border-radius: 50%;
    width: 95%;
  }
  @media (min-width: 1280px) {
    width: 15%;
  }
}
.post_text {
  width: 70%;
  @media (min-width: 1280px) {
    margin-left: -8rem;
  }

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
