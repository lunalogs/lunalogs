# lunalogs — 项目说明

## 需求 / 范围

**要做什么**

- 个人品牌站点（lunalogs.com）：首页编辑式导航、项目列表、写作页、关于页；多语言（en / zh / ja）。
- 展示项目详情（如 TapTune）、可下载简历 PDF；About 页含经历时间线（文案来自 locale）。

**不做什么**

- 无后端 API、无用户登录；写作/项目详情以静态内容与占位为主，非完整 CMS。

**约束 / 假设**

- Next.js Pages Router + `next-i18next`；文案与经历数据主要在 `public/locales/*/common.json`。
- 图片等静态资源放在 `public/`；生产构建为静态页面（SSG）。

---

## 执行步骤（可复制粘贴）

```bash
cd /path/to/lunalogs
npm install
npm run dev
```

生产：

```bash
npm run build
npm run start
```

---

## 进度


| 状态  | 内容                                                                |
| --- | ----------------------------------------------------------------- |
| 已完成 | 站点框架、首页展开区块、Projects / Writing / About / TapTune 子页、i18n、简历与时间线展示 |
| 下一步 | 按需要补充项目案例、写作正文与 locale；部署与域名配置按环境执行                               |


---

## 成果（关键结果）

- 可访问的多语言个人站：路由 `/`、`/projects`、`/writing`、`/about`、`/projects/taptune`。
- `npm run build` 可通过，页面静态生成。

---

## 交付物（查看这些即可）


| 类型      | 路径                                                       |
| ------- | -------------------------------------------------------- |
| 入口与页面   | `pages/`、`components/`、`lib/site.ts`                     |
| 样式      | `styles/globals.css`                                     |
| 文案与经历数据 | `public/locales/en                                       |
| 静态资源    | `public/images/`、`public/files/*.pdf`                    |
| 配置      | `next.config.js`、`next-i18next.config.js`、`package.json` |


---

## 修改历史


| 日期         | 摘要                                                        |
| ---------- | --------------------------------------------------------- |
| 2026-04-17 | 新增 `PROJECT.md`，汇总范围、命令、进度与交付物                            |
| 2026-04-17 | About 页：简介区固定、详细履历时间轴独立滚动（数据仍为 locale / 与 `resume.md` 对应） |
| 2026-04-17 | 首页展开 About 增加「完整时间轴」链至 `/about#experience-timeline`，避免与独立 About 页混淆 |


