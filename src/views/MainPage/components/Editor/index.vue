<script setup lang="ts">
import {defineProps, computed, withDefaults, defineModel} from 'vue'
import type { IEditorProps } from './service/interface';
import EditorBlock from './components/EditorBlock/index.vue'
const props = withDefaults(defineProps<IEditorProps>(), {
  modelValue: '' 
});
const model = defineModel()

const data = computed(() => {
  return model.value
})

const containerStyles = computed(() => {
  return {
    width: data.value.container.width + 'px',
    height: data.value.container.height + 'px',
  }
})

console.log('containerStyles', containerStyles.value)
</script>

<template>
    <div class="editor">
      <div class="editor-left">左侧物料区</div>
      <div class="editor-top">菜单栏</div>
      <div class="editor-right">属性控制栏</div>
      <div class="editor-container">
        <!-- 负责产生滚动条 -->
        <div class="editor-container-canvas">
          <!-- 产生内容区 -->
           <div class="editor-container-canvas-content" :style="containerStyles">
              <div v-for="item in data.blocks" :key="item.id">
                <EditorBlock :block="item"/>
              </div>
           </div>
        </div>
      </div>

    </div>
</template>
<style lang="less" scoped>
.editor {
  width: 100%;
  height: 100%;
  
  .editor-left,
  .editor-right {
    position: absolute;
    width: 270px;
    background-color: red;
    top: 0;
    bottom: 0;
  }

  .editor-left {
    left: 0;
  }

  .editor-right {
    right: 0;
  }

  .editor-top {
    position: absolute;
    right: 280px;
    left: 280px;
    height: 80px;
    background-color: blue;
  }

  .editor-container {
    padding: 80px 270px;
    height: 100%;
    box-sizing: border-box;
      .editor-container-canvas {
        overflow: scroll;
        height: 100%;

        .editor-container-canvas-content {
          margin: 20px auto;
          width: 1000px;
          height: 1000px;
          background-color: green;
          position: relative;
        }

      }
  }

}

</style>