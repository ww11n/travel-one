import React, { useState } from 'react';
import Image from 'next/image';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(items[0] || null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleSelectItem = (item: MediaItem) => {
    setSelectedItem(item);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (items.length === 0) {
    return <div className="p-4 text-center text-gray-500">暂无多媒体内容</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'h-96'}`}>
        {selectedItem && (
          <>
            {selectedItem.type === 'image' ? (
              <Image
                src={selectedItem.url}
                alt={selectedItem.title || '景点图片'}
                fill
                className="object-contain"
              />
            ) : (
              <video
                src={selectedItem.url}
                controls
                className="w-full h-full object-contain"
                autoPlay={isFullscreen}
              />
            )}
            <button
              onClick={toggleFullscreen}
              className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              {isFullscreen ? '退出全屏' : '全屏查看'}
            </button>
          </>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">媒体库</h2>
        
        <div className="grid grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`relative h-24 cursor-pointer rounded-md overflow-hidden border-2 ${
                selectedItem?.id === item.id ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => handleSelectItem(item)}
            >
              <Image
                src={item.thumbnail || item.url}
                alt={item.title || ''}
                fill
                className="object-cover"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="white" 
                      className="w-6 h-6"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaGallery; 