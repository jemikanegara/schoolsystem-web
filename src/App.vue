<template>
  <div id="app">
    <Navigation/>
    <div class="content" :style="[!hideMenu ? {'margin-top': '99px'} : null]">
      <div class="top-navigation">
        <router-link to="/" exact>
          <font-awesome icon="home" size="lg" :style="{color: '#003243'}"/>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Navigation
  },
  computed: {
    ...mapGetters(["hideMenu"])
  },
  methods: {
    ...mapActions(["updateIsMobile"])
  },
  mounted() {
    window.onresize = () => {
      const isMobile = window.innerWidth < 981 ? true : false;
      this.updateIsMobile(isMobile);
    };
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 16px;
  font-family: "Montserrat";
}

h2 {
  font-weight: 500;
  font-size: 24px;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

#app {
  background: #fff;
  display: flex;
  padding: 5px;
  border-bottom-left-radius: 5px;
}

.content {
  width: 100%;
  padding: 10px;
  transition: all 1s ease;
}

.top-navigation {
  padding: 15px 0 20px;
}

@media (max-width: 980px) {
  #app {
    display: block;
  }
}
</style>
