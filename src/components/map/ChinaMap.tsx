import React, { useEffect, useRef, useState } from 'react';
import { AMAP_CONFIG } from '@/lib/map/config';

interface ChinaMapProps {
  className?: string;
  onProvinceClick?: (provinceName: string, adcode: string) => void;
  onCityClick?: (cityName: string, adcode: string) => void;
}

declare global {
  interface Window {
    AMap: any;
    _AMapSecurityConfig: {
      securityJsCode: string;
    };
  }
}

const ChinaMap: React.FC<ChinaMapProps> = ({ 
  className, 
  onProvinceClick,
  onCityClick
}) => {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  
  // 加载高德地图脚本
  useEffect(() => {
    // 避免重复加载
    if (window.AMap) {
      initMap();
      return;
    }
    
    // 加载高德地图API
    const script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_CONFIG.API_KEY}`;
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);
    
    return () => {
      // 清理工作
      if (mapInstance) {
        mapInstance.destroy();
      }
    };
  }, []);
  
  // 初始化地图
  const initMap = () => {
    if (!containerRef.current || !window.AMap) return;
    
    const map = new window.AMap.Map(containerRef.current, {
      zoom: AMAP_CONFIG.DEFAULT_ZOOM,
      center: AMAP_CONFIG.CENTER,
      zooms: [AMAP_CONFIG.MIN_ZOOM, AMAP_CONFIG.MAX_ZOOM],
      mapStyle: AMAP_CONFIG.MAP_STYLE,
      viewMode: '3D'
    });
    
    map.on('complete', () => {
      setLoading(false);
      setMapInstance(map);
      addMapControls(map);
      loadProvinces(map);
    });
    
    mapRef.current = map;
  };
  
  // 添加地图控件
  const addMapControls = (map: any) => {
    // 添加缩放控件
    map.plugin(['AMap.Scale', 'AMap.ToolBar'], () => {
      // 比例尺控件
      const scale = new window.AMap.Scale({
        position: 'LB'
      });
      map.addControl(scale);
      
      // 工具条控件（包含缩放、平移等功能）
      const toolBar = new window.AMap.ToolBar({
        position: 'RB'
      });
      map.addControl(toolBar);
    });
  };
  
  // 加载省级行政区划
  const loadProvinces = (map: any) => {
    map.plugin(['AMap.DistrictSearch'], () => {
      const districtSearch = new window.AMap.DistrictSearch({
        level: 'province',
        showbiz: false
      });
      
      // 获取中国的省级行政区划
      districtSearch.search('中国', (status: string, result: any) => {
        if (status === 'complete') {
          const provinces = result.districtList[0].districtList;
          
          // 绘制省级边界
          provinces.forEach((province: any) => {
            const provincePolygons = new window.AMap.DistrictLayer.Province({
              zIndex: 10,
              adcode: [province.adcode],
              depth: 1,
              styles: AMAP_CONFIG.PROVINCE_STYLE
            });
            
            provincePolygons.setMap(map);
            
            // 添加省级点击事件
            provincePolygons.on('click', (e: any) => {
              setSelectedProvince(province.adcode);
              
              // 通过回调函数传递点击事件信息
              if (onProvinceClick) {
                onProvinceClick(province.name, province.adcode);
              }
              
              // 点击聚焦
              map.setZoomAndCenter(8, e.lnglat);
              
              // 显示城市热区
              loadCities(map, province.adcode);
            });
          });
        }
      });
    });
  };
  
  // 加载城市数据
  const loadCities = (map: any, provinceAdcode: string) => {
    if (!map || !provinceAdcode) return;
    
    // 清除之前的标记
    map.clearMap();
    
    // 加载城市数据
    map.plugin(['AMap.DistrictSearch'], () => {
      const districtSearch = new window.AMap.DistrictSearch({
        level: 'city',
        showbiz: false,
        extensions: 'all'
      });
      
      districtSearch.search(provinceAdcode, (status: string, result: any) => {
        if (status === 'complete' && result.districtList.length > 0) {
          const cityList = result.districtList[0].districtList;
          
          // 创建城市标记
          cityList.forEach((city: any) => {
            const marker = new window.AMap.Marker({
              position: new window.AMap.LngLat(city.center.lng, city.center.lat),
              title: city.name,
              anchor: 'center',
              offset: new window.AMap.Pixel(0, 0),
              icon: new window.AMap.Icon({
                image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                size: new window.AMap.Size(32, 32),
                imageSize: new window.AMap.Size(32, 32)
              }),
              zIndex: 100,
              extData: {
                cityName: city.name,
                adcode: city.adcode
              }
            });
            
            // 添加点击事件
            marker.on('click', (e: any) => {
              const extData = e.target.getExtData();
              if (onCityClick) {
                onCityClick(extData.cityName, extData.adcode);
              }
              
              // 创建信息窗体
              const infoWindow = new window.AMap.InfoWindow({
                isCustom: true,
                content: `
                  <div class="bg-white p-3 rounded shadow-md text-sm">
                    <h3 class="font-bold text-lg mb-2">${extData.cityName}</h3>
                    <p>点击查看详情</p>
                  </div>
                `,
                offset: new window.AMap.Pixel(0, -25)
              });
              
              // 打开信息窗体
              infoWindow.open(map, e.target.getPosition());
            });
            
            // 添加到地图
            marker.setMap(map);
          });
        }
      });
    });
  };
  
  // 公开方法：缩放到指定省份
  const zoomToProvince = (adcode: string) => {
    if (!mapRef.current) return;
    
    const map = mapRef.current;
    map.plugin(['AMap.DistrictSearch'], () => {
      const districtSearch = new window.AMap.DistrictSearch();
      districtSearch.search(adcode, (status: string, result: any) => {
        if (status === 'complete' && result.districts.length > 0) {
          const bounds = result.districts[0].boundaries;
          map.setBounds(bounds);
          setSelectedProvince(adcode);
        }
      });
    });
  };

  return (
    <div className={`relative w-full h-[600px] ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
          <p className="text-xl font-semibold text-gray-600">地图加载中...</p>
        </div>
      )}
      
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
};

export default ChinaMap; 