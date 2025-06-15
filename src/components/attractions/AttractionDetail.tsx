import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface AttractionDetailProps {
  id: string;
  name: string;
  description: string;
  openingHours: string;
  ticketPrice: string;
  contact: string;
  address: string;
  imageUrl: string;
}

const AttractionDetail: React.FC<AttractionDetailProps> = ({
  id,
  name,
  description,
  openingHours,
  ticketPrice,
  contact,
  address,
  imageUrl,
}) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl || '/images/placeholder-attraction.jpg'}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{name}</h1>
        
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">开放时间</h3>
            <p className="text-gray-700">{openingHours}</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">门票价格</h3>
            <p className="text-gray-700">{ticketPrice}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">联系方式</h3>
            <p className="text-gray-700">{contact}</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">地址</h3>
            <p className="text-gray-700">{address}</p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => {/* TODO: 打开全景图 */}}
          >
            查看全景
          </button>
          
          <button 
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            onClick={() => {/* TODO: 启动AI导游 */}}
          >
            AI导游
          </button>
          
          <button 
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition"
            onClick={() => router.back()}
          >
            返回
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetail; 