<script setup lang="ts">
import {
  defineProps,
  computed,
  withDefaults,
  defineModel,
  inject,
  ref,
} from "vue";
import type { IEditorProps } from "./service/interface";
import { useMenuDragger } from "./service/useMenuDragger";
import { useFocus } from "./service/useFocus";
import deepcopy from "deepcopy";
import EditorBlock from "./components/EditorBlock/index.vue";

const props = withDefaults(defineProps<IEditorProps>(), {
  modelValue: "",
});
const model = defineModel();

const data = computed({
  get() {
    return model.value;
  },
  set(newValue) {
    model.value = deepcopy(newValue);
  },
});

const containerStyles = computed(() => {
  return {
    width: data.value.container.width + "px",
    height: data.value.container.height + "px",
  };
});

const config = inject("config");

const componentList = computed(() => {
  return config.componentList;
});

const containerRef = ref();

// 实现菜单的拖拽功能
const { dragstart, dragend } = useMenuDragger(containerRef, data);

// 实现获取焦点

// 实现拖拽多个元素

const {blockMousedown, clearBlockFocus, focusData} = useFocus(data)


const containerMousedown = () => {
    clearBlockFocus(); // 点击容器让选中的失去焦点
  };

</script>

<template>
  <div class="editor">
    <div class="editor-left">
      <div
        class="editor-left-item"
        v-for="item in componentList"
        :key="item.key"
        :draggable="true"
        :onDragstart="(e) => dragstart(e, item)"
        :onDragend="dragend"
      >
        <!-- 更具注册列表 渲染对于的内容 -->
        <span>{{ item.label }}</span>
        <component :is="item.preview()" />
      </div>
    </div>
    <div class="editor-top">菜单栏</div>
    <div class="editor-right">属性控制栏</div>
    <div class="editor-container">
      <!-- 负责产生滚动条 -->
      <div class="editor-container-canvas">
        <!-- 产生内容区 -->
        <div
          class="editor-container-canvas-content"
          :style="containerStyles"
          ref="containerRef"
          :onMousedown="containerMousedown"
        >
          <div v-for="item in data.blocks" :key="item.id">
            <EditorBlock
              :class="item.focus ? 'editor-block-focus' : ''"
              class="editor-block"
              :onMousedown="(e) => blockMousedown(e, item)"
              :block="item"
            />
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

    .editor-left-item {
      width: 250px;
      margin: 20px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      padding: 20px;
      box-sizing: border-box;
      cursor: move;
      user-select: none;
      min-height: 100px;
      position: relative;

      span {
        position: absolute;
        top: 0;
        left: 0;
        background: blue;
        color: #fff;
        padding: 4px;
      }
    }

    .editor-left-item::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #ccc;
      opacity: 0.2;
    }
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

        .editor-block::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .editor-block-focus {
          border: 1px solid red;
        }
      }
    }
  }
}
</style>
