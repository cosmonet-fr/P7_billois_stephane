<template>
  <div v-if="isOpen === true || token === true" class="meta">
    <div class="avatar">
      <a :href="'http://localhost:8080/user/'+myUser.userId">
        <img :src="profile.url_image" :alt="profile.username">
      </a>
    </div>



    <div v-if="menu" class="menu">

      <div >
        <a href="http://localhost:8080/Wall"><img src="../assets/comment-regular.svg" alt=""></a>
      </div>

      <div class="editMyProfile">
        <a href="http://localhost:8080/user_edit/"> <img src="../assets/user-edit-solid.svg" alt=""> </a>
      </div>

      <div class="logout">
        <img @click="logout()" src="../assets/sign-out-alt-solid.svg" alt="">
      </div>

      <div v-if="profile.moderator == 1 || profile.admin == 1" class="admin_btn">
        <a href="http://localhost:8080/admin_panel"><img src="../assets/users-cog-solid.svg" alt=""></a>
      </div>

      <!--<div class="menu_btn">
        <img v-if="menu" @click="menu = false" src="../assets/times-solid.svg" alt="">
      </div>-->

    </div>
    <div class="menu_btn">
      <img v-if="!menu" @click="menu = true" src="../assets/bars-solid.svg" alt="">
    </div>

  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data: function () {
    return {
      profile: [],
      token: null,
      myUser: 2, // utiliser l'id du token
      menu: false,
      isOpen: true,

    }
  },
  mounted () {
    const axios = require('axios');
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    this.myUser = VueJwtDecode.decode(this.token);
    axios.get('http://localhost:3000/users/' + this.myUser.userId)
    .then(response => (this.profile = response.data))

  },
  methods: {
    logout: function() {
      const router = this.$router;
      localStorage.removeItem("token");
      this.isOpen = false
      router.push("/")

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.meta {
  display: flex;
  //flex-direction: row-reverse;
  justify-content: flex-end;
}
.avatar {
  img {
    border-radius: 50% 10%;
    transform: scale(1.2);
  }
}
.avatar, .logout, .editMyProfile, .menu_btn {
  margin: 0 .5em;
  cursor: pointer;
}
.menu {
  display: flex;
  flex-direction: row;
}
</style>
