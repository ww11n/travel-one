import { PrismaClient } from '../src/generated/prisma';
//或者直接使用@prisma/client
//import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始填充种子数据...');

  // 清理现有数据
  await prisma.favorite.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.media.deleteMany();
  await prisma.attraction.deleteMany();
  await prisma.city.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('已清理现有数据');

  // 创建测试用户
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'password123', // 在实际应用中应该使用加密密码
      name: '测试用户',
      avatar: '/images/users/default-avatar.jpg',
    },
  });
  
  console.log('已创建测试用户');

  // 创建城市
  const cities = await Promise.all([
    prisma.city.create({
      data: {
        name: '北京',
        description: '中国首都，有着丰富的历史文化和现代风貌。',
        province: '北京',
        imageUrl: '/images/cities/beijing.jpg',
      },
    }),
    prisma.city.create({
      data: {
        name: '上海',
        description: '中国最大的经济中心，国际化大都市。',
        province: '上海',
        imageUrl: '/images/cities/shanghai.jpg',
      },
    }),
    prisma.city.create({
      data: {
        name: '杭州',
        description: '浙江省省会，有着"上有天堂，下有苏杭"之美誉。',
        province: '浙江',
        imageUrl: '/images/cities/hangzhou.jpg',
      },
    }),
    prisma.city.create({
      data: {
        name: '西安',
        description: '古丝绸之路的起点，历史悠久的古都。',
        province: '陕西',
        imageUrl: '/images/cities/xian.jpg',
      },
    }),
  ]);
  
  console.log('已创建城市');

  // 创建景点
  const attractions = await Promise.all([
    // 北京景点
    prisma.attraction.create({
      data: {
        name: '故宫博物院',
        description: '故宫博物院，位于北京市中心，是明清两代的皇家宫殿，中国古代宫廷建筑之精华。是世界上现存规模最大、保存最为完整的木质结构古建筑之一，也是中国第一个被列入《世界文化遗产名录》的文化遗产。',
        openingHours: '4月1日-10月31日 8:30-17:00，11月1日-次年3月31日 8:30-16:30，周一闭馆（国家法定节假日除外）',
        ticketPrice: '成人票：60元（旺季4月1日-10月31日），40元（淡季11月1日-次年3月31日）',
        contact: '电话：+86-10-85007428',
        address: '北京市东城区景山前街4号',
        latitude: 39.916345,
        longitude: 116.397155,
        imageUrl: '/images/attractions/forbidden-city.jpg',
        category: '历史遗迹',
        rating: 4.9,
        popularity: 9800,
        cityId: cities[0].id,
      },
    }),
    prisma.attraction.create({
      data: {
        name: '长城',
        description: '世界上最伟大的建筑之一，是古代中国抵御游牧民族入侵的军事防御工程。',
        openingHours: '周一至周日 8:00-17:00',
        ticketPrice: '八达岭长城：旺季（4月1日-10月31日）40元/人，淡季（11月1日-次年3月31日）35元/人',
        contact: '电话：+86-10-61121383',
        address: '北京市延庆区军都山关沟古道北口',
        latitude: 40.431908,
        longitude: 116.570374,
        imageUrl: '/images/attractions/great-wall.jpg',
        category: '历史遗迹',
        rating: 4.9,
        popularity: 10000,
        cityId: cities[0].id,
      },
    }),
    prisma.attraction.create({
      data: {
        name: '颐和园',
        description: '中国现存规模最大、保存最完整的皇家园林，被誉为"皇家园林博物馆"。',
        openingHours: '4月1日-10月31日 6:30-18:00，11月1日-次年3月31日 7:00-17:00',
        ticketPrice: '旺季（4月1日-10月31日）门票30元，淡季（11月1日-次年3月31日）门票20元',
        contact: '电话：+86-10-62881144',
        address: '北京市海淀区新建宫门路19号',
        latitude: 39.996923,
        longitude: 116.275742,
        imageUrl: '/images/attractions/summer-palace.jpg',
        category: '历史遗迹',
        rating: 4.8,
        popularity: 9500,
        cityId: cities[0].id,
      },
    }),
    
    // 上海景点
    prisma.attraction.create({
      data: {
        name: '外滩',
        description: '上海的地标之一，是上海开埠后兴建的万国建筑博览群。',
        openingHours: '全天开放',
        ticketPrice: '免费',
        contact: '电话：+86-21-63299999',
        address: '上海市黄浦区中山东一路',
        latitude: 31.236276,
        longitude: 121.490044,
        imageUrl: '/images/attractions/the-bund.jpg',
        category: '城市地标',
        rating: 4.8,
        popularity: 9600,
        cityId: cities[1].id,
      },
    }),
    prisma.attraction.create({
      data: {
        name: '上海迪士尼乐园',
        description: '中国内地首座迪士尼主题乐园，拥有七大主题园区。',
        openingHours: '周一至周日 8:30-20:30（具体以官网公布为准）',
        ticketPrice: '平日票：399元/人，高峰日票：575元/人，假日票：719元/人',
        contact: '电话：+86-21-20996000',
        address: '上海市浦东新区川沙新镇上海迪士尼乐园',
        latitude: 31.146889,
        longitude: 121.669281,
        imageUrl: '/images/attractions/shanghai-disney.jpg',
        category: '主题公园',
        rating: 4.7,
        popularity: 9800,
        cityId: cities[1].id,
      },
    }),
    
    // 杭州景点
    prisma.attraction.create({
      data: {
        name: '西湖',
        description: '中国十大风景名胜之一，以秀丽的湖光山色和众多的人文景观闻名于世。',
        openingHours: '全天开放',
        ticketPrice: '免费',
        contact: '',
        address: '浙江省杭州市西湖区龙井路1号',
        latitude: 30.259022,
        longitude: 120.130694,
        imageUrl: '/images/attractions/west-lake.jpg',
        category: '风景区',
        rating: 4.9,
        popularity: 9700,
        cityId: cities[2].id,
      },
    }),
    prisma.attraction.create({
      data: {
        name: '灵隐寺',
        description: '中国佛教著名寺院，始建于东晋咸和年间，距今已有1700多年历史。',
        openingHours: '夏季（5月1日-10月7日）7:30-18:00，冬季（10月8日-次年4月30日）8:00-17:30',
        ticketPrice: '门票：45元/人，法云弄景区：35元/人',
        contact: '电话：+86-571-87968665',
        address: '浙江省杭州市西湖区灵隐路法云弄1号',
        latitude: 30.246622,
        longitude: 120.123269,
        imageUrl: '/images/attractions/lingyin-temple.jpg',
        category: '寺庙',
        rating: 4.6,
        popularity: 8200,
        cityId: cities[2].id,
      },
    }),
    
    // 西安景点
    prisma.attraction.create({
      data: {
        name: '兵马俑',
        description: '中国第一位皇帝秦始皇的陵墓中的一部分，被誉为"世界第八奇迹"。',
        openingHours: '3月16日-11月15日 8:30-17:30，11月16日-次年3月15日 8:30-17:00',
        ticketPrice: '旺季（3月1日-11月30日）150元/人，淡季（12月1日-次年2月底）120元/人',
        contact: '电话：+86-29-81399001',
        address: '陕西省西安市临潼区秦始皇陵东侧1.5公里处',
        latitude: 34.381129,
        longitude: 109.278628,
        imageUrl: '/images/attractions/terracotta-warriors.jpg',
        category: '历史遗迹',
        rating: 4.9,
        popularity: 9400,
        cityId: cities[3].id,
      },
    }),
    prisma.attraction.create({
      data: {
        name: '大雁塔',
        description: '唐代著名的佛塔，是佛教传入中国后的标志性建筑之一。',
        openingHours: '8:00-17:00',
        ticketPrice: '大雁塔北广场免费，大雁塔景区门票50元/人',
        contact: '电话：+86-29-85252717',
        address: '陕西省西安市雁塔区雁塔南路慈恩寺内',
        latitude: 34.218285,
        longitude: 108.96447,
        imageUrl: '/images/attractions/giant-wild-goose-pagoda.jpg',
        category: '历史遗迹',
        rating: 4.7,
        popularity: 8800,
        cityId: cities[3].id,
      },
    }),
  ]);
  
  console.log('已创建景点');

  // 创建媒体
  await Promise.all([
    // 故宫博物院媒体
    prisma.media.create({
      data: {
        type: 'image',
        url: '/images/attractions/forbidden-city-1.jpg',
        title: '故宫鸟瞰图',
        attractionId: attractions[0].id,
      },
    }),
    prisma.media.create({
      data: {
        type: 'image',
        url: '/images/attractions/forbidden-city-2.jpg',
        title: '太和殿',
        attractionId: attractions[0].id,
      },
    }),
    prisma.media.create({
      data: {
        type: 'image',
        url: '/images/attractions/forbidden-city-3.jpg',
        title: '乾清宫',
        attractionId: attractions[0].id,
      },
    }),
    prisma.media.create({
      data: {
        type: 'video',
        url: '/videos/forbidden-city-intro.mp4',
        thumbnail: '/images/attractions/video-thumbnail.jpg',
        title: '故宫介绍视频',
        attractionId: attractions[0].id,
      },
    }),
    
    // 长城媒体
    prisma.media.create({
      data: {
        type: 'image',
        url: '/images/attractions/great-wall-1.jpg',
        title: '八达岭长城',
        attractionId: attractions[1].id,
      },
    }),
    prisma.media.create({
      data: {
        type: 'image',
        url: '/images/attractions/great-wall-2.jpg',
        title: '慕田峪长城',
        attractionId: attractions[1].id,
      },
    }),
  ]);
  
  console.log('已创建媒体');

  // 创建评论
  await Promise.all([
    prisma.comment.create({
      data: {
        content: '故宫真是太壮观了，中国古代建筑的精华所在！太震撼了！',
        rating: 5,
        userId: user.id,
        attractionId: attractions[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: '长城不虚此行，但建议避开十一黄金周，人太多了。',
        rating: 4,
        userId: user.id,
        attractionId: attractions[1].id,
      },
    }),
  ]);
  
  console.log('已创建评论');

  // 创建收藏
  await prisma.favorite.create({
    data: {
      userId: user.id,
      attractionId: attractions[0].id,
    },
  });
  
  console.log('已创建收藏');
  
  console.log('种子数据填充完成！');
}

main()
  .catch((e) => {
    console.error('种子数据填充出错:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 