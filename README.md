# Bao-Low-Code

本模板旨在帮助您快速使用 Vue 3 和 Vite 开发低代码项目。

## 推荐的开发工具

建议使用 [VSCode](https://code.visualstudio.com/) 搭配 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 插件（并禁用 Vetur），以获得更好的开发体验。

## 在 TypeScript 中支持 `.vue` 文件

默认情况下，TypeScript 无法处理 `.vue` 文件的类型信息。我们使用 `vue-tsc` 替代 `tsc` 进行类型检查。此外，需要安装 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 来让编辑器支持 `.vue` 文件的类型检查。

## 自定义配置

请参考 [Vite 配置文档](https://vite.dev/config/) 进行个性化配置。

## 项目安装与启动

### 安装依赖

```sh
pnpm install
```
### 开发环境下编译与热加载

```sh
pnpm dev
```
### 使用 ESLint 进行代码格式化检查

```sh
pnpm lint
```

## 目录结构

Bao-Low-Code/
├── public/          # 静态资源目录
├── src/             # 源码目录
│   ├── assets/      # 项目资源文件
│   ├── components/  # 公共组件
│   ├── pages/       # 页面组件
│   ├── router/      # 路由配置
│   ├── store/       # 状态管理（如 Pinia）
│   ├── utils/       # 工具函数
│   └── App.vue      # 根组件
├── .eslintrc.js     # ESLint 配置文件
├── tsconfig.json    # TypeScript 配置文件
├── vite.config.ts   # Vite 配置文件
└── package.json     # 项目依赖与脚本

