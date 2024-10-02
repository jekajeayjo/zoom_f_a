<script setup>
// import { useCommonStore } from '@/stores/CommonStore';
// const commonStore = useCommonStore();
import { ref } from 'vue';
import router from '@/router/index'
import { useCommonStore } from '@/stores/CommonStore';
const commonStore = useCommonStore();
const auth = ref({ userName: '', password: '' });
const errorMessage = ref('');
const isError = ref(false);

const signInSuccess = (response) => {
    console.log('signInSuccess',response);
    isError.value = false
    commonStore.setAccess(response.data)
    router.push('/')

}

const signInError = (text) => {
    console.log('signInError' + text)
    errorMessage.value = text
    isError.value = true
}

const signIn = (payload) => {
    isError.value = false
    commonStore.sendRequestAuth({ data: payload, success: signInSuccess, error: signInError })
}

</script>

<template>
    <v-alert v-if="isError == true" density="compact" :text="errorMessage" title="Ошибка" type="error"></v-alert>
    <v-card class="mx-auto" max-width="75%" style="margin-top: 10%;">
        <v-img color="surface-variant" height="200" src="../images/header_logo.jpg" cover>

        </v-img>
    </v-card>

    <v-container fill-height fluid>

        <v-card class="elevation-6 mt-10">

            <v-row>
                <v-col cols="12">
                    <v-card-text class="mt-12">
                        <h4 class="text-center">Войдите в свой аккаунт</h4>
                        <h6 class="text-center  grey--text ">Авторизируйтесь по логину и паролю<br> что бы продолжить
                            работать в системе</h6>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="8">

                                <v-text-field label="Логин" outlined dense color="blue" autocomplete="false"
                                    v-model="auth.userName" class="mt-16" />
                                <v-text-field label="Пароль" outlined dense color="blue" autocomplete="false"
                                    v-model="auth.password" type="password" />
                                <v-row>
                                    <v-col cols="12" sm="7">
                                        <v-checkbox label="Запомни меня" class="mt-n1" color="blue"> </v-checkbox>
                                    </v-col>
                                    <v-col cols="12" sm="5">
                                        <span class="caption blue--text">Забыл пароль</span>
                                    </v-col>
                                </v-row>
                                <v-btn @click="signIn(auth)" color="blue" dark block tile>Вход</v-btn>

                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-col>

            </v-row>



        </v-card>

    </v-container>
</template>


<style scoped>
.v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}
</style>