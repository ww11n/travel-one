import React, { useState, useEffect } from 'react';
import { getAttractionGuide } from '@/lib/api/deepseek';

interface AIGuideProps {
  attractionId: string;
  attractionName: string;
  language?: 'zh' | 'en' | 'ja' | 'ko' | 'fr';
}

// AI导游的不同模式
type GuideMode = 'voice' | 'ar' | 'off';

const AIGuide: React.FC<AIGuideProps> = ({ 
  attractionId, 
  attractionName, 
  language = 'zh' 
}) => {
  const [mode, setMode] = useState<GuideMode>('off');
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // 清理函数，当组件卸载时停止所有活动
    return () => {
      if (mode !== 'off') {
        stopGuide();
      }
    };
  }, []);

  // 开始语音导游
  const startVoiceGuide = async () => {
    setIsLoading(true);
    setError(null);
    setTranscript('');
    setMode('voice');
    
    try {
      if (!attractionId || !attractionName) {
        throw new Error('景点信息不完整，无法启动语音导览');
      }
      
      // 首先显示加载消息，提升用户体验
      setTranscript('正在生成景点介绍，请稍候...');
      
      // 使用Promise.race和超时Promise来实现更可靠的超时处理
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('生成景点介绍超时，请稍后再试')), 30000);
      });
      
      // 调用DeepSeek API获取景点介绍
      const apiPromise = getAttractionGuide(attractionId, attractionName, language);
      
      // 竞争，哪个先完成就用哪个结果
      const guideResponse = await Promise.race([apiPromise, timeoutPromise]) as any;
      
      if (!guideResponse || !guideResponse.choices || !guideResponse.choices[0]?.message?.content) {
        throw new Error('无法获取景点介绍内容，请稍后再试');
      }
      
      const guideText = guideResponse.choices[0].message.content;
      setTranscript(guideText);
      
      // 语音合成
      if ('speechSynthesis' in window) {
        // 确保停止任何可能正在进行的语音
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(guideText);
        
        // 确保语音列表已加载
        let voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
          // 如果voices列表为空，等待voices加载完成
          await new Promise<void>((resolve) => {
            const voicesChangedHandler = () => {
              window.speechSynthesis.removeEventListener('voiceschanged', voicesChangedHandler);
              resolve();
            };
            window.speechSynthesis.addEventListener('voiceschanged', voicesChangedHandler);
            // 设置超时，防止无限等待
            setTimeout(() => {
              window.speechSynthesis.removeEventListener('voiceschanged', voicesChangedHandler);
              resolve();
            }, 1000);
          });
          voices = window.speechSynthesis.getVoices();
        }
        
        // 根据所选语言设置语音
        if (language === 'en') {
          // 查找英语语音
          const englishVoice = voices.find(voice => voice.lang.includes('en'));
          if (englishVoice) {
            utterance.voice = englishVoice;
            utterance.lang = 'en-US';
          }
        } else {
          // 查找中文语音
          const chineseVoice = voices.find(voice => voice.lang.includes('zh'));
          if (chineseVoice) {
            utterance.voice = chineseVoice;
            utterance.lang = 'zh-CN';
          }
        }
        
        // 设置语音参数
        utterance.rate = 1.0; // 语速
        utterance.pitch = 1.0; // 音调
        utterance.volume = 1.0; // 音量
        
        // 添加事件监听以处理语音完成和错误
        utterance.onend = () => {
          console.log('语音导览已完成');
        };
        
        utterance.onerror = (event) => {
          console.error('语音合成错误:', event);
          setError('语音播放出现问题，但您仍然可以阅读文字介绍');
        };
        
        // 启动语音
        window.speechSynthesis.speak(utterance);
      } else {
        console.error('浏览器不支持语音合成');
        setError('您的浏览器不支持语音合成功能，但您仍然可以阅读文字介绍');
      }
    } catch (err: any) {
      console.error('启动语音导览失败:', err);
      
      // 如果是apiPromise后来完成了，异步更新内容
      if (err.message && err.message.includes('超时')) {
        setError('生成景点介绍需要较长时间，请稍候...');
        
        // 后台继续尝试获取内容
        getAttractionGuide(attractionId, attractionName, language)
          .then(response => {
            if (response && response.choices && response.choices[0]?.message?.content) {
              setTranscript(response.choices[0].message.content);
              setError(null);
            }
          })
          .catch(asyncError => {
            console.error('异步获取景点介绍失败:', asyncError);
            setError(`无法获取景点介绍: ${asyncError.message || '未知错误'}`);
          });
      } else {
        // 提供更友好的错误信息
        let errorMessage = '启动语音导览失败';
        
        if (err.message?.includes('API密钥无效')) {
          errorMessage = 'DeepSeek API密钥无效或已过期，请联系管理员更新API密钥';
        } else if (err.message?.includes('API请求次数超限')) {
          errorMessage = 'DeepSeek API请求已达到限制，请稍后再试';
        } else if (err.message?.includes('超时') || err.message?.includes('网络连接失败')) {
          errorMessage = '网络连接问题，请检查您的网络设置后重试';
        } else if (err.message) {
          errorMessage = `${errorMessage}: ${err.message}`;
        }
        
        setError(errorMessage);
        setMode('off');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // 开始AR导航
  const startARGuide = () => {
    try {
      setIsLoading(true);
      setError(null);
      setMode('ar');
      
      // AR功能实现提示
      setTranscript('AR导航功能即将推出，敬请期待！');
      setIsLoading(false);
      
      // TODO: 实现AR导航功能
    } catch (err: any) {
      console.error('启动AR导航失败:', err);
      setError('无法启动AR导航，请稍后再试。');
      setMode('off');
      setIsLoading(false);
    }
  };
  
  // 停止导游
  const stopGuide = () => {
    if (mode === 'voice') {
      window.speechSynthesis.cancel();
    }
    setMode('off');
    setTranscript('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">AI智能导游</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            mode === 'voice' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={mode === 'voice' ? stopGuide : startVoiceGuide}
          disabled={isLoading || mode === 'ar'}
        >
          {mode === 'voice' ? '停止语音讲解' : '开始语音讲解'}
        </button>
        
        <button
          className={`px-4 py-2 rounded-md ${
            mode === 'ar' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={mode === 'ar' ? stopGuide : startARGuide}
          disabled={isLoading || mode === 'voice'}
        >
          {mode === 'ar' ? '退出AR导航' : '开始AR导航'}
        </button>
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {transcript && !isLoading && (
        <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>提示：AI导游使用DeepSeek-R1提供的智能服务，需要网络连接。</p>
      </div>
    </div>
  );
};

export default AIGuide; 