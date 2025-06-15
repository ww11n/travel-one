'use client';

import React, { useState } from 'react';
import ChinaMap from '@/components/map/ChinaMap';

const MapPage: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<{name: string, adcode: string} | null>(null);
  const [selectedCity, setSelectedCity] = useState<{name: string, adcode: string} | null>(null);
  
  const handleProvinceClick = (provinceName: string, adcode: string) => {
    setSelectedProvince({ name: provinceName, adcode });
    // 清除已选择的城市
    setSelectedCity(null);
  };
  
  const handleCityClick = (cityName: string, adcode: string) => {
    setSelectedCity({ name: cityName, adcode });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">中国地图</h1>
      
      <div className="mb-4">
        <p className="text-xl">
          {selectedCity 
            ? `已选择: ${selectedProvince?.name} > ${selectedCity.name}`
            : selectedProvince
              ? `已选择: ${selectedProvince.name}`
              : '点击地图上的省份进行选择'}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <ChinaMap 
          className="w-full" 
          onProvinceClick={handleProvinceClick}
          onCityClick={handleCityClick}
        />
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">地图使用指南</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>点击任意省份可以查看省级信息</li>
            <li>点击省份后会显示主要城市标记</li>
            <li>点击城市标记可以查看城市信息</li>
            <li>使用鼠标滚轮进行缩放</li>
            <li>按住鼠标左键拖拽地图</li>
            <li>右下角工具栏提供额外功能</li>
          </ul>
        </div>
        
        {selectedCity ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">{selectedCity.name}旅游信息</h2>
            <p className="text-gray-700 mb-4">
              这里将显示关于{selectedCity.name}的旅游信息，包括热门景点、文化特色、美食推荐等。
            </p>
            <div className="mt-4">
              <h3 className="text-xl font-medium mb-2">热门景点</h3>
              <p className="text-gray-600">
                正在加载{selectedCity.name}的热门景点数据...
              </p>
            </div>
          </div>
        ) : selectedProvince && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">{selectedProvince.name}旅游信息</h2>
            <p className="text-gray-700">
              {selectedProvince.name}是中国的一个{selectedProvince.name.includes('市') ? '直辖市' : '省份'}。点击地图上的城市标记查看详细信息。
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage; 