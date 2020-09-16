<template>
  <div id="wall" class="wall">
    <div class="admin_box">
      <h3>Vous êtes {{ role }}, de grands pouvoirs impliquent de grandes responsabilités.</h3>
      <p>admin: {{ admin }}</p>
      <p>moderator: {{ moderator }}</p>
      <p>{{ msg }}</p>
      <hr>
      <div v-if="moderator" class="list_box">
        <div class="list_line">
          <div class="element_id" ><p>ID</p></div><div class="element" ><p>User Name</p></div><div class="element" ><p>Email</p></div><div class="element_id" ><p>Suppr</p></div><div class="element_id" ><p>Mod</p></div>
        </div>
        <div class="list_line" v-for="user in users" :key="user">
          <div class="element_id" ><p><a :href="'user/'+user.id">{{ user.id }}</a></p></div><div class="element" ><p><a :href="'user/'+user.id">{{ user.username}}</a></p></div><div class="element" ><p> <a :href="'mailto:'+user.email">{{ user.email }}</a> </p></div><div class="element_id" ><p class="error a" v-on:click="removeUser(user.id)" >[X]</p></div><div class="element_id" ><p class="a" v-on:click="isModerator(user.id)">{{ user.moderator }}</p></div>
        </div>

      </div>


    </div>
  </div>

</template>
<script>
import VueJwtDecode from 'vue-jwt-decode'

  export default {
    data: function ()  {
      return {
        role: 'Administrateur',
        admin: 0,
        moderator: 0,
        token: '',
        myUser: '',
        test: [],
        users: [],
        msg: '',
      }
    },
    mounted () {
      const axios = require('axios');
      this.token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
      this.myUser = VueJwtDecode.decode(this.token);
      axios.get('http://localhost:3000/users/' + this.myUser.userId)
      .then(response => (this.admin = response.data.admin, this.moderator = response.data.moderator))
      axios.get('http://localhost:3000/users')
      .then(response => (this.users = response.data))
    },
    methods: {
      removeUser: function(idRm) {
        const axios = require('axios');
        axios.post('http://localhost:3000/admin_panel/userRm', {
          idRm: idRm,
        })
        .then(response => (this.msg = response.data))
      },
      isModerator: function(idMod) {
        const axios = require('axios');
        axios.put('http://localhost:3000/admin_panel/is_moderator', {
          moderator: idMod,
        })
      }
    }
  }
</script>
<style scoped lang="scss">
.wall {
  display: flex;
  justify-content: center;
}
.admin_box {
  margin: 3em;
  padding: 5em;
  width: 70%;
  border-radius: 3em;
  background-color: #ffffffdd;
  h3 {
    text-align: center;
  }
}
.list_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .list_line {
    border-bottom: solid;
    display: flex;
    justify-content: center;
    p {
      margin: .5em 0;
      font-size: 1.5em;
      font-weight: bold;
      text-align: center;
    }
    //&:hover {
    //  background-color: #9999ff;
    //}
  }
  .element {
    width: 33%;
  }
  .element_id {
    width: 10%;
  }
}

</style>
