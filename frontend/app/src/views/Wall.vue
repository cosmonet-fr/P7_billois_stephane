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

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
//import Wall from '@/components/public_wall.vue'


export default {
  data: function () {
    return {
      token: null,
      messages: [
        {
          id: 1,
          user_id: 2,
          title: "Coucou",
          content: "Coucou la companie ! Voici mon 1er message !",
          attachement: "",
          likes: null,
          createdAt: "2020-09-06T12:05:17.000Z",
          updatedAt: "2020-09-06T12:05:17.000Z",
          parent_id: null
        },
        {
          id: 2,
          user_id: 7,
          title: "Salut",
          content: "Salut !",
          attachement: "",
          likes: null,
          createdAt: "2020-09-06T12:05:17.000Z",
          updatedAt: "2020-09-06T12:05:17.000Z",
          parent_id: null
        }
      ],
    }
  },
  mounted () {
    this.token = localStorage.getItem('token');
  }

}

</script>
