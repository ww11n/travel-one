import type { NextApiRequest, NextApiResponse } from 'next';

// DeepSeek API信息
const DEEPSEEK_API_KEY = 'sk-d565ab9220f54dbf86c3c210bfca5c43';
const DEEPSEEK_API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat'; // V3模型

type ResponseData = {
  success: boolean;
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: '只支持GET请求' });
  }

  try {
    console.log('开始测试API连接...');

    const testMessages = [
      {
        role: 'system',
        content: '你是一个测试助手，请回答一个简单的问题。',
      },
      {
        role: 'user',
        content: '你好，这是一个API测试。',
      },
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60秒超时

    console.log('发送请求到DeepSeek...');
    const response = await fetch(DEEPSEEK_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: testMessages,
        temperature: 0.7,
        max_tokens: 100,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('API响应状态:', response.status, response.statusText);

    if (!response.ok) {
      let errorText = `API请求失败: ${response.status} ${response.statusText}`;
      let errorData = {};
      
      try {
        errorData = await response.json();
        console.error('API错误详情:', errorData);
        if (errorData.error?.message) {
          errorText += ` - ${errorData.error.message}`;
        }
      } catch (e) {
        console.error('无法解析错误响应:', e);
      }
      
      return res.status(500).json({
        success: false,
        error: errorText,
        data: errorData,
      });
    }

    const data = await response.json();
    console.log('API响应数据:', data);
    
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error: any) {
    console.error('API测试失败:', error);
    return res.status(500).json({
      success: false,
      error: error.message || '未知错误',
    });
  }
} 