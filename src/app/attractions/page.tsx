import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RecommendationSystem from '@/components/attractions/RecommendationSystem';

// 模拟数据 - 在实际应用中应从API获取
const getMockAttractions = () => {
  return [
    {
      id: '1',
      name: '故宫博物院',
      description: '故宫博物院，位于北京市中心，是明清两代的皇家宫殿，中国古代宫廷建筑之精华。',
      imageUrl: '/images/attractions/forbidden-city.jpg',
      category: '历史遗迹',
      rating: 4.9,
      popularity: 9800,
      city: '北京',
    },
    {
      id: '101',
      name: '颐和园',
      description: '中国现存规模最大、保存最完整的皇家园林，被誉为"皇家园林博物馆"。',
      imageUrl: '/images/attractions/summer-palace.jpg',
      category: '历史遗迹',
      rating: 4.8,
      popularity: 9500,
      city: '北京',
    },
    {
      id: '102',
      name: '长城',
      description: '世界上最伟大的建筑之一，是古代中国抵御游牧民族入侵的军事防御工程。',
      imageUrl: '/images/attractions/great-wall.jpg',
      category: '历史遗迹',
      rating: 4.9,
      popularity: 10000,
      city: '北京',
    },
    {
      id: '103',
      name: '天坛',
      description: '明清两代帝王祭天的场所，是中国现存规模最大、保存最完整的古代祭祀建筑群。',
      imageUrl: '/images/attractions/temple-of-heaven.jpg',
      category: '历史遗迹',
      rating: 4.7,
      popularity: 8500,
      city: '北京',
    },
    {
      id: '201',
      name: '西湖',
      description: '中国十大风景名胜之一，以秀丽的湖光山色和众多的人文景观闻名于世。',
      imageUrl: '/images/attractions/west-lake.jpg',
      category: '风景区',
      rating: 4.9,
      popularity: 9700,
      city: '杭州',
    },
    {
      id: '202',
      name: '灵隐寺',
      description: '中国佛教著名寺院，始建于东晋咸和年间，距今已有1700多年历史。',
      imageUrl: '/images/attractions/lingyin-temple.jpg',
      category: '寺庙',
      rating: 4.6,
      popularity: 8200,
      city: '杭州',
    },
    {
      id: '301',
      name: '外滩',
      description: '上海的地标之一，是上海开埠后兴建的万国建筑博览群。',
      imageUrl: '/images/attractions/the-bund.jpg',
      category: '城市地标',
      rating: 4.8,
      popularity: 9600,
      city: '上海',
    },
    {
      id: '302',
      name: '上海迪士尼乐园',
      description: '中国内地首座迪士尼主题乐园，拥有七大主题园区。',
      imageUrl: '/images/attractions/shanghai-disney.jpg',
      category: '主题公园',
      rating: 4.7,
      popularity: 9800,
      city: '上海',
    },
  ];
};

// 城市列表
const cities = ['全部', '北京', '上海', '杭州', '西安', '成都', '广州', '深圳', '三亚'];

// 景点分类
const categories = ['全部', '历史遗迹', '风景区', '主题公园', '寺庙', '城市地标', '公园', '艺术区'];

export default function AttractionsPage() {
  const attractions = getMockAttractions();
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">中国景点</h1>
        
        {/* 筛选区域 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">筛选条件</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">城市</h3>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <button
                  key={city}
                  className={`px-4 py-2 rounded-full ${
                    city === '全部' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">景点类型</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full ${
                    category === '全部' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 智能推荐 */}
        <div className="mb-12">
          <RecommendationSystem attractions={attractions} />
        </div>
        
        {/* 景点列表 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">所有景点</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {attractions.map((attraction) => (
              <Link 
                key={attraction.id}
                href={`/attractions/${attraction.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="relative h-48">
                  <Image
                    src={attraction.imageUrl}
                    alt={attraction.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium">
                    {attraction.city}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{attraction.name}</h3>
                  
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {attraction.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {attraction.category}
                    </span>
                    
                    <div className="flex items-center text-yellow-500">
                      <span className="text-sm mr-1">★</span>
                      <span className="text-sm font-medium">{attraction.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 