import React, { useState } from 'react';

export default function ApiTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // 通过服务器端API路由调用
      const response = await fetch('/api/test-deepseek');
      const data = await response.json();
      
      console.log('API测试结果:', data);
      
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || '请求失败');
      }
    } catch (err: any) {
      console.error('API调用失败:', err);
      setError(err.message || '未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">DeepSeek API 测试</h1>
      
      <div className="mb-4">
        <p className="mb-2">
          此页面通过服务器端API路由测试与DeepSeek API的连接。
          点击下方按钮开始测试。
        </p>
        
        <button 
          onClick={testApi}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? '请求中...' : '开始测试'}
        </button>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <h2 className="font-bold">错误:</h2>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className="mt-4">
          <h2 className="font-bold">API响应:</h2>
          <div className="mt-2 p-4 bg-gray-100 rounded overflow-auto max-h-96">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
          
          {result.choices && result.choices[0]?.message?.content && (
            <div className="mt-4">
              <h2 className="font-bold">生成内容:</h2>
              <div className="mt-2 p-4 bg-green-50 rounded border border-green-200">
                {result.choices[0].message.content}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 