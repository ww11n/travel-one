import { NextRequest, NextResponse } from 'next/server';
import { getAllAttractions } from '@/lib/api/attractions';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city') || undefined;
    const category = searchParams.get('category') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const orderBy = searchParams.get('orderBy') as 'rating' | 'popularity' | 'name' | undefined;

    const attractions = await getAllAttractions({
      city,
      category,
      limit,
      orderBy,
    });

    return NextResponse.json(attractions);
  } catch (error) {
    console.error('获取景点列表失败:', error);
    return NextResponse.json(
      { error: '获取景点列表失败' },
      { status: 500 }
    );
  }
} 