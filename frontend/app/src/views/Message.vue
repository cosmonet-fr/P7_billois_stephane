<template>
  <div id="wall" class="wall">

    <div class="allPosts">
      <div class="post">
        <!--<div class="user_post">
          <img src="pictures/default_avatar.svg" alt="avatar">
          <p class="username">{{message.user_id}}</p>
        </div>-->
        <div class="post_text">
          <h4>{{ message.title }} | <span>{{ message.updatedAt }}</span></h4>
          <div class="bubble">
            <p>{{ message.content }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
//import Wall from '@/components/public_wall.vue'
//import VueJwtDecode from 'vue-jwt-decode'



export default {
  data: function () {
    return {
      token: null,
      message: [],

    }
  },
  mounted () {
    const axios = require('axios');
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    axios.get('http://localhost:3000/message/post/' + this.$route.params.id)
    .then(response => (this.message = response.data))
  }

}

</script>

<style scoped lang="scss">
$backgrounColor1: white;

h4 {
  font-size: 1em;
}
.wall {
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
