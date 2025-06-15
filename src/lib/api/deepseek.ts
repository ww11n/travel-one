/**
 * Deepseek API 工具函数
 * 提供与Deepseek API交互的方法
 */

const DEEPSEEK_API_KEY = 'sk-d565ab9220f54dbf86c3c210bfca5c43';
const DEEPSEEK_API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions';

/**
 * 发送请求到Deepseek API
 * @param messages 消息数组
 * @param options 额外选项
 * @returns API响应
 */
export async function callDeepseekAPI(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
) {
  // 默认使用最新的deepseek-chat (V3)模型
  const { model = 'deepseek-chat', temperature = 0.7, max_tokens = 1500 } = options;

  // 添加调试信息
  console.log('API请求开始:', {
    endpoint: DEEPSEEK_API_ENDPOINT,
    model,
    messagesCount: messages.length
  });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 增加到60秒超时

    console.log('发送请求体:', {
      model,
      messages: messages.map(m => ({ role: m.role, contentLength: m.content.length })),
      temperature,
      max_tokens
    });

    const response = await fetch(DEEPSEEK_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('API响应状态:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API错误详情:', errorData);
      
      // 根据状态码和错误信息提供更具体的错误信息
      if (response.status === 401) {
        throw new Error('API密钥无效或已过期，请更新API密钥');
      } else if (response.status === 429) {
        throw new Error('API请求次数超限，请稍后再试');
      } else if (response.status === 500) {
        throw new Error('DeepSeek服务器错误，请稍后再试');
      } else if (response.status === 503) {
        throw new Error('DeepSeek服务暂时不可用，请稍后再试');
      } else {
        throw new Error(
          `API请求失败: ${response.status} ${response.statusText}${
            errorData.error ? ` - ${errorData.error.message}` : ''
          }`
        );
      }
    }

    const responseData = await response.json();
    console.log('API响应数据:', responseData);
    return responseData;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('Deepseek API调用超时');
      throw new Error('API请求超时，请检查网络连接或稍后再试');
    } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      console.error('网络连接问题:', error);
      throw new Error('网络连接失败，请检查您的网络设置或代理配置');
    } else {
      console.error('Deepseek API调用失败:', error);
      throw error;
    }
  }
}

/**
 * 获取景点介绍
 * @param attractionId 景点ID
 * @param attractionName 景点名称
 * @param language 语言代码
 * @returns 景点介绍响应
 */
export async function getAttractionGuide(
  attractionId: string,
  attractionName: string,
  language: 'zh' | 'en' | 'ja' | 'ko' | 'fr' = 'zh'
) {
  const languageMap = {
    zh: '中文',
    en: '英文',
    ja: '日文',
    ko: '韩文',
    fr: '法文',
  };

  try {
    // 使用V3模型
    const response = await callDeepseekAPI([
      {
        role: 'system',
        content: `你是一个专业的${attractionName}景点导游。请用${languageMap[language]}提供一段简短生动的介绍，包括历史背景、文化意义和值得关注的特色。景点ID: ${attractionId}`,
      },
      {
        role: 'user',
        content: `请为我介绍${attractionName}景点的主要特色和历史。`,
      },
    ], {
      // 使用默认模型 (deepseek-chat)
      temperature: 0.7,
      max_tokens: 1500
    });

    return response;
  } catch (error: any) {
    console.error(`获取${attractionName}介绍失败:`, error);
    throw error; // 向上抛出错误，让调用者处理
  }
}

/**
 * 生成旅游建议
 * @param city 城市名称
 * @param preferences 旅行偏好
 * @param days 旅行天数
 * @returns 旅游建议
 */
export async function getTravelSuggestions(
  city: string,
  preferences: string[],
  days: number = 3
) {
  try {
    const response = await callDeepseekAPI([
      {
        role: 'system',
        content: `你是一位专业的中国旅游顾问，精通${city}的旅游资源。请根据用户的旅行偏好，为其提供一份${days}天的行程建议。`,
      },
      {
        role: 'user',
        content: `我计划去${city}旅游${days}天，我喜欢${preferences.join('、')}。请给我一份合理的行程安排，包括每天的景点、用餐和交通建议。`,
      },
    ]);

    return response;
  } catch (error: any) {
    console.error(`生成${city}旅游建议失败:`, error);
    throw error;
  }
}

/**
 * 获取文化小贴士
 * @param topic 文化主题
 * @returns 文化小贴士
 */
export async function getCultureTips(topic: string) {
  try {
    const response = await callDeepseekAPI([
      {
        role: 'system',
        content: '你是一位中国文化专家，能够为外国游客提供关于中国文化的深入见解和实用提示。',
      },
      {
        role: 'user',
        content: `请为外国游客提供关于中国"${topic}"的文化小贴士，包括其文化意义、相关礼仪和需要注意的事项。`,
      },
    ]);

    return response;
  } catch (error: any) {
    console.error(`获取文化小贴士失败:`, error);
    throw error;
  }
} 