<template>
  <div id="navigation">
    <!-- Profile -->
    <div class="user-profile">
      <template v-if="isMobile">
        <font-awesome icon="bars" :style="{color: '#fff'}" size="lg" @click="toggleMenu"/>
      </template>
      <div class="user-picture">
        <font-awesome icon="user-circle" size="2x" :style="{ color: '#39a2d9' }"/>
      </div>
      <div class="user-info">
        <div class="user-name">Jim</div>
        <div class="user-role">Admin</div>
      </div>
    </div>
    <!-- Menu -->
    <ul
      class="menu"
      :style="[hideMenu ? {'visibility': 'hidden', 'opacity': '0'} : {'visibility': 'visible', 'opacity': '1'}]"
    >
      <template v-if="menu.length > 0">
        <template v-for="item in menu">
          <router-link :to="item.url" :key="item.id" exact>
            <li class="menu-item">
              <div class="menu-icon">
                <font-awesome :icon="item.icon" size="2x" :style="{ color: '#a9c7dd' }"/>
              </div>
              <div class="menu-title">{{item.title}}</div>
            </li>
          </router-link>
        </template>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "navigation",
  computed: {
    ...mapGetters(["isMobile", "hideMenu"])
  },
  data: () => ({
    menu: [
      {
        id: "menu-1",
        title: "Dashboard",
        icon: "home",
        url: "/"
      },
      {
        id: "menu-2",
        title: "Staff Details",
        icon: "users",
        url: "/staff-details"
      }
    ]
  }),
  methods: {
    ...mapActions(["toggleMenu"])
  },
  mounted() {
    this.isMobile ? this.toggleMenu() : null;
  }
};
</script>

<style>
/* Container */
#navigation {
  width: 20%;
  background: #091952;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  padding: 5px;
  min-height: 100vh;
}

/* Profile */
.user-profile {
  display: flex;
  border-bottom: 1px solid #848da9;
  padding: 20px 0 20px 20px;
}

.user-picture {
  display: inline-block;
}

.user-name {
  padding-left: 10px;
  color: #fff;
}

.user-role {
  padding-left: 9px;
  font-size: 13px;
  color: #848da9;
  text-transform: uppercase;
}

/* Menu */
ul.menu {
  transition: all 1s ease;
}
.menu-item,
.menu-loading {
  display: flex;
  padding: 5px 20px;
  margin-top: 5px;
  color: #a9c7dd;
}

.router-link-active .menu-item,
.menu-item:hover {
  background: #355586;
}

.menu-title {
  padding-left: 10px;
  align-self: center;
  font-size: 15px;
  text-transform: uppercase;
}

.hide {
  display: none;
  transition: all 1s ease;
}

/* Responsive */
@media (max-width: 980px) {
  #navigation {
    width: 100%;
    min-height: unset;
    padding-bottom: 0;
  }
  .user-profile {
    padding: 10px 5px;
  }
  .user-info {
    display: none;
  }
  .user-picture {
    margin-left: auto;
  }
  ul.menu {
    background: #091952;
    position: absolute;
    left: 5px;
    right: 5px;
    padding-bottom: 5px;
  }
}
</style>
