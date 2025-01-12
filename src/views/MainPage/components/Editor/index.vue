<script setup lang="ts">
import {defineProps} from 'vue'
import type { IEditorProps } from './service/interface';
withDefaults(defineProps<IEditorProps>(), {
  data: '' 
});
</script>

<template>
    <div>
        {{data}}
    </div>
</template>
