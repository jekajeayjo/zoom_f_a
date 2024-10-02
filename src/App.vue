<script setup>
import Header from './components/Header.vue';
import LeftMenu from './components/LeftMenu.vue';
import { useCommonStore } from '@/stores/CommonStore';
const commonStore = useCommonStore();
//
</script>


<template>
  <v-app>
    <v-main>
          <Header v-if="commonStore.acceptToken!=''" />
          <LeftMenu  v-if="commonStore.acceptToken!=''"/>


      <router-view />
    </v-main>
  </v-app>
</template>

