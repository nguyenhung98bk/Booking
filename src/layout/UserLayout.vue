
<template>
  <div class="wrapper">
    <main-navbar
      :color-on-scroll="400"
    >
    </main-navbar>
    <div style="min-height: 100vh;">
      <RouterView></RouterView>
      <main-footer
        :backgroundColor="'black'"
      >
      </main-footer>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import MainNavbar from "./User/MainNavbar.vue";
import MainFooter from "./User/MainFooter.vue";
import NowUiKit from '../plugins/now-ui-kit';

Vue.use(NowUiKit);

export default {
  components: {
    MainNavbar,
    MainFooter,
  },
}
</script>
