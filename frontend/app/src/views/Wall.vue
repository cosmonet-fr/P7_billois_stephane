<template>
  <div id="wall" class="wall">

    <div class="allPosts">
      <div class="post" v-for="message in messages" :key="message.content">
        <div class="user_post">
          <img src="../assets/default_avatar.svg" alt="avatar">
          <p class="username">{{message.user_id}}</p>
        </div>
        <div class="post_text">
          <h4>{{ message.title }} <!--| <span>{{ message.updatedAt }}</span>--></h4>
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


export default {
  data: function () {
    return {
      token: null,
      messages: [],
    }
  },
  mounted () {
    const axios = require('axios');
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    axios.get('http://localhost:3000/message/public_wall/')
    .then(response => (this.messages = response.data))
  }

}

</script>

<style scoped lang="scss">
$color1: #fd2d01;
$color2: #040404;
$colorBtn: #3498db;
$backgrounColor1: white;
$backgrounColor2: rgba(255, 255, 255, .8);
$backgrounColor3: #eee;
$backgroundTransparent: rgba(255, 255, 255, 0);
$errorColor: red;
.allPosts {
display: flex;
flex-direction: column-reverse;
justify-content: flex-start;
}
.post {
margin: 1em 0;
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
padding: 1em;
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
  font-size: 2em;
}

}

.newPostText {
input{
  font-size: 2em;
  margin: 1em;
  border: none;
  width: 90%;

}
}
</style>
