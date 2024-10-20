<script setup>
import { useCommonStore } from '@/stores/CommonStore';
const commonStore = useCommonStore();
import { onMounted, ref } from 'vue';
import router from '@/router/index'
const drawer = ref(true)
const rail = ref(true)

const userDet = ref({
  accountId: '',
  fio: '',
  userName: '',
  registeredDate: '',
  phoneNumber: '',
  code: '',
  status: ''
})

const clickPage = (url) => {
  router.push(url)
}

const getInfoOfCurrentUser = () => {
  commonStore.sendRequestGet({ path: 'account/me', success: getInfoOfCurrentUserSuccess, error: getInfoOfCurrentUserError })
}


const getInfoOfCurrentUserSuccess = (response) => {
  console.log(response.data)
  commonStore.setUserDetailInfo(response.data)
  userDet.value.fio=response.data.fio

}

const getInfoOfCurrentUserError = (text) => {

}
onMounted(() => {
  console.log('get info of current user')
  getInfoOfCurrentUser()
})

</script>

<template>

  <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">


    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" :title="userDet.fio" nav>
      <template v-slot:append>
        <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav >
      <!-- <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item> -->
      <v-list-item link @click="clickPage('/accounts')" prepend-icon="mdi-account-group-outline" title="Пользователи"
        value="account"></v-list-item>
      <v-list-item link @click="clickPage('/menu')" prepend-icon="mdi-food-fork-drink" title="Меню"
        value="users"></v-list-item>

        
        <v-list-group value="Actions">
          <template v-slot:activator="{ props }">
            <v-list-item
            prepend-icon="mdi-cog" 
              v-bind="props"
              title="Настройки"
            ></v-list-item>
          </template>
          <v-list-item link @click="clickPage('/ruler-list')" prepend-icon="mdi-ruler" title="Размеры"
          value="users"></v-list-item>
        </v-list-group>
    </v-list>
    
  </v-navigation-drawer>


</template>
