<script setup>
import { onMounted, ref } from 'vue';
import { useCommonStore } from '@/stores/CommonStore';

const commonStore = useCommonStore();
const props = defineProps({
    itemCategoryId: {
        type: Number,
        required: false,
        default: -1
    },

    languageList: {
        type: Array,
        required: false,
        default: [{
            id: '',
            value: '',
            image: '',
            isEnabled: ''
        }]
    },
    rulerList: {
        type: Array,
        required: false,
        default: [{
            id: '',
            value: '',

        }]
    }
})
const errorMessage = ref('')
const headers = ref(
    [
        { title: 'Наименование товара', key: 'value' },
        { title: 'Изображение', key: 'image' },
        { title: 'Статус', key: 'isEnabled' },
        { title: 'Действие', key: 'actions' },
    ])

const items = ref([
    {
        id: '',
        menuCategoryId: 200,
        value: 6.0,
        isEnabled: false,
        image: 24
    }
])

const editedItemCategory = ref(
    {
        id: '',
        value: '',
        menuCategoryId: '',
        price: '',
        size: '',
        menuItemSizeId: '',
        image: '',
        isEnabled: false,
        languages: [
            {
                id: '',
                languageId: '',
                value: '',
                descriptions: ''
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
const dialogItem = ref(false)
const languageItem = ref({
    id: '',
    value: '',
    image: '',
    isEnabled: ''
})

const menuItemListRequest = ref({
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
    sortDir: 'ASC',
    criteria: []
})

const getMenuItemListSuccess = (response) => {
    console.log('getMenuItemListSuccess', response);
    items.value = response.data.content
    menuItemListRequest.value.page = response.data.page
    menuItemListRequest.value.totalPages = response.data.totalPages
    menuItemListRequest.value.totalElements = response.data.totalElements
}

const getMenuItemListError = (err) => {
    console.log('getMenuItemListError' + err)

}

const getMenuItemList = (payload) => {
    menuItemListRequest.value.criteria.push({
        key: 'menuCategoryId',
        operation: '==',
        value: props.itemCategoryId
    })
    commonStore.sendRequestPut({ path: 'menu/item-page', data: payload, success: getMenuItemListSuccess, error: getMenuItemListError })
}

const editItemCategory = (item) => {
    dialogItem.value = true
    editedItemCategory.value = item
}
const changeStatusOfItem = () => {

}

const closeItem = () => {
    dialogItem.value = false
}

const addLanguage = () => {
    editedItemCategory.value.languages.push({
        id: '',
        languageId: '',
        value: ''
    })
}
const deletelanguage = (language) => {
    let filteredLanguages = editedItemCategory.value.languages.filter(e => e.value !== language.value)
    editedItemCategory.value.languages = filteredLanguages
}


const saveItem = () => {
    errorMessage.value = ''
    console.log("saveItem")
    if (editedItemCategory.value.languages.length == 0) {
        errorMessage.value = 'Не выбран не один язык'
    }
    else {
        editedItemCategory.value.menuCategoryId = props.itemCategoryId
        if (editedItemCategory.value.id == '')
            commonStore.sendRequestPost({ path: 'menu/item', data: editedItemCategory.value, success: saveItemSuccess, error: saveItemError })
        else
            commonStore.sendRequestPut({ path: 'menu/item', data: editedItemCategory.value, success: saveItemSuccess, error: saveItemError })

    }
}

const saveItemSuccess = (response) => {
    console.log('saveItemSuccess', response);
    dialogItem.value = false;
    getMenuItemList(menuItemListRequest.value);
}

const saveItemError = (err) => {
    errorMessage.value = err.message

}
const addNewItem = () => {
    dialogItem.value = true
    errorMessage.value = '';
    editedItemCategory.value = JSON.parse(JSON.stringify(newItemCategory.value))
}
function loadItems({ page, itemsPerPage, sortBy }) {
    menuItemListRequest.value.page=page-1
    menuItemListRequest.value.size=itemsPerPage
    getMenuItemList(menuItemListRequest.value)

}

onMounted(() => {
    getMenuItemList(menuItemListRequest.value);

})

</script>
<template>
    <v-data-table-server :items-per-page-options="[5, 10, 15, 20]" :items-per-page="menuItemListRequest.size"
        :items-length="menuItemListRequest.totalElements" dense :headers="headers" :items="items"    @update:options="loadItems">
        <template v-slot:expanded-row="{ columns, item }">
            <tr>
                <td :colspan="columns.length">
                    <item-list :itemCategoryId="item.id"></item-list>
                </td>
            </tr>
        </template>
        <template v-slot:top>
            <v-toolbar flat color="gray">
                <v-dialog v-model="dialogItem" max-width="70%">
                    <template v-slot:activator="{ on }">
                        <v-btn color="white" class="mb-2 mt-4" v-on:click="addNewItem()">
                            <v-icon>mdi-plus</v-icon> Добавить</v-btn>

                    </template>
                    <v-card>
                        <v-alert v-if="errorMessage != ''" :text="errorMessage" title="Ошибка" type="error"></v-alert>
                        <v-card-title>
                            <v-row>
                                <v-col cols="11" class="mt-3"><span class="headline "> Детальная информация о
                                        товаре</span></v-col>
                                <v-col> <v-switch color="green" v-model="editedItemCategory.isEnabled"></v-switch>
                                </v-col>
                            </v-row>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>

                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="editedItemCategory.value"
                                            label="Наименование товара"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field type="number" v-model="editedItemCategory.price"
                                            label="Цена"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-select label="Вид измерения" :items="rulerList" item-title="value"
                                            item-value="id" v-model="editedItemCategory.menuItemSizeId"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field type="number" v-model="editedItemCategory.size"
                                            label="Количество"></v-text-field>
                                    </v-col>
                                    <v-col cols="=12">
                                        <v-divider></v-divider>
                                    </v-col>
                                    <v-col cols="12"> <v-btn color="white" @click="addLanguage()">Добавить
                                            язык</v-btn></v-col>
                                </v-row>
                                <v-row v-for="language of editedItemCategory.languages">
                                    <v-col offset="10" cols="1">

                                        <v-btn color="red" @click="deletelanguage(language)">
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
                                    <v-col cols="12">
                                        <v-text-field label="Описание" v-model="language.descriptions"></v-text-field>
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
                                @click="closeItem"><v-icon>mdi-close-octagon-outline</v-icon>
                                <v-tooltip activator="parent" location="top">Закрыть</v-tooltip></v-btn>
                            <v-btn color="blue" text @click="saveItem"><v-icon>mdi-content-save</v-icon> <v-tooltip
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
    </v-data-table-server>
</template>