import { reactive } from "vue";

export const useBlockDragger = (focusData, lastSelectBlock, data) => {
  let dragState = {
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    startPos: [],
    lines: { x: [], y: [] }
  };

  let markLine = reactive({
    x: null,
    y: null,
  });

  const mousemove = (e) => {
    let { clientX: moveX, clientY: moveY } = e;

    // 计算当前元素最新的 left 和 top
    let left = moveX - dragState.startX + dragState.startLeft;
    let top = moveY - dragState.startY + dragState.startTop;

    // 计算 Y 轴方向的辅助线
    let y = null;
    let x = null;

    // 查找与当前元素垂直方向的辅助线
    for (let i = 0; i < dragState.lines.y.length; i++) {
      const { top: t, showTop: s } = dragState.lines.y[i];
      if (Math.abs(top - t) < 5) {
        y = s; // 设置线要显示的位置
        moveY = dragState.startY - dragState.startTop + t; // 快速对齐
        break;
      }
    }

    // 查找与当前元素水平方向的辅助线
    for (let i = 0; i < dragState.lines.x.length; i++) {
      const { left: l, showLeft: s } = dragState.lines.x[i];
      if (Math.abs(left - l) < 5) {
        x = s; // 设置线要显示的位置
        moveX = dragState.startX - dragState.startLeft + l; // 快速对齐
        break;
      }
    }

    // 更新 markLine 以便显示辅助线
    markLine.x = x;
    markLine.y = y;

    let durX = moveX - dragState.startX;
    let durY = moveY - dragState.startY;

    // 更新每个选中块的位置
    focusData.value.focus.forEach((block, idx) => {
      block.top = dragState.startPos[idx].top + durY;
      block.left = dragState.startPos[idx].left + durX;
    });
  };

  const mouseup = (e) => {
    // 移除事件监听器，结束拖动
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseup);
    markLine.x = null;
    markLine.y = null;
  };

  const mousedown = (e) => {
    const { width: BWidth, height: BHeight } = lastSelectBlock.value;

    dragState = {
      startX: e.clientX,
      startY: e.clientY, // 记录鼠标按下时的位置
      startLeft: lastSelectBlock.value.left, // 记录选中块的初始位置
      startTop: lastSelectBlock.value.top,
      startPos: focusData.value.focus.map(({ top, left }) => ({ top, left })), // 记录所有选中块的初始位置
      lines: (() => {
        const { unfocused } = focusData.value; // 获取未选中的块
        let lines = { x: [], y: [] };

        [...unfocused,{
          top: 0,
          left: 0,
          width: data.value.container.width,
          height: data.value.container.height,
        }].forEach((block) => {
          const {
            top: ATop,
            left: ALeft,
            width: AWidth,
            height: AHeight,
          } = block;

          // 计算 Y 轴方向的辅助线
          lines.y.push({ showTop: ATop, top: ATop }); // 顶对顶
          lines.y.push({ showTop: ATop, top: ATop - BHeight }); // 顶对底
          lines.y.push({
            showTop: ATop + AHeight / 2,
            top: ATop + AHeight / 2 - BHeight / 2,
          }); // 中对中
          lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight }); // 底对顶
          lines.y.push({
            showTop: ATop + AHeight,
            top: ATop + AHeight - BHeight,
          }); // 底对底

          // 计算 X 轴方向的辅助线
          lines.x.push({ showLeft: ALeft, left: ALeft }); // 左对左
          lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth }); // 右对右
          lines.x.push({
            showLeft: ALeft + AWidth / 2,
            left: ALeft + AWidth / 2 - BWidth / 2,
          }); // 中对中
          lines.x.push({
            showLeft: ALeft + AWidth,
            left: ALeft + AWidth - BWidth,
          }); // 右对左
          lines.x.push({
            showLeft: ALeft,
            left: ALeft - BWidth,
          }); // 左对右
        });

        return lines;
      })(),
    };

    // 添加鼠标移动和释放事件监听器
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  return {
    mousedown,
    markLine,
  };
};
