import React from 'react';
import AIGuide from '@/components/attractions/AIGuide';
import Head from 'next/head';

export default function AttractionDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>故宫博物院 - 景点详情</title>
        <meta name="description" content="故宫博物院详细介绍" />
      </Head>
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">故宫博物院</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：景点图片 */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1584636633449-98936588fcd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                alt="故宫博物院"
                className="w-full h-80 object-cover"
              />
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">景点介绍</h2>
                <p className="text-gray-700">
                  故宫博物院，旧称为紫禁城，位于北京市中心，是明清两代的皇家宫殿，也是世界上现存规模最大、保存最为完整的木质结构古建筑之一。
                  1987年，故宫被联合国教科文组织列为世界文化遗产。
                </p>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">开放时间</h3>
                    <p className="text-gray-600">每日 8:30 - 17:00（周一闭馆）</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">门票价格</h3>
                    <p className="text-gray-600">淡季：¥40 / 旺季：¥60</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">建议游览时间</h3>
                    <p className="text-gray-600">4-6小时</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">地址</h3>
                    <p className="text-gray-600">北京市东城区景山前街4号</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 右侧：AI导游 */}
            <div>
              <AIGuide 
                attractionId="gugong-001" 
                attractionName="故宫博物院" 
                language="zh"
              />
              
              <div className="mt-6 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">交通信息</h2>
                <div>
                  <h3 className="font-medium text-gray-900">公交</h3>
                  <p className="text-gray-600">1路、2路、52路、59路、82路、120路等</p>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900">地铁</h3>
                  <p className="text-gray-600">1号线天安门东站、1号线天安门西站</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white shadow mt-8 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">© 2023 中国旅游网站 - 提供全球游客在中国的旅行指南</p>
        </div>
      </footer>
    </div>
  );
} 