# 🚀 部署指南

## 方法 1：本地运行

### 1. 安装依赖
```bash
cd /tmp/mentor-showcase
npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env，填入你的智谱 API Key
```

### 3. 启动服务
```bash
npm start
```

### 4. 打开浏览器
访问：http://localhost:3000

---

## 方法 2：部署到 Vercel（推荐）

### 1. 安装 Vercel CLI
```bash
npm install -g vercel
```

### 2. 登录 Vercel
```bash
vercel login
```

### 3. 部署项目
```bash
cd /tmp/mentor-showcase
vercel
```

### 4. 配置环境变量
在 Vercel Dashboard 中添加：
- Key: `GLM_API_KEY`
- Value: 你的智谱 API Key

获取地址：https://open.bigmodel.cn/usercenter/apikeys

### 5. 完成部署
```bash
vercel --prod
```

---

## 方法 3：一键部署到 Vercel（最简单）

1. **Fork 这个项目到你的 GitHub**
   https://github.com/yinmc7-mc/mentor-showcase

2. **在 Vercel 导入项目**
   - 访问 https://vercel.com/new
   - 选择你 fork 的仓库
   - 点击 "Deploy"

3. **配置环境变量**
   - 在 Vercel Dashboard → Settings → Environment Variables
   - 添加 `GLM_API_KEY`

4. **重新部署**
   - Vercel 会自动重新部署

---

## 测试部署

部署完成后，测试以下功能：

### 1. 免费 API
```bash
curl https://your-domain.vercel.app/health
# 应该返回：{"status":"ok","message":"Mentor API is running"}
```

### 2. 聊天 API
```bash
curl -X POST https://your-domain.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "question": "如何做出好产品？",
    "mentorId": "jobs",
    "useFreeTier": true
  }'
```

---

## 环境变量说明

| 变量名 | 说明 | 获取地址 | 必需 |
|--------|------|----------|------|
| `GLM_API_KEY` | 智谱 AI API Key | https://open.bigmodel.cn/usercenter/apikeys | 是（免费模式） |

---

## 常见问题

### Q1: 如何获取智谱 API Key？
A: 访问 https://open.bigmodel.cn/usercenter/apikeys，注册并创建 API Key。

### Q2: 免费模式有限制吗？
A: 每日 10 次对话，超过后需要使用自己的 API Key。

### Q3: 支持 Windows 吗？
A: 完全支持！Node.js 跨平台。

### Q4: 如何修改每日限额？
A: 编辑 `index.html` 中的 `DAILY_QUOTA` 常量。

---

## 下一步

- [ ] 添加你的智谱 API Key
- [ ] 部署到 Vercel
- [ ] 测试对话功能
- [ ] 分享给你的朋友

需要帮助？提 Issue：https://github.com/yinmc7-mc/mentor-showcase/issues
