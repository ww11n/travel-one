import { NextRequest, NextResponse } from 'next/server';
import { getPopularAttractions } from '@/lib/api/attractions';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    const attractions = await getPopularAttractions(limit);

    return NextResponse.json(attractions);
  } catch (error) {
    console.error('获取热门景点失败:', error);
    return NextResponse.json(
      { error: '获取热门景点失败' },
      { status: 500 }
    );
  }
} 