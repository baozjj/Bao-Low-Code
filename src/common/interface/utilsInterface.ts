import type { Component } from 'vue';

export interface IEditorConfig {
    componentList: IComponentConfig[];
    componentMap: Record<string, IComponentConfig>;
    register: (config: IComponentConfig) => void;
}

export interface IComponentConfig {
    label: string;
    preview: () => Component;  // 预览函数，返回一个 Vue 组件
    render: () => Component;   // 渲染函数，返回一个 Vue 组件
    key: string;
}
