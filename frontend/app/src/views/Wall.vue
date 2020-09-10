<template>
  <div id="wall" class="wall">

    <div class="allPosts">
      <div class="post" v-for="message in messages" :key="message.content">
        <div class="user_post">
          <img src="pictures/default_avatar.svg" alt="avatar">
          <p class="username">{{message.user_id}}</p>
        </div>
        <div class="post_text">
          <h4>{{ message.title }} | <!--<span>{{ message.updatedAt }}</span>--></h4>
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
