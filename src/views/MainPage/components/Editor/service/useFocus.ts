
import { computed, ref } from 'vue';

export const useFocus = (data, callback) => {

  const selectIndex = ref(-1) // 表示没有任何一个被选中

  // 选中最后一个块，如果没有则返回null
  const lastSelectBlock = computed(() => {
    if (selectIndex.value === -1) return null;
    return data.value.blocks[selectIndex.value];
  });

  const focusData = computed(() => {
    let focus = [];
    let unfocused = [];
    data.value.blocks.forEach((block) => {
      if (block.focus) {
        focus.push(block);
      } else {
        unfocused.push(block);
      }
    });
    return { focus, unfocused };
  });

  const clearBlockFocus = () => {
    data.value.blocks.forEach((block) => {
      block.focus = false;
    });
  };


    const containerMousedown = () => {
      clearBlockFocus(); // 点击容器让选中的失去焦点
      selectIndex.value = -1;
    };

  /**
   * 阻止默认事件和冒泡事件，并根据事件和块的状态处理块的焦点。
   *
   * @param e 事件对象
   * @param block 要处理的块对象
   */
  const blockMousedown = (e, block, index) => {
    e.preventDefault();
    e.stopPropagation();
  
    const currentFocus = focusData.value.focus;
  
    if (e.shiftKey) {
      if (currentFocus.length <= 1 || currentFocus.includes(block)) {
        block.focus = true;
      } else {
        block.focus = !block.focus;
      }
    } else {
      if (!block.focus) {
        clearBlockFocus();
        block.focus = true;
      }
    }
    selectIndex.value = index;
    callback(e);
  };

  return {
    blockMousedown,
    clearBlockFocus,
    containerMousedown,
    focusData,
    lastSelectBlock
  };
};
