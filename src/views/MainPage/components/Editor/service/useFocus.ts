
import { computed } from 'vue';

export const useFocus = (data, callback) => {
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

  const blockMousedown = (e, block) => {
    // focus 获取焦点后为 true
    e.preventDefault();
    e.stopPropagation();

    if (e.shiftKey) {
      block.focus = !block.focus;
    } else {
      if (!block.focus) {
        clearBlockFocus();
        block.focus = true; // 要清空其他的 focus 属性
      } else {
        block.focus = false;
      }
    }
    callback(e)
  };

  return {
    blockMousedown,
    clearBlockFocus,
    focusData,
  };
};
