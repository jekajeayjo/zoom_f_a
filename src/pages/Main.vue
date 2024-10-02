<script setup>
import { useCommonStore } from '@/stores/CommonStore';
const commonStore = useCommonStore();
</script>

<template>

    <v-row style="margin-top: 30%;" align="center">
        <v-col cols="12" align="center">
            <v-card class="mx-auto" :subtitle="commonStore.userDetailInfo.fio" width="80%">
                <template v-slot:title>
                    <span class="font-weight-black">Добро пожаловать в систему администрирования ZOOM</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                    Данная платформа предназначена для работы с персоналом и работы с меню</v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<style></style>