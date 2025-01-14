export const useMenuDragger = (containerRef, data) => {
  let currentComponent = null;

  const dragenter = (e) => {
    e.dataTransfer.dropEffect = "move"; // h5 拖动图标
  };

  const dragover = (e) => {
    e.preventDefault();
  };

  const dragleave = (e) => {
    e.dataTransfer.dropEffect = "none";
  };

  const drop = (e) => {
    console.log(currentComponent);

    let { blocks } = data.value;
    data.value = {
      ...data.value,
      blocks: [
        ...blocks,
        {
          top: e.offsetY,
          left: e.offsetX,
          zIndex: 1,
          key: currentComponent.key,
          alignCenter: true, // 松手的时候居中
        },
      ],
    };

    currentComponent = null;
  };

  const dragstart = (e, component) => {
    containerRef.value.addEventListener("dragenter", dragenter);
    containerRef.value.addEventListener("dragover", dragover);
    containerRef.value.addEventListener("dragleave", dragleave);
    containerRef.value.addEventListener("drop", drop);
    currentComponent = component;
  };

  const dragend = (e) => {
    containerRef.value.removeEventListener("dragenter", dragenter);
    containerRef.value.removeEventListener("dragover", dragover);
    containerRef.value.removeEventListener("dragleave", dragleave);
    containerRef.value.removeEventListener("drop", drop);
  };

  return {
    dragstart,
    dragend,
  };
};
