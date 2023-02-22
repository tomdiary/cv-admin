# CV Admin

## 简介

CV Admin 是一款免费开源的后台管理系统，基于 [Vue3.2](https://github.com/vuejs/vue)、[Element-Plus](https://github.com/element-plus/element-plus)、[Vite2](https://github.com/vitejs/vite) 和 [Pinia](https://github.com/vuejs/pinia) 开发，使用了最新前端技术栈，内置国际化、权限管理、动态路由等功能，开箱即用

## 特性

+ 国际化（简体中文、繁体中文、英文、日文）
+ 权限管理（菜单权限、按钮权限）
+ 动态换肤
+ CURD HOOKS
+ 自适应（兼容不同分别率屏幕）

## 演示

### 默认表格
![](https://raw.githubusercontent.com/tomdiary/cv-admin/master/src/assets/images/iShot_2022-06-12_00.48.45.png)

### 电子围栏
![](https://raw.githubusercontent.com/tomdiary/cv-admin/master/src/assets/images/iShot_2022-06-12_00.56.17.png)

## 目录结构

```bash
├─ dist/
├─ mock/
├─ public/
├─ src/
│  ├─ api/                 # API模块
│  ├─ assets/              # 静态资源
│  ├─ components/          # 公共组件
│  ├─ config/              # 公共配置文件（配置、数据源）
│  ├─ directive/           # 公共指令
│  ├─ hooks/               # 公共 Hooks
│  ├─ icons/               # 图标
│  ├─ layout/              # 布局
│  ├─ router/              # 路由
│  ├─ server/              # API模块
│  ├─ store/               # 状态管理
│  ├─ styles/              # 公共样式
│  ├─ utils/               # 公共工具
│  ├─ views/               # 视图
│  │  ├─ com/              # 对 Element Plus 组件进行封装
│  │  ├─ dashboard/        # 仪表盘
│  │  ├─ echarts/          # echarts
│  │  ├─ login/            # 登陆
│  ├─ App.vue              # App 组件
│  ├─ main.js              # 入口文件
├─ .env                    # 公共环境
├─ .env.development        # 开发环境
├─ .env.production         # 线上环境
├─ .env.local              # 不公开环境
├─ .eslintrc.cjs           # Eslint 配置文件
├─ .gitignore              # Git 忽略文件
├─ auto-imports.d.ts       # 自动引入组件
├─ components.d.ts         # 自动注册组件
├─ index.html              # 入口 HTML
├─ jsconfig.json           # VS CODE 配置文件
├─ LICENSE                 # MIT 开源协议
├─ package.json            # 包信息
├─ pnpm-lock.yaml          # PNPM 包
├─ README.md               # 英文说明文档
├─ README.zh-CN.md         # 中文说明文档
├─ vite.config.js          # Vite 配置文件
├─ yarn.lock               # Yarn 包信息
```

## 温馨提示

1. 如果启动时报错 `Cannot find package 'consola' imported from` 的问题，请手动下载 `consola` 包。原因是 `vite-plugin-style-import` 在 v2.0 版本中没有在 package.json 中下载 `consola` 依赖包，暂时需要我们手动下载解决

```bash
$ pnpm i consola -D
$ yarn add consola -D
$ npm i consola -D
```

相关 issues：https://github.com/vbenjs/vite-plugin-style-import/issues/95、https://github.com/jdf2e/nutui/issues/1755
