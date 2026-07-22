# Family Education Dashboard

多孩家庭教育管理系统 —— 把每个孩子的日程、学习记录和成长规划放进同一块面板。

## 为什么做这个

家里有不止一个孩子的人都懂：学校通知在群里、补习安排在纸质日历上、考试成绩在各种 App 里、学习资料散落在网盘各处。孩子每多一个，混乱程度不是翻倍，是指数级增长。

我找遍了市面上的同类产品，要么是给学校用的，要么是给单个学生用的，没有一个真正站在"管理一整个家庭的教育"这个视角上。于是干脆自己做一个——从我家三个孩子的真实需求出发，先让自己家用起来，再考虑它能不能帮到别的家庭。

## 核心功能

- **家庭总览** — 本周日程、学习时长、目标进度一屏看清，按周为单位掌握全家节奏
- **多孩管理** — 动态增删孩子档案，一键切换视角查看每个孩子的详情
- **统一日历** — 学校、补习、活动、考试、家庭事项收进同一个日历，按类别和孩子筛选
- **成长记录** — 学习记录、时长统计、学科表现，沉淀成可回顾的成长轨迹
- **教育路线图** — 长期目标拆成里程碑，考试时间线和进度追踪一目了然
- **资源中心** — 文件、笔记、习题、链接按学科打标签，不再翻网盘

当前为 MVP 阶段：前端完整可用（mock 数据驱动），Supabase 数据库 Schema 与 RLS 策略已就绪，下一步接入真实数据与认证。

## Stack

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)

## 快速开始

```bash
npm install
npm run dev
```

接入 Supabase 时创建 `.env.local`：

```bash
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="server-only-service-role-key"
```

数据库结构见 [docs/database-schema.sql](./docs/database-schema.sql)，产品设计见 [docs/product-architecture.md](./docs/product-architecture.md)。

---

<sub>先解决自己家的问题，再谈别人的。</sub>
