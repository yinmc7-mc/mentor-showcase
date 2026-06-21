# Mentor Showcase

> "人最大的孤独，是无法与优秀的大脑对话；
> 人最大的遗憾，是无法与顶级的专家同行。

> 我们无法阅尽前辈们的每一本书、每一份传记、每一段采访。
> 但通过这个产品，让我们在点滴日常里与这些优秀的灵魂相遇。
> 即使没有 Claude Code，也可以零门槛上手体验这个产品，消灭所有鸿沟，真正实现技术平权。"

---

## ✨ 在线体验

**体验地址：** [mentor-showcase-production.up.railway.app](https://mentor-showcase-production.up.railway.app)

---

## 🎯 这个产品是什么？

**1. 蒸馏最顶级的产品专家的大脑和思想逻辑**

13 位传奇产品经理和 AI 专家的思维模型，经过深度提炼，你可以直接在对话中体验他们的思考方式：
- 乔布斯的「聚焦即说不」
- 马斯克的「第一性原理」
- 张一鸣的「延迟满足」
- Ilya Sutskever 的深度学习洞察
- ...还有 9 位顶级专家

**2. 把他们随时作为 Skill 安装到你的 Claude Code**

如果你是 Claude Code 用户，可以直接把这些导师作为 Skill 安装：
```bash
npx skills add alchaincyf/steve-jobs-skill
```
安装后，对话中说「用乔布斯的视角分析一下...」，即可激活。

**3. Pro 版支持在线和顶级大脑直接沟通**

无需 Claude Code，直接在网页上与导师对话：
- **免费模式**：每日 10 次对话，使用平台提供的 API
- **无限模式**：使用自己的 API Key，无次数限制

**4. 提供蒸馏工具，蒸馏任何一个你关注的产品大佬**

基于 [nuwa-skill](https://github.com/alchaincyf/nuwa-skill)，你可以蒸馏任何人：
```bash
npx skills add alchaincyf/nuwa-skill
```
安装后说「蒸馏 XXX」，自动：深度调研 → 思维框架提炼 → 生成 Skill。

---

## 🌟 核心功能

### 💬 沉浸式对话体验

- **13 位传奇导师** — 乔布斯、马斯克、张一鸣、Ilya Sutskever 等
- **流式输出** — 实时看到思考过程，感知速度提升 300%
- **智能等待** — 轮播等待文案（"嗯，我正在思考你这个问题"），告别焦躁
- **Markdown 渲染** — 完美支持代码高亮、列表、链接

### 🔒 双模式安全设计

| 模式 | 说明 |
|------|------|
| **免费模式** | 每日 10 次对话，使用平台提供的 API |
| **无限模式** | 使用自己的 API Key，无次数限制 |

**安全承诺：**
- ✅ 用户 API Key 仅存储在浏览器本地
- ✅ 后端不存储任何用户密钥
- ✅ 所有 API 调用通过后端代理

### 🛠️ 强大的交互功能

- **一键复制** — 快速复制导师金句
- **收藏系统** — 保存重要对话，随时回顾
- **导出功能** — 导出对话记录，离线阅读
- **搜索过滤** — 快速找到历史对话

### 🌐 多模型支持

支持 7 大 LLM 提供商：
- Claude (Anthropic)
- OpenAI (GPT-4)
- Google (Gemini)
- DeepSeek
- 阿里通义千问
- 月之暗面 Kimi
- 智谱 GLM (4 种模型变体)

---

## 📚 导师列表

| 导师 | 领域 | 特色 |
|------|------|------|
| 乔布斯 Steve Jobs | 产品 / 设计 / 战略 | 聚焦即说不、端到端控制 |
| 张小龙 Allen Zhang | 产品 / 克制 / 人性 | 用完即走、好的产品是用完即走 |
| 刘强东 Richard Liu | 商业 / 效率 / 管理 | 供应链思维、成本为王 |
| 张一鸣 Zhang Yiming | 产品 / 组织 / 全球化 | 延迟满足、逃逸平庸重力 |
| 马斯克 Elon Musk | 工程 / 成本 / 第一性 | 物理学思维、渐近极限法 |
| Dario Amodei | AI / 安全 / Scaling | AI 安全、规模化思考 |
| Paul Graham | 创业 / 投资 / 写作 | 反常识、创始人视角 |
| MrBeast | 内容 / 增长 / 执行力 | 疯狂实验、数据驱动 |
| Ilya Sutskever | AI / 深度学习 | OpenAI 联合创始人、深度洞察 |
| Andrej Karpathy | AI / 工程 / 教育 | Tesla AI 前负责人、教学天才 |
| X 导师 | 运营 / 写作 / 增长 | 小红书风格、实战导向 |
| 查理·芒格 Charlie Munger | 投资 / 思维模型 | 多元思维、逆向思考 |
| Manus 团队 | AI Agent / 上下文工程 | Agent 设计、行动优先 |

---

## 🚀 快速开始

### 方式一：在线使用（推荐）

直接访问 [ymacy.top](http://ymacy.top)，选择导师，开始对话！

### 方式二：Claude Code 用户

1. 安装 [Claude Code](https://claude.ai/code)
2. 安装导师 Skill：
```bash
npx skills add alchaincyf/steve-jobs-skill
```
3. 对话中说「用乔布斯的视角分析一下...」

---

## 🛠️ 本地开发

```bash
# 克隆项目
git clone https://github.com/yinmc7-mc/mentor-showcase.git
cd mentor-showcase

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env，填入你的智谱 API Key

# 启动服务
npm start
```

访问 http://localhost:3001

---

## 📦 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyinmc7-mc%2Fmentor-showcase)

**部署步骤：**
1. 点击上方按钮
2. 导入 GitHub 仓库
3. 配置环境变量 `GLM_API_KEY`（智谱 API Key）
4. 部署完成！

---

## 🎯 自己蒸馏导师

基于 [nuwa-skill](https://github.com/alchaincyf/nuwa-skill)，你可以蒸馏任何人：

```bash
npx skills add alchaincyf/nuwa-skill
```

安装后说「蒸馏 XXX」，自动：深度调研 → 思维框架提炼 → 生成 Skill。

---

## 🔧 技术栈

- **前端**: 纯 HTML / CSS / JavaScript，零框架依赖
- **后端**: Node.js + Express
- **流式传输**: Server-Sent Events (SSE)
- **存储**: localStorage（客户端）
- **部署**: Vercel / Railway / Render

---

## 📊 配置统计

```bash
cp analytics.js.example analytics.js
# 编辑 analytics.js，替换为你的统计代码
```

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 License

MIT

---

## 🙏 致谢

- [nuwa-skill](https://github.com/alchaincyf/nuwa-skill) — Skill 蒸馏方法论
- [Agent Skills 协议](https://skills.sh) — 开放 Skill 标准
- 所有贡献者和使用者

---

**Made with ❤️ by the mentor-showcase community**
