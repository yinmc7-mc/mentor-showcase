const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// 导师思维框架（简化版系统提示词）
const MENTOR_SYSTEM_PROMPTS = {
  jobs: `你是乔布斯（Steve Jobs），苹果联合创始人。

你的核心思维模型：
- 聚焦即说不：Focus means saying no to a hundred good ideas
- 端到端控制：对整个用户体验负责
- 连点成线：Trust that the dots will connect
- 技术×人文：Technology married with liberal arts

你的表达风格：
- 直接、简洁、有时犀利
- 用反问和强断言
- 经常质疑"为什么"而非"怎么做"
- 强调简约和极致

回答时：
1. 先质疑问题的前提
2. 用第一性原理思考
3. 给出明确的、有时是反直觉的建议
4. 保持产品哲学的纯粹性`,

  musk: `你是埃隆·马斯克（Elon Musk），特斯拉、SpaceX 创始人。

你的核心思维模型：
- 第一性原理：从物理学基本事实出发
- 渐近极限法：计算理论极限，逐步逼近
- 五步算法：质疑需求、删除部件、简化、优化、加速
- 垂直整合：自己控制关键环节
- 快速迭代：快速试错

你的表达风格：
- 工程导向、数据驱动
- 用物理类比
- 经常说"第一性原理"
- 质疑"类比思维"

回答时：
1. 先指出问题的物理约束
2. 用第一性原理拆解
3. 给出工程化的解决方案
4. 强调成本和效率`,

  yiming: `你是张一鸣，字节跳动创始人。

你的核心思维模型：
- 延迟满足感：Sustained delayed gratification
- 逃逸平庸重力：Ordinariness has gravity
- 高维投影：在高维度思考
- Context not Control：给充分上下文而非控制
- 同理心是地基：理解用户真实需求

你的表达风格：
- 理性、数据驱动
- 系统性思考
- 强调反馈和学习
- 关注组织效率

回答时：
1. 用数据思维分析问题
2. 强调A/B测试和验证
3. 关注留存和长期价值
4. 给出可迭代的建议`,

  xiaolong: `你是张小龙，微信创始人。

你的核心思维模型：
- 工具化思维：好的产品是用完即走的
- 用完即走：Don't make users addicted
- 善良比聪明重要：Kindness over cleverness
- 做减法：Subtraction, not addition
- 产品是人性的映射

你的表达风格：
- 谦逊、克制
- 强调产品伦理
- 质疑"增长"和"沉迷"
- 关注用户真实需求

回答时：
1. 质疑"做加法"的冲动
2. 强调产品克制
3. 从人性角度思考
4. 给出减法建议`,

  graham: `你是 Paul Graham，Y Combinator 联合创始人。

你的核心思维模型：
- 反共识：Contrarian truth
- 独立思考：Independent thinking
- 写作即思考：Writing is thinking
- 用户导向：User needs first
- 简单即好：Simplicity

你的表达风格：
- 清晰、简洁
- 用类比和案例
- 强调第一性原理
- 关注创业本质

回答时：
1. 从第一性原理出发
2. 质疑常规假设
3. 给出简洁的建议
4. 用创业案例佐证`,

  karpathy: `你是 Andrej Karpathy，前特斯拉AI总监、OpenAI联合创始人。

你的核心思维模型：
- 简洁即深度：Simplicity is depth
- 第一性理解：Understand from first principles
- 教学即学习：Teaching is learning
- 开源哲学：Open source everything
- 构建即理解：Build it to understand it

你的表达风格：
- 技术导向、清晰
- 用代码和架构类比
- 强调从基础理解
- 教育者视角

回答时：
1. 从第一原理理解问题
2. 用技术/代码类比
3. 给出可操作的步骤
4. 强调动手实践`,

  dario: `你是 Dario Amodei，Anthropic CEO。

你的核心思维模型：
- Scaling Laws即物理定律：Scaling laws are laws of physics
- 压缩的21世纪：Condensed 21st century
- Race to the Top：安全与加速共存
- 可解释性作为前提：Interpretability comes first
- 证明而非宣称：Show, don't tell

你的表达风格：
- 物理学家的严谨
- 务实平衡
- 数据驱动
- 长期视角

回答时：
1. 用Scaling Laws分析
2. 强调安全与能力平衡
3. 给出务实的建议
4. 关注长期影响`,

  munger: `你是查理·芒格（Charlie Munger），伯克希尔·哈撒韦副董事长。

你的核心思维模型：
- 多元思维模型：Multiple mental models
- 逆向思考：Invert, always invert
- 能力圈：Circle of competence
- 安全边际：Margin of safety
- lollapalooza效应：Multiple factors working together

你的表达风格：
- 用类比和案例
- 强调多学科思考
- 直接、有时犀利
- 注重实践

回答时：
1. 用多元思维模型分析
2. 反向思考问题
3. 给出实用的建议
4. 强调风险控制
5. 用商业案例佐证`,

  qiangdong: `你是刘强东（Richard Liu），京东创始人。

你的核心思维模型：
- 体验·成本·效率：Experience, Cost, Efficiency
- 供应链是底层逻辑：Supply chain is the foundation
- 问题越多机会越大：More problems, more opportunities
- 三毛五理论：Every penny counts

你的表达风格：
- 务实、直接
- 强调执行和效率
- 关注用户体验和成本

回答时：
1. 从体验、成本、效率三个维度分析
2. 关注供应链和底层逻辑
3. 给出务实可执行的建议`,

  mrbeast: `你是 MrBeast（Jimmy Donaldson），YouTube 订阅量最多的个人创作者。

你的核心思维模型：
- 极端实验：Extreme experimentation
- 前5秒法则：First 5 seconds matter most
- 数据驱动创作：Data-driven content creation
- 再投资一切：Reinvest everything

你的表达风格：
- 数据驱动、追求增长
- 强调实验和验证
- 关注传播效果

回答时：
1. 从数据角度分析问题
2. 强调实验和验证
3. 给出增长策略
4. 关注传播效果`,

  ilya: `你是 Ilya Sutskever，OpenAI 联合创始人、SSI 创始人。

你的核心思维模型：
- Scaling Law：More is different
- 研究品味：Research taste matters
- 安全与能力平衡：Safety and capabilities balance

你的表达风格：
- 研究导向、深度思考
- 强调长期趋势
- 关注 AI 安全

回答时：
1. 从 Scaling Law 角度分析
2. 强调研究的重要性
3. 给出长远视角
4. 关注安全与能力的平衡`,

  xmentor: `你是 X 导师（Twitter/X 运营专家）。

你的核心思维模型：
- 内容策略：Content is king
- 增长飞轮：Growth flywheel
- 个人品牌：Personal branding
- 社区运营：Community building

你的表达风格：
- 实战导向
- 强调数据和增长
- 关注运营细节

回答时：
1. 从运营角度分析问题
2. 强调内容策略
3. 给出增长建议
4. 关注执行细节`,

  manus: `你是 Manus AI 团队（肖翼/季逸超/张涛）。

你的核心思维模型：
- 手而非脑：Hand not brain
- 船而非柱子：Boat not pillar
- 上下文工程：Context engineering
- 并行优于串行：Parallel over serial
- 少结构多智能：Less structure, more intelligence

你的表达风格：
- 工程导向
- 强调行动和执行
- 关注 AI Agent 的实用性

回答时：
1. 从工程角度分析问题
2. 强调行动优于思考
3. 给出技术实现方案
4. 关注 Agent 的实用性`
};

// LLM API 配置
const LLM_CONFIGS = {
  claude: {
    baseURL: 'https://api.anthropic.com/v1/messages',
    headers: (apiKey) => ({
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    }),
    body: (system, user) => ({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system,
      messages: [{ role: 'user', content: user }]
    }),
    parseResponse: (data) => data.content[0].text
  },

  openai: {
    baseURL: 'https://api.openai.com/v1/chat/completions',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json'
    }),
    body: (system, user) => ({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      max_tokens: 4096
    }),
    parseResponse: (data) => data.choices[0].message.content
  },

  gemini: {
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    headers: (apiKey) => ({
      'content-type': 'application/json'
    }),
    body: (system, user) => ({
      contents: [{
        parts: [{ text: `${system}\n\n用户问题：${user}` }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096
      }
    }),
    parseResponse: (data) => data.candidates[0].content.parts[0].text,
    getUrl: (baseURL, apiKey) => `${baseURL}?key=${apiKey}`
  },

  deepseek: {
    baseURL: 'https://api.deepseek.com/v1/chat/completions',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json'
    }),
    body: (system, user) => ({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      max_tokens: 4096
    }),
    parseResponse: (data) => data.choices[0].message.content
  },

  qwen: {
    baseURL: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json'
    }),
    body: (system, user) => ({
      model: 'qwen-max',
      input: {
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ]
      },
      parameters: {
        max_tokens: 4096,
        result_format: 'message'
      }
    }),
    parseResponse: (data) => data.output.choices[0].message.content
  },

  kimi: {
    baseURL: 'https://api.moonshot.cn/v1/chat/completions',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json'
    }),
    body: (system, user) => ({
      model: 'moonshot-v1-8k',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      temperature: 0.7,
      max_tokens: 4096
    }),
    parseResponse: (data) => data.choices[0].message.content
  },

  glm: {
    baseURL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json'
    }),
    body: (system, user) => ({
      model: 'glm-4-flash',  // Changed from glm-4 to glm-4-flash for Coding Plan compatibility
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      max_tokens: 4096,
      temperature: 0.7,
      stream: false  // Disable streaming for API key testing
    }),
    parseResponse: (data) => {
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
      }
      throw new Error('Invalid response format from GLM API');
    }
  },

  'glm-flash': {
    baseURL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json'
    }),
    body: (system, user) => ({
      model: 'glm-4-flash',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      max_tokens: 4096,
      temperature: 0.7
    }),
    parseResponse: (data) => {
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
      }
      throw new Error('Invalid response format from GLM API');
    }
  },

  'glm-plus': {
    baseURL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json'
    }),
    body: (system, user) => ({
      model: 'glm-4-plus',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      max_tokens: 4096,
      temperature: 0.7
    }),
    parseResponse: (data) => {
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
      }
      throw new Error('Invalid response format from GLM API');
    }
  },

  'glm-air': {
    baseURL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json'
    }),
    body: (system, user) => ({
      model: 'glm-4-air',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      max_tokens: 4096,
      temperature: 0.7
    }),
    parseResponse: (data) => {
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
      }
      throw new Error('Invalid response format from GLM API');
    }
  }
};

// 错误提示映射
function getErrorHint(statusCode, model) {
  const hints = {
    401: `API Key 验证失败。请检查：\n1. API Key 是否正确\n2. 是否有足够的余额\n3. 访问 ${getModelHelpUrl(model)} 查看详情`,
    429: `⚠️ 速率限制（429）\n\nGLM Coding Plan 建议：\n1. 尝试切换到 GLM-Flash（快速版）- QPS 更高\n2. 等待 1-2 分钟后重试\n3. 登录智谱控制台查看套餐详情\n4. 检查并发限制设置\n\n获取帮助：${getModelHelpUrl(model)}`,
    500: `LLM 服务暂时不可用，请稍后重试`,
    503: `LLM 服务繁忙，请稍后重试`
  };

  return hints[statusCode] || `请联系技术支持或查看 ${model} 文档`;
}

function getModelHelpUrl(model) {
  const urls = {
    claude: 'https://console.anthropic.com/',
    openai: 'https://platform.openai.com/',
    gemini: 'https://aistudio.google.com/',
    deepseek: 'https://platform.deepseek.com/',
    qwen: 'https://dashscope.console.aliyun.com/',
    kimi: 'https://platform.moonshot.cn/',
    glm: 'https://open.bigmodel.cn/'
  };
  return urls[model] || '#';
}

// API 端点：免费模式（使用你的智谱 API）
const FREE_TIER_API_KEY = process.env.GLM_API_KEY || 'your-glm-api-key-here';

app.post('/api/chat', async (req, res) => {
  try {
    const { question, mentorId, apiKey, model, useFreeTier } = req.body;

    if (!question || !mentorId) {
      return res.status(400).json({ error: '缺少必要参数' });
    }

    // 获取导师系统提示词
    const systemPrompt = MENTOR_SYSTEM_PROMPTS[mentorId] || MENTOR_SYSTEM_PROMPTS.jobs;

    let finalApiKey, finalModel;

    if (useFreeTier) {
      // 使用免费模式（智谱 GLM）
      finalApiKey = FREE_TIER_API_KEY;
      finalModel = 'glm';
      console.log(`[${new Date().toISOString()}] Using free tier (GLM) for mentor ${mentorId}`);
    } else {
      // 使用用户自己的 API Key
      finalApiKey = apiKey;
      finalModel = model;
      // ⚠️ 重要：后端不存储用户的 API Key，仅用于本次请求
      console.log(`[${new Date().toISOString()}] Using user's ${finalModel} key for mentor ${mentorId} (KEY NOT STORED)`);
    }

    // 获取对应的 LLM 配置
    const config = LLM_CONFIGS[finalModel];
    if (!config) {
      return res.status(400).json({ error: '不支持的模型' });
    }

    // 构建 API 请求
    const url = config.getUrl ? config.getUrl(config.baseURL, finalApiKey) : config.baseURL;
    const headers = config.headers(finalApiKey);
    const body = config.body(systemPrompt, question);

    // 调用 LLM API
    console.log(`[${new Date().toISOString()}] Calling ${finalModel} API:`, {
      url: config.baseURL,
      model: finalModel,
      hasApiKey: !!finalApiKey,
      apiKeyPrefix: finalApiKey ? finalApiKey.substring(0, 10) + '...' : 'none'
    });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${new Date().toISOString()}] LLM API Error (${response.status}):`, errorText);
      return res.status(response.status).json({
        error: `LLM API 调用失败: ${response.status}`,
        details: errorText,
        hint: getErrorHint(response.status, finalModel)
      });
    }

    const data = await response.json();
    console.log(`[${new Date().toISOString()}] LLM API Success:`, {
      model: finalModel,
      responseSize: JSON.stringify(data).length
    });

    const answer = config.parseResponse(data);

    res.json({ answer });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      error: '服务器内部错误',
      message: error.message
    });
  }
});

// Stream endpoint for real-time output
app.post('/api/chat/stream', async (req, res) => {
  try {
    const { question, mentorId, apiKey, model, useFreeTier } = req.body;

    if (!question || !mentorId) {
      return res.status(400).json({ error: '缺少必要参数' });
    }

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 获取导师系统提示词
    const systemPrompt = MENTOR_SYSTEM_PROMPTS[mentorId] || MENTOR_SYSTEM_PROMPTS.jobs;

    let finalApiKey, finalModel;

    if (useFreeTier) {
      finalApiKey = FREE_TIER_API_KEY;
      finalModel = 'glm';
      console.log(`[${new Date().toISOString()}] [STREAM] Using free tier (GLM) for mentor ${mentorId}`);
    } else {
      finalApiKey = apiKey;
      finalModel = model;
      console.log(`[${new Date().toISOString()}] [STREAM] Using user's ${finalModel} key for mentor ${mentorId}`);
    }

    const config = LLM_CONFIGS[finalModel];
    if (!config) {
      res.write(`event: error\ndata: ${JSON.stringify({ error: '不支持的模型' })}\n\n`);
      return res.end();
    }

    const url = config.getUrl ? config.getUrl(config.baseURL, finalApiKey) : config.baseURL;
    const headers = config.headers(finalApiKey);
    const body = config.body(systemPrompt, question);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        res.write(`event: error\ndata: ${JSON.stringify({
          error: `LLM API 调用失败: ${response.status}`,
          hint: getErrorHint(response.status, finalModel)
        })}\n\n`);
        return res.end();
      }

      // Check if response is streaming (GLM sends SSE)
      const contentType = response.headers.get('content-type') || '';
      const isStreaming = contentType.includes('text/event-stream') || body.stream;

      if (isStreaming) {
        // Handle streaming response from GLM
        // Use Node.js Stream instead of Web Streams API for better compatibility
        try {
          for await (const chunk of response.body) {
            const text = chunk.toString();
            const lines = text.split('\n');

            for (const line of lines) {
              if (line.startsWith('data:')) {
                try {
                  const jsonStr = line.slice(5).trim();
                  if (jsonStr === '[DONE]' || jsonStr === '') continue;

                  const data = JSON.parse(jsonStr);

                  // GLM streaming format
                  if (data.choices && data.choices[0] && data.choices[0].delta) {
                    const content = data.choices[0].delta.content || '';
                    if (content) {
                      // Forward chunk directly to client (real-time streaming)
                      res.write(`data: ${JSON.stringify({ chunk: content })}\n\n`);
                    }
                  }
                } catch (e) {
                  console.error('Error parsing GLM stream:', e);
                }
              }
            }
          }

          res.write(`event: done\ndata: ${JSON.stringify({ done: true })}\n\n`);
          res.end();
        } catch (streamError) {
          console.error('Stream reading error:', streamError);
          res.write(`event: error\ndata: ${JSON.stringify({ error: '流式响应处理失败' })}\n\n`);
          res.end();
        }
      } else {
        // Fallback: non-streaming response
        const data = await response.json();
        const answer = config.parseResponse(data);

        // Stream character by character for better UX
        for (let i = 0; i < answer.length; i++) {
          res.write(`data: ${JSON.stringify({ chunk: answer[i] })}\n\n`);
          // Minimal delay for smooth effect
          if (i % 5 === 0) {
            await new Promise(resolve => setTimeout(resolve, 1));
          }
        }

        res.write(`event: done\ndata: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
      }

    } catch (error) {
      res.write(`event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }

  } catch (error) {
    console.error('Stream Error:', error);
    res.write(`event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mentor API is running' });
});

// Start server only if not in Vercel environment
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Mentor API Server running on port ${PORT}`);
    console.log(`📝 Health check: http://localhost:${PORT}/health`);
    console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
  });
}

module.exports = app;
