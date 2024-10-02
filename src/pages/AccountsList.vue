<script setup>
import { onMounted, ref } from 'vue';
import { useCommonStore } from '@/stores/CommonStore';
const commonStore = useCommonStore();
const headers = ref(
    [
        { title: 'ФИО', key: 'fio' },
        { title: 'Роль', key: 'code' },
        { title: 'Статус', key: 'status' },
    ])

const items = ref([
{
    accountId: 'Frozen Yogurt',
    fio: 200,
    userName: 6.0,
    registeredDate: 24,
    phoneNumber: 4.0,
    code: '1%',
    status: '1%',
}
])
const accountListRequest = ref({
    page: 0,
    size: 10,
    sortDir: 'ASC',
    criteria: []
})
const sortBy = ref({ key: 'calories', order: 'asc' })


const getAccountsListSuccess = (response) => {
    console.log('getAccountsListSuccess', response);
    items.value = response.data.content


}

const getAccountsListError = (text) => {
    console.log('signInError' + text)

}

const getAccountsList = (payload) => {
    commonStore.sendRequestPut({ path: 'account/page', data: payload, success: getAccountsListSuccess, error: getAccountsListError })
}
onMounted(() => {
    console.log('accountListRequest', accountListRequest.value.page)
    getAccountsList(accountListRequest.value)
})
</script>
<template>
    <v-data-table :headers="headers" :items="items"></v-data-table>

    <!-- <pre>{{ sortBy }}</pre> -->
</template>
