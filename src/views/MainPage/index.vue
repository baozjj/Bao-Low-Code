<script setup lang="ts">
import {ref, provide} from 'vue'
import data from './data.json'
import Editor from './components/Editor/index.vue'
import { registerConfig } from '../../common/utils/editorUtils.ts'


provide('config', registerConfig)
const state = ref(data)
</script>

<template>
    <Editor v-model="state"/>
</template>
