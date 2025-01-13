import { defineComponent, h } from "vue";
import type {
  IEditorConfig,
  IComponentConfig,
} from "../interface/utilsInterface";
import { ElButton, ElInput } from "element-plus"; // 引入 Element Plus 组件

const createEditorConfig = (): IEditorConfig => {
  const componentList: IComponentConfig[] = [];
  const componentMap: { [key: string]: IComponentConfig } = {};

  return {
    componentList,
    componentMap,
    register: (component: IComponentConfig) => {
      // 将组件配置保存到列表和映射中
      componentList.push(component);
      componentMap[component.key] = component;
    },
  };
};

export let registerConfig = createEditorConfig();
registerConfig.register({
  label: "文本",
  preview: () => {
    // 返回一个简单的预览组件
    return defineComponent({
      setup() {
        return () => h("div", "预览文本");
      },
    });
  },
  render: () => {
    // 返回一个渲染组件
    return defineComponent({
      setup() {
        return () => h("div", "渲染文本");
      },
    });
  },
  key: "text",
});

registerConfig.register({
  label: "按钮",
  preview: () => {
    return defineComponent({
      setup() {
        return () =>
          h(
            ElButton,
            {
            },
            "预览按钮"
          );
      },
    });
  },
  render: () => {
    return defineComponent({
      setup() {
        return () =>
          h(
            ElButton,
            {
              type: "primary",
            },
            "渲染按钮"
          );
      },
    });
  },
  key: "button",
});

registerConfig.register({
  label: "输入框",
  preview: () => {
    return defineComponent({
      setup() {
        return () =>
          h(
            ElInput,
            {
              placeholder: "预览输入框",
            },
            "预览输入框"
          );
      },
    });
  },
  render: () => {
    return defineComponent({
      setup() {
        return () =>
          h(
            ElInput,
            {
              placeholder: "渲染输入框",
            },
            "渲染输入框"
          );
      },
    });
  },
  key: "input",
});

