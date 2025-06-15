import { NextRequest, NextResponse } from 'next/server';
import { getRecommendedAttractions } from '@/lib/api/attractions';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const scenario = searchParams.get('scenario') || undefined;
    const city = searchParams.get('city') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    console.log('推荐景点请求参数:', { scenario, city, limit });

    const attractions = await getRecommendedAttractions({
      scenario,
      city,
      limit,
    });

    console.log('获取到推荐景点数量:', attractions.length);

    return NextResponse.json(attractions);
  } catch (error) {
    console.error('获取推荐景点失败:', error);
    
    // 返回更详细的错误信息
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    return NextResponse.json(
      { 
        error: '获取推荐景点失败', 
        message: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
      },
      { status: 500 }
    );
  }
} 