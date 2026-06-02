# Mentor Showcase

> Let a legendary product manager mentor you

13 位顶级导师的思维蒸馏，一键安装到你的 AI Agent。

## 在线访问

- 海外：[mentor-showcase.vercel.app](https://mentor-showcase.vercel.app)
- 国内：[www.ymacy.top](https://www.ymacy.top)

## 导师列表

| 导师 | 领域 | 安装命令 |
|------|------|----------|
| 乔布斯 Steve Jobs | 产品 / 设计 / 战略 | `npx skills add alchaincyf/steve-jobs-skill` |
| 张小龙 Allen Zhang | 产品 / 克制 / 人性洞察 | `npx skills add yinmc7-mc/zhang-xiaolong-perspective` |
| 刘强东 Richard Liu | 产品 / 商业 / 效率 | `npx skills add yinmc7-mc/liu-qiangdong-perspective` |
| 张一鸣 Zhang Yiming | 产品 / 组织 / 全球化 | `npx skills add alchaincyf/zhang-yiming-skill` |
| 马斯克 Elon Musk | 工程 / 成本 / 第一性原理 | `npx skills add alchaincyf/elon-musk-skill` |
| Dario Amodei Doris | AI / 安全 / Scaling | `npx skills add yinmc7-mc/dario-amodei-perspective` |
| Paul Graham | 创业 / 投资 / 写作 | `npx skills add alchaincyf/paul-graham-skill` |
| MrBeast | 内容 / 增长 / 执行力 | `npx skills add alchaincyf/mrbeast-skill` |
| Ilya Sutskever | AI / 深度学习 | `npx skills add alchaincyf/ilya-sutskever-skill` |
| Andrej Karpathy | AI / 工程 / 教育 | `npx skills add alchaincyf/karpathy-skill` |
| X 导师 | 运营 / 写作 / 增长 | `npx skills add alchaincyf/x-mentor-skill` |
| 查理·芒格 Charlie Munger | 投资 / 思维模型 | `npx skills add alchaincyf/munger-skill` |
| Manus 团队 Manus Team | AI Agent / 上下文工程 / 行动优先 | `npx skills add yinmc7-mc/manus-team-perspective` |

## 如何使用

1. 确保已安装 [Claude Code](https://claude.ai/code)
2. 复制上表中任意导师的安装命令
3. 在 Claude Code 中粘贴运行
4. 对话中说「用 XXX 的视角分析一下...」即可激活

## 自己蒸馏一个导师

基于 [nuwa-skill](https://github.com/alchaincyf/nuwa-skill)，你可以蒸馏任何人：

```
npx skills add alchaincyf/nuwa-skill
```

安装后说「蒸馏 XXX」，自动深度调研 → 思维框架提炼 → 生成 Skill。

## 本地开发

```bash
# 克隆项目
git clone https://github.com/yinmc7-mc/mentor-showcase.git
cd mentor-showcase

# 浏览器直接打开
open index.html

# 或用本地服务器
python3 -m http.server 8080
```

## 部署

项目使用 [Vercel](https://vercel.com) 部署，纯静态 HTML，零依赖。

```bash
npx vercel --prod --yes
```

## 技术栈

- 纯 HTML / CSS / JS 单文件，零框架
- CSS Grid + Flex 响应式布局
- localStorage 收藏状态持久化
- 百度统计（需自行配置 `analytics.js`）

## 配置统计

复制 `analytics.js.example` 为 `analytics.js`，填入你自己的统计代码：

```bash
cp analytics.js.example analytics.js
# 编辑 analytics.js，替换为你的百度统计代码
```

## 致谢

- [nuwa-skill](https://github.com/alchaincyf/nuwa-skill) — Skill 蒸馏方法论与工具
- [Agent Skills 协议](https://skills.sh) — 开放 Skill 安装标准

## License

MIT
