import { prisma } from '../prisma';

/**
 * 获取所有景点
 * @param options 查询选项
 * @returns 景点列表
 */
export async function getAllAttractions(options?: {
  city?: string;
  category?: string;
  limit?: number;
  orderBy?: 'rating' | 'popularity' | 'name';
}) {
  const { city, category, limit = 100, orderBy = 'popularity' } = options || {};
  
  const where = {
    ...(city && city !== '全部' ? { city: { name: city } } : {}),
    ...(category && category !== '全部' ? { category } : {}),
  };
  
  const orderByOptions = {
    [orderBy]: 'desc',
  } as const;
  
  return prisma.attraction.findMany({
    where,
    take: limit,
    orderBy: orderByOptions,
    include: {
      city: true,
    },
  });
}

/**
 * 获取景点详情
 * @param id 景点ID
 * @returns 景点详情
 */
export async function getAttractionById(id: string) {
  return prisma.attraction.findUnique({
    where: { id },
    include: {
      city: true,
      media: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      },
    },
  });
}

/**
 * 获取推荐景点
 * @param options 推荐选项
 * @returns 推荐景点列表
 */
export async function getRecommendedAttractions(options?: {
  scenario?: string;
  city?: string;
  limit?: number;
}) {
  try {
    const { scenario, city, limit = 4 } = options || {};
    
    console.log('getRecommendedAttractions 输入参数:', { scenario, city, limit });
    
    let categories: string[] = [];
    
    // 根据情景选择适合的景点类别
    switch (scenario) {
      case 'family':
        categories = ['主题公园', '博物馆', '动物园'];
        break;
      case 'culture':
        categories = ['博物馆', '历史遗迹', '寺庙'];
        break;
      case 'nature':
        categories = ['国家公园', '自然保护区', '山脉'];
        break;
      case 'food':
        categories = ['美食街', '夜市', '特色餐厅'];
        break;
      case 'shopping':
        categories = ['购物中心', '特色市场', '古玩市场'];
        break;
      case 'photography':
        categories = ['风景区', '城市地标', '日出日落点'];
        break;
      default:
        break;
    }
    
    console.log('选择的景点类别:', categories);
    
    const where = {
      ...(city && city !== '全部' ? { city: { name: city } } : {}),
      ...(categories.length > 0 ? { category: { in: categories } } : {}),
    };
    
    const orderBy = categories.length > 0 
      ? { rating: 'desc' as const } 
      : { popularity: 'desc' as const };
    
    console.log('Prisma查询条件:', { where, orderBy, limit });
    
    const result = await prisma.attraction.findMany({
      where,
      take: limit,
      orderBy,
      include: {
        city: true,
      },
    });
    
    console.log(`查询到${result.length}个景点`);
    
    return result;
  } catch (error) {
    console.error('获取推荐景点时发生错误:', error);
    throw error;
  }
}

/**
 * 获取热门景点
 * @param limit 数量限制
 * @returns 热门景点列表
 */
export async function getPopularAttractions(limit = 3) {
  return prisma.attraction.findMany({
    take: limit,
    orderBy: {
      popularity: 'desc',
    },
    include: {
      city: true,
    },
  });
}

/**
 * 添加景点评论
 * @param data 评论数据
 * @returns 创建的评论
 */
export async function addComment(data: {
  userId: string;
  attractionId: string;
  content: string;
  rating: number;
}) {
  const { userId, attractionId, content, rating } = data;
  
  const comment = await prisma.comment.create({
    data: {
      content,
      rating,
      user: {
        connect: { id: userId },
      },
      attraction: {
        connect: { id: attractionId },
      },
    },
    include: {
      user: true,
    },
  });
  
  // 更新景点平均评分
  await updateAttractionRating(attractionId);
  
  return comment;
}

/**
 * 更新景点平均评分
 * @param attractionId 景点ID
 */
async function updateAttractionRating(attractionId: string) {
  const comments = await prisma.comment.findMany({
    where: { attractionId },
    select: { rating: true },
  });
  
  if (comments.length === 0) return;
  
  const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
  const averageRating = totalRating / comments.length;
  
  await prisma.attraction.update({
    where: { id: attractionId },
    data: { rating: averageRating },
  });
}

/**
 * 更新景点热度
 * @param attractionId 景点ID
 */
export async function incrementAttractionPopularity(attractionId: string) {
  await prisma.attraction.update({
    where: { id: attractionId },
    data: {
      popularity: {
        increment: 1,
      },
    },
  });
}

/**
 * 添加或移除景点收藏
 * @param userId 用户ID
 * @param attractionId 景点ID
 * @returns 是否已收藏
 */
export async function toggleFavorite(userId: string, attractionId: string) {
  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_attractionId: {
        userId,
        attractionId,
      },
    },
  });
  
  if (existingFavorite) {
    await prisma.favorite.delete({
      where: {
        id: existingFavorite.id,
      },
    });
    return false;
  } else {
    await prisma.favorite.create({
      data: {
        user: {
          connect: { id: userId },
        },
        attraction: {
          connect: { id: attractionId },
        },
      },
    });
    return true;
  }
}

/**
 * 获取用户收藏的景点
 * @param userId 用户ID
 * @returns 收藏的景点列表
 */
export async function getUserFavorites(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      attraction: {
        include: {
          city: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  
  return favorites.map(favorite => favorite.attraction);
} 