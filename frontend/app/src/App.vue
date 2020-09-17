<template>
  <div id="app">
    <div id="nav">
      <header>
        <div class="logo_box">
          <a href="http://localhost:8080/Wall"><img alt="Groupomania logo" src="./assets/icon.svg"></a>
          <!--<h1>Groupomania</h1>-->
        </div>
        <div class="meta_box">
          <MetaGsm/>
        </div>
      </header>

      <!--<router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/wall">Wall</router-link> |
      <router-link to="/user">Utilisateur</router-link>-->
    </div>
    <router-view/>
  </div>
</template>

<script>
import MetaGsm from '@/components/MetaGsm.vue'

export default {
  name: 'Password',
  components: { MetaGsm },


}

</script>

<style lang="scss">
$color1: #fd2d01;
$color2: #040404;
$colorBtn: #3498db;
$backgrounColor1: white;
$backgrounColor2: rgba(255, 255, 255, .8);
$backgrounColor3: #eee;
$backgroundTransparent: rgba(255, 255, 255, 0);
$errorColor: red;
@font-face {
    font-family: 'nevis-FontZillion';
    src: url('./assets/fonts/nevis-FontZillion/Fonts/nevis.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
* {
  font-family: sans-serif;
}

h1 {
  font-family: "nevis-FontZillion";
  font-size: 2.45em;
  color: $color1;
  span {
    color: black;
  }
  @media (min-width: 1280px) {
    font-size: 3em;
  }
}
h2 {
  font-family: "nevis-FontZillion";
  font-size: 3em;
  color: $backgrounColor1;
  font-weight: 400;
  @media (min-width: 1280px) {
    font-size: 7em;
    position: relative;
    right: 2em;
    span {
      position: relative;
      top: -20px; right: -105px;
    }
  }
  span {
    font-weight: 100;
    color: $color1;
    position: relative;
    right: -40px;
  }
}
h3 {
  font-size: 4em;
  font-weight: bold;
  @media (min-width: 1280px) {
    font-size: 2em;
  }

}
h4 {
  font-size: 2em;
  span {
    font-size: .8em;
  }
}
p {
  font-size: 1em;
  text-align: justify;
  @media (min-width: 1280px) {
    font-size: 1em;
  }

}

a, .a {
  color: $colorBtn;
  text-decoration: underline;
  cursor: pointer;
  &:hover{
    text-decoration: none;
  }
}

.error {
  color: $errorColor;
}
body {
  height: 59rem;
  background-color: #eee;
  background-image: url("./assets/wallpaper_gsm.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  @media (min-width: 1280px) {
    background-image: url("./assets/wallpaper_desk.jpg");
  }
}
header, .logo_box {
  img {
    width: 3rem;
  }
}
header {
  margin: 0;
  padding: 2em;
  display: flex;
  justify-content: space-between;
  background-color: white;
  opacity: .9;
}
.logo_box {
  display: flex;
}
.meta_box {
  display: flex;

}
#app {
  font-family: 'nevis-FontZillion', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #ffffffdd;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #fd2d01;
    }
  }
}
</style>
