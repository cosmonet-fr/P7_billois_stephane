<template>
  <div class="home">

    <div class="slogan">
      <h2>Social<br /><span>Network</span></h2>
    </div>

    <section v-if="route === 'login'">
      <article class="boxForm">
        <form id="login" action="app.html" method="post" @submit.prevent="submitSignup">
          <div class="line">
            <h3>Connexion</h3>
          </div>
          <div class="line">
            <!--<p><label for="email">email :</label></p>-->
            <p><input type="email" name="email" id="email" placeholder="Email" size="25" maxlength="255" required v-model="email"/></p>

          </div>
          <div class="line">
            <!--<p><label for="password">mot de passe :</label></p>-->
            <p><input type="password" name="password" id="password" placeholder="Mot de passe" size="25" maxlength="255" required v-model="password"/></p>

          </div>
          <p v-if="error !== null" class="error">Erreur: {{ error }}</p>
          <div class="line">
            <p v-on:click="route = 'signup'" class="a">{{ message }}</p>
          </div>
          <div class="line">
            <input class="button" type="submit" value="Envoyer" />
          </div>
        </form>

      </article>
    </section>

    <!--Signup-->
    <section v-if="route === 'signup'">
      <article class="boxForm">
        <form id="signup" @submit.prevent="submitSignup">
          <div class="line">
            <h3>Créez un compte</h3>
          </div>
          <div class="line">
            <!--<p><label for="email">email :</label></p>-->
            <p><input type="email" name="email" id="email" placeholder="Email" size="25" maxlength="255" required v-model="newEmail"/></p>

          </div>
          <div class="line">
            <!--<p><label for="email">email :</label></p>-->
            <p><input type="text" name="email" id="email" placeholder="Votre nom d'utilisateur" size="25" required maxlength="255" v-model="newUserName" /></p>

          </div>
          <div class="line">
            <!--<p><label for="password">mot de passe :</label></p>-->
            <p><input type="password" name="password" id="password" placeholder="Mot de passe" size="25" required maxlength="255" v-model="newPassword" /></p>

          </div>
          <div class="line">
            <!--<p><label for="password">mot de passe :</label></p>-->
            <p><input type="password" name="confirm_password" id="confirm_password" placeholder="Confirmez votre mot de passe" size="25" required maxlength="255" v-model="confirmPassword" /></p>

          </div>
          <div class="line">
            <p class="error" v-if="this.newPassword !== this.confirmPassword" >Vos deux mot de passes ne sont pas identiques !</p>
          </div>
          <div class="line">
            <input class="button" type="submit" value="Inscription"/>
          </div>
          <p v-if="error !== null" class="error">Erreur: {{ error }}</p>
          <div class="line">
            <p v-on:click="route = 'login'" class="a">Vous connectez</p>
          </div>
        </form>

      </article>
    </section>

  </div>
</template>

<script>
export default {
  methods: {
    submitSignup: function() {
      //const router = this.$router;
      const axios = require('axios');
      if (this.route === 'login') {
        axios.post('http://localhost:3000/' + this.route, {
          email: this.email,
          password: this.password
        })
        .then(function (res) {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          window.location.href='/Wall'
        })
        .catch(error => {
          this.error = error.response.data.errors[0]
        })

      }else if (this.route === 'signup') {
        axios.post('http://localhost:3000/' + this.route, {
          email: this.newEmail,
          username: this.newUserName,
          password: this.newPassword
        })
        .then(response => {
          console.log(response);
          this.message = response.data.message;
          this.route = 'login';
          this.email = this.newEmail;
          this.password = this.newPassword;
          //this.message = 'Vous pouvez vous connecter avec votre e-mail' + this.newEmail + ' et votre mot de passe que vous venez de choisir. Ou vous pouvez créer un nouveau compte en cliquant ici.'
        })
        .catch(error => {
          this.error = error.response.data.error
        })

      }
    }
  },
  data: function () {
    return {
      message: 'Vous n\'avez pas encore de compte ? Créez-en un !',
      route: 'login',
      email: '',
      password: '',
      newEmail: '',
      newUserName: '',
      newPassword: '',
      confirmPassword: '',
      error: null,
    }
  },


}
</script>

<style lang="scss">
h3 {
  font-size: 1.5em;
  font-weight: bold;
}
.home {
  @media (min-width: 1280px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;

  }
}
.slogan {
  margin: 1em 0 0 1em;
  @media (min-width: 1280px) {
    margin: 18em 0 0 20em;
    height: 100%;
  }
}

.boxForm {
  padding: 0.5em;
  margin: 2em 3em 3em 3em;
  background-color: rgba(255, 255, 255, .8);
  @media (min-width: 1280px) {
    width: 26em;
    margin: 6em 3em 3em 3em;
  }
}

input {
  font-size: 0.5em;
  padding: 1em;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  border-bottom-color: #040404;
  background-color: rgba(255, 255, 255, 0);
  @media (min-width: 1280px) {
    font-size: 1em;
    border-bottom-width: 4px;

  }
}

.line{
  margin: 1em;
  display: flex;
  justify-content: center;
  @media (min-width: 1280px) {
    margin: 3em;
  }
  input[type="submit"]{
    border-radius: 50% 20% / 10% 40%;
    padding: 1.5em;
    font-size: 1em;
    cursor:pointer;
    font-weight: bold;
    color: white;
    background-color: #3498db;
    border-width: 0;
    @media (min-width: 1280px) {
      font-size: 1.2em;
    }
  }
}
</style>
