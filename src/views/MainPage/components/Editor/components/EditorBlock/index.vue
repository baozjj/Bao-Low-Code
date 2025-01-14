<script setup lang="ts">
import { withDefaults, defineProps, computed, inject, onMounted, ref} from "vue";

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

const blockRef = ref(null)

onMounted(() => {
    console.log(blockRef.value)
    let { offsetWidth, offsetHeight } = blockRef.value
    if(props.block.alignCenter) {
        // 松手居中显示
        props.block.left = props.block.left - (offsetWidth / 2)
        props.block.top = props.block.top - (offsetHeight / 2)
        props.block.alignCenter = false 
    }
})
</script>

<template>
    <div class="editor-block" :style="blockStyles" ref="blockRef">
        <component :is="componentToRender" :block="props.block" />
    </div>
</template>

<style scoped lang="less">
.editor-block {
    position: absolute;
}
</style>
