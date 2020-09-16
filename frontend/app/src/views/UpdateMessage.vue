<template>
  <div id="wall" class="wall">

    <div class="page_wall">
      <div class="newPost">
        <form id="newPost" @submit.prevent="submitPost">
          <div class="newPostText">
            <input type="text" name="title" placeholder="Titre (facultatif)" v-model="newTitle">
            <input type="file" id="file" ref="file" name="media" placeholder="Media" @change="handleFileUpload()">
            <textarea rows="20" cols="16" name="message" placeholder="Nouveau message" required v-model="newPost"></textarea>
          </div>
          <input class="button" type="submit" value="Envoyer" />
        </form>
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
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitPost: function() {
      const router = this.$router;
      let formData = new FormData();

      formData.append('media', this.file);
      formData.append('title', this.newTitle);
      formData.append('message', this.newPost);
      const axios = require('axios');
      axios.put('http://localhost:3000/message/edit/' + this.myUser.userId + '&' + this.$route.params.id_post, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      router.push("../Wall");

    }
  },
  mounted () {
    // Identifier l'utilisateur
    const axios = require('axios');
    this.token = localStorage.getItem('token');
    this.myUser = VueJwtDecode.decode(this.token);
    console.log(this.myUser.userId);
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    axios.get('http://localhost:3000/message/post/' + this.$route.params.id_post)
    .then(response => (this.newTitle = response.data.title, this.newPost = response.data.content))
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
  margin-top: -3rem;
  background-color: #eee;

}

.newPost {
  padding: 2em;
  background-color: $backgrounColor1;

}
.button {
  p{
    text-align: center;

  }
  padding: 1.5em;
  font-size: 1em;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: #3498db;
}

.newPostText {
  input{
    font-size: 1em;
    margin: .5em;
    width: 90%;
  }
  textarea {
    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;

  }
}
</style>
