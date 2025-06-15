import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>中国旅游 - 探索东方的奇迹</title>
        <meta name="description" content="为您提供最全面的中国旅游指南，帮助您规划完美的中国之旅" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600">中国旅游</h1>
            <nav className="ml-10 space-x-6">
              <a href="#" className="text-gray-700 hover:text-red-600">首页</a>
              <a href="#" className="text-gray-700 hover:text-red-600">目的地</a>
              <a href="#" className="text-gray-700 hover:text-red-600">地图</a>
              <a href="#" className="text-gray-700 hover:text-red-600">旅游攻略</a>
              <a href="#" className="text-gray-700 hover:text-red-600">关于我们</a>
            </nav>
          </div>
          <div>
            <select className="mr-4 p-2 border rounded">
              <option>中文</option>
              <option>English</option>
            </select>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">登录/注册</button>
          </div>
        </div>
      </header>

      <main>
        {/* 英雄区域 */}
        <section className="bg-gradient-to-r from-red-600 to-purple-600 text-white py-20">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-4">探索东方的奇迹</h2>
            <p className="text-xl mb-8">为您提供最全面的中国旅游指南，帮助您规划完美的中国之旅</p>
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              探索目的地
            </button>
          </div>
        </section>

        {/* 热门目的地 */}
        <section className="mt-16 py-8 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">热门目的地</h2>
            
            {/* 城市卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-red-600 text-white rounded-lg overflow-hidden shadow-lg">
                <div className="p-12 flex items-center justify-center">
                  <h3 className="text-2xl font-bold">北京</h3>
                </div>
                <div className="bg-white text-gray-800 p-4">
                  <p className="mb-4">中国首都，探索中国历史与现代文化交融的城市，参观长城、故宫、颐和园等世界级景点。</p>
                  <button className="text-blue-600 font-medium">了解更多</button>
                </div>
              </div>
              
              <div className="bg-blue-600 text-white rounded-lg overflow-hidden shadow-lg">
                <div className="p-12 flex items-center justify-center">
                  <h3 className="text-2xl font-bold">上海</h3>
                </div>
                <div className="bg-white text-gray-800 p-4">
                  <p className="mb-4">现代化大都市，体验东方巴黎的魅力，欣赏外滩美景，探索充满活力的商业中心和丰富的文化历史。</p>
                  <button className="text-blue-600 font-medium">了解更多</button>
                </div>
              </div>
              
              <div className="bg-red-600 text-white rounded-lg overflow-hidden shadow-lg">
                <div className="p-12 flex items-center justify-center">
                  <h3 className="text-2xl font-bold">西安</h3>
                </div>
                <div className="bg-white text-gray-800 p-4">
                  <p className="mb-4">探访中国古代文明的摇篮，兵马俑、古城墙、大雁塔，感受千年文化底蕴。</p>
                  <button className="text-blue-600 font-medium">了解更多</button>
                </div>
              </div>
            </div>
            
            {/* 添加景点示例链接 */}
            <div className="mt-12 text-center">
              <a 
                href="/attraction-demo" 
                className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                查看景点AI导游示例 - 故宫博物院
              </a>
            </div>
          </div>
        </section>
        
        {/* 智能行程规划 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2 text-center">智能行程规划</h2>
            <p className="text-center text-gray-600 mb-8">让AI为您量身定制完美的中国之旅</p>
            
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">目的地</label>
                <input type="text" placeholder="例如：北京、上海、西安..." className="w-full p-2 border rounded" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">旅行天数</label>
                <select className="w-full p-2 border rounded">
                  <option>3天</option>
                  <option>5天</option>
                  <option>7天</option>
                  <option>10天</option>
                  <option>14天</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">旅行偏好</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>历史文化</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>自然风光</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>美食体验</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>购物</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>博物馆</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>户外活动</span>
                  </label>
                </div>
              </div>
              
              <button className="w-full bg-red-600 text-white py-2 rounded font-medium hover:bg-red-700">
                生成行程
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">关于我们</h3>
              <p className="text-gray-400">中国旅游网站致力于为全球游客提供最专业、最全面的中国旅游资讯，帮助您规划完美的中国之旅。</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">目的地</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">北京</a></li>
                <li><a href="#" className="hover:text-white">上海</a></li>
                <li><a href="#" className="hover:text-white">西安</a></li>
                <li><a href="#" className="hover:text-white">桂林</a></li>
                <li><a href="#" className="hover:text-white">成都</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">快速链接</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">行程规划</a></li>
                <li><a href="#" className="hover:text-white">交通指南</a></li>
                <li><a href="#" className="hover:text-white">住宿推荐</a></li>
                <li><a href="#" className="hover:text-white">签证信息</a></li>
                <li><a href="#" className="hover:text-white">常见问题</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">联系我们</h3>
              <ul className="space-y-2 text-gray-400">
                <li>邮箱：info@chinatravel.com</li>
                <li>电话：+86 10 1234 5678</li>
                <li>微信：ChinaTravelGuide</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 中国旅游网站 版权所有</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 