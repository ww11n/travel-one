// 高德地图配置
export const AMAP_CONFIG = {
  // 高德Web端开发者API密钥，需要在高德开放平台申请
  // https://lbs.amap.com/dev/key/app
  API_KEY: '2aff247fcd24810ca00d4dba0f227b61',
  
  // 初始地图中心点（中国中心位置）
  CENTER: [104.5, 38.0] as [number, number],
  
  // 初始缩放级别
  DEFAULT_ZOOM: 5,
  
  // 最小缩放级别
  MIN_ZOOM: 3,
  
  // 最大缩放级别
  MAX_ZOOM: 18,
  
  // 地图样式
  MAP_STYLE: 'amap://styles/normal',
  
  // 省份边界样式
  PROVINCE_STYLE: {
    'fill': '#CCF3FF',
    'province-stroke': '#5CABFE',
    'city-stroke': '#FFFFFF',
    'county-stroke': 'rgba(255,255,255,0.5)'
  }
}; 