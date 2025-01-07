<script setup lang="ts">
import {ref} from 'vue'
import data from './data.json'
import Editor from './components/Editor/index.vue'

const state = ref(data)
</script>

<template>
    <Editor />
</template>
