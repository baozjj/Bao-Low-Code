<script setup lang="ts">
import { withDefaults, defineProps, computed, inject } from "vue";

const props = withDefaults(defineProps<{
    block: Object
}>(), {
    block: null
});

const blockStyles = computed(() => {
    return {
        top: `${props.block.top}px`,
        left: `${props.block.left}px`,
        zIndex: `${props.block.zIndex}px`,
    }
})

const config = inject('config')

// 获取组件
const componentToRender = computed(() => {
  return config?.componentMap[props.block.key].render();
});

console.log('componentToRender', componentToRender.value)
</script>

<template>
    <div class="editor-block" :style="blockStyles">
        <component :is="componentToRender" :block="props.block" />
    </div>
</template>

<style scoped lang="less">
.editor-block {
    position: absolute;
}
</style>
