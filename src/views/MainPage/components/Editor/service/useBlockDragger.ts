export const useBlockDragger = (focusData, lastSelectBlock) => {
  let dragState = {
    startX: 0,
    startY: 0,
  };
  const mousemove = (e) => {
    let { clientX: moveX, clientY: moveY } = e;
    let durX = moveX - dragState.startX;
    let durY = moveY - dragState.startY;

    focusData.value.focus.forEach((block, idx) => {
      block.top = dragState.startPos[idx].top + durY;
      block.left = dragState.startPos[idx].left + durX;
    });
  };

  const mouseup = (e) => {
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseup);
  };

  const mousedown = (e) => {

    console.log('lastSelectBlock', lastSelectBlock.value)
    dragState = {
      startX: e.clientX,
      startY: e.clientY, // 记录每一个选中的位置
      startPos: focusData.value.focus.map(({ top, left }) => ({ top, left })),
    };
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  return {
    mousedown,
  };
};
