<template>
  <div class="TheContainer">
    <NavBar />
    <!-- <nav-bar></nav-bar> -->
    <side-bar></side-bar>
    <transition>
      <router-view class="container_sidebar container_content"></router-view>
    </transition>
  </div>
</template>

<script>
import NavBar from './navBar/navbar';
import SideBar from './sideBar/sideBar';
export default {
  name: 'TheContainer',
  components: {
    NavBar,
    SideBar,
  },
};
</script>

<style lang="scss" scoped>
.container_sidebar {
  margin-left: 107px;
  margin-right: 42px;
}
</style>
