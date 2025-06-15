import React from 'react';
import AttractionDetail from '@/components/attractions/AttractionDetail';
import MediaGallery from '@/components/attractions/MediaGallery';
import AIGuide from '@/components/attractions/AIGuide';
import RecommendationSystem from '@/components/attractions/RecommendationSystem';

// 模拟数据 - 在实际应用中应从API获取
const getMockAttractionData = (id: string) => {
  return {
    id,
    name: '故宫博物院',
    description: '故宫博物院，位于北京市中心，是明清两代的皇家宫殿，中国古代宫廷建筑之精华。是世界上现存规模最大、保存最为完整的木质结构古建筑之一，也是中国第一个被列入《世界文化遗产名录》的文化遗产。',
    openingHours: '4月1日-10月31日 8:30-17:00，11月1日-次年3月31日 8:30-16:30，周一闭馆（国家法定节假日除外）',
    ticketPrice: '成人票：60元（旺季4月1日-10月31日），40元（淡季11月1日-次年3月31日）',
    contact: '电话：+86-10-85007428',
    address: '北京市东城区景山前街4号',
    imageUrl: '/images/attractions/forbidden-city.jpg',
  };
};

const getMockMediaItems = () => {
  return [
    {
      id: '1',
      type: 'image' as const,
      url: '/images/attractions/forbidden-city-1.jpg',
      title: '故宫鸟瞰图',
    },
    {
      id: '2',
      type: 'image' as const,
      url: '/images/attractions/forbidden-city-2.jpg',
      title: '太和殿',
    },
    {
      id: '3',
      type: 'image' as const,
      url: '/images/attractions/forbidden-city-3.jpg',
      title: '乾清宫',
    },
    {
      id: '4',
      type: 'video' as const,
      url: '/videos/forbidden-city-intro.mp4',
      thumbnail: '/images/attractions/video-thumbnail.jpg',
      title: '故宫介绍视频',
    }
  ];
};

const getMockRecommendations = () => {
  return [
    {
      id: '101',
      name: '颐和园',
      description: '中国现存规模最大、保存最完整的皇家园林，被誉为"皇家园林博物馆"。',
      imageUrl: '/images/attractions/summer-palace.jpg',
      category: '历史遗迹',
      rating: 4.8,
      popularity: 9500,
    },
    {
      id: '102',
      name: '长城',
      description: '世界上最伟大的建筑之一，是古代中国抵御游牧民族入侵的军事防御工程。',
      imageUrl: '/images/attractions/great-wall.jpg',
      category: '历史遗迹',
      rating: 4.9,
      popularity: 10000,
    },
    {
      id: '103',
      name: '天坛',
      description: '明清两代帝王祭天的场所，是中国现存规模最大、保存最完整的古代祭祀建筑群。',
      imageUrl: '/images/attractions/temple-of-heaven.jpg',
      category: '历史遗迹',
      rating: 4.7,
      popularity: 8500,
    },
    {
      id: '104',
      name: '北海公园',
      description: '始建于辽代的皇家园林，有着近千年的历史，是中国现存最古老的皇家园林之一。',
      imageUrl: '/images/attractions/beihai-park.jpg',
      category: '公园',
      rating: 4.6,
      popularity: 7800,
    },
    {
      id: '105',
      name: '恭王府',
      description: '清代规模最大的王府之一，也是保存最完整的王府，被誉为"一座微型的紫禁城"。',
      imageUrl: '/images/attractions/prince-gong-mansion.jpg',
      category: '历史遗迹',
      rating: 4.5,
      popularity: 7000,
    },
    {
      id: '106',
      name: '798艺术区',
      description: '由废弃的军工厂改造而成的当代艺术区，是中国最有名的艺术区之一。',
      imageUrl: '/images/attractions/798-art-zone.jpg',
      category: '艺术区',
      rating: 4.4,
      popularity: 8200,
    },
  ];
};

interface AttractionPageProps {
  params: {
    id: string;
  };
}

export default function AttractionPage({ params }: AttractionPageProps) {
  const { id } = params;
  const attraction = getMockAttractionData(id);
  const mediaItems = getMockMediaItems();
  const recommendedAttractions = getMockRecommendations();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <AttractionDetail {...attraction} />
          </div>
          <div className="lg:col-span-1">
            <AIGuide 
              attractionId={id} 
              attractionName={attraction.name} 
            />
          </div>
        </div>
        
        <div className="mb-8">
          <MediaGallery items={mediaItems} />
        </div>
        
        <div className="mb-8">
          <RecommendationSystem attractions={recommendedAttractions} />
        </div>
      </div>
    </main>
  );
} 