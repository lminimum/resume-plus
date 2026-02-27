# Gatsby → Next.js 迁移设计

## 概述

将 resume-plus 项目从 Gatsby 2.x 迁移到 Next.js 14，保持功能完整，简化开发体验。

## 技术栈变更

| 项目   | 原技术            | 新技术                    |
| ------ | ----------------- | ------------------------- |
| 框架   | Gatsby 2.x        | Next.js 14 (App Router)   |
| 语言   | TypeScript        | TypeScript（保持）        |
| 样式   | Less + Ant Design | Tailwind CSS + Ant Design |
| 路由   | Gatsby 文件路由   | Next.js App Router        |
| 国际化 | react-intl        | react-intl（保持）        |

## 项目结构

```
resume-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # 根布局
│   │   ├── page.tsx         # 首页
│   │   └── globals.css      # Tailwind 入口
│   ├── components/
│   │   ├── Resume/
│   │   │   ├── Template1.tsx
│   │   │   ├── Template2.tsx
│   │   │   └── Template3.tsx
│   │   ├── FormCreator/
│   │   ├── Drawer/
│   │   ├── Avatar/
│   │   ├── LangSwitcher/
│   │   └── types.ts
│   ├── layout/
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── helpers/
│   │   ├── fetch-resume.ts
│   │   └── location.ts
│   ├── hooks/
│   │   └── useModeSwitcher.ts
│   ├── i18n/
│   │   ├── index.ts
│   │   └── locales/
│   └── data/
│       └── constant.ts
├── public/
│   └── images/
└── package.json
```

## 迁移步骤

### 步骤 1：项目初始化

- 创建 Next.js 14 项目
- 配置 Tailwind CSS
- 配置路径别名 `@/*`
- **测试**：项目能正常启动，访问 localhost:3000

### 步骤 2：安装依赖 + 类型定义

- 安装 antd, react-intl, lodash-es
- 迁移 `types.ts`
- **测试**：项目仍能正常启动，无报错

### 步骤 3：迁移 helpers + data

- 迁移 `helpers/` 目录下所有函数
- 迁移 `data/constant.ts`
- **测试**：项目正常启动，无报错

### 步骤 4：迁移布局组件

- 迁移 `layout/header.tsx` 和 `layout/footer.tsx`
- 用 Tailwind 替换 Less 样式
- **测试**：页面显示 Header 和 Footer

### 步骤 5：迁移首页 + 数据加载

- 迁移 `app/page.tsx`
- 实现从 GitHub 加载 resume.json
- **测试**：首页能显示加载的数据

### 步骤 6：迁移模板组件

- 迁移 Template1, Template2, Template3
- 用 Tailwind 替换 Less 样式
- **测试**：3 套模板都能正常渲染

### 步骤 7：迁移其他组件 + 国际化

- 迁移 FormCreator, Drawer, Avatar 等
- 配置 react-intl
- **测试**：编辑模式和语言切换正常

## 关键迁移点

### 样式迁移 (Less → Tailwind)

- Less 变量和 mixin → Tailwind 配置或 CSS 变量
- 嵌套选择器 → Tailwind 类名组合
- 组件样式 → 内联 Tailwind 类或 CSS Modules

### 数据加载

- Gatsby 的 GraphQL → 直接 fetch
- 保持 GitHub raw 加载方式

### 路由

- URL 参数解析使用 `useSearchParams`
- 保持 `?user=xxx&template=xxx&mode=edit` 参数格式

## 功能保留

- ✅ 3 套简历模板
- ✅ 国际化 (中/英)
- ✅ PDF 导出
- ✅ 主题颜色自定义
- ✅ 编辑模式
- ✅ GitHub 数据加载
