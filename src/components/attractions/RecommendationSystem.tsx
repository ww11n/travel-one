"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Attraction {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
  popularity: number;
}

interface RecommendationSystemProps {
  attractions: Attraction[];
  userPreferences?: {
    categories?: string[];
    interests?: string[];
  };
}

const RecommendationSystem: React.FC<RecommendationSystemProps> = ({
  attractions,
  userPreferences,
}) => {
  const router = useRouter();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  // 常见旅游情景
  const scenarios = [
    { id: 'family', name: '家庭旅游', icon: '👨‍👩‍👧‍👦' },
    { id: 'culture', name: '文化体验', icon: '🏛️' },
    { id: 'nature', name: '自然风光', icon: '🏞️' },
    { id: 'food', name: '美食之旅', icon: '🍜' },
    { id: 'shopping', name: '购物天堂', icon: '🛍️' },
    { id: 'photography', name: '摄影胜地', icon: '📸' },
  ];
  
  // 根据情景筛选景点
  const getRecommendedAttractions = () => {
    if (!selectedScenario) {
      return attractions.sort((a, b) => b.popularity - a.popularity).slice(0, 4);
    }
    
    let filtered = [...attractions];
    
    switch (selectedScenario) {
      case 'family':
        filtered = filtered.filter(a => 
          a.category === '主题公园' || a.category === '博物馆' || a.category === '动物园'
        );
        break;
      case 'culture':
        filtered = filtered.filter(a => 
          a.category === '博物馆' || a.category === '历史遗迹' || a.category === '寺庙'
        );
        break;
      case 'nature':
        filtered = filtered.filter(a => 
          a.category === '国家公园' || a.category === '自然保护区' || a.category === '山脉'
        );
        break;
      case 'food':
        filtered = filtered.filter(a => 
          a.category === '美食街' || a.category === '夜市' || a.category === '特色餐厅'
        );
        break;
      case 'shopping':
        filtered = filtered.filter(a => 
          a.category === '购物中心' || a.category === '特色市场' || a.category === '古玩市场'
        );
        break;
      case 'photography':
        filtered = filtered.filter(a => 
          a.category === '风景区' || a.category === '城市地标' || a.category === '日出日落点'
        );
        break;
      default:
        break;
    }
    
    return filtered.sort((a, b) => b.rating - a.rating).slice(0, 4);
  };
  
  // 获取热门景点
  const getPopularAttractions = () => {
    return [...attractions]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3);
  };

  // 导航到景点详情页
  const navigateToAttraction = (attractionId: string) => {
    router.push(`/attractions/${attractionId}`);
  };
  
  const recommendedAttractions = getRecommendedAttractions();
  const popularAttractions = getPopularAttractions();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">智能推荐</h2>
        
        {/* 情景选择 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">根据出行情景推荐</h3>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                className={`p-3 rounded-lg flex flex-col items-center justify-center transition ${
                  selectedScenario === scenario.id
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <span className="text-2xl mb-1">{scenario.icon}</span>
                <span className="text-sm">{scenario.name}</span>
              </button>
            ))}
          </div>
          
          {selectedScenario && (
            <button
              className="text-blue-600 text-sm flex items-center"
              onClick={() => setSelectedScenario(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              清除选择
            </button>
          )}
        </div>
        
        {/* 推荐景点展示 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {selectedScenario 
              ? `为您的${scenarios.find(s => s.id === selectedScenario)?.name}推荐` 
              : '为您推荐'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedAttractions.map((attraction) => (
              <div
                key={attraction.id}
                className="bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition"
                onClick={() => navigateToAttraction(attraction.id)}
              >
                <div className="relative h-40">
                  <Image
                    src={attraction.imageUrl}
                    alt={attraction.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-1">{attraction.name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {attraction.description}
                  </p>
                  <div className="mt-2 flex items-center text-sm text-yellow-500">
                    <span className="mr-1">★</span>
                    <span>{attraction.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 热门榜单 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">热门景点榜</h3>
          
          <div className="space-y-4">
            {popularAttractions.map((attraction, index) => (
              <div
                key={attraction.id}
                className="flex items-center bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-100 transition"
                onClick={() => navigateToAttraction(attraction.id)}
              >
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-red-600 text-white font-bold text-xl">
                  #{index + 1}
                </div>
                <div className="relative h-16 w-24 flex-shrink-0">
                  <Image
                    src={attraction.imageUrl}
                    alt={attraction.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h4 className="font-semibold">{attraction.name}</h4>
                  <div className="mt-1 flex items-center text-sm">
                    <span className="text-yellow-500 mr-2">
                      <span className="mr-1">★</span>
                      <span>{attraction.rating.toFixed(1)}</span>
                    </span>
                    <span className="text-gray-500">人气: {attraction.popularity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationSystem; 