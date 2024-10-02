<script setup>
import { onMounted, ref } from 'vue';
import { useCommonStore } from '@/stores/CommonStore';
import ItemList from '@/components/ItemList.vue';

const commonStore = useCommonStore();
const errorMessage = ref('')
const headers = ref(
    [
        { title: 'Наименование категории', key: 'value' },
        { title: 'Изображение', key: 'image' },
        { title: 'Статус', key: 'isEnabled' },
        { title: 'Действие', key: 'actions' },
    ])

const languageList = ref({
    id: '',
    value: '',
    image: '',
    isEnabled: ''
})

const items = ref([
    {
        id: '',
        value: 200,
        image: 6.0,
        isEnabled: 24
    }
])
const menuListRequest = ref({
    page: 0,
    size: 10,
    sortDir: 'ASC',
    criteria: []
})
const sortBy = ref({ key: 'calories', order: 'asc' })

const editedItemCategory = ref(
    {
        id: '',
        value: '',
        image: '',
        isEnabled: false,
        languages: [
            {
                id: '',
                languageId: '',
                value: ''
            }
        ]
    }
)

const newItemCategory = ref(
    {
        id: '',
        value: '',
        image: '',
        isEnabled: false,
        languages: [
            {
                id: '',
                languageId: '',
                value: ''
            }
        ]
    }
)

const dialogCategory = ref(false)

const getMenuCategoryListSuccess = (response) => {
    console.log('getAccountsListSuccess', response);
    items.value = response.data.content


}

const getMenuCategoryListError = (err) => {
    console.log('getMenuCategoryListError' + err)

}

const getMenuCategoryList = (payload) => {
    commonStore.sendRequestPut({ path: 'menu/category-page', data: payload, success: getMenuCategoryListSuccess, error: getMenuCategoryListError })
}

const geLanguageListSuccess = (response) => {
    console.log('geLanguageListSuccess', response);
    languageList.value = response.data


}

const geLanguageListError = (text) => {
    console.log('geLanguageListError' + text)

}

const geLanguageList = () => {
    commonStore.sendRequestGet({ path: 'common/language-list', success: geLanguageListSuccess, error: geLanguageListError })
}

const editItemCategory = (item) => {
    dialogCategory.value = true
    editedItemCategory.value = item
}
const changeStatusOfItem = () => {

}
const closeCategory = () => {
    dialogCategory.value = false
}

const saveCategory = () => {
    errorMessage.value = ''
    console.log("saveCategory")
    if (editedItemCategory.value.id == '')
        commonStore.sendRequestPost({ path: 'menu/category', data: editedItemCategory.value, success: saveCategorySuccess, error: saveCategoryError })
    else
        commonStore.sendRequestPut({ path: 'menu/category', success: saveCategorySuccess, error: saveCategoryError })

}

const saveCategorySuccess = (response) => {
    console.log('getAccountsListSuccess', response);
    dialogCategory.value = false;
    getMenuCategoryList(menuListRequest.value);
}

const saveCategoryError = (err) => {
    errorMessage.value = err.message

}

const addLanguage = () => {
    editedItemCategory.value.languages.push({
        id: '',
        languageId: '',
        value: ''
    })
}

onMounted(() => {
    getMenuCategoryList(menuListRequest.value);
    geLanguageList();
})

</script>
<template>

    <v-data-table show-expand dense :headers="headers" :items="items">
        <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
         <item-list :item-category-id="item.id" :language-list="languageList"></item-list>
        </td>
      </tr>
    </template>
        <template v-slot:top>
            <v-toolbar flat color="gray">
                <v-dialog v-model="dialogCategory" max-width="70%">
                    <template v-slot:activator="{ on }">
                        <v-btn color="white" class="mb-2 mt-4"
                            v-on:click="dialogCategory = !dialogCategory; errorMessage = '';editedItemCategory=newItemCategory">
                            <v-icon >mdi-plus</v-icon> Добавить</v-btn>

                    </template>
                    <v-card>
                        <v-alert v-if="errorMessage != ''" :text="errorMessage" title="Ошибка" type="error"></v-alert>
                        <v-card-title>
                            <v-row>
                                <v-col cols="11" class="mt-3"><span class="headline "> Детальная информация о
                                        категории</span></v-col>
                                <v-col> <v-switch color="green" true-value="true" false-value="false"
                                        v-model="editedItemCategory.isEnabled"></v-switch>
                                </v-col>
                            </v-row>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>

                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="editedItemCategory.value"
                                            label="Наименование категории"></v-text-field>
                                    </v-col>

                                    <v-col cols="=12">
                                        <v-divider></v-divider>
                                    </v-col>
                                    <v-col cols="12"> <v-btn color="white" @click="addLanguage()">Добавить
                                            язык</v-btn></v-col>
                                </v-row>
                                <v-row v-for="language of editedItemCategory.languages">
                                    <v-col offset="10" cols="1">

                                        <v-btn color="red">
                                            <v-icon>mdi-delete</v-icon>
                                            <v-tooltip activator="parent" location="top">Удалить язык</v-tooltip>
                                        </v-btn></v-col>
                                    <v-col cols="12">
                                        <v-select label="Язык" :items="languageList" item-title="value" item-value="id"
                                            v-model="language.languageId"></v-select>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Наименование" v-model="language.value"></v-text-field>
                                    </v-col>
                                    <v-col cols="=12">
                                        <v-divider></v-divider>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text
                                @click="closeCategory"><v-icon>mdi-close-octagon-outline</v-icon>
                                <v-tooltip activator="parent" location="top">Закрыть</v-tooltip></v-btn>
                            <v-btn color="blue" text @click="saveCategory"><v-icon>mdi-content-save</v-icon> <v-tooltip
                                    activator="parent" location="top">Сохранить</v-tooltip></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <!-- {{item}} -->
            <v-icon small class="mr-2" @click="editItemCategory(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="changeStatusOfItem(item)">
                mdi-eye
            </v-icon>
        </template>
    </v-data-table>

    <!-- <pre>{{ sortBy }}</pre> -->
</template>
