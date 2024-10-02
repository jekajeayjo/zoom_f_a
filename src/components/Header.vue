<script setup>
import { useCommonStore } from '@/stores/CommonStore';
import router from '@/router/index'

const commonStore = useCommonStore();


const signOut = () => {
  commonStore.setAccess({
    acceptToken: '',
    refreshToken: ''
  })
  router.push('/signin')
}

</script>

<template>

  <v-app-bar color="teal-darken-4" image="../images/header_logo.jpg">
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <!-- <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </template> -->

    <!-- <v-app-bar-title>Title</v-app-bar-title> -->

    <v-spacer></v-spacer>

    <!-- <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
  
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>-->

    <v-btn icon  @click="signOut()">
      <v-icon>mdi-door</v-icon>
    </v-btn>
  </v-app-bar>
</template>